import React from "react";
import Button from "./button";

export default function SectionTitle({ text, buttons, className }) {
  return (
    <section className={`section-title ${className}`}>
      <h2 className="section-title__text">{text || "teste"}</h2>
      <div className="section-title__buttons">
        {buttons &&
          buttons.map((button) => (
            <Button style={button.style} onClick={button.onClick} text={button.text} />
          ))}
      </div>
    </section>
  );
}
