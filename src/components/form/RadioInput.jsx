export default function RadioInput({ label, name, value, checked, onOptionChange }) {

  const id = `${name}-${value}`;

  return (
    <label className="relative inline-flex items-center cursor-pointer" htmlFor={id}>
      {/* Input (hidden) */}
      <input
        type="radio"
        name={name}
        id={id}
        value={value}
        checked={checked}
        onChange={(e) => onOptionChange(e.target.name, e.target.value)}
        className="peer hidden"
      />

      {/* Icon outer */}
      <div className="absolute left-0 w-5 h-5 rounded-full border-2 border-text-tertiary peer-checked:border-(--clr-primary) transition-all duration-500 ease-in-out"></div>
      {/* Icon inner */}
      <span className="absolute left-1.25 w-2.5 h-2.5 bg-(--clr-primary) rounded-full scale-0 peer-checked:scale-100 transition-transform duration-200 ease-out"></span>

      {/* Actual label */}
      <span className="ml-6.75 text-text-primary">
        {label}
      </span>
    </label>
  );
}