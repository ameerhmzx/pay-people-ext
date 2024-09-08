import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import useProjects from "@/entrypoints/popup/api/use-projects.ts";
import React from "react";
import { Key } from "@react-types/shared";
import { useController, UseControllerProps } from "react-hook-form";

interface ProjectSelectProps extends UseControllerProps<any> {}

export default function ProjectSelect({ ...controlProps }: ProjectSelectProps) {
  const [inputVal, setInputVal] = useState<string | undefined>();
  const { data: projects, isFetching } = useProjects(inputVal);
  const { field, fieldState } = useController(controlProps);

  function setInputValue(value: string | undefined) {
    setInputVal(value);
  }

  function onSelectionChange(key: Key | null | undefined) {
    field.onChange(key);
    setInputVal(undefined);
  }

  const inputValue = useMemo(() => {
    return field.value
      ? projects?.find((option) => String(option.id) === String(field.value))
          ?.name
      : inputVal;
  }, [field.value, inputVal]);

  return (
    <Autocomplete
      isLoading={isFetching}
      inputValue={inputValue}
      onInputChange={setInputValue}
      selectedKey={String(field.value)}
      ref={field.ref}
      name={field.name}
      onSelectionChange={onSelectionChange}
      onBlur={field.onBlur}
      items={projects ?? []}
      label="Pick a Project"
      placeholder="Search Project"
      isInvalid={Boolean(fieldState.error)}
      errorMessage={fieldState.error?.message}
    >
      {(item) => (
        <AutocompleteItem key={item.id} className="capitalize">
          {item.name}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
