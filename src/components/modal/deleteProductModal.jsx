import React, { useEffect, useState } from "react";
import Modal from "../modal";
import Button from "../button";
import Input from "../input";

export default function DeleteProductModal({
  product,
  isActive,
  handleActiveModal,
  handleConfirm,
}) {
  function doOperation() {
    fetch(`${process.env.REACT_APP_API_URL}/product/${product.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        handleActiveModal(false);
        handleConfirm();
      });
  }

  return (
    <Modal
      setActiveModal={handleActiveModal}
      isActive={isActive}
      title="Confirmar exclusão"
      buttons={
        <>
          <Button
            text="Cancelar"
            style={{ type: "secondary" }}
            onClick={() => {
              handleActiveModal(false);
            }}
          />
          <Button text="Confirmar" onClick={doOperation} />
        </>
      }
    ></Modal>
  );
}
