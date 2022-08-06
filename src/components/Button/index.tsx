import React from "react";
import styles from "./styles.module.css";

type Props = {
    text: string
}

export const Button = ({ text }: Props) => {
  return (
    <button className={styles.button_comp}>
      {text}
    </button>
  );
};
