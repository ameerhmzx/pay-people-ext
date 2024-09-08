import { createFileRoute, redirect } from "@tanstack/react-router";
import { getIsLoggedQuery } from "@/entrypoints/popup/api/use-is-logged.ts";

export const Route = createFileRoute("/")({
  beforeLoad: async ({ context }) => {
    const query = getIsLoggedQuery();
    const isLoggedIn = await context.queryClient.ensureQueryData(query);
    if (isLoggedIn)
      throw redirect({
        to: "/home",
      });

    throw redirect({
      to: "/login",
    });
  },
});
