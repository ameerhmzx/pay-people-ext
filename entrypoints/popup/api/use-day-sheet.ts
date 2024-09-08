import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { DAY_SHEET_KEY } from "@/entrypoints/popup/api/keys.ts";
import { getTimesheetService } from "@/entrypoints/background/timesheet/timesheet-service.ts";

interface DaySheetQueryVariables {
  d?: Date;
}

export const getDaySheetQueryOptions = (variables?: DaySheetQueryVariables) =>
  queryOptions({
    queryKey: [DAY_SHEET_KEY, variables],
    queryFn: async () => {
      return (
        (await getTimesheetService().getSheetForDay(
          variables?.d ?? new Date(),
        )) ?? null
      );
    },
    staleTime: 1000 * 60,
  });

export default function useDaySheet(variables?: DaySheetQueryVariables) {
  return useSuspenseQuery(getDaySheetQueryOptions(variables));
}
