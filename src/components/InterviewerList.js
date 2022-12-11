import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss"

const InterviewerList = (props) => {

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"></ul>
    </section>
  );
};

export default InterviewerList;

// import React from "react";
// import InterviewerListItem from "./InterviewerListItem";

// const InterviewerList = (props) => {
//   const InterviewerListItem = props.interviewers.map((interviewer) => {
//     return (
//       <InterviewerListItem
//         key={interviewer.id}
//         name={interviewer.name}
//         avater={interviewer.avater}
//         selected={interviewer.name === props.interviewer}
//         setinterviewer={props.setinterviewer}
//       />
//     );
//   });

//   return (
//     <ul>{InterviewerListItems}</ul>
//   )
// };

// export default InterviewerList;
