import { useState } from "react";
import { RotateCcw, Sparkle } from "lucide-react";
import { Counter } from "./components";

export default function App() {
  const [unitPowers, setUnitPowers] = useState(Array(6).fill(0));
  const [selectingPower, setSelectingPower] = useState(5000);
  const standardPowerSet = [1000, 5000, 10000, 1000000];

  const increaseAll = () => {
    setUnitPowers((prev) => prev.map((p) => p + selectingPower));
  };

  const personaRide = () => {
    setUnitPowers((prev) => prev.map((p, i) => (i < 3 ? p + 10000 : p)));
  };

  const resetAll = () => {
    setUnitPowers(Array(6).fill(0));
  };

  const updateOne = (index, sign) => {
    setUnitPowers((prev) =>
      prev.map((p, i) => (i === index ? p + selectingPower * sign : p))
    );
  };

  const increaseOne = (index) => updateOne(index, 1);
  const decreaseOne = (index) => updateOne(index, -1);

  return (
    <div className="flex flex-col items-center justify-center h-screen p-2 bg-gray-950 text-white font-inter overflow-hidden">
      {/* Control buttons container */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
        {standardPowerSet.map((power) => {
          const isSelected = selectingPower === power;
          return (
            <button
              key={`power-${power}`}
              onClick={() => setSelectingPower(power)}
              className={`relative px-3 py-1 sm:px-6 sm:py-3 text-xs sm:text-lg font-semibold rounded-full transition-all duration-300 transform shadow-lg active:scale-95 ${
                isSelected
                  ? "bg-purple-600 ring-2 ring-purple-300 scale-105"
                  : "bg-indigo-500 hover:bg-indigo-600 hover:scale-105"
              }`}
            >
              +{power / 1000}K
            </button>
          );
        })}

        <button
          onClick={increaseAll}
          className="relative px-3 py-1 sm:px-6 sm:py-3 text-xs sm:text-lg font-semibold rounded-full bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg active:scale-95"
        >
          All
        </button>

        <button
          onClick={personaRide}
          className="relative px-3 py-1 sm:px-6 sm:py-3 text-xs sm:text-lg font-semibold rounded-full bg-yellow-400 hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg active:scale-95 flex items-center gap-1 sm:gap-2"
        >
          <Sparkle size={12} sm:size={16} />
          <span>Ride</span>
        </button>

        <button
          onClick={resetAll}
          className="relative px-3 py-1 sm:px-6 sm:py-3 text-xs sm:text-lg font-semibold rounded-full bg-red-500 hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg active:scale-95 flex items-center gap-1 sm:gap-2"
        >
          <RotateCcw size={12} sm:size={16} />
          <span>Reset</span>
        </button>
      </div>

      {/* Grid of individual power counters */}
      <div className="grid grid-cols-3 gap-3 max-w-5xl w-full">
        {unitPowers.map((power, index) => (
          <Counter
            key={index}
            power={power}
            index={index}
            onIncrease={increaseOne}
            onDecrease={decreaseOne}
          />
        ))}
      </div>
    </div>
  );
}
