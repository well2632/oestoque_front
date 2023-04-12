import React from "react";
import Plus from "../assets/plus.svg";
import Subtract from "../assets/subtract.svg";

export default function NumberController({ onPlusClick, onSubtractClick, value }) {
  return (
    <div className="number-controller">
      <button className="number-controller__button" onClick={onSubtractClick}>
        <img src={Subtract} />
      </button>
      <span className="number-controller__value">{value || 0}</span>
      <button className="number-controller__button" onClick={onPlusClick}>
        <img src={Plus} />
      </button>
    </div>
  );
}
