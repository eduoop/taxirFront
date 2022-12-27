import React from 'react'
import { TbPlus } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css'

type Props = {
    to: string;
    text: string;
}

export const ButtonAddNewTravel = ({ text, to }: Props) => {

    const navigate = useNavigate()

  return (
    <button onClick={() => {navigate(`/${to}`)}} className={styles.btn_add}>{text} <TbPlus/></button>
  )
}
