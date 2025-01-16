import { SelectProps } from "@/libs/types/types";

const Select = ({ name, value, onChange, width, options }: SelectProps) => (
  <select
    name={name}
    id={name}
    className={`${width} border-2 border-gray-400 rounded py-3`}
    value={value || ""}
    onChange={(e) => onChange(e.target.value)}
  >
    <option value=""></option>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default Select;
