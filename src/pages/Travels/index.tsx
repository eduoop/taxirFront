import React, { useEffect, useState } from 'react'
import { api } from '../../Config/api'
import styles from './styles.module.css'
import {TravelCard} from '../../components/TravelCard'
import { Travel } from '../../models/travel.model'

type Props = {
    currentNav: string;
    setCurrentNav: React.Dispatch<React.SetStateAction<string>>;
}

export const Travels = ({currentNav, setCurrentNav}: Props) => {
    const token = localStorage.getItem("authToken")
    const [travels, setTravels] = useState<Travel[]>()


    useEffect(() => {
        api.get('/travels', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {setTravels(res.data)})
    }, [])

    useEffect(() => {
        if(currentNav !== 'travels') {
            setCurrentNav('travels')
        }
    }, [])

  return (
    <div className={styles.container}>
        <main>
            <div className={styles.travel_container}>
                { travels?.map((travel) => (
                    <TravelCard travelCreated_at={travel.created_at} travelFrom={travel.from} travelId={travel.id} travelOccupiedplaces={travel.occupiedplaces} travelStart={travel.start} travelTo={travel.to} travelUser_id={travel.user_id}/>
                )) }
            </div>
        </main>
    </div>
  )
}
