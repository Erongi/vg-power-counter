import { Plus, Minus } from "lucide-react";

const Counter = ({ power, index, onIncrease, onDecrease }) => {
  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-4 bg-gray-800 rounded-lg sm:rounded-2xl shadow-xl border-2 border-gray-700 backdrop-blur-sm bg-opacity-70">
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
