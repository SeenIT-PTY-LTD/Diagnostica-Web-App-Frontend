import { useState } from "react";

export function DynamicDropdown({ options, onSelect }) {

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('');

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex justify-between w-full px-2.5 py-2 bg-white border rounded "
      >
        {selected || 'Select body part'}
        <span className="ml-2 transform transition-transform" style={{ transform: open ? 'rotate(180deg)' : '' }}>
          ▼
        </span>
      </button>
      {open && (
        <ul className="absolute mt-1 w-48 bg-white border rounded  max-h-60 overflow-auto">
          {options.map(p => (
            <li
              key={p}
              onClick={() => {
                setSelected(p);
                setOpen(false);
                onSelect?.(p);
              }}
              className={`px-2 py-2 hover:bg-blue-100 ${selected === p ? 'bg-blue-50' : ''}`}
            >
              {p}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}