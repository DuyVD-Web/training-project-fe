import { DateSelectsProps } from "../../libs/types/types";
import MultiSelect from "./Multiselect";
import Select from "./Select";

const DateSelects = ({ currentParams, onDateChange }: DateSelectsProps) => {
  const currentYear = new Date().getFullYear();

  const yearOptions = Array.from({ length: 6 }, (_, i) => currentYear - i).map(
    (year) => ({
      value: year,
      label: year,
    })
  );

  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1).map(
    (month) => ({
      value: month,
      label: new Date(2024, month - 1).toLocaleString("default", {
        month: "long",
      }),
    })
  );

  const dayOptions = Array.from({ length: 31 }, (_, i) => i + 1).map((day) => ({
    value: day,
    label: day,
  }));

  const selectedYearOptions = yearOptions.filter((option) =>
    currentParams.year?.includes(option.value.toString())
  );

  return (
    <>
      <MultiSelect
        options={yearOptions}
        value={selectedYearOptions}
        onChange={(value) => {
          onDateChange(
            "year",
            value.map((opt) => opt.value)
          );
        }}
      />

      <Select
        name="month"
        value={currentParams.month}
        onChange={(value) => onDateChange("month", value)}
        width="w-[20%]"
        options={monthOptions}
      />

      <Select
        name="day"
        value={currentParams.day}
        onChange={(value) => onDateChange("day", value)}
        width="w-[10%]"
        options={dayOptions}
      />
    </>
  );
};

export default DateSelects;
