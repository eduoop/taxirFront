import React, { useEffect } from 'react'
import styles from './styles.module.css' 
import InputMask from 'react-input-mask';

type Props = {
  type: string;
  name: string,
  id: string;
  mask: string;
  value: string;
  isNull: boolean
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const MaskInput = ({ id, name, type, mask, isNull = false, value, setValue }: Props) => {

  useEffect(() => {
    isNull = false
  }, [value])

  return (
    <InputMask className={isNull ? `${styles.input} ${styles.invalid_field}` : `${styles.input}`} mask={mask} type={type} name={name} id={id} defaultValue={value} onChange={(e) => setValue(e.target.value)}/>
  )
}
