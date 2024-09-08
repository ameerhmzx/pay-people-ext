import { createFileRoute, redirect } from "@tanstack/react-router";
import { getAuthService } from "@/entrypoints/background/auth/auth-service.ts";
import { getIsLoggedQuery } from "@/entrypoints/popup/api/use-is-logged.ts";
import { useQueryClient } from "@tanstack/react-query";
import useClockStatus from "@/entrypoints/popup/api/use-clock-status.ts";
import CheckInOutButton from "@/entrypoints/popup/components/check-in-out-button.tsx";
import { format, parseISO } from "date-fns";
import { Button, Spinner } from "@nextui-org/react";
import TimeWorked from "@/entrypoints/popup/components/time-worked.tsx";
import { ExitIcon, ExternalLinkIcon } from "@radix-ui/react-icons";
import Timesheet from "@/entrypoints/popup/components/timesheet.tsx";
import { Suspense } from "react";

export const Route = createFileRoute("/_authenticated/home")({
  component: Home,
  beforeLoad: async () => {
    const permission = await navigator.permissions.query({
      name: "geolocation",
    });

    if (
      permission.state !== "granted" &&
      // Remove this if prompt for permission is required
      permission.state !== "prompt"
    ) {
      throw redirect({ to: "/geo-prompt" });
    }
  },
});

function Home() {
  const queryClient = useQueryClient();
  const { data: clockStatus } = useClockStatus();

  function handleLogout() {
    getAuthService()
      .logout()
      .then(() => {
        void queryClient.invalidateQueries({
          queryKey: getIsLoggedQuery().queryKey,
        });
      });
    queryClient.clear();
  }

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <TimeWorked
        checkInTime={
          clockStatus?.CheckInTime
            ? parseISO(clockStatus.CheckInTime)
            : undefined
        }
        checkOutTime={
          clockStatus?.CheckOutTime
            ? parseISO(clockStatus.CheckOutTime)
            : undefined
        }
      />

      <CheckInOutButton isCheckingIn={clockStatus?.IsCheckIn ?? false} />

      {clockStatus?.CheckInTime ? (
        <div className="font-mono">
          Stats:
          <p>
            Check In Time: {format(parseISO(clockStatus?.CheckInTime), "pp")}
          </p>
          {clockStatus?.CheckOutTime && (
            <p>
              Check Out Time:{" "}
              {format(parseISO(clockStatus?.CheckOutTime), "pp")}
            </p>
          )}
        </div>
      ) : (
        <div>Not Checked In Yet!</div>
      )}

      <Suspense fallback={<Spinner />}>
        <Timesheet />
      </Suspense>

      <div className="shrink-0 flex border-t pt-4 items-center justify-end w-full gap-2 mt-auto">
        <Button
          as="a"
          href="https://app.paypeople.pk"
          target="_blank"
          size="sm"
          radius="full"
          variant="light"
          endContent={<ExternalLinkIcon />}
        >
          Visit Pay People
        </Button>

        <Button
          size="sm"
          radius="full"
          variant="faded"
          color="danger"
          onClick={handleLogout}
          endContent={<ExitIcon />}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
