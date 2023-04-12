import React, { useEffect, useState } from "react";
import Modal from "../modal";
import Button from "../button";
import Input from "../input";

export default function EditProductModal({
  title,
  product,
  isActive,
  handleActiveModal,
  handleConfirm,
}) {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(product.name);
  }, [isActive]);

  function doOperation() {
    fetch(`${process.env.REACT_APP_API_URL}/product/${product.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: value,
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
      title="Edição de produto"
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
        className="product-name"
        label="Nome do produto"
        value={value}
        onChange={setValue}
        placeholder="Informe o nome do produto"
      />
    </Modal>
  );
}
