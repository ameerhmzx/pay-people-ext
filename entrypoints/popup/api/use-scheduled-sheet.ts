import { useSuspenseQuery } from "@tanstack/react-query";
import { SCHEDULED_SHEET } from "@/entrypoints/popup/api/keys.ts";
import { getTimesheetService } from "@/entrypoints/background/timesheet/timesheet-service.ts";

export default function useScheduledSheet() {
  return useSuspenseQuery({
    queryKey: [SCHEDULED_SHEET],
    queryFn: async () => {
      return await getTimesheetService().getScheduledTimesheet();
    },
  });
}
