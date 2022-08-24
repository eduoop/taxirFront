import React from 'react'
import { Outlet, useNavigate, Link } from "react-router-dom";
import styles from './styles.module.css'
import {TbLayoutList} from 'react-icons/tb'
import {RiSuitcase2Line} from 'react-icons/ri'
import {MdPersonOutline} from 'react-icons/md'

type Props = {
    currentNav: string;
    setCurrentNav: React.Dispatch<React.SetStateAction<string>>;
}


export const Nav = ({ currentNav, setCurrentNav }: Props) => {
  return (
    <div className={styles.nav}>
        <ul>
            <Link to="/travels" onClick={() => {setCurrentNav('travels')}}><li><TbLayoutList className={currentNav === 'travels' ? `${styles.active_nav}` : ''}/></li></Link>
            <Link to="/login" onClick={() => {setCurrentNav('myTravels')}}>  <li><RiSuitcase2Line className={currentNav === 'myTravels' ? `${styles.active_nav}` : ''}/></li></Link>
            <Link to="/create-account/:key" onClick={() => {setCurrentNav('profile')}}> <li><MdPersonOutline className={currentNav === 'profile' ? `${styles.active_nav}` : ''}/></li></Link>
        </ul>
    </div>
  )
}