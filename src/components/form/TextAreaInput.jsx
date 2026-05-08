import FormLabel from "@/components/form/FormLabel";
import FormErrorMessage from "@/components/form/FormErrorMessage";

export default function TextAreaInput({
  label,
  name,
  value,
  height,
  placeholder,
  onTextChange,
  onFieldKeyDown,
  error,
  className="" 
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      <FormLabel input={name} className="mb-4">
        {label}
      </FormLabel>
      <textarea
        className="align-text-top bg-bg-mid inset-ring-1 inset-ring-text-tertiary placeholder-text-tertiary focus:inset-ring-2 focus:inset-ring-(--clr-primary) w-full transition-all ease-in-out px-4 py-3 focus:outline-none"
        style={{ height: height }}
        id={name}
        name={name}
        value={value}
        onChange={(e) => onTextChange(e.target.name, e.target.value)}
        onKeyDown={(e) => onFieldKeyDown && onFieldKeyDown(e.key)}
        placeholder={placeholder}
      />
      {error && <FormErrorMessage error={error} />}
    </div>
  );
}