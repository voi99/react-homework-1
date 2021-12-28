import React, { Component, Fragment } from 'react'
import styles from './Board.module.css'
import Card from './Card'

class Board extends Component {
   state = {
      cards: [],
      firstCard: null,
      secondCard: null,
      isSelected: false,
   }

   shuffle = () => {
      this.props.reset()
      setTimeout(() => {
         const suffledCards = [...this.props.images, ...this.props.images]
            .sort(() => Math.random() - 0.5)
            .map((card, index) => ({ ...card, id: ++index }))
         this.setState({ cards: suffledCards })
         this.resetTurn()
      }, 100)
   }

   componentDidMount() {
      this.shuffle()
   }

   handleClick = (card) => {
      if (!this.state.isSelected) {
         this.state.firstCard
            ? this.setState({ secondCard: card })
            : this.setState({ firstCard: card })
      }
   }

   resetTurn = () => {
      if (this.props.score < 6 && this.props.moves > 0) {
         this.setState({ firstCard: null, secondCard: null, isSelected: false })
      }
   }

   componentDidUpdate(prevProps, prevState) {
      if (
         prevState.firstCard !== this.state.firstCard ||
         prevState.secondCard !== this.state.secondCard
      ) {
         if (this.state.firstCard && this.state.secondCard) {
            this.setState({ isSelected: true })
            if (this.state.firstCard.src === this.state.secondCard.src) {
               const updatedCards = prevState.cards.map((card) => {
                  if (card.src === this.state.firstCard.src) {
                     return { ...card, matched: true }
                  } else {
                     return card
                  }
               })

               this.setState({ cards: updatedCards })
               this.props.increaseScore()
               this.resetTurn()
            } else {
               this.props.decreaseMoves()
               setTimeout(() => {
                  this.resetTurn()
               }, 800)
            }
         }
      }
   }

   render() {
      return (
         <Fragment>
            <div className={styles.board}>
               {this.state.cards.map((card) => {
                  return (
                     <Card
                        key={card.id}
                        data={card}
                        handleClick={this.handleClick}
                        show={
                           card === this.state.firstCard ||
                           card === this.state.secondCard ||
                           card.matched
                        }
                        disabled={this.state.isSelected}
                     />
                  )
               })}
            </div>
            <button onClick={this.shuffle} className={styles['reset-btn']}>
               Reset Game
            </button>
         </Fragment>
      )
   }
}

export default Board
