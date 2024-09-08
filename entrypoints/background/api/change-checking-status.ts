import { UseMutationOptions } from "@tanstack/react-query";
import { BG_KEYS } from "@/entrypoints/background/api/query-keys.ts";
import { bgQueryClient } from "@/entrypoints/background/common/bg-query-client.ts";
import { decrypt } from "@/entrypoints/background/common/decrypt.ts";
import { BACKEND_URL } from "@/entrypoints/background/common/constants.ts";
import { getAuthService } from "@/entrypoints/background/auth/auth-service.ts";

interface ChangeCheckingStatusMutationVariables {
  BreakInOut: boolean;
  CheckInOut: boolean;
  GPSAttendanceCoordinate: string;
}

export const changeCheckingStatusMutationOptions: UseMutationOptions<
  string,
  unknown,
  ChangeCheckingStatusMutationVariables
> = {
  mutationKey: [BG_KEYS.changeCheckingStatus],
  mutationFn: async (variables: ChangeCheckingStatusMutationVariables) => {
    const res = await fetch(
      `${BACKEND_URL}/Payroll/pr_time_entry/ChangeCheckInOut`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getAuthService().getToken()}`,
        },
        body: JSON.stringify({
          ...variables,
          DeviceType: "Dashboard",
          TimeOutDeviceType: "Dashboard",
        }),
      },
    );

    return decrypt(await res.text());
  },
  onSettled: () => {
    void bgQueryClient.invalidateQueries({ queryKey: [BG_KEYS.dashboard] });
    void bgQueryClient.invalidateQueries({ queryKey: [BG_KEYS.timesheet] });
  },
};
