import React, { Component } from 'react'
import styles from './Card.module.css'

class Card extends Component {
   handleClick = () => {
      this.props.handleClick(this.props.data)
   }

   render() {
      return (
         <div className={styles.card}>
            <div className={this.props.show ? `${styles.show}` : ''}>
               <img
                  src={this.props.data.src}
                  alt={`img-${this.props.data.id}`}
                  className={styles['card-img']}
               />
               <div
                  className={`${styles['card-back']} ${
                     this.props.disabled ? styles.disabled : ''
                  }`}
                  onClick={this.handleClick}
               ></div>
            </div>
         </div>
      )
   }
}

export default Card
