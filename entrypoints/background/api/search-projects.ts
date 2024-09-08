import { BG_KEYS } from "@/entrypoints/background/api/query-keys.ts";
import { queryOptions } from "@tanstack/react-query";
import {
  Project,
  ProjectSearchRes,
} from "@/entrypoints/background/timesheet/types.ts";
import { decrypt } from "@/entrypoints/background/common/decrypt.ts";
import { getAuthService } from "@/entrypoints/background/auth/auth-service.ts";

interface SearchProjectsQueryVariables {
  keyword: string;
}

export const searchProjectsQueryOptions = (
  variables: SearchProjectsQueryVariables,
) =>
  queryOptions({
    queryKey: [BG_KEYS.searchProjects, variables],
    queryFn: async () => {
      // parameters
      const queryParams = new URLSearchParams();
      queryParams.set("Keyword", variables.keyword);

      const response = await fetch(
        `https://app.paypeople.pk/ServiceApi/api/Payroll/pr_time_sheet_mf/GetFilterProjects?${queryParams.toString()}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getAuthService().getToken()}`,
          },
        },
      );
      const data = await response.text();
      const d = JSON.parse(decrypt(data)) as ProjectSearchRes;
      const projects: Project[] =
        d.ResultSet?.map((p) => ({
          id: p.ID,
          name: p.Value,
        })) ?? [];
      return projects;
    },
    staleTime: 1000 * 10,
  });
