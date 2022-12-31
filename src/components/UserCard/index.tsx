import React, { useContext } from 'react'
import { BiUser } from 'react-icons/bi'
import { User } from '../../models/user.model'
import styles from './styles.module.css'

type Props = {
    user: User
}

export const UserCard = ({ user }: Props) => {

    const filterName = (name: string) => {
        if(name.split(' ').length > 2) {
            return `${name.split(' ')[0]} ${name.split(' ')[1]}`
        } else {
            return name
        }
    }

    const openWpp = () => {
        const formateNumber = user.phone.replaceAll(' ', '').replaceAll('(', '').replaceAll(')', '').replaceAll('-', '')
        window.open(
          `https://wa.me/${formateNumber}`,
          '_blank'
        )
        console.log(formateNumber)
      }

    return (
        <div className={styles.user_card}>
            <BiUser fontSize={20}/>
            <h2>{filterName(user.name)}</h2>
        </div>
    )
}
