import { useContext, useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import styles from './styles.module.css'
import { TbLayoutList } from 'react-icons/tb'
import { RiSuitcase2Line } from 'react-icons/ri'
import { MdPersonOutline } from 'react-icons/md'
import { FiLogOut } from 'react-icons/fi'
import { User } from '../../models/user.model';
import { AuthContext, AuthContextType } from "../../context/auth/AuthContext";

type Props = {
  currentNav: string;
  setCurrentNav: React.Dispatch<React.SetStateAction<string>>;
  auth: AuthContextType;
}

export const Nav = ({ currentNav, setCurrentNav, auth }: Props) => {

  const token = localStorage.getItem(`authToken`)

  return (
    <div className={styles.nav}>
      <ul>
        <Link to="/travels" onClick={() => { setCurrentNav('travels') }}><li><TbLayoutList className={currentNav === 'travels' ? `${styles.active_nav}` : ''} /></li></Link>
        { auth.user?.role === "driver" ?
        <Link to="/my-travels-driver" onClick={() => { setCurrentNav('myTravelsDriver') }}>  <li><RiSuitcase2Line className={currentNav === 'myTravelsDriver' ? `${styles.active_nav}` : ''} /></li></Link>
        
        :
        <Link to="/my-travels" onClick={() => { setCurrentNav('myTravels') }}>  <li><RiSuitcase2Line className={currentNav === 'myTravels' ? `${styles.active_nav}` : ''} /></li></Link>
        }
        <Link to="/create-account/:key" onClick={() => { setCurrentNav('profile') }}> <li><MdPersonOutline className={currentNav === 'profile' ? `${styles.active_nav}` : ''} /></li></Link>
        <Link to={`/`} onClick={() => {
          auth.singout(token)
        }}> <li><FiLogOut className={currentNav === 'logout' ? `${styles.active_nav}` : ''} /></li></Link>
      </ul>
    </div>
  )
}
