import { useContext, useState, useEffect } from "react";
import { AiOutlineSchedule } from 'react-icons/ai'
import { BsArrowRightShort, BsWhatsapp } from 'react-icons/bs'
import { TbSteeringWheel, TbTicket } from 'react-icons/tb'
import { useParams } from 'react-router-dom'
import { UserCard } from "../../components/UserCard";
import { api } from '../../Config/api'
import { AuthContext } from "../../context/auth/AuthContext";
import { Travel } from '../../models/travel.model'
import { User } from "../../models/user.model";
import styles from './styles.module.css'

export const TravelProfile = () => {

  const { id } = useParams()
  const token = localStorage.getItem("authToken")
  const [travel, setTravel] = useState<Travel>()
  const [travelUsers, setTravelUsers] = useState<User[]>([])

  const auth = useContext(AuthContext);

  useEffect(() => {
    api.get(`/travels/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setTravel(res.data)
        if (auth.user?.id === res.data.user.id) {
          const usersWithoutDriver = res.data.users.filter((user: { id: any; }) => user.id !== res.data.user.id)
          setTravelUsers(usersWithoutDriver)
        } else {
          setTravelUsers(res.data.users)
        }
      })
  }, [id])

  const filterDay = (dayFull: string | undefined) => {
    if (dayFull) {
      const fulldate = dayFull.split("T")[0]

      const finaldate = `${fulldate.split("-")[2]}/${fulldate.split("-")[1]}/${fulldate.split("-")[0]}`

      return finaldate
    }
  }

  const filterHour = (dayFull: string | undefined) => {
    if (dayFull) {
      const fulldate = dayFull.split("T")[1]

      const finalHour = `${fulldate.split(":")[0]}:${fulldate.split(":")[1]}`

      return finalHour
    }
  }

  const openWpp = () => {
    const formateNumber = travel?.user.phone.replaceAll(' ', '').replaceAll('(', '').replaceAll(')', '').replaceAll('-', '')
    window.open(
      `https://wa.me/${formateNumber}`,
      '_blank'
    )
    console.log(formateNumber)
  }

  return (
    <div className={styles.travel_profile_container}>
      <div className={styles.header}>
        <h1>{travel?.to} ({travel?.to_state})</h1>
        <BsArrowRightShort color='white' fontSize={50} />
        <h1>{travel?.from} ({travel?.from_state})</h1>
      </div>

      <main>
        <div className={styles.items_division}>
          <h2> <TbSteeringWheel fontSize={29} /> Motorista: {travel?.user.name}</h2>
          <h2 style={{ cursor: "pointer" }} onClick={openWpp}> <BsWhatsapp /> Whatsapp: {travel?.user.phone}</h2>
          <h2>  <AiOutlineSchedule /> Agendamento: {filterDay(travel?.start)} ás {filterHour(travel?.start)}</h2>
          <h2>  <TbTicket /> Lugares disponíveis: {travel?.able_places}</h2>
          {auth.user?.id === travel?.user.id &&
            <div className={styles.users_list}>
              <h1>Seus passageiros ({travelUsers.length})</h1>
              {auth.user?.id === travel?.user.id &&
                <div className={styles.list_users}>
                  {travelUsers.map((user) => (
                    <UserCard user={user} />
                  ))}
                </div>
              }
            </div>
          }
        </div>
      </main>
    </div>
  )
}
