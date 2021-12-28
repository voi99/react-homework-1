import React, { Component } from 'react'
import styles from './Header.module.css'

class Header extends Component {
   headerContent = () => {
      if (this.props.moves <= 0) {
         return <h2 className={styles.lost}>You Lost!</h2>
      } else if (this.props.score === 6) {
         return <h2 className={styles.won}>You Win!</h2>
      } else {
         return <h2>React Memory Game</h2>
      }
   }

   render() {
      return (
         <header className={styles.header}>
            <div className={styles.moves}>
               <span>Moves</span>
               <h1>{this.props.moves}</h1>
            </div>
            <div className={styles.title}>{this.headerContent()}</div>
            <div className={styles.score}>
               <span>Score</span>
               <h1>{this.props.score}</h1>
            </div>
         </header>
      )
   }
}

export default Header
