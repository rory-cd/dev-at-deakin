import FormLabel from "@/components/form/FormLabel";
import FormErrorMessage from "@/components/form/FormErrorMessage";
import DatePicker from "react-datepicker";
import { RiCloseLine } from "@remixicon/react";

export default function DateInput({
  label,
  name,
  required = false,
  onDateChange,
  selected,
  error,
  placeholder,
  isClearable=false,
  className=""
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      <FormLabel input={name}>
        {label}
      </FormLabel>
      <div
        className="shadow-[inset_0_-1px_0_var(--text-tertiary)]
        focus-within:shadow-[inset_0_-2px_0_var(--clr-primary)]
        w-full transition-all ease-in-out flex flex-row"
      >
        <DatePicker
          id={name}
          name={name}
          selected={selected}          
          required={required}
          placeholderText={placeholder}
          onChange={(date) => onDateChange(date)}
          className="py-3 w-full focus:outline-none border-0"
          dateFormat="dd/MM/yyyy"
        />

        {/* Clear date button */}
        {isClearable &&
          <button onClick={() => onDateChange(null)}>
            <RiCloseLine
              size="20"
              className={`${!selected && "invisible"} cursor-pointer text-text-tertiary`}
            />
          </button>}
      </div>

      {error && <FormErrorMessage error={error} />}
    </div>
  );
}