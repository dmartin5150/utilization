import React from "react";
import "./placard-component.scss";
import classnames from "classnames";


const Placard = ({id,className, title, focus, subtitle, selectedPlacard,onPlacardChange }) => {

  const placardChangeHandler = (event) => {
    onPlacardChange(event.target.id);
    console.log(event.target.id);
  };
  
  return (
    <div
      className={classnames("placard",{[className]: className},
       {selected: id === selectedPlacard})}
      id={id}
      onClick={placardChangeHandler}
    >
      <h3 className="title">{title}</h3>
      <span className="focus">{focus}</span>
      <p className="subtitle">{subtitle}</p>
    </div>
  );
};

export default Placard;
