import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { BsArrowRightShort } from 'react-icons/bs'
import { api } from '../../Config/api'
import { City } from '../../models/City'
import { UF } from '../../models/UF'
import styles from './styles.module.css'
import DatePicker, { DateObject } from "react-multi-date-picker"
import { Calendar } from "react-multi-date-picker"
import { TextField } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { Travel } from '../../models/travel.model'
import { User } from '../../models/user.model'
import { IoChatboxOutline, IoClose } from "react-icons/io5"
import getFirstEndSecondName from '../../Utils/getFirstEndSecondName'
import { ChatUserContext } from '../../context/userChat/UserChatContext'

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]
const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
const date = new DateObject()

export const EditTravel = () => {

  const { id } = useParams()
  const userChat = useContext(ChatUserContext);

  const navigate = useNavigate()
  const token = localStorage.getItem("authToken")
  const nowHour = `${date.hour}:${date.minute}`

  const [ufsFrom, setUfsFrom] = useState<UF[]>([])
  const [ufsTo, setUfsTo] = useState<UF[]>([])
  const [currentUfFrom, setCurrentUfFrom] = useState('')
  const [currentUfTo, setCurrentUfTo] = useState('')
  const [currentUfFromDefault, setCurrentUfFromDefault] = useState('')
  const [currentUfToDefault, setCurrentUfToDefault] = useState('')
  const [fromCity, setFromCity] = useState('')
  const [toCity, setToCity] = useState('')
  const [citys, setCitys] = useState<City[]>([])
  const [currentTravelEdit, setCurrentTravelEdit] = useState<Travel>()

  const [ablePlaces, setAblePlaces] = useState('')
  const [day, setDay] = useState<DateObject | DateObject[] | null>(null)
  const [defaultDay, setDefaultDay] = useState<string>()
  const [time, setTime] = useState('18:00');
  const [travelUsers, setTravelUsers] = useState<User[]>([])
  const [travelUsersToDelete, setTravelUsersToDelte] = useState<User[]>([])
  const [count, setCount] = useState(0)

  const [nav, setNav] = useState('travel')

  const handleUfChangeFrom = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const uf = e.target.value;
    setCurrentUfFrom(uf)
  }

  const handleUfChangeTo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const uf = e.target.value;
    setCurrentUfTo(uf)
  }

  // get states

  useEffect(() => {
    api.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then((res) => {
        setUfsFrom(res.data)
        setUfsTo(res.data)
      })
  }, [id])

  const getMunicipios = () => {
    api.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${currentUfFrom}/municipios`)
      .then((res) => {
        setCitys(res.data)
      })
  }

  useEffect(() => getMunicipios(), [currentUfFrom])

  const addOne = (setState: React.Dispatch<React.SetStateAction<string>>
    , state: string) => {
    if (state) {
      setState(`${Number(state) + 1}`)
    } else {
      setState('1')
    }
  }

  const removeOne = (setState: React.Dispatch<React.SetStateAction<string>>
    , state: string) => {
    if (state) {
      setState(`${Number(state) - 1}`)
    } else {
      setState('0')
    }
  }

  const formatObjectDay = (date: string | undefined) => {
    if (date) {
      const newDate = date.replaceAll('/', '-')
      return newDate
    }
  }

  const removePassenger = (passenger: User) => {
    if (count === 0) {
      toast.success("Essa operação ainda pode ser cancelada :)")
      const valueToCount = count + 1
      setCount(valueToCount)
    }
    setTravelUsers(travelUsers.filter(user => user.id !== passenger.id))
    setTravelUsersToDelte((oldUsers) => [...oldUsers, passenger])
  }

  const removePassengerToDb = () => {
    if (travelUsersToDelete) {
      travelUsersToDelete.map((user) => {
        api.delete(`/travels/enter/${currentTravelEdit?.id}`, {
          data: {
            userId: user.id
          },
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
      })
    }
  }

  const createTravel = (e: FormEvent) => {
    e.preventDefault();

    // if (!currentUfFrom || currentUfFrom === 'none') {
    //   toast.error('Escolha o estado da cidade de saída (NA)')
    //   return false
    // }

    // if (!currentUfTo || currentUfTo === 'none') {
    //   toast.error('Escolha o estado da cidade de ída')
    //   return false
    // }

    if (!fromCity) {
      toast.error('Escolha a cidade da cidade de saída (NA)')
      return false
    }

    if (!toCity) {
      toast.error('Escolha a cidade da cidade de ída')
      return false
    }

    if (!ablePlaces || Number(ablePlaces) <= 0) {
      toast.error('A viagem precida de ao menos uma vaga')
      return false
    }

    // currentUfFrom && currentUfFrom !== 'none' && currentUfTo || currentUfTo === 'none' &&

    if (fromCity.trim() && toCity.trim() && ablePlaces && Number(ablePlaces) > 0) {
      api.put(`/travels/${currentTravelEdit?.id}`, {
        from: fromCity,
        fromState: currentUfFrom ? currentUfFrom : currentUfFromDefault,
        to: toCity,
        toState: currentUfTo ? currentUfTo : currentUfToDefault,
        ablePlaces: ablePlaces,
        start: day ? `${formatObjectDay(day?.toString())}T${time}` : `${formatObjectDay(defaultDay?.toString())}T${time}`
      }, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
        .then(async () => {
          toast.success('Viagem atualizada com sucesso')
          removePassengerToDb()
          navigate('/my-travels-driver')
        })
        .catch((err) => {
          if (err.response.data.message === "A data de criação não pode ser menor a data de hoje") {
            toast.error('A data e hora de criação não podem ser menor a data de hoje')
          }
        })
    }
  }

  // specify in edit travel

  useEffect(() => {
    api.get(`/travels/enter-driver-view-travel/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setCurrentTravelEdit(res.data)
      setTravelUsers(res.data.users.filter((user: { id: string | undefined }, index: number) => index !== 0))
    })
  }, [id])

  const findStateInIbgeStatesFrom = (state: string) => {
    if (ufsFrom) {
      setCurrentUfFromDefault(state)
      setUfsFrom(ufsFrom.filter(ufFulls => ufFulls.sigla !== state))
    }
  }

  const findStateInIbgeStatesTo = (state: string) => {
    if (ufsTo) {
      setCurrentUfToDefault(state)
      setUfsTo(ufsTo.filter(ufFulls => ufFulls.sigla !== state))
    }
  }

  const getHour = (fullTimeDay: string) => {
    const justHour = fullTimeDay.split('T')[1]
    const finalHour = `${justHour.split(':')[0]}:${justHour.split(':')[1]}`
    setTime(finalHour)
  }

  const getDate = (fullTimeDay: string) => {
    const justHour = fullTimeDay.split('T')[0]
    const finalDay = `${justHour.split('-')[0]}/${justHour.split('-')[1]}/${justHour.split('-')[2]}`

    setDefaultDay(finalDay)
  }

  useEffect(() => {
    if (currentTravelEdit) {
      setFromCity(currentTravelEdit.from)
      setToCity(currentTravelEdit.to)
      findStateInIbgeStatesFrom(currentTravelEdit.from_state)
      findStateInIbgeStatesTo(currentTravelEdit.to_state)
      setAblePlaces(currentTravelEdit.able_places)
      getHour(currentTravelEdit.start)
      getDate(currentTravelEdit.start)
    }
  }, [currentTravelEdit])

  const setUserChat = async (user: User) => {
    await userChat.setCurrentUser(user)
    navigate("/messages")
  }

  return (
    <div className={styles.create_travel_container}>
      <div className={styles.header}>
        <h1>Editar viagem</h1>
      </div>

      <div className={styles.nav_end_content}>
        <nav>
          <h2 onClick={() => setNav('travel')} className={nav === "travel" ? `${styles.active_nav}` : `${styles.inactive_nav}`}>Viagem</h2>
          <h2 onClick={() => setNav('passengers')} className={nav === "passengers" ? `${styles.active_nav}` : `${styles.inactive_nav}`}>Passageiros</h2>
        </nav>
        {nav === 'travel' ?
          <form onSubmit={(e) => createTravel(e)}>
            <div className={styles.two_items_division}>
              <div className={styles.state_end_city}>
                <select onChange={(e) => { handleUfChangeFrom(e) }} name="uf" id="ufs">
                  <option value={currentUfFromDefault}>{currentUfFromDefault}</option>
                  {ufsFrom && ufsFrom.map((uf) => (
                    <option key={uf.id} value={uf.sigla}>{uf.sigla}</option>
                  ))}
                </select>
                <input value={fromCity} onChange={(e) => setFromCity(e.target.value)} className={styles.text_input} type="text" id='city' placeholder='De (Cidade)' />
              </div>
              <BsArrowRightShort fontSize={40} />
              <div className={styles.state_end_city}>
                <select onChange={(e) => { handleUfChangeTo(e) }} name="uf" id="ufs">
                  <option value={currentUfToDefault}>{currentUfToDefault}</option>

                  {ufsTo && ufsTo.map((uf) => (
                    <option key={uf.id} value={uf.sigla}>{uf.sigla}</option>
                  ))}
                </select>
                <input value={toCity} onChange={(e) => setToCity(e.target.value)} className={styles.text_input} type="text" id='city' placeholder='Para (Cidade)' />
              </div>
            </div>
            <div className={styles.places_end_calendar}>
              <div className={styles.places}>
                <div className={styles.set_places_name}>
                  <h2>Vagas disponíves no veículo:</h2>
                  <div className={styles.set_places}>
                    <input value={ablePlaces} onChange={(e) => setAblePlaces(e.target.value)} type="number" className={styles.text_input} placeholder='Ex: 5' />
                    <div className={styles.buttons_set}>
                      <button type='button' onClick={() => removeOne(setAblePlaces, ablePlaces)}>-</button>
                      <button type='button' onClick={() => addOne(setAblePlaces, ablePlaces)}>+</button>
                    </div>
                  </div>
                </div>

                <div className={styles.add_time}>
                  <h2>Escolha a hora de início:</h2>
                  <TextField
                    id="time"
                    value={time}
                    type="time"
                    onChange={(time) => setTime(time.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    sx={{
                      width: 250,
                      borderColor: `#000`,
                      borderWidth: 2,
                      borderRadius: '6px',
                      padding: 0,
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: `#000`,
                        borderRadius: '6px',
                        padding: 0,
                        borderWidth: 2,
                      },
                      ".MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #000",
                        borderRadius: '6px',
                        padding: 0,
                        borderWidth: 2,
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #000",
                        borderRadius: '6px',
                        padding: 0,
                        borderWidth: 2,
                      },
                    }}
                  />
                </div>
              </div>
              <div className={styles.calendar}>
                <h2>Selecione o dia da corrida:</h2>
                <Calendar
                  value={day !== null ? day : defaultDay}
                  onChange={(day) => {
                    setDay(day)
                  }}
                  minDate={new Date()}
                  showOtherDays={true}
                  disableYearPicker={true}
                  disableMonthPicker={true}
                  shadow={false}
                  months={months}
                  fullYear={false}
                  weekDays={weekDays}
                />
              </div>
            </div>
            <div className={styles.save_travel}>
              <button className={styles.cancel_button} onClick={() => navigate('/my-travels-driver')}>Cancelar</button>
              <button type='submit' className={styles.create_button}>Salvar</button>
            </div>
          </form>
          :
          <div className={styles.list_users_container}>
            <div className={styles.alert_to_driver}>
              <h1>Seus passageiros:</h1>
              <p>Não se esqueça de entrar em contato com seus passageiros para combinar o local de busca e despacho.</p>
            </div>

            <div className={styles.list_users}>
              {travelUsers.map((user) => (
                <div className={styles.user_card}>
                  <div className={styles.border_color}></div>
                  <h1 style={{ width: "35%" }}>{getFirstEndSecondName(user.name)}</h1>
                  <h2 style={{ width: "30%" }}>{user.email}</h2>
                  <h2 style={{ width: "20%" }}>{user.phone}</h2>
                  <div className={styles.actions}>
                    <button onClick={() => removePassenger(user)} className={styles.delete_passenger}><IoClose fontSize={25} /></button>
                    <button onClick={() => setUserChat(user)} className={styles.chat_passenger}><IoChatboxOutline fontSize={20}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
      </div>

    </div>
  )
}
