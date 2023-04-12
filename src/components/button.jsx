import React from "react";

export default function Button({ text, onClick, style }) {
  const TYPES = ["primary", "secondary"];
  const SIZES = ["md", "sm"];

  const buttonType = TYPES.includes(style?.type) ? style.type : TYPES[0];
  const buttonSize = SIZES.includes(style?.size) ? style.size : SIZES[0];

  return (
    <button onClick={onClick} className={`button ${buttonType} ${buttonSize}`}>
      {text}
    </button>
  );
}
