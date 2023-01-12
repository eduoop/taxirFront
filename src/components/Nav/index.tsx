import { useContext, useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import styles from './styles.module.css'
import { TbLayoutList } from 'react-icons/tb'
import { RiSuitcase2Line } from 'react-icons/ri'
import { MdPersonOutline } from 'react-icons/md'
import { FiLogOut } from 'react-icons/fi'
import { User } from '../../models/user.model';
import { AuthContext, AuthContextType } from "../../context/auth/AuthContext";
import { IoChatboxOutline } from "react-icons/io5";

type Props = {
  auth: AuthContextType;
}

export const Nav = ({ auth }: Props) => {

  const token = localStorage.getItem(`authToken`)
  const authContext = useContext(AuthContext);

  return (
    <div className={styles.nav}>
      <ul>
        <Link to="/travels" onClick={() => { authContext.setNav('travels') }}><li><TbLayoutList className={authContext.nav === 'travels' ? `${styles.active_nav}` : ''} /></li></Link>
        {auth.user?.role === "driver" ?
          <Link to="/my-travels-driver" onClick={() => { authContext.setNav('myTravelsDriver') }}>  <li><RiSuitcase2Line className={authContext.nav === 'myTravelsDriver' ? `${styles.active_nav}` : ''} /></li></Link>

          :
          <Link to="/my-travels" onClick={() => { authContext.setNav('myTravels') }}>  <li><RiSuitcase2Line className={authContext.nav === 'myTravels' ? `${styles.active_nav}` : ''} /></li></Link>
        }
        <Link to="/edit-my-profile" onClick={() => { authContext.setNav('profile') }}> <li><MdPersonOutline className={authContext.nav === 'profile' ? `${styles.active_nav}` : ''} /></li></Link>
        <Link to={`/messages`} onClick={() => {
          authContext.setNav('messages')
        }}> <li><IoChatboxOutline className={authContext.nav === 'messages' ? `${styles.active_nav}` : ''} /></li></Link>
        <Link to={`/`} onClick={() => {
          auth.singout(token)
        }}> <li><FiLogOut className={authContext.nav === 'logout' ? `${styles.active_nav}` : ''} /></li></Link>
      </ul>
    </div>
  )
}
