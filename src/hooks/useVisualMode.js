import { useState } from "react"

//Hook to update mode of appointments

const useVisualMode = (initial) => {

  const [ mode, setMode ] = useState(initial);
  const [ history, setHistory ] = useState([initial])

  // Transition from initial mode to intended mode
  const transition = (newMode, replace = false) => {

      setHistory((prev) => [newMode, ...prev.slice(replace ? 1 : 0)]);
      setMode(newMode);
      console.log("newMode:", newMode)
    }

   // sets mode back to previous state
  const back = () => {
    if (history.length > 1) {
      console.log("history:", history)
      const newHistory = [...history].pop()
      
      setMode(newHistory);
      console.log("newhistory:", newHistory)
      return newHistory;
    }
  }

  return {
    mode,
    transition,
    back
  };
};

export default useVisualMode;