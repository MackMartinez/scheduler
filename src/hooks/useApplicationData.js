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

  //getting state data from api-server
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

  //function to update spots available
  const updateSpots = (state, appointments, id) => {
    const interviewStatePrev = state.appointments[id].interview;
    const interviewStatePost = appointments[id].interview;

    //handle value of current spot amount change
    let spotsChange = 0;

    // Count for just updating an appointment
    if (interviewStatePrev !== null && interviewStatePost !== null) {
      spotsChange = 0;
    }

    // Count for deleting an appointment
    else if (interviewStatePrev !== null && interviewStatePost === null) {
      spotsChange = 1;
    }

    // Count for creating an appointment
    else if (interviewStatePrev === null && interviewStatePost !== null) {
      spotsChange = -1;
    }

    const updatedDays = state.days.map((day) => {
      // Find the day where the appointments array includes the ID
      if (day.appointments.includes(id)) {
        // Update the spots value with the appropriate spotsChange
        return { ...day, spots: day.spots + spotsChange };
      }
      return day;
    });

    return updatedDays;
  };

  //function to cancel interview
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

  // function to book function and put req to server
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
