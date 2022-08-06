import React, { useEffect } from 'react'
import styles from './styles.module.css' 

type Props = {
  type: string;
  name: string,
  id: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  isNull: boolean;
  setNullCamp: React.Dispatch<React.SetStateAction<boolean>>;
  value: string
}

export const Input = ({ id, type, setValue, isNull = false, value,setNullCamp  }: Props) => {

  useEffect(() => {
    setNullCamp(false)
  }, [value])

  return (
    <input className={isNull ? `${styles.input} ${styles.invalid_field}` : `${styles.input}`} type={type} id={id} onChange={(e) => setValue(e.target.value)}/>
  )
}
