import React, { useState, useMemo, useRef, useEffect } from 'react';

export const DropdownWithSearch = ({ options, placeholder = 'Search...', onSelect }) => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const filteredOptions = useMemo(() => {

    if(query){
        const lowercasedQuery = query.toLowerCase();
        return options.filter(
        ({ label, value }) =>
            label.toLowerCase().includes(lowercasedQuery) ||
            value.toLowerCase().includes(lowercasedQuery)
        );
    }else{
        return options
    }
  
  }, [options, query]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!containerRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (opt) => {
    onSelect(opt);
    setQuery(opt.label); // Optionally set the input to the selected label
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <input
        type="text"
        className="w-full border rounded px-2.5 py-2 focus:outline-none focus:ring"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
      />
      {open && (
        <ul className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-60 overflow-auto">
          {filteredOptions.map(({ value, label }) => (
            <li
              key={value}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                handleSelect({ value, label })
                setOpen(false)
             }}
            >
              {label}
            </li>
          ))}
          {filteredOptions.length === 0 && (
            <li className="px-4 py-2 text-gray-500">No options</li>
          )}
        </ul>
      )}
    </div>
  );
};

