import React, { useContext } from 'react'
import styles from './styles.module.css'
import { AuthContext } from '../../context/auth/AuthContext';
import { Travel } from '../../models/travel.model'
import { BsArrowDown, BsArrowDownShort } from 'react-icons/bs';
import { TbLockOpen, TbSteeringWheel, TbTicket } from 'react-icons/tb';
import { AiOutlineSchedule } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import { api } from '../../Config/api';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



type Props = {
  travel: Travel
  setTravels: React.Dispatch<React.SetStateAction<Travel[] | undefined>>;
  travels: Travel[];
  ocultPartcip: boolean;
  edit: boolean;
  showCloseTravel: boolean;
  showDeleteTravel: boolean;
  hasFunction?: (id: string) => void;
}


export const TravelCard = ({ travel, setTravels, travels, ocultPartcip = false, edit, showCloseTravel, hasFunction, showDeleteTravel }: Props) => {

  const has = () => {
    if(hasFunction) {
      hasFunction(travel.id)
    }
  }

  const auth = useContext(AuthContext);
  const token = localStorage.getItem("authToken")
  const navigate = useNavigate()

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
        <h2 onClick={() => navigate(`/travel-profile/${travel.id}`)}>{travel.from} ({travel.from_state})</h2>
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }} onClick={() => navigate(`/travel-profile/${travel.id}`)}>
          <BsArrowDownShort fontSize={35} />
        </div>
        <h2 onClick={() => navigate(`/travel-profile/${travel.id}`)}>{travel.to} ({travel.to_state})</h2>
        <div className={styles.infos} onClick={() => navigate(`/travel-profile/${travel.id}`)}>
          <div className={styles.info_item}>
            <TbSteeringWheel />
            <h2>{travel.user.name}</h2>
          </div>
          <div className={styles.info_item}>
            <AiOutlineSchedule />
            <h2>{filterDay(travel.start)} ás {filterHour(travel.start)}</h2>
          </div>
          <div className={styles.info_item}>
            <TbTicket />
            <h2>{travel.able_places}</h2>
          </div>
        </div>
        {ocultPartcip === false &&
          <button className={styles.participe} onClick={enterTravel}>Participar</button>
        }
        {edit === true &&
          <button className={styles.participe} onClick={() => navigate(`/edit-travel/${travel.id}`)}>Editar</button>
        }
        {showCloseTravel === true &&
          <button className={styles.delete_or_close_travel} onClick={() => has()}>Sair</button>
        }
        {showDeleteTravel === true &&
          <button className={styles.delete_or_close_travel} onClick={() => has()}>Deletar</button>
        }
      </div>
    </div>
  )
}
