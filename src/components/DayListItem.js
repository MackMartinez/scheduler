import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const formatSpots = () => {
    if (props.spots>1) { 
      return props.spots + " spots remaining"
    } else if (props.spots === 1) {
      return props.spots + " spot remaining"
    } else {
      return "no spots remaining"
    }
  };

  return (
    <li 
    onClick={() => props.setDay(props.name)} 
    className={dayClass} 
    selected={props.selected} 
    data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}