import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { LoaderButton } from "../../components/LoaderButton";
import { Input } from "../../components/Input";
import { DisabledInput } from "../../components/DisabledInput";
import { MaskInput } from "../../components/MaskInput";
import { Button } from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../Config/api";
import toast from "react-hot-toast";

export const CreateAccount = () => {
  const [loader, setloader] = useState(false);
  const [email, setemail] = useState('');
  const {key} = useParams()

  
  const navigate = useNavigate()

  // camps

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  // null camps

  const [nullName, setNullName] = useState(false);
  const [nullPhone, setNullPhone] = useState(false);
  const [nullPassword, setNullPassword] = useState(false);
  const [nullPasswordConfirmation, setNullPasswordConfirmation] = useState(false);

  // consult user by params


  useEffect(() => {
    api.get(`/users/register/${key}`)
    .then((res) => {
      setemail(res.data.email)
    })
    .catch((err) => console.log(err))
  }, [])

  const send = (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   
   if(!name) {
     setNullName(true)
    } else {
      setNullName(false)
    }
    
    if(!phone) {
    setNullPhone(true)
   } else {
     setNullPhone(false)
    }

    if(!password) {
    setNullPassword(true)
   } else {
    setNullPassword(false)
  }
  
  if(!passwordConfirmation) {
    setNullPasswordConfirmation(true)
  } else {
    setNullPasswordConfirmation(false)
  }

  if(password !== passwordConfirmation) {
    toast.error('As senhas precisam ser iguais')
  }

  if(name && phone && password && passwordConfirmation && passwordConfirmation === password) {
     setloader(true)
    api.put('/users/register', {
      key: key,
      name: name,
      phone: phone,
      password: password,
      passwordConfirmation: passwordConfirmation
    })
    .then((res) => {
      navigate('/login')
      setloader(false)
    })
    .catch((err) => {
      if(err.response.data.code === 'ER_DUP_ENTRY') {
        toast.error('Este telefone já está em uso')
        setNullPhone(true)
      }
      setloader(false)
    })
   }
   
  }

  console.log(phone.length)

  return (
    <div className={styles.container}>
      <div className={styles.login_card}>
        <form onSubmit={(e) => send(e)} className={styles.form}>
          <div className={styles.inputs_container}>
            <div className={styles.inputs}>
              <label htmlFor="email">Email</label>
              <DisabledInput value={email}/>
            </div>
              <div className={styles.inputs}>
                <label htmlFor="password">Nome</label>
                <Input id="name" name="name" type="text" isNull={nullName} setValue={setName} value={name} setNullCamp={setNullName}/>
              </div>
              <div className={styles.inputs}>
                <label htmlFor="password">Telefone</label>
                <MaskInput mask="(99) 99999-9999" id="name" name="name" type="text" isNull={nullPhone} value={phone} setValue={setPhone} setNullCamp={setNullPhone}/>
              </div>
              <div className={styles.inputs}>
                <label htmlFor="password">Senha</label>
                <Input id="name" name="name" type="password" isNull={nullPassword} setValue={setPassword} value={password} setNullCamp={setNullPassword}/>
              </div>
              <div className={styles.inputs}>
                <label htmlFor="password">Confirmar senha</label>
                <Input id="name" name="name" type="password" isNull={nullPasswordConfirmation} setValue={setPasswordConfirmation} value={passwordConfirmation} setNullCamp={setNullPasswordConfirmation}/>
              </div>
          </div>
          <div className={styles.btn_login}>
            {loader ? (
             <LoaderButton />
            ) : (
              <Button text={"Criar"}/>
            )}
          </div>
        </form>
        <div className={styles.create}>
            <h2>
              Já possui uma conta?{" "}
              <a onClick={() => navigate('/login')}>Clique aqui</a>
            </h2>
        </div>
      </div>
    </div>
  );
};
