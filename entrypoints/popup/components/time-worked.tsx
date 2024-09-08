import { differenceInSeconds } from "date-fns";
import { useEffect } from "react";

export default function TimeWorked(props: {
  checkInTime?: Date;
  checkOutTime?: Date;
}) {
  const [timeWorked, setTimeWorked] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!props.checkInTime) return;
      const secondsWorked = differenceInSeconds(
        props.checkOutTime ?? new Date(),
        props.checkInTime,
      );

      // seconds to hours, minutes, seconds
      const hours = Math.floor(secondsWorked / 3600);
      const minutes = Math.floor((secondsWorked % 3600) / 60);
      const seconds = secondsWorked % 60;

      setTimeWorked({
        hours,
        minutes,
        seconds,
      });
    }, 1000);

    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, [props.checkInTime, props.checkOutTime]);

  return (
    <div className="shrink-0 rounded-lg p-4 bg-gradient-to-br from-primary-100 via-primary-400 to-primary-100 text-primary-foreground border-2 border-primary-700 flex items-center justify-center">
      <div className="flex font-time text-5xl font-medium drop-shadow-lg gap-3">
        <ClockCard value={timeWorked?.hours.toString() ?? "--"} />
        <p>:</p>
        <ClockCard value={timeWorked?.minutes.toString() ?? "--"} />
        <p>:</p>
        <ClockCard value={timeWorked?.seconds.toString() ?? "--"} />
      </div>
    </div>
  );
}

function ClockCard(props: { value: string }) {
  return <div className="">{props.value.padStart(2, "0")}</div>;
}
