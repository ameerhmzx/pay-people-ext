import { queryOptions } from "@tanstack/react-query";
import { BG_KEYS } from "@/entrypoints/background/api/query-keys.ts";
import { decrypt } from "@/entrypoints/background/common/decrypt.ts";
import { TimesheetRes } from "@/entrypoints/background/timesheet/types.ts";
import { getAuthService } from "@/entrypoints/background/auth/auth-service.ts";

interface TimesheetQueryVariables {
  employeeId: number;
  month?: number; // 0 - 11 or undefined for current month
  year?: number; // 2021 or undefined for current year
}

export const getTimesheetQueryOptions = (variables: TimesheetQueryVariables) =>
  queryOptions({
    queryKey: [BG_KEYS.timesheet, variables],
    queryFn: async () => {
      // parameters
      const queryParams = new URLSearchParams();
      queryParams.set("EmployeeID", variables.employeeId.toString());

      const today = new Date();
      const date = `${variables.year ?? today.getFullYear()}-${
        (variables.month ?? today.getMonth()) + 1
      }-01T00:00:00`;

      queryParams.set("TimeSheetMonth", date);
      queryParams.set("PeriodTypeView", "1");

      const response = await fetch(
        `https://app.paypeople.pk/ServiceApi/api/Payroll/pr_time_sheet_mf/GetTimeSheetMonthlyandWeeklyDetails?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getAuthService().getToken()}`,
          },
        },
      );
      const data = await response.text();
      return JSON.parse(decrypt(data)) as TimesheetRes;
    },
    staleTime: 1000 * 60 * 60 * 4,
  });
