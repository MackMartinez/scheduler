import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const updateSpots = (state, appointments, id) => {
    const interviewStatePrev = state.appointments[id].interview;
    const interviewStatePost = appointments[id].interview;

    let spotsChange = 0;

    // Changes available spots when deleting an interview
    if (interviewStatePrev !== null && interviewStatePost === null) {
      spotsChange = 1;
    }

    // Changes available spots when creating an interview
    if (interviewStatePrev === null && interviewStatePost !== null) {
      spotsChange = -1;
    }

    const updatedDays = state.days.map((day) => {
      if (day.appointments.includes(id)) {
        return { 
          ...day, 
          spots: day.spots + spotsChange
        };
      }
      return day;
    });

    return updatedDays;
  };

  const cancelInterview = async (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`/api/appointments/${id}`, { ...appointment })
      .then(() => {
        const days = updateSpots(state, appointments, id);
        setState({ ...state, days, appointments })
      });
  };

  const bookInterview = async (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${id}`, { ...appointment })
      .then(() => {
        const days = updateSpots(state, appointments, id);
        setState({ ...state, days, appointments })
      });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
};

export default useApplicationData;
