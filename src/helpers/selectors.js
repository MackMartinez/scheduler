export function getAppointmentsForDay(state, day) {
  let result = [];
  let appointmentsForDay;

  state.days.forEach((dayObj) => {
    if (dayObj.name === day) {
      appointmentsForDay = dayObj.appointments
    }
  });

  if (appointmentsForDay === undefined) {
    return result;
  } 
  
  appointmentsForDay.forEach((appointment) => {
    if (state.appointments[appointment]) {
      result.push(state.appointments[appointment]);
    }
  });

  return result;
 
}

export function getInterview(state, interview) {
  
  let result = {};

  if (interview === null) {
    return null;
  };

  const arrayOfInterviewers =  Object.values(state.interviewers);

  arrayOfInterviewers.forEach((interviewer) => {
    if (interviewer.id === interview.interviewer) {
      result = {student: interview.student, interviewer}
    };
  })

  return result;
}

export function getInterviewersForDay(state, day) {
  //... returns an array of appointments for that day
  const [selectedDay] = state.days.filter((item) => item.name === day);
  if (!selectedDay) return [];

  const { interviewers: selectedDayInterviewers } = selectedDay;

  const interviewersArray = Object.values(state.interviewers);

  const interviewersForDay = interviewersArray.filter((item) =>
    selectedDayInterviewers.includes(item.id)
  );
  
  return interviewersForDay;
}