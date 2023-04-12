import React from "react";
import Header from "../../components/header";
import SectionTitle from "../../components/sectionTitle";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../../components/button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { setLocale } from "yup";

export default function CreateProductPage() {
  const navigate = useNavigate();
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  setLocale({
    mixed: {
      default: "Não é válido",
      notType: "O valor precisa ser um número",
    },

    number: {
      positive: "O número deve ser positivo",
      integer: "Você deve inserir um número inteiro",
    },
  });

  const schema = yup
    .object({
      name: yup.string().required(),
      quantity: yup.number().positive().integer().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log({ ...data, userId: "a8b51f10-10a8-46ee-ae25-e9ca471906ab" });
    fetch(`http://localhost:3000/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        quantity: parseInt(data.quantity),
        userId: loggedUser.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/");
      });
  };

  return (
    <div>
      <Header />
      <SectionTitle
        className="inventory-title"
        text="Cadastro de produto"
        buttons={[
          {
            text: "Voltar",
            style: {
              type: "secondary",
              size: "md",
            },
            onClick: () => {
              navigate("/");
            },
          },
        ]}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="form-create-product">
        <div className="input-list">
          <div className="input-group">
            <label for="name">Nome do produto</label>
            <input
              id="name"
              name="name"
              label="Nome do produto"
              placeholder="Informe o nome do produto"
              {...register("name", { required: true })}
            />
            {errors.name && <span className="input-group-error">Campo requerido</span>}
          </div>
          <div className="input-group">
            <label for="quantity">Quantidade do produto</label>
            <input
              id="quantity"
              name="quantity"
              label="Quantidade do produto"
              {...register("quantity")}
              placeholder="Informe a quantidade disponível"
            />
            {errors.quantity && (
              <span className="input-group-error">{errors.quantity?.message} </span>
            )}
          </div>
        </div>
        <div className="button-container">
          <Button
            onClick={() => {
              navigate("/");
            }}
            style={{ type: "secondary" }}
            text="Cancelar"
          />
          <Button type="submit" text="Confirmar" />
        </div>
      </form>
    </div>
  );
}
