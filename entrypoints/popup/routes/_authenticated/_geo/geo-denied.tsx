import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_geo/geo-denied")({
  component: () => (
    <div className="w-full h-full text-danger font-medium grid place-items-center">
      Geolocation is denied, please enable it to continue
    </div>
  ),
});
