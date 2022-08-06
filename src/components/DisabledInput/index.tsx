import React from 'react'
import styles from './styles.module.css' 

type Props = {
    value: string
}

export const DisabledInput = ({ value }: Props) => {
  return (
    <input className={styles.input} disabled value={value}/>
  )
}
