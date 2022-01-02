import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Main.module.css'

const Main = () => {
   return (
      <main className={styles.main}>
         <ul className={styles['task-list']}>
            <li className={styles['task-list-task']}>
               <Link to='/task-1'>Task-1</Link>
            </li>
            <li className={styles['task-list-task']}>
               <Link to='/task-2'>Task-2</Link>
            </li>
            <li className={styles['task-list-task']}>
               <Link to='/task-3'>Task-3</Link>
            </li>
         </ul>
      </main>
   )
}

export default Main
