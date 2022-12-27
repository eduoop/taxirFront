import React, { useContext } from 'react'
import styles from './styles.module.css'
import { AuthContext } from '../../context/auth/AuthContext';
import { Travel } from '../../models/travel.model'
import { BsArrowDown, BsArrowDownShort } from 'react-icons/bs';
import { TbSteeringWheel } from 'react-icons/tb';
import { AiOutlineSchedule } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import { api } from '../../Config/api';
import { toast } from 'react-hot-toast';



type Props = {
  travel: Travel
  setTravels: React.Dispatch<React.SetStateAction<Travel[] | undefined>>;
  travels: Travel[];
  ocultPartcip: boolean;
}


export const TravelCard = ({ travel, setTravels, travels, ocultPartcip = false }: Props) => {

  const auth = useContext(AuthContext);
  const token = localStorage.getItem("authToken")

  const filterDay = (dayFull: string) => {
    const fulldate = dayFull.split("T")[0]

    const finaldate = `${fulldate.split("-")[2]}/${fulldate.split("-")[1]}/${fulldate.split("-")[0]}`

    return finaldate
  }

  const filterHour = (dayFull: string) => {
    const fulldate = dayFull.split("T")[1]

    const finalHour = `${fulldate.split(":")[0]}:${fulldate.split(":")[1]}`

    return finalHour
  }

  const enterTravel = () => {
    if (auth.user) {
      api.post('/travels/enter', {
        travelId: travel.id,
        userId: auth.user.id,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(() => {
          setTravels(travels.filter(travels => travels.id !== travel.id))
          toast.success("Sucesso! Confira detalhadamente em: 'Minhas viagens'")
        })
    }
  }

  return (
    <div className={styles.travel_card}>
      <div className={styles.route}>
        <h2>{travel.from}</h2>
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <BsArrowDownShort fontSize={35} />
        </div>
        <h2>{travel.to}</h2>
        <div className={styles.infos}>
          <div className={styles.info_item}>
            <TbSteeringWheel />
            <h2>{travel.user.name}</h2>
          </div>
          <div className={styles.info_item}>
            <AiOutlineSchedule />
            <h2>{filterDay(travel.start)} ás {filterHour(travel.start)}</h2>
          </div>
          <div className={styles.info_item}>
            <BiUser />
            <h2>{travel.occupiedplaces}</h2>
          </div>
        </div>
        {ocultPartcip === false &&
          <button className={styles.participe} onClick={enterTravel}>Participar</button>
        }
      </div>
    </div>
  )
}
