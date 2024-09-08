import { queryOptions, useQuery } from "@tanstack/react-query";
import { PROJECTS_KEY } from "@/entrypoints/popup/api/keys.ts";
import { getTimesheetService } from "@/entrypoints/background/timesheet/timesheet-service.ts";

interface ProjectQueryVariables {
  search?: string;
}

export const getProjectsQueryOptions = (query: ProjectQueryVariables) =>
  queryOptions({
    queryKey: [PROJECTS_KEY, query],
    queryFn: async () => {
      if (query.search && query.search !== "") {
        return await getTimesheetService().searchProjectsFromApi(query.search);
      }
      return await getTimesheetService().getProjectsFromCache();
    },
    staleTime: 0,
  });

export default function useProjects(search?: string) {
  return useQuery(getProjectsQueryOptions({ search }));
}
