import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { CheckIcon } from "@radix-ui/react-icons";
import ProjectSelect from "@/entrypoints/popup/components/project-select.tsx";
import useDaySheet from "@/entrypoints/popup/api/use-day-sheet.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useSetTimesheet from "@/entrypoints/popup/api/use-set-timesheet.ts";
import useScheduledSheet from "@/entrypoints/popup/api/use-scheduled-sheet.ts";
import useClockStatus from "@/entrypoints/popup/api/use-clock-status.ts";

const timeSheetSchema = z.object({
  notes: z
    .string({ message: "Please enter a valid activity" })
    .min(5, "Please enter a valid activity"),
  projectId: z
    .string({ message: "Please select a project" })
    .min(1, "Please select a project"),
});

export default function Timesheet() {
  const { data: sheet } = useDaySheet();
  const { data: scheduled } = useScheduledSheet();
  const { data: clockStatus } = useClockStatus();
  const { mutateAsync: setTimeSheet, isError } = useSetTimesheet();

  // TODO: get Last submitted project and auto select the project field

  const { control, register, formState, handleSubmit } = useForm({
    defaultValues: {
      projectId: String(sheet?.ProjectID ?? scheduled?.projectId ?? ""),
      notes: sheet?.Notes ?? scheduled?.notes ?? "",
    },
    resolver: zodResolver(timeSheetSchema),
  });

  const isSubmitted = Boolean(sheet);
  const isCheckedOut = Boolean(clockStatus?.CheckOutTime);
  const isScheduled = Boolean(scheduled);

  return (
    <form
      onSubmit={handleSubmit(async (v) => {
        await setTimeSheet({
          projectId: Number(v.projectId),
          notes: v.notes,
        });
      })}
      className="space-y-2"
    >
      <ProjectSelect control={control} name="projectId" />
      <Textarea
        label="Timesheet"
        description={
          !isCheckedOut &&
          "NOTE: it will automatically be submitted on checkout"
        }
        {...register("notes")}
        errorMessage={formState.errors.notes?.message}
        isInvalid={Boolean(formState.errors.notes)}
        maxRows={6}
      />
      {isError && (
        <div className="text-danger text-sm">
          Error occurred while saving timesheet
        </div>
      )}
      <div className="flex items-center justify-between gap-4">
        <span>
          {isSubmitted && (
            <span className="text-success flex items-center">
              <CheckIcon />
              Submitted
            </span>
          )}
          {isScheduled && (
            <span className="text-secondary flex items-center">
              <CheckIcon />
              Scheduled
            </span>
          )}
        </span>
        <Button type="submit" size="sm" isLoading={formState.isSubmitting}>
          {isSubmitted || isScheduled ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
