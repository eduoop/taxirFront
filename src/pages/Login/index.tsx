import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Input } from "../../components/Input";
import { LoaderButton } from "../../components/LoaderButton";
import { Button } from "../../components/Button";
import toast, { Toaster } from "react-hot-toast";
import { api } from "../../Config/api";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth/AuthContext";
import { AuthProvider } from "../../context/auth/AuthProvider";
import LogoText from '../../assets/logo_text.png'

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

  const location = useLocation();
  let createNew: boolean;

  if (location.state) {
    const auxState = location.state as LocationState;
    createNew = auxState.createNew;
  }

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
          redirectUrl: "http://localhost:5173/create-account",
          email: email,
          role: role,

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
            redirectUrl: "http://localhost:5173/forgot-password",
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
              toast.error("Este email ainda não está cadastrado");
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
        const isLogged = await auth.signin(email, password)
          .catch(() => {
            toast.error("Email ou senha incorretos");
            setloader(false)
          });
        if (isLogged) {
          navigate("/travels");
          setloader(false)
        }
      }
    }
  };

  useEffect(() => {
    setNullEmail(false);
    setNullPassword(false);
    setRole('')
  }, [create]);


  useEffect(() => {
    if (createNew) {
      setCreate('email')
    }
  }, [createNew!]);

  interface LocationState {
    createNew: boolean;
  }

  return (
    <div className={styles.container}>
      <main>
        <div className={styles.logo_side}>
          <img src={LogoText}/>
          <h2>O Taxir ajuda você a encontrar, combinar e marcar viagens para lugares de todo o Brasil.</h2>
        </div>
        <div className={styles.login_card}>
          {create !== 'login' && (
            <div className={styles.create_email_message}>
              <h1>Uma confirmação será enviada ao email</h1>
            </div>
          )}
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
      </main>
    </div>
  );
};
