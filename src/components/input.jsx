import React from "react";

export default function Input(props) {
  return (
    <div className={`input ${props.className}`}>
      <label className="input__label" for={props.value}>
        {props.label || "label"}
      </label>
      <input
        {...props}
        onChange={(e) => props.onChange(e.target.value)}
        id={props.value}
        name={props.value}
      />
    </div>
  );
}
