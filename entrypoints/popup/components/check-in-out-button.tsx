import useUpdateCheckIn from "@/entrypoints/popup/api/use-check-in-out.ts";
import { Button } from "@nextui-org/react";
import { ThickArrowDownIcon, ThickArrowUpIcon } from "@radix-ui/react-icons";

export default function CheckInOutButton(props: { isCheckingIn: boolean }) {
  const { mutateAsync: updateCheckIn, isPending: isLoading } =
    useUpdateCheckIn();

  return (
    <Button
      isLoading={isLoading}
      variant="shadow"
      className="shrink-0"
      color={props.isCheckingIn ? "warning" : "primary"}
      onClick={() => {
        void updateCheckIn({ checkIn: !props.isCheckingIn });
      }}
    >
      {props.isCheckingIn ? "Check Out" : "Check In"}
      {props.isCheckingIn ? <ThickArrowUpIcon /> : <ThickArrowDownIcon />}
    </Button>
  );
}
