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
            <Link to="/travels"><li><TbLayoutList/></li></Link>
            <Link to="/login">  <li><RiSuitcase2Line/></li></Link>
            <Link to="/create-account/:key"> <li><MdPersonOutline/></li></Link>
        </ul>
    </div>
  )
}
