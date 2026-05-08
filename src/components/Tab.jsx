export default function Tab({ label, name, tabWidth, value, onOptionChange, checked }) {

  const id = `${name}-${value}`;

  return (
    <label className="relative flex items-center cursor-pointer" htmlFor={id} style={{ width: tabWidth }}>
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

      {/* Box */}
      <div className={`w-full text-center px-5 pb-3 pt-4 font-sans ${!checked && "hover:text-text-secondary"} font-[600] tracking-wider uppercase`}>
        {label}
      </div>
    </label>
  );
}