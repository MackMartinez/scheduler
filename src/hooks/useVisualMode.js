import { useState } from "react"

const useVisualMode = (initial) => {

  const [ mode, setMode ] = useState(initial);
  const [ history, setHistory ] = useState([initial])

  const transition = (newMode, replace = false) => {

      setHistory((prev) => {
        const newHistory = [...prev]

        if (replace) {
          newHistory.pop()
        } 
        const returnValue = [...newHistory, newMode]
        return returnValue
      }
      );
      setMode(newMode);
    }

  const back = () => {
    if (history.length > 1) {
      const newHistory = [...history]
      newHistory.pop()
      setMode(newHistory[newHistory.length-1]);
      setHistory(newHistory);
    }
  }

  return {
    mode,
    transition,
    back
  };
};

export default useVisualMode;