import React from "react";
import "./Toggle.css";

interface Props {
  label: string,
  title: string,
  onToggle: Function,
}

const Toggle : React.FC<Props> = ({ title, label, onToggle }) => {
  return (
    <div className="container">
      {title}{": "}
      <div className="toggle-switch">
        <input type="checkbox" className="checkbox" name={label} id={label} onClick={(e) => onToggle()}/>
        <label className="label" htmlFor={label}>
          <span className="inner" {...{message:"PPL", other: "BRO split"}}/>
          <span className="switch"/>
        </label>
      </div>
    </div>
  );
};
  
export default Toggle
