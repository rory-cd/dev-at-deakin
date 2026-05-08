import RadioInput from "@/components/form/RadioInput";
import FormLabel from "@/components/form/FormLabel";
import FormErrorMessage from "@/components/form/FormErrorMessage";

export default function RadioGroup({
  label,
  name,
  options,
  checkedValue,
  onOptionChange,
  error,
  className="",
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      <FormLabel input={name} className="mb-3">
        {label}
      </FormLabel>
      <div className={`flex flex-wrap gap-6`}>
        {options.map(({ label, value }) => 
          <RadioInput
            key={value}
            label={label}
            name={name}
            value={value}
            checked={value === checkedValue}
            onOptionChange={onOptionChange}
          />
        )}
      </div>
      {error && <FormErrorMessage error={error} />}
    </div>
  );
}