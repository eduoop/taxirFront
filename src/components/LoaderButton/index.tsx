import React from 'react'
import whiteLoader from "../../assets/whiteLoader.svg";
import styles from './styles.module.css'

export const LoaderButton = () => {
  return (
    <button disabled className={styles.button_disabled}>
    <img src={whiteLoader} />
  </button>
  )
}
