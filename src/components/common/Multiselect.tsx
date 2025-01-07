import { useState, useEffect, useRef } from "react";
import { MultiSelectOption, MultiSelectProps } from "../../libs/types/types";

const MultiSelect = <T extends MultiSelectOption>(
  props: MultiSelectProps<T>
) => {
  const { value, options, onChange } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(
    options.filter((opt) => value.includes(opt))
  );
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value.length != 0) {
      setSelectedOptions(options.filter((opt) => value.includes(opt)));
    }
  }, [value, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (e) => {
    const newValue = parseInt(e.target.value);
    const option = options.find((opt) => opt.value === newValue);

    if (option) {
      const newSelected = [...selectedOptions, option];
      setSelectedOptions(newSelected);
      onChange(newSelected);
    }
  };

  const removeOption = (optionToRemove: MultiSelectOption) => {
    const newSelected = selectedOptions.filter(
      (option) => option.value !== optionToRemove.value
    );
    setSelectedOptions(newSelected);
    onChange(newSelected);
  };

  const remainingOptions = options.filter(
    (option) =>
      !selectedOptions.some((selected) => selected.value === option.value)
  );

  return (
    <div className="relative w-[50%]" ref={wrapperRef}>
      <div
        className="min-h-10 w-full border-2 border-gray-400 rounded p-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex gap-2 overflow-auto">
          {selectedOptions.map((option) => (
            <div
              key={option.value}
              className="flex items-center gap-2 bg-blue-100 border border-blue-500 rounded px-2 py-1"
            >
              <span>{option.label}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeOption(option);
                }}
                className="text-blue-500 hover:text-blue-700"
              >
                ×
              </button>
            </div>
          ))}
          {selectedOptions.length === 0 && (
            <span className="text-gray-500">Select years...</span>
          )}
        </div>
      </div>

      {isOpen && remainingOptions.length > 0 && (
        <div className="absolute w-full mt-1 max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {remainingOptions.map((option) => (
            <button
              key={option.value}
              value={option.value}
              onClick={handleSelect}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
