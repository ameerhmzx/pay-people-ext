import { createFileRoute, redirect } from "@tanstack/react-router";
import { Button } from "@nextui-org/react";

export const Route = createFileRoute("/_authenticated/_geo/geo-prompt")({
  component: GeoPrompt,
  beforeLoad: async () => {
    if (!("geolocation" in navigator)) {
      throw redirect({ to: "/geo-no-support" });
    }

    const status = await navigator.permissions.query({ name: "geolocation" });
    console.log("Geo Permission Status", status);

    if (status.state === "granted" || status.state === "prompt") {
      throw redirect({ to: "/home" });
    }

    if (status.state === "denied") {
      throw redirect({ to: "/geo-denied" });
    }

    return {
      geoPermissionState: status.state,
    };
  },
});

// TODO: remove this if permission request is not required
function GeoPrompt() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <pre>Location Permission is required to continue</pre>
      <Button
        color="primary"
        variant="shadow"
        onClick={() => {
          console.log("Requesting Location Permission");
          navigator.geolocation.getCurrentPosition((l) => {
            console.log(l);
            window.location.reload();
          });
        }}
      >
        Request Permission
      </Button>
    </div>
  );
}
