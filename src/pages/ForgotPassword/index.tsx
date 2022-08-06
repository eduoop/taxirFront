import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { LoaderButton } from "../../components/LoaderButton";
import { Input } from "../../components/Input";
import { DisabledInput } from "../../components/DisabledInput";
import { MaskInput } from "../../components/MaskInput";
import { Button } from "../../components/Button";
import whiteLoader from "../../assets/whiteLoader.svg";
import { BsEmojiHeartEyes } from "react-icons/bs";
import InputMask from "react-input-mask";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../Config/api";
import toast from "react-hot-toast";

export const ForgotPassword = () => {
  const [loader, setloader] = useState(false);
  const [email, setemail] = useState("");
  const { key } = useParams();

  const navigate = useNavigate();

  // camps

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  // null camps

  const [nullPassword, setNullPassword] = useState(false);
  const [nullPasswordConfirmation, setNullPasswordConfirmation] =
    useState(false);

  // consult user by params

  const send = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password) {
      setNullPassword(true);
    } else {
      setNullPassword(false);
    }

    if (!passwordConfirmation) {
      setNullPasswordConfirmation(true);
    } else {
      setNullPasswordConfirmation(false);
    }

    if (password !== passwordConfirmation) {
      toast.error("As senhas precisam ser iguais");
    }

    if (password && passwordConfirmation && passwordConfirmation === password) {
      setloader(true);
      api
        .put("/users/forgot-password", {
          key: key,
          password: password,
          passwordConfirmation: passwordConfirmation,
        })
        .then((res) => {
          setloader(false);
          toast.success('Senha alterada com sucesso')
          navigate('/login')
        })
        .catch((err) => {
          console.log(err);
          setloader(false);
        });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.login_card}>
        <form onSubmit={(e) => send(e)} className={styles.form}>
          <div className={styles.inputs_container}>
            <div className={styles.inputs}>
              <label htmlFor="password">Senha</label>
              <Input
                id="name"
                name="name"
                type="password"
                isNull={nullPassword}
                setValue={setPassword}
                value={password}
                setNullCamp={setNullPassword}
              />
            </div>
            <div className={styles.inputs}>
              <label htmlFor="password">Confirmar senha</label>
              <Input
                id="name"
                name="name"
                type="password"
                isNull={nullPasswordConfirmation}
                setValue={setPasswordConfirmation}
                value={passwordConfirmation}
                setNullCamp={setNullPasswordConfirmation}
              />
            </div>
          </div>
          <div className={styles.btn_login}>
            {loader ? <LoaderButton /> : <Button text={"Confirmar"} />}
          </div>
        </form>
        <div className={styles.create}>
          <h2>
            Já possui uma conta?{" "}
            <a onClick={() => navigate("/login")}>Clique aqui</a>
          </h2>
        </div>
      </div>
    </div>
  );
};
