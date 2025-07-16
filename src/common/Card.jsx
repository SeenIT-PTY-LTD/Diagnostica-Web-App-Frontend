const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 p-4 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
