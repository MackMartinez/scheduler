import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

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

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW, true))
      .catch((error) => transition(ERROR_SAVE, true));
      
  };

  //cancel interview and transition to empty component
  const cancel = (event) => {
    transition(DELETE, true); 
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE,true));
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
          onEdit={() => transition(EDIT)}
        />
      )}
       {mode === ERROR_SAVE && (
        <Error message={"Sorry, could not save appointment"} onClose={back} />
      )}
       {mode === ERROR_DELETE && (
        <Error message={"Sorry, could not delete appointment"} onClose={back} />
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
        {mode === EDIT &&
         <Form 
            interviewers={props.interviewers} 
            student={props.interview.student}
            interviewer={props.interview.interviewer.id}
            onCancel={() => back()}
            onSave={save}
          />}
    </article>

  );
};

export default Appointment;
