import React, { useState } from "react";
import Modal from "../modal";
import Button from "../button";
import Input from "../input";

export default function QuantityProductModal({
  title,
  operation,
  isActive,
  handleActiveModal,
  handleConfirm,
  product,
}) {
  const [value, setValue] = useState();
  const OPERATIONS = ["addition", "subtraction"];
  const operationModal = OPERATIONS.includes(operation) ? operation : OPERATIONS[0];

  function doOperation() {
    fetch(`${process.env.REACT_APP_API_URL}/product/${product.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity:
          operationModal === "addition"
            ? parseInt(product.quantity) + parseInt(value)
            : parseInt(product.quantity) - parseInt(value),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setValue("");
        handleActiveModal(false);
        handleConfirm();
      });
  }

  return (
    <Modal
      setActiveModal={handleActiveModal}
      isActive={isActive}
      title={title}
      buttons={
        <>
          <Button
            text="Cancelar"
            style={{ type: "secondary" }}
            onClick={() => {
              setValue("");
              handleActiveModal(false);
            }}
          />
          <Button text="Confirmar" onClick={doOperation} />
        </>
      }
    >
      <Input
        className="quantity-input"
        label="Quantidade"
        value={value}
        onChange={setValue}
        placeholder="Informe a quantidade"
        type="number"
        min="0"
      />
    </Modal>
  );
}
