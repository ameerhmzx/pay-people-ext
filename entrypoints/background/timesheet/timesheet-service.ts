import { defineProxyService } from "@webext-core/proxy-service";
import { bgQueryClient } from "@/entrypoints/background/common/bg-query-client.ts";
import { getTimesheetQueryOptions } from "@/entrypoints/background/api/get-timesheet.ts";
import { getDate, getMonth, getYear, isToday } from "date-fns";
import { Project } from "@/entrypoints/background/timesheet/types.ts";
import { searchProjectsQueryOptions } from "@/entrypoints/background/api/search-projects.ts";
import { setTimesheetMutationOptions } from "@/entrypoints/background/api/set-timesheet.ts";
import mutate from "@/entrypoints/background/common/mutate.ts";
import { getAuthService } from "@/entrypoints/background/auth/auth-service.ts";

class TimesheetService {
  private PROJ_KEY = "local:projects" as const;
  private TS_SCHEDULE_KEY = "local:timesheet-schedule" as const;

  /**
   * Get timesheet for the month
   * @param date Date
   */
  async getSheetForMonth(date: Date | string) {
    console.log("getSheetForMonth", getDate(date), getMonth(date));
    const employeeId = await getAuthService().getEmployeeId();
    const res = await bgQueryClient.fetchQuery(
      getTimesheetQueryOptions({
        employeeId: employeeId,
        month: getMonth(date),
        year: getYear(date),
      }),
    );

    // Cache projects
    for (const item of res.ResultSet?.EmployeeTimeSheetInnerMasterList ?? []) {
      for (const dt of item.pr_time_sheet_dt) {
        await this.addProjectToCache({
          id: dt.ProjectID,
          name: dt.DisplayProjectName,
        });
      }
    }

    return res.ResultSet?.EmployeeTimeSheetInnerMasterList ?? [];
  }

  /**
   * Get timesheet for the day
   * @param date Date
   */
  async getSheetForDay(date: Date | string) {
    console.log("getSheetForDay", getDate(date), getMonth(date));
    const res = await this.getSheetForMonth(date);
    return res
      .find((x) => getDate(x.AttendanceDate) === getDate(date))
      ?.pr_time_sheet_dt.at(0);
  }

  async setTimesheet(projectId: number, notes: string, date?: Date | string) {
    const d = date ?? new Date();
    const slot = (await this.getSheetForMonth(d))?.find(
      (x) => getDate(x.AttendanceDate) === getDate(d),
    );
    if (!slot) throw new Error("Timesheet not found");

    const project = (await this.getProjectsFromCache())?.find(
      (x) => x.id === projectId,
    );
    if (!project) throw new Error("Project not found");

    const canSubmit = Boolean(slot.TimeOut);
    if (isToday(d) && !canSubmit) {
      // schedule to submit on checkout
      console.log("scheduled to submit on checkout");
      return await storage.setItem(this.TS_SCHEDULE_KEY, {
        projectId,
        notes,
      });
    }

    await mutate(setTimesheetMutationOptions, {
      slot,
      project,
      notes,
    });

    // clear any scheduled submission
    await this.clearScheduledTimesheet();
    console.log("setThisDaySheet", projectId, notes, date);
  }

  async submitScheduledTimesheet() {
    const scheduled = await this.getScheduledTimesheet();
    if (!scheduled) return;

    await this.setTimesheet(scheduled.projectId, scheduled.notes);
  }

  async getScheduledTimesheet() {
    return await storage.getItem<{
      projectId: number;
      notes: string;
    }>(this.TS_SCHEDULE_KEY);
  }

  async clearScheduledTimesheet() {
    await storage.setItem(this.TS_SCHEDULE_KEY, null);
  }

  /**
   * Get projects from cache
   */
  async getProjectsFromCache() {
    return (await storage.getItem<Project[]>(this.PROJ_KEY)) ?? [];
  }

  /**
   * Search projects from API and cache them
   * @param keyword
   */
  async searchProjectsFromApi(keyword: string) {
    console.log("searchProjectsFromApi", keyword);
    const projects = await bgQueryClient.fetchQuery(
      searchProjectsQueryOptions({ keyword }),
    );

    for (const project of projects) {
      await this.addProjectToCache(project);
    }

    console.log("searchProjectsFromApi", projects);
    return projects;
  }

  /**
   * Clear project cache
   */
  async clearProjectCache() {
    await storage.setItem(this.PROJ_KEY, null);
  }

  /**
   * Add project to cache
   * @param project
   * @private
   */
  private async addProjectToCache(project: Project) {
    const projects = await this.getProjectsFromCache();
    const existing = projects.find((x) => x.id === project.id);

    if (existing) {
      existing.name = project.name;
    } else {
      console.log("Adding project", project);
      projects.push(project);
    }

    await storage.setItem(this.PROJ_KEY, projects);
  }
}

export const [registerTimesheetService, getTimesheetService] =
  defineProxyService("TimesheetService", () => new TimesheetService());
