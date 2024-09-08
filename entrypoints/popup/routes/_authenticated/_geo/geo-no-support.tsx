import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_geo/geo-no-support")({
  component: () => (
    <div className="w-full h-full text-danger font-medium grid place-items-center">
      Geolocation is not supported in this browser T-T
    </div>
  ),
});
