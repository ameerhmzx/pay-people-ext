import { useMutation } from "@tanstack/react-query";
import {
  CHECK_IN_OUT_KEY,
  CLOCK_STATUS_KEY,
  DAY_SHEET_KEY,
  SCHEDULED_SHEET,
} from "@/entrypoints/popup/api/keys.ts";
import { getClockService } from "@/entrypoints/background/clock/clock-service.ts";
import { queryClient } from "@/entrypoints/popup/lib/query-client.ts";

interface CheckInOutMutationVariables {
  checkIn: boolean;
}

export default function useUpdateCheckIn() {
  return useMutation({
    mutationKey: [CHECK_IN_OUT_KEY],
    mutationFn: async (variables: CheckInOutMutationVariables) => {
      const position: GeolocationPosition = await new Promise(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (l) => resolve(l),
            (e) => reject(e.message),
          );
        },
      );

      const location = `${position.coords.latitude},${position.coords.longitude}`;
      if (variables.checkIn) {
        return await getClockService().clockIn(location);
      } else {
        return await getClockService().clockOut(location);
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [CLOCK_STATUS_KEY] });
      void queryClient.invalidateQueries({ queryKey: [DAY_SHEET_KEY] });
      void queryClient.invalidateQueries({ queryKey: [SCHEDULED_SHEET] });
    },
  });
}
