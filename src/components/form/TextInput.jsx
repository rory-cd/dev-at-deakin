import FormLabel from "@/components/form/FormLabel";
import FormErrorMessage from "@/components/form/FormErrorMessage";

export default function TextInput({
  label,
  name,
  type="text",
  value,
  autoComplete = "off",
  required = false,
  onTextChange,
  onFieldKeyDown,
  placeholder = "",
  error,
  className=""
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      <FormLabel input={name}>
        {label}
      </FormLabel>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        required={required}
        onChange={(e) => onTextChange(e.target.name, e.target.value)}
        onKeyDown={(e) => onFieldKeyDown?.(e.key)}      // Only call the function if it's supplied
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="shadow-[inset_0_-1px_0_var(--text-tertiary)]
                   focus:shadow-[inset_0_-2px_0_var(--clr-primary)]
                   placeholder-(--text-tertiary)
                   w-full transition-all ease-in-out py-3 focus:outline-none"
      />
      {error && <FormErrorMessage error={error} />}
    </div>
  );
}