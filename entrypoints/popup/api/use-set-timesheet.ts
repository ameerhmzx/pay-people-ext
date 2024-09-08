import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  DAY_SHEET_KEY,
  SCHEDULED_SHEET,
  SET_TIMESHEET,
} from "@/entrypoints/popup/api/keys.ts";
import { getTimesheetService } from "@/entrypoints/background/timesheet/timesheet-service.ts";

interface TimesheetParams {
  projectId: number;
  notes: string;
  date?: Date;
}

export default function useSetTimesheet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [SET_TIMESHEET],
    mutationFn: async ({ projectId, notes, date }: TimesheetParams) => {
      return await getTimesheetService().setTimesheet(projectId, notes, date);
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: [DAY_SHEET_KEY] });
      void queryClient.invalidateQueries({ queryKey: [SCHEDULED_SHEET] });
    },
  });
}
