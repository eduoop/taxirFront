import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Input } from "../../components/Input";
import { LoaderButton } from "../../components/LoaderButton";
import { Button } from "../../components/Button";
import whiteLoader from "../../assets/whiteLoader.svg";
import { BsEmojiHeartEyes } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import { api } from "../../Config/api";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [create, setCreate] = useState("login");
  const [role, setRole] = useState("");
  const [loader, setloader] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  //null camps

  const [nullEmail, setNullEmail] = useState(false);
  const [nullPassword, setNullPassword] = useState(false);

  const auth = useContext(AuthContext);

  const send = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (create === "email") {
      // verifications
      console.log("email");

      if (!email) {
        setNullEmail(true);
        setloader(false);
        return false;
      } else {
        setNullEmail(false);
      }
      if (!role) {
        toast.error("Selecione uma opção");
        setloader(false);
        return false;
      }

      // request
      setloader(true);
      api
        .post("/users/register", {
          redirectUrl: "http://127.0.0.1:5173/create-account",
          email: email,
          role: "driver",

          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setloader(false);
          toast.success("Email enviado!");
        })
        .catch((err) => {
          if (err.response.data.errors[0].rule === "unique") {
            toast.error("Esse email está em uso :(");
          }
          setloader(false);
        });
      return false;
    }

    if (create === "forgotPassword") {
      if (!email) {
        setNullEmail(true);
        setloader(false);
        return false;
      } else {
        setNullEmail(false);
      }

      if (email) {
        setloader(true);
        api
          .post(`/users/forgot-password`, {
            email: email,
            redirectUrl: "http://127.0.0.1:5173/forgot-password",
          })
          .then(() => {
            setloader(false);
            toast.success("Email enviado!");
          })
          .catch((err) => {
            setloader(false);
            if (
              err.response.data.message === "E_ROW_NOT_FOUND: Row not found"
            ) {
              toast.error("Este email não existe em nosso banco");
            }
          });
      }
      return false;
    }

    if (create === "login") {
      if (!email) {
        setNullEmail(true);
      } else {
        setNullEmail(false);
      }
      if (!password) {
        setNullPassword(true);
      } else {
        setNullPassword(false);
      }

      if (email && password) {
        setloader(true);
        const isLogged = await auth.singin(email, password).catch(() => {
          setloader(false);
        });
        if (isLogged) {
          navigate("/home");
          setloader(false);
        }
      }
    }
  };

  useEffect(() => {
    setNullEmail(false);
    setNullPassword(false);
  }, [create]);

  return (
    <div className={styles.container}>
      <div className={styles.login_card}>
        {create === "email" ||
          (create === "forgotPassword" && (
            <div className={styles.create_email_message}>
              <h1>Uma confirmação será enviada ao email</h1>
            </div>
          ))}
        <form onSubmit={(e) => send(e)} className={styles.form}>
          <div className={styles.inputs_container}>
            <div className={styles.inputs}>
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                name="email"
                type="email"
                setValue={setEmail}
                isNull={nullEmail}
                value={email}
                setNullCamp={setNullEmail}
              />
            </div>
            {create === "email" && (
              <div className={styles.checks}>
                <div className={styles.check}>
                  <input
                    type="radio"
                    name="func"
                    id="driver"
                    onClick={() => setRole("driver")}
                  />
                  <label htmlFor="driver">Motorista</label>
                </div>
                <div className={styles.check}>
                  <input
                    type="radio"
                    name="func"
                    id="passenger"
                    onClick={() => setRole("passenger")}
                  />
                  <label htmlFor="passenger">Passageiro</label>
                </div>
              </div>
            )}
            {create === "login" && (
              <div className={styles.inputs}>
                <label htmlFor="password">Senha</label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  setValue={setPassword}
                  isNull={nullPassword}
                  value={password}
                  setNullCamp={setNullPassword}
                />
              </div>
            )}
          </div>
          {create === "login" && (
            <div className={styles.forgot_password}>
              <a onClick={() => setCreate("forgotPassword")}>
                Esqueceu sua senha?
              </a>
            </div>
          )}
          <div className={styles.btn_login}>
            {loader ? (
              <LoaderButton />
            ) : (
              <Button
                text={
                  create === "email" || create === "forgotPassword"
                    ? "Enviar"
                    : "Login"
                }
              />
            )}
          </div>
        </form>
        <div className={styles.create}>
          {create === "forgotPassword" && (
            <h2>
              Já possui uma conta?{" "}
              <a onClick={() => setCreate("login")}>Clique aqui</a>
            </h2>
          )}

          {create === "email" && (
            <h2>
              Já possui uma conta?{" "}
              <a onClick={() => setCreate("login")}>Clique aqui</a>
            </h2>
          )}

          {create === "login" && (
            <h2>
              Não tem uma conta?{" "}
              <a onClick={() => setCreate("email")}>Clique aqui</a>
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};
