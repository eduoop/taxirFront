import React, { useEffect, useState } from 'react'
import { api } from '../../Config/api'
import styles from './styles.module.css'
import { TravelCard } from '../../components/TravelCard'
import { Search } from '../../components/Search'
import { Travel } from '../../models/travel.model'
import { UF } from '../../models/UF'
import { City } from '../../models/City'

type Props = {
    currentNav: string;
    setCurrentNav: React.Dispatch<React.SetStateAction<string>>;
}

export const Travels = ({ currentNav, setCurrentNav }: Props) => {
    const token = localStorage.getItem("authToken")
    const [travels, setTravels] = useState<Travel[]>()
    const [search, setSearch] = useState('')
    const [ufs, setUfs] = useState<UF[]>([])
    const [currentUf, setCurrentUf] = useState('')
    

    const findTravels = () => {
        if (search.trim()) {
            api.get(`/travels?search=${search}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => {
                    setTravels(res.data)
                })
        }
    }

    useEffect(() => {
        api.get(`/travels`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => { setTravels(res.data) })
    }, [])

    useEffect(() => {
        if (currentNav !== 'travels') {
            setCurrentNav('travels')
        }
    }, [])

    useEffect(() => {
        if (!search.trim()) {
            api.get('/travels', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => { setTravels(res.data) })
        }
    }, [search])

    return (
        <div className={styles.container}>
            <main>
                <Search search={search} setSearch={setSearch} getData={findTravels} placeholder='Pesquisar viagens'/>
                <div className={styles.travel_container}>
                    {travels?.map((travel) => (
                        <TravelCard travel={travel} setTravels={setTravels} travels={travels} ocultPartcip={false} edit={false} showCloseTravel={false} showDeleteTravel={false}/>
                    ))}
                </div>
            </main>
        </div>
    )
}
