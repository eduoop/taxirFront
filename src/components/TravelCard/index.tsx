import React, { useContext } from 'react'
import styles from './styles.module.css'
import { AuthContext } from '../../context/auth/AuthContext';



type Props = {
    travelId: string;
    travelFrom: string;
    travelTo: string;
    travelOccupiedplaces: string;
    travelStart: string;
    travelUser_id: string;
    travelCreated_at: string;
}


export const TravelCard = ({ travelCreated_at, travelFrom, travelId, travelOccupiedplaces, travelStart, travelTo, travelUser_id }: Props) => {
  
  const auth = useContext(AuthContext);
  return (
    <div className={styles.travel_card}>
      <h2>{travelFrom}</h2>
      <h2>{travelTo}</h2>
    </div>
  )
}
