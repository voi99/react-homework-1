import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Main.module.css'

const Main = () => {
   return (
      <main className={styles.main}>
         <ul className={styles['task-list']}>
            <li className={styles['task-list-task']}>
               <NavLink to='/task-1' style={{ textDecoration: 'none' }}>
                  Task-1
               </NavLink>
            </li>
            <li className={styles['task-list-task']}>
               <NavLink to='/task-2' style={{ textDecoration: 'none' }}>
                  Task-2
               </NavLink>
            </li>
            <li className={styles['task-list-task']}>
               <NavLink to='/task-3' style={{ textDecoration: 'none' }}>
                  Task-3
               </NavLink>
            </li>
         </ul>
      </main>
   )
}

export default Main
