import React from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import styles from './Header.module.css'

const Header = () => {
   const { pathname } = useLocation()
   let title = pathname.slice(1).split('/')[0] || pathname.slice(1)
   if (title) {
      title = title[0].toUpperCase() + title.slice(1)
   }

   return (
      <header className={styles.header}>
         <h2>
            <NavLink to='/' style={{ textDecoration: 'none' }}>
               Homework 1
            </NavLink>
            {title && `| ${title}`}
         </h2>
      </header>
   )
}

export default Header
