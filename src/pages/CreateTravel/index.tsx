import React, { useEffect, useState } from 'react'
import { BsArrowRightShort } from 'react-icons/bs'
import { api } from '../../Config/api'
import { City } from '../../models/City'
import { UF } from '../../models/UF'
import styles from './styles.module.css'

export const CreateTravel = () => {

  const [ufs, setUfs] = useState<UF[]>([])
  const [currentUfFrom, setCurrentUfFrom] = useState('')
  const [currentUfTo, setCurrentUfTo] = useState('')
  const [citys, setCitys] = useState<City[]>([])

  const [empityPlaces, setEmpityPlaces] = useState<number>()
  const [occupiedPlaces, setOccupiedPlaces] = useState<number>()

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

  const addOne = (setState: React.Dispatch<React.SetStateAction<number | undefined>>, state: number | undefined) => {
    if (state) {
      setState(state + 1)
    } else {
      setState(1)
    }
  }

  const removeOne = (setState: React.Dispatch<React.SetStateAction<number | undefined>>, state: number | undefined) => {
    if (state) {
      setState(state - 1)
    } else {
      setState(0)
    }
  }

  return (
    <div className={styles.create_travel_container}>
      <div className={styles.header}>
        <h1>Criar nova viagem</h1>
      </div>
      <form>
        <div className={styles.two_items_division}>
          <div className={styles.state_end_city}>
            <select onChange={(e) => { handleUfChangeFrom(e) }} name="uf" id="ufs">
              {ufs && ufs.map((uf) => (
                <option key={uf.id} value={uf.id}>{uf.sigla}</option>
              ))}
            </select>
            <input className={styles.text_input} type="text" id='city' placeholder='De (Cidade)' />
          </div>
          <BsArrowRightShort fontSize={40} />
          <div className={styles.state_end_city}>
            <select onChange={(e) => { handleUfChangeTo(e) }} name="uf" id="ufs">
              {ufs && ufs.map((uf) => (
                <option key={uf.id} value={uf.id}>{uf.sigla}</option>
              ))}
            </select>
            <input className={styles.text_input} type="text" id='city' placeholder='Para (Cidade)' />
          </div>
        </div>
        <div className={styles.set_places_name}>
          <h2>Lugares totais do veículo:</h2>
          <div className={styles.set_places}>
            <input value={empityPlaces} onChange={(e) => setEmpityPlaces(Number(e.target.value))} type="number" className={styles.text_input} placeholder='Ex: 5' />
            <div className={styles.buttons_set}>
              <button type='button' onClick={() => addOne(setEmpityPlaces, empityPlaces)}>+</button>
              <button type='button' onClick={() => removeOne(setEmpityPlaces, empityPlaces)}>-</button>
            </div>
          </div>
        </div>
        <div className={styles.set_places_name}>
        <h2>Lugares disponíveis no veículo:</h2>
          <div className={styles.set_places}>
            <input type="number" className={styles.text_input} value={occupiedPlaces} onChange={(e) => setOccupiedPlaces(Number(e.target.value))} placeholder='Ex: 3' />
            <div className={styles.buttons_set}>
              <button type='button' onClick={() => addOne(setOccupiedPlaces, occupiedPlaces)}>+</button>
              <button type='button' onClick={() => removeOne(setOccupiedPlaces, occupiedPlaces)}>-</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
