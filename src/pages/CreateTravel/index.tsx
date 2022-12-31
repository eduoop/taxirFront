import React, { FormEvent, useEffect, useState } from 'react'
import { BsArrowRightShort } from 'react-icons/bs'
import { api } from '../../Config/api'
import { City } from '../../models/City'
import { UF } from '../../models/UF'
import styles from './styles.module.css'
import DatePicker, { DateObject } from "react-multi-date-picker"
import { Calendar } from "react-multi-date-picker"
import { TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]
const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
const date = new DateObject()

export const CreateTravel = () => {

  const nowHour = `${date.hour}:${date.minute > 9 ? date.minute : `0${date.minute}`}`

  const navigate = useNavigate()
  const token = localStorage.getItem("authToken")

  const [ufs, setUfs] = useState<UF[]>([])
  const [currentUfFrom, setCurrentUfFrom] = useState('')
  const [currentUfTo, setCurrentUfTo] = useState('')
  const [fromCity, setFromCity] = useState('')
  const [toCity, setToCity] = useState('')
  const [citys, setCitys] = useState<City[]>([])

  const [ablePlaces, setAblePlaces] = useState('')
  const [day, setDay] = useState<DateObject | DateObject[] | null>(date)
  const [time, setTime] = useState(nowHour);

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
        setUfs(res.data)
      })
  }, [])

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

  const createTravel = (e: FormEvent) => {
    e.preventDefault();

    if (!currentUfFrom || currentUfFrom === 'none') {
      toast.error('Escolha o estado da cidade de saída (NA)')
      return false
    }

    if (!currentUfTo || currentUfTo === 'none') {
      toast.error('Escolha o estado da cidade de ída')
      return false
    }

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

    if(time <= nowHour && day && day.toString() === date.toString()) {
      toast.error('A hora precisa ser superior á hora atual.')
      return false
    }

    if (currentUfFrom && currentUfFrom !== 'none' && currentUfTo || currentUfTo === 'none' && fromCity.trim() && toCity.trim() && (day && day.toString() !== date.toString() ? true : time > nowHour) && ablePlaces && Number(ablePlaces) > 0) {
      api.post("/travels", {
        from: fromCity,
        fromState: currentUfFrom,
        to: toCity,
        toState: currentUfTo,
        ablePlaces: ablePlaces,
        start: `${formatObjectDay(day?.toString())}T${time}`
      }, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success('Viagem criada com sucesso')
        navigate('/my-travels-driver')
      })
    }

  }

  return (
    <div className={styles.create_travel_container}>
      <div className={styles.header}>
        <h1>Criar nova viagem</h1>
      </div>
      <form onSubmit={(e) => createTravel(e)}>
        <div className={styles.two_items_division}>
          <div className={styles.state_end_city}>
            <select onChange={(e) => { handleUfChangeFrom(e) }} name="uf" id="ufs">
              <option value={'none'}>NA</option>
              {ufs && ufs.map((uf) => (
                <option key={uf.id} value={uf.sigla}>{uf.sigla}</option>
              ))}
            </select>
            <input value={fromCity} onChange={(e) => setFromCity(e.target.value)} className={styles.text_input} type="text" id='city' placeholder='De (Cidade)' />
          </div>
          <BsArrowRightShort fontSize={40} />
          <div className={styles.state_end_city}>
            <select onChange={(e) => { handleUfChangeTo(e) }} name="uf" id="ufs">
              <option value={'none'}>NA</option>

              {ufs && ufs.map((uf) => (
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
              value={day}
              onChange={setDay}
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
          <button className={styles.create_button}>Criar</button>
        </div>
      </form>
    </div>
  )
}
