import React, { Component } from 'react'
import styles from './Button.module.css'

class Button extends Component {
   render() {
      return (
         <button onClick={this.props.resetGame} className={styles['reset-btn']}>
            {this.props.children}
         </button>
      )
   }
}

export default Button
