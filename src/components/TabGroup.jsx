import Tab from "@/components/Tab";

export default function TabGroup({ name, options, checkedValue, onOptionChange, className }) {

  const activeIndex = options.findIndex(option => option.value === checkedValue);
  const tabCount = options.length;
  const widthPercent = 100 / tabCount;

  return (
    <div className={`relative flex flex-row ${className}`}>
      {/* Background highlight */}
      <div
        className="z-0 absolute bg-bg-mid h-full top-0 left-0 transition-all duration-300 border-t-2 border-t-(--clr-primary)"
        style={{
          width: `${widthPercent}%`,
          transform: `translateX(${activeIndex * 100}%)`
        }}
      />
      {options.map(({ label, value }) => 
        <Tab
          key={value}
          label={label}
          name={name}
          tabWidth={`${widthPercent}%`}
          value={value}
          checked={value === checkedValue}
          onOptionChange={onOptionChange}
        />
      )}
    </div>
  );
}