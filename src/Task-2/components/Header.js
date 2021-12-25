import React, { Component } from 'react'
import styles from './Header.module.css'

class Header extends Component {
   render() {
      return (
         <header className={styles.header}>
            <div className={styles.moves}>
               <span>Moves</span>
               <h1>{this.props.moves}</h1>
            </div>
            <div className={styles.title}>
               <h2>
                  {this.props.moves <= 0 ? 'You Lost!' : 'React Memory Game'}
               </h2>
            </div>
            <div className={styles.score}>
               <span>Score</span>
               <h1>{this.props.score}</h1>
            </div>
         </header>
      )
   }
}

export default Header
