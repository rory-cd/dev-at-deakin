import { useState, useEffect, useRef } from "react";

export default function DropDown ({children, options, className=""}) {

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Set an event listener to close the menu on "outside clicks" 
  useEffect(() => {
    const handleOutsideClick = (e) => {
      // If the menu doesn't contain the click target, close the menu
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    // Add listener
    document.addEventListener("mousedown", handleOutsideClick);

    // Unsubscribe on unmount
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        onBlur={() => setOpen(false)} 
        className={"flew-row !ps-2 cursor-pointer"}
        type="button"
      >
        {children}
      </button>

      {/* Menu */}
      {open && (
        <div className="flex flex-col p-2 rounded-sm absolute top-[105%] left-0 shadow-lg bg-bg-front">
          {options.map((option) => 
            <a 
              key={option.key}
              onMouseDown={(e) => e.preventDefault()}  // Prevent blur until after click
              onClick={() => {
                setOpen(false);
                option.onClick();
              }}
              className={`${option.active ? "bg-(--clr-primary)" : "hover:bg-bg-mid"} py-1 text-left px-2 rounded-sm cursor-pointer`}
            >
              {option.value}
            </a>
          )}
        </div>
      )}
    </div>
  );
}