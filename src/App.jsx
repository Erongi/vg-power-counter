import { useState, useRef, useEffect } from "react";
import { RotateCcw, Sparkle, Minimize, Maximize } from "lucide-react";
import { Counter } from "./components";

export default function App() {
  const [unitPowers, setUnitPowers] = useState(Array(6).fill(0));
  const [selectingPower, setSelectingPower] = useState(5000);
  const standardPowerSet = [1000, 5000, 10000, 1000000];

  const appRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [wakeLock, setWakeLock] = useState(null);

  // Request a wake lock to keep the screen on
  const requestWakeLock = async () => {
    try {
      if ("wakeLock" in navigator) {
        const lock = await navigator.wakeLock.request("screen");
        setWakeLock(lock);
        console.log("Wake lock active");
      }
    } catch (err) {
      console.error("Wake lock request failed:", err.name, err.message);
    }
  };

  // Release the wake lock
  const releaseWakeLock = async () => {
    if (wakeLock) {
      await wakeLock.release();
      setWakeLock(null);
      console.log("Wake lock released");
    }
  };

  // Listen for fullscreen changes to release the wake lock if the user exits manually
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullScreen(false);
        releaseWakeLock();
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [wakeLock]);

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

  // Toggle full screen mode
  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      if (appRef.current.requestFullscreen) {
        appRef.current.requestFullscreen();
      } else if (appRef.current.webkitRequestFullscreen) {
        /* Safari */
        appRef.current.webkitRequestFullscreen();
      } else if (appRef.current.msRequestFullscreen) {
        /* IE11 */
        appRef.current.msRequestFullscreen();
      }
      setIsFullScreen(true);
      requestWakeLock();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen();
      }
    }
  };
  return (
    <div
      ref={appRef}
      className="relative flex flex-col items-center justify-center h-screen p-2 bg-gray-950 text-white font-inter overflow-auto"
    >
      <div className="flex flex-row-reverse w-full absolute bottom-0 p-5 z-10 opacity-50">
        <button
          onClick={handleFullScreen}
          className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-200"
          aria-label="Toggle full screen"
        >
          {isFullScreen ? <Minimize size={20} /> : <Maximize size={20} />}
        </button>
      </div>

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
              {power / 1000}K
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
          <span>PR</span>
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
