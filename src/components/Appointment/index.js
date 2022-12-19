import React from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

const Appointment = (props) => {

  return (
    (props.interview ? 
    <article className="appointment" >
      <Header time={props.time} /> 
      <Show student={props.interview.student} interviewer={props.interview.interviewer.name} /> 
    </article> :
    <article className="appointment">
      <Header time={props.time} /> 
      <Empty />
    </article>
      
      )
  );
}

export default Appointment;