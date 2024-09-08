import { useMutation } from "@tanstack/react-query";
import { getAuthService } from "@/entrypoints/background/auth/auth-service.ts";
import { getIsLoggedQuery } from "@/entrypoints/popup/api/use-is-logged.ts";
import { queryClient } from "@/entrypoints/popup/lib/query-client.ts";

export default function useLogin() {
  return useMutation({
    mutationKey: ["LOGIN"],
    mutationFn: async (credentials: { email: string; password: string }) => {
      return await getAuthService().login(
        credentials.email,
        credentials.password,
      );
    },
    onSuccess: () => {
      // Invalidate the isLogged query
      void queryClient.invalidateQueries({
        queryKey: getIsLoggedQuery().queryKey,
      });
    },
  });
}
