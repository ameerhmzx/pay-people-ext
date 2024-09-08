import { defineProxyService } from "@webext-core/proxy-service";
import { getDashboardQueryOptions } from "@/entrypoints/background/api/get-dashboard.ts";
import { bgQueryClient } from "@/entrypoints/background/common/bg-query-client.ts";
import mutate from "@/entrypoints/background/common/mutate.ts";
import { changeCheckingStatusMutationOptions } from "@/entrypoints/background/api/change-checking-status.ts";
import { getTimesheetService } from "@/entrypoints/background/timesheet/timesheet-service.ts";

class ClockService {
  async clockIn(location: string) {
    return await mutate(changeCheckingStatusMutationOptions, {
      CheckInOut: true,
      BreakInOut: false,
      GPSAttendanceCoordinate: location,
    });
  }

  async clockOut(location: string) {
    await mutate(changeCheckingStatusMutationOptions, {
      CheckInOut: false,
      BreakInOut: false,
      GPSAttendanceCoordinate: location,
    });

    // submit scheduled timesheet
    await getTimesheetService().submitScheduledTimesheet();
  }

  async breakIn(location: string) {
    console.log("breakIn");
    return await mutate(changeCheckingStatusMutationOptions, {
      CheckInOut: true,
      BreakInOut: true,
      GPSAttendanceCoordinate: location,
    });
  }

  async breakOut(location: string) {
    console.log("breakOut");
    return await mutate(changeCheckingStatusMutationOptions, {
      CheckInOut: true,
      BreakInOut: false,
      GPSAttendanceCoordinate: location,
    });
  }

  async getClockStatus() {
    const data = await bgQueryClient.fetchQuery(getDashboardQueryOptions());
    return data.ResultSet?.CheckInCheckOutTimeModel;
  }
}

export const [registerClockService, getClockService] = defineProxyService(
  "ClockService",
  () => new ClockService(),
);
