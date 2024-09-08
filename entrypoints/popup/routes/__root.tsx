import {
  createRootRouteWithContext,
  Outlet,
  useLocation,
} from "@tanstack/react-router";
import { queryClient } from "@/entrypoints/popup/lib/query-client.ts";
import useIsLogged from "@/entrypoints/popup/api/use-is-logged.ts";
import { useEffect } from "react";

interface RouteContext {
  queryClient: typeof queryClient;
}

export const Route = createRootRouteWithContext<RouteContext>()({
  component: MainLayout,
  notFoundComponent: NotFound,
});

function MainLayout() {
  const { data: isLoggedIn } = useIsLogged();
  const navigate = Route.useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      void navigate({
        to: "/home",
        replace: true,
      });
    } else {
      void navigate({
        to: "/login",
        replace: true,
      });
    }
  }, [isLoggedIn]);

  return (
    <main className="w-[400px] h-[600px]">
      <Outlet />
      <div className="absolute top-2 -right-6 px-6 text-xs font-black text-white bg-red-700 rotate-45">
        BETA
      </div>
    </main>
  );
}

function NotFound() {
  const location = useLocation();
  return <div>Not Found: {location.pathname}</div>;
}
