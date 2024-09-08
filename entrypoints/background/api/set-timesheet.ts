import { UseMutationOptions } from "@tanstack/react-query";
import { BG_KEYS } from "@/entrypoints/background/api/query-keys.ts";
import {
  EmployeeTimeSheet,
  Project,
} from "@/entrypoints/background/timesheet/types.ts";
import { format } from "date-fns";
import { decrypt } from "@/entrypoints/background/common/decrypt.ts";
import { bgQueryClient } from "@/entrypoints/background/common/bg-query-client.ts";
import { getAuthService } from "@/entrypoints/background/auth/auth-service.ts";

export interface SetTimesheetMutationVariables {
  slot: EmployeeTimeSheet;
  project: Project;
  notes: string;
}

export const setTimesheetMutationOptions: UseMutationOptions<
  string,
  unknown,
  SetTimesheetMutationVariables
> = {
  mutationKey: [BG_KEYS.setTimesheet],
  mutationFn: async (variables: SetTimesheetMutationVariables) => {
    console.log("setTimesheetMutationOptions", variables);
    const url =
      "https://app.paypeople.pk/ServiceApi/api/Payroll/pr_time_sheet_mf/AddOrEditEmployeeDayWiseDetail";

    const previousDetail = variables.slot.pr_time_sheet_dt.at(0);
    const payload = [
      {
        ...previousDetail,
        DetailEntry: false,
        TimeSheetMfID: variables.slot.TimeSheetMfID,
        EmployeeID: variables.slot.EmployeeID,
        HourlyRate: variables.slot.HourlyRate,
        TotalAmount: variables.slot.TotalAmount,
        TrackDate: variables.slot.AttendanceDate,
        TrackTimeIn: format(variables.slot.TimeIn, "HH:mm:ss"),
        TrackTimeIn1: format(variables.slot.TimeIn, "yyyy-MM-dd'T'HH:mm:ss"),
        TrackTimeOut: format(variables.slot.TimeOut, "HH:mm:ss"),
        TrackTimeOut1: format(variables.slot.TimeOut, "yyyy-MM-dd'T'HH:mm:ss"),
        ProjectWorkedHours: variables.slot.WorkedHours,
        DropDownProjectList: [],
        DisplayProjectName: variables.project.name,
        ProjectID: variables.project.id,
        Notes: variables.notes,
      },
    ];
    console.log("setTimesheetMutationOptions payload", payload, previousDetail);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getAuthService().getToken()}`,
      },
      body: JSON.stringify(payload),
    });

    const data = decrypt(await response.text());
    console.log("setTimesheetMutationOptions response", data);
    return data;
  },
  onSettled: () => {
    void bgQueryClient.invalidateQueries({ queryKey: [BG_KEYS.timesheet] });
  },
};
