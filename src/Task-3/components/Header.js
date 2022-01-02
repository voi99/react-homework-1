import React, { Component } from 'react'
import Addbutton from './AddButton'
import logo from '../assets/logo.webp'
import styles from './Header.module.css'
import { Link } from 'react-router-dom'

class Header extends Component {
   render() {
      return (
         <header className={styles.header}>
            <Link to='/task-3' className={styles.home}>
               <div className={styles.logo}>
                  <img src={logo} alt='Dev Lab'></img>
               </div>
            </Link>
            <Addbutton />
         </header>
      )
   }
}

export default Header
