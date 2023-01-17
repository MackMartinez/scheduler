import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // to save selected interview
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING, true);

    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW, true))
      
  };

  const cancel = () => {
    transition(DELETE, true); 
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY, true))
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers} 
          onCancel={() => back()}
          onSave={save}
           />
      )}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === CONFIRM && 
        <Confirm 
          onCancel={back} 
          onConfirm={cancel} 
          message={"Are you sure you would like to delete?"}
        /> }
        {mode === DELETE && <Status message={"Deleting"} />}
    </article>

  );
};

export default Appointment;
