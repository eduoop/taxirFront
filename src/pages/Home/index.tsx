import React from 'react'
import styles from './styles.module.css'
import Car from '../../assets/PngItem_5013424.png'
import { Link, useNavigate } from 'react-router-dom'

export const Home = () => {

  const navigate = useNavigate()

  return (
    <div className={styles.container}>
        <div className={styles.main}>
            <div className={styles.text}>
              <div className={styles.logo_end_text}>
                <h1>TaxIr</h1>
                <h2>Aqui você <br /> <strong>encontra</strong> <br /> sua viagem!</h2>
              </div>
                <button onClick={() => navigate('/login', { state: { createNew: true } })}>Comece já</button>
            </div>
            <div className={styles.image}>
                <img src={Car} alt="car"/>
            </div>
        </div>
    </div>
  )
}
