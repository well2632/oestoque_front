import React, { useEffect, useRef, useState } from "react";
import Close from "../assets/close.svg";

export default function Modal({ isActive, setActiveModal, children, title, buttons }) {
  const [showModal, setShowModal] = useState(isActive);
  const modalRef = useRef();

  const openModal = () => {
    setActiveModal(true);
  };

  const closeModal = () => {
    setActiveModal(false);
  };

  useEffect(() => {
    setShowModal(isActive);
  }, [isActive]);

  return (
    <>
      {isActive && (
        <div className="modal">
          <div className="modal-container">
            <div className="modal-container__header">
              <h4 className="modal-container__header__title">{title}</h4>
              <button className="modal-container__header__close-button">
                <img src={Close} onClick={closeModal} />
              </button>
            </div>
            <div className="modal-container__content">{children}</div>
            <div className="modal-container__footer">{buttons}</div>
          </div>
          <div className="modal-overlay" onClick={closeModal}></div>
        </div>
      )}
    </>
  );
}
