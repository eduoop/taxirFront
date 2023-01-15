import { FormEvent, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ReactCrop from 'react-image-crop'
import { Crop } from "react-image-crop/dist/types";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import InputAvatar from "../../components/InputAvatar";
import { MaskInput } from "../../components/MaskInput";
import { api } from "../../Config/api";
import { AuthContext } from "../../context/auth/AuthContext";
import { User } from "../../models/user.model";
import styles from './styles.module.css'

export const EditMyProfile = () => {

  const auth = useContext(AuthContext);

  const navigate = useNavigate()

  const [user, setUser] = useState<User>()

  const [name, setName] = useState("")
  const [nullName, setNullName] = useState(false)

  const [email, setEmail] = useState("")
  const [nullEmail, setNullEmail] = useState(false)

  const [password, setPassword] = useState("")
  const [nullPassword, setNullPassword] = useState(false)

  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [nullPasswordConfirmation, setNullPasswordConfirmation] = useState(false)

  const [phone, setPhone] = useState("")
  const [nullPhone, setNullPhone] = useState(false)

  const [image, setImage] = useState<any>();

  const token = localStorage.getItem("authToken")

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim().length <= 1) {
      setNullName(true)
    } else {
      setNullName(false)
    }

    if (email.trim().length <= 1) {
      setNullEmail(true)
    } else {
      setNullEmail(false)
    }

    if (!phone) {
      setNullPhone(true)
    } else {
      setNullPhone(false)
    }

    if (passwordConfirmation && !password) {
      setNullPassword(true)
    } else {
      setNullPassword(false)
    }

    if (password && !passwordConfirmation) {
      setNullPasswordConfirmation(true)
    } else {
      setNullPasswordConfirmation(false)
    }

    if (name && email && phone && !password && !passwordConfirmation) {
      api.put(`/profiles`, {
        name: name,
        email: email,
        phone: phone,
      }, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          auth.setUser(res.data)
          toast.success("Perfil editado com sucesso")
          navigate(-1)
        })

      api.put('/users/avatar', {
        file: image && image
      }, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          auth.setUser(res.data)
        })

    } else if (name && email && phone && password && passwordConfirmation && password === passwordConfirmation) {
      api.put(`/profiles`, {
        name: name,
        email: email,
        phone: phone,
      }, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          auth.setUser(res.data)
          toast.success("Perfil editado com sucesso")
          navigate(-1)
        })

      api.put('/users/avatar', {
        file: image && image
      }, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          auth.setUser(res.data)
        })

    } else if (name && email && phone && password && passwordConfirmation && password !== passwordConfirmation) {
      toast.error("As senhas não são iguais")
      setNullPassword(true)
      setNullPasswordConfirmation(true)
    }
  }

  useEffect(() => {
    auth.setNav("profile")
    if (auth.user) {
      api.get(`/profiles?id=${auth.user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          setUser(res.data.user)
        })
    }
  }, [])

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setPhone(user.phone)

      console.log(user.name, user.email)
    }
  }, [user])

  return (
    <div className={styles.edit_profile_container}>
      <form onSubmit={(e) => submit(e)} className={styles.edit_profile_card}>
        <div className={styles.send_avatar}>
          <InputAvatar image={image} user={auth.user && auth.user} setImage={setImage} />
        </div>

        <div className={styles.input_end_label}>
          <label htmlFor="name">Nome:</label>
          <Input id="name" isNull={nullName} name={name} setNullCamp={setNullName} setValue={setName} type="text" value={name}></Input>
        </div>
        <div className={styles.input_end_label}>
          <label htmlFor="email">Email:</label>
          <Input id="email" isNull={nullEmail} name={email} setNullCamp={setNullEmail} setValue={setEmail} type="email" value={email}></Input>
        </div>
        <div className={styles.input_end_label}>
          <label htmlFor="phone">Telefone:</label>
          <MaskInput mask="(99) 99999-9999" id="phone" name="phone" type="tel" isNull={nullPhone} value={phone} setValue={setPhone} setNullCamp={setNullPhone} />
        </div>
        <div className={styles.input_end_label}>
          <label htmlFor="password">Senha:</label>
          <Input id="password" isNull={nullPassword} name={password} setNullCamp={setNullPassword} setValue={setPassword} type="password" value={password}></Input>
        </div>
        <div className={styles.input_end_label}>
          <label htmlFor="password-confirmation">Confirmar senha:</label>
          <Input id="password-confirmation" isNull={nullPasswordConfirmation} name={passwordConfirmation} setNullCamp={setNullPasswordConfirmation} setValue={setPasswordConfirmation} type="password" value={passwordConfirmation}></Input>
        </div>
        <div className={styles.actions}>
          <button type="button" onClick={() => navigate(-1)} className={styles.cancel_button}>Cancelar</button>
          <button type="submit" className={styles.create_button}>Salvar</button>
        </div>
      </form>
    </div>
  )
}
