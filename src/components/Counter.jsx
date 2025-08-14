import { Plus, Minus } from 'lucide-react';

const Counter = ({ power, index, onIncrease, onDecrease }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-2xl shadow-xl border-2 border-gray-700 backdrop-blur-sm bg-opacity-70">
      {/* The main power display */}
      <div className="text-6xl sm:text-7xl font-bold tracking-tight text-white mb-3 text-shadow-lg">
        {power}
      </div>
      
      <div className="flex gap-4">
        <button
          onClick={() => onIncrease(index)}
          className="p-3 bg-gradient-to-tr from-emerald-500 to-green-600 rounded-full shadow-md hover:scale-110 transition-transform duration-200 active:scale-90"
          aria-label="Increase power by 5000"
        >
          <Plus size={24} strokeWidth={3} className="text-white" />
        </button>
        <button
          onClick={() => onDecrease(index)}
          className="p-3 bg-gradient-to-tr from-rose-500 to-red-600 rounded-full shadow-md hover:scale-110 transition-transform duration-200 active:scale-90"
          aria-label="Decrease power by 5000"
        >
          <Minus size={24} strokeWidth={3} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default Counter;
