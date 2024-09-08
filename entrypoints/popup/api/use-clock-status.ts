import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { CLOCK_STATUS_KEY } from "@/entrypoints/popup/api/keys.ts";
import { getClockService } from "@/entrypoints/background/clock/clock-service.ts";

export const getClockStatusQuery = () =>
  queryOptions({
    queryKey: [CLOCK_STATUS_KEY],
    queryFn: async () => {
      return await getClockService().getClockStatus();
    },
  });

export default function useClockStatus() {
  return useSuspenseQuery(getClockStatusQuery());
}
