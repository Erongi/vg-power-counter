import { useState } from "react";
import { RotateCcw, Sparkle } from "lucide-react";
import { Counter } from "./components";

export default function App() {
  // We use an array of 6 numbers to represent the power counters.
  const [unitPowers, setUnitPowers] = useState(Array(6).fill(0));

  // Selecting the power counters
  const [selectingPower, setSelectingPower] = useState(5000);

  // The power amounts for the global buttons.
  const standardPowerSet = [1000, 5000, 10000, 15000, 1000000];

  // This function adds a specific amount to all counters.
  const increaseAll = () => {
    setUnitPowers((prev) => prev.map((p) => p + selectingPower));
  };

  // This function adds 10k all front unit.
  const personaRide = () => {
    setUnitPowers((prev) => prev.map((p, i) => (i < 3 ? p + 10000 : p)));
  };

  // This function resets all counters to zero.
  const resetAll = () => {
    setUnitPowers(Array(6).fill(0));
  };

  // This function increases a single counter based on its index.
  const increaseOne = (index) => {
    setUnitPowers((prev) =>
      prev.map((p, i) => (i === index ? p + selectingPower : p))
    );
  };

  // This function decreases a single counter based on its index.
  const decreaseOne = (index) => {
    setUnitPowers((prev) =>
      prev.map((p, i) => (i === index ? p - selectingPower : p))
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-950 text-white font-inter">
      {/* Control buttons for all counters */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
        {/* Buttons for increasing all counters */}
        {standardPowerSet.map((power, index) => {
          const isSelected = selectingPower === power;
          return (
            <button
              key={`power-${index}`}
              onClick={() => setSelectingPower(power)}
              className={`relative px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-semibold rounded-full transition-all duration-300 transform shadow-lg active:scale-95 ${
                isSelected
                  ? "bg-purple-600 ring-2 ring-purple-300 scale-105"
                  : "bg-indigo-500 hover:bg-indigo-600 hover:scale-105"
              }`}
            >
              +{power / 1000}K
            </button>
          );
        })}
        {/* Button to reset all counters */}
        <button
          onClick={increaseAll}
          className="relative px-6 py-3 text-lg font-semibold rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 hover:from-yellow-600 hover:to-yellow-800 transition-all duration-300 transform hover:scale-105 shadow-lg active:scale-95 flex items-center gap-2"
        >
          <span>All</span>
        </button>

        {/* Button to reset all counters */}
        <button
          onClick={personaRide}
          className="relative px-6 py-3 text-lg font-semibold rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 hover:from-yellow-600 hover:to-yellow-800 transition-all duration-300 transform hover:scale-105 shadow-lg active:scale-95 flex items-center gap-2"
        >
          <Sparkle size={20} />
          <span>Persona Ride</span>
        </button>

        {/* Button to reset all counters */}
        <button
          onClick={resetAll}
          className="relative px-6 py-3 text-lg font-semibold rounded-full bg-gradient-to-br from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg active:scale-95 flex items-center gap-2"
        >
          <RotateCcw size={20} />
          <span>Reset</span>
        </button>
      </div>

      {/* Grid of individual power counters */}
      <div className="grid grid-cols-3 gap-6 max-w-5xl w-full">
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
