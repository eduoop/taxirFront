import React, { useEffect, useState, useContext } from 'react'
import { toast } from 'react-hot-toast'
import { Search } from '../../components/Search'
import { TravelCard } from '../../components/TravelCard'
import { api } from '../../Config/api'
import { AuthContext } from '../../context/auth/AuthContext'
import { Travel } from '../../models/travel.model'
import styles from './styles.module.css'

export const MyTravels = () => {

    const [travels, setTravels] = useState<Travel[]>()
    const [search, setSearch] = useState('')
    const token = localStorage.getItem("authToken")
    const auth = useContext(AuthContext);

    // Driver routes

    const findTravelsDriverSearch = () => {
        if (search.trim() && auth.user) {
            api.get(`/travels/enter/${auth.user.id}?search=${search}`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    setTravels(res.data)
                })
        }
    }

    const findTravelsFix = () => {
        api.get(`/travels/enter/${auth.user?.id}`, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                setTravels(res.data)
            })
    }

    useEffect(() => {
        if (!search.trim()) {
            findTravelsFix()
        }
    }, [search])

    useEffect(() => {
        findTravelsFix()
        auth.setNav("myTravels")
    }, [])

    const closeTravel = (id: string) => {
        api.delete(`/travels/enter/${id}`, {
            data: {
                userId: auth.user?.id
            },
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        })
            .then(() => {
                setTravels(travels?.filter(travel => travel.id !== id))
                toast.success("Você deixou a viagem!")
            })
    }

    return (
        <div className={styles.container}>
            <main>
                <Search search={search} setSearch={setSearch} getData={findTravelsDriverSearch} placeholder='Pesquisar minhas viagens' />
                <div className={styles.travel_container}>
                    {travels?.map((travel) => (
                        <TravelCard hasFunction={closeTravel} travel={travel} setTravels={setTravels} travels={travels} ocultPartcip={true} edit={false} showCloseTravel={true} showDeleteTravel={false} showContactDriver={true}/>
                    ))}
                </div>
            </main>
        </div>
    )
}
