import { FiltersProps } from "../../libs/types/types";

const Filters = ({ filters, onChange }: FiltersProps) => {
  return (
    <div className="flex items-center border-2 border-gray-500 bg-white w-fit ml-4 p-4 shadow-md">
      {filters.map((filter, index) => (
        <div key={"filter-" + index}>
          <input
            key={"input " + index}
            id={filter.value}
            type="checkbox"
            value={filter.value}
            checked={filter.checked}
            onChange={(e) => onChange(filter.value, e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
          />
          <label
            htmlFor={filter.value}
            key={"label " + index}
            className="ms-2 text-sm font-medium text-gray-900 mr-2"
          >
            {filter.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Filters;
