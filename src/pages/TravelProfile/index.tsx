import React from 'react'
import { useParams } from 'react-router-dom'
import styles from './styles.module.css'

export const TravelProfile = () => {

    const { id } = useParams()

  return (
    <div>{id}</div>
  )
}
