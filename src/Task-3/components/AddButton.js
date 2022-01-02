import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from './AddButton.module.css'

class Addbutton extends Component {
   render() {
      return (
         <button className={styles.button}>
            <Link to='add-post' style={{ textDecoration: 'none' }}>
               Add post
            </Link>
         </button>
      )
   }
}

export default Addbutton
