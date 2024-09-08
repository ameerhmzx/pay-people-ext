import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { LOGGED_IN_KEY } from "@/entrypoints/popup/api/keys.ts";
import { getAuthService } from "@/entrypoints/background/auth/auth-service.ts";

export const getIsLoggedQuery = () =>
  queryOptions({
    queryKey: [LOGGED_IN_KEY],
    queryFn: async () => {
      return await getAuthService().isLoggedIn();
    },
    refetchInterval: 5000,
  });

export default function useIsLogged() {
  return useSuspenseQuery(getIsLoggedQuery());
}
