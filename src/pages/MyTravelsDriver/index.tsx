import React, { useEffect, useState, useContext } from 'react'
import { ButtonAddNewTravel } from '../../components/ButtonAddNewTravel'
import { Search } from '../../components/Search'
import { TravelCard } from '../../components/TravelCard'
import { api } from '../../Config/api'
import { AuthContext } from '../../context/auth/AuthContext'
import { Travel } from '../../models/travel.model'
import styles from './styles.module.css'

export const MyTravelsDriver = () => {

    const [travels, setTravels] = useState<Travel[]>()
    const [search, setSearch] = useState('')
    const token = localStorage.getItem("authToken")
    const auth = useContext(AuthContext);

    // Driver routes

    const findTravelsDriverSearch = () => {
        if (search.trim() && auth.user) {
            api.get(`/travels/enter-driver/${auth.user?.id}?search=${search.toLowerCase()}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => {
                    setTravels(res.data)
                    console.log(res.data)
                })
        }
    }

    const findTravelsDriverFix = () => {
        api.get(`/travels/enter-driver/${auth.user?.id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setTravels(res.data)
            })
    }

    useEffect(() => {
        if (!search.trim()) {
            findTravelsDriverFix()
        }
    }, [search])

    useEffect(() => {
        findTravelsDriverFix()
    }, [])

    return (
        <div className={styles.container}>
            <main>
                <Search search={search} setSearch={setSearch} getData={findTravelsDriverSearch} placeholder='Pesquisar minhas viagens'/>

                <div className={styles.add_new_travel}>
                <ButtonAddNewTravel text='Adicionar' to='create-new-travel'/>
                </div>

                <div className={styles.travel_container}>
                    {travels?.map((travel) => (
                        <TravelCard travel={travel} setTravels={setTravels} travels={travels} ocultPartcip={true} />
                    ))}
                </div>
            </main>
        </div>
    )
}
