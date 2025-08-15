import { Plus, Minus } from "lucide-react";

const Counter = ({ power, index, onIncrease, onDecrease }) => {
  const containerClasses = `flex flex-col items-center justify-center p-2 xs:p-4 rounded-lg xs:rounded-2xl shadow-xl border-2 backdrop-blur-sm bg-opacity-70 ${
    index === 1
      ? "bg-gray-700 border-blue-500"
      : "bg-gray-800 border-yellow-700"
  }`;
  return (
    <div className={containerClasses}>
      <div className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-1">
        {power}
      </div>
      <div className="flex gap-2 sm:gap-4">
        <button
          onClick={() => onIncrease(index)}
          className="p-2 sm:p-3 bg-gradient-to-tr from-emerald-500 to-green-600 rounded-full shadow-md hover:scale-110 transition-transform duration-200 active:scale-90"
          aria-label="Increase power"
        >
          <Plus size={16} sm:size={24} strokeWidth={3} className="text-white" />
        </button>
        <button
          onClick={() => onDecrease(index)}
          className="p-2 sm:p-3 bg-gradient-to-tr from-rose-500 to-red-600 rounded-full shadow-md hover:scale-110 transition-transform duration-200 active:scale-90"
          aria-label="Decrease power"
        >
          <Minus
            size={16}
            sm:size={24}
            strokeWidth={3}
            className="text-white"
          />
        </button>
      </div>
    </div>
  );
};

export default Counter;
