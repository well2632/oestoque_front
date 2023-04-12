import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../components/button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { setLocale } from "yup";
import { Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  setLocale({
    mixed: {
      default: "Não é válido",
      required: "Este campo é obrigatório",
      notType: "O valor precisa ser um número",
      oneOf: "As senhas devem ser iguais",
    },
    string: {
      email: "Este campo deve ser um e-mail válido",
    },
    number: {
      positive: "O número deve ser positivo",
      integer: "Você deve inserir um número inteiro",
    },
  });

  const schema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().required(),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null])
        .required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    fetch(`${process.env.REACT_APP_API_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          localStorage.setItem("user", JSON.stringify({ ...data }));
          navigate("/");
        } else if (data.error) {
          console.log("entrou em erro normal");
        } else {
          console.log("entrou em erro servidor");
        }
      });
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="page-login">
      <form onSubmit={handleSubmit(onSubmit)} className="form-login">
        <h4 className="logo-login">oestoque</h4>
        <div className="input-list">
          <div className="input-group">
            <label for="email">E-mail</label>
            <input
              id="email"
              name="email"
              label="E-mail"
              placeholder="Informe seu e-mail"
              {...register("email", { required: true })}
            />
            {errors.email && <span className="input-group-error">{errors.email?.message}</span>}
          </div>
          <div className="input-group">
            <label for="password">Senha</label>
            <input
              id="password"
              name="password"
              label="Senha"
              type="password"
              {...register("password")}
              placeholder="Informe sua senha"
            />
            {errors.password && (
              <span className="input-group-error">{errors.password?.message} </span>
            )}
          </div>
          <div className="input-group">
            <label for="confirmPassword">Confirme sua senha</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              label="Confirme sua senha"
              type="password"
              {...register("confirmPassword")}
              placeholder="Confirme sua senha"
            />
            {errors.confirmPassword && (
              <span className="input-group-error">{errors.confirmPassword?.message} </span>
            )}
          </div>
        </div>
        <span className="register-text">
          Já possui uma conta? <Link to="/login">Faça login clicando aqui</Link>
        </span>
        <div className="button-container">
          <Button type="submit" text="Cadastrar" />
        </div>
      </form>
    </div>
  );
}
