import { useState ,useEffect,useRef,useMemo} from "react";


export const DropdownWithSearch = ({
  options,
  placeholder = 'Search..',
  selectedValue,
  onSelect
}) => {

  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const [hasSelection, setHasSelection] = useState(false);

  const filteredOptions = useMemo(() => {
    if (query) {
      const lower = query.toLowerCase();
      return options.filter(
        ({ label, value }) =>
          label.toLowerCase().includes(lower) || value.toLowerCase().includes(lower)
      );
    }
    return options;
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
    setQuery(opt.label);
    setHasSelection(true);  // selection activated
    setOpen(false);
  };

  const handleClear = () => {
    onSelect(null);
    setQuery('');
    setHasSelection(false); // selection cleared
    setOpen(true);
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
      disabled={hasSelection}  // disabled unless cleared
    />

    {hasSelection && (
      <button
        onClick={handleClear}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
        aria-label="Clear selection"
      >
        ✕
      </button>
    )}

    {open && (
      <ul className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-60 overflow-auto">
        {filteredOptions.map(opt => (
          <li
            key={opt.value}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleSelect(opt)}
          >
            {opt.label}
          </li>
        ))}
      </ul>
    )}
  </div>
);
};