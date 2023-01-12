import { useState } from "react"

//Hook to update mode of appointments

const useVisualMode = (initial) => {

  const [ mode, setMode ] = useState(initial);
  const [ history, setHistory ] = useState([initial])

  // Transition from initial mode to intended mode
  function transition (newMode, replace = false) {

    setHistory(prev => {
      if (replace) {
        return [...prev.slice(0, prev.length - 1), newMode];
      }
      return [...prev,newMode]
    })
    setMode(newMode);
  }

   // Back
  const back = () => {
    if (history.length > 1) {
      history.pop()
      setMode(history.slice(-1)[0]);
    }
  }

  return {
    mode,
    transition,
    back
  };
};

export default useVisualMode;