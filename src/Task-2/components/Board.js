import React, { Component, Fragment } from 'react'
import styles from './Board.module.css'
import Card from './Card'

class Board extends Component {
   state = {
      cards: [],
      firstCard: null,
      secondCard: null,
      matched: 0,
   }

   shuffleCards = () => {
      const suffledCards = [...this.props.images, ...this.props.images]
         .sort(() => Math.random() - 0.5)
         .map((card, index) => ({ ...card, id: ++index }))
      this.setState({ cards: suffledCards, firstCard: null, secondCard: null })
      this.props.reset()
   }

   componentDidMount() {
      this.shuffleCards()
   }

   handleClick = (card) => {
      this.state.firstCard
         ? this.setState({ secondCard: card })
         : this.setState({ firstCard: card })
   }

   resetTurn = () => {
      this.setState({ firstCard: null, secondCard: null })
   }

   componentDidUpdate(prevProps, prevState) {
      if (
         prevState.firstCard !== this.state.firstCard ||
         prevState.secondCard !== this.state.secondCard
      ) {
         if (this.state.firstCard && this.state.secondCard) {
            if (this.state.firstCard.src === this.state.secondCard.src) {
               const updatedCards = prevState.cards.map((card) => {
                  if (card.src === this.state.firstCard.src) {
                     return { ...card, matched: true }
                  } else {
                     return card
                  }
               })
               const currMatched = this.state.matched + 1
               this.setState({ cards: updatedCards, matched: currMatched })
               this.props.increaseScore()
               this.resetTurn()
            } else {
               setTimeout(() => {
                  this.props.decreaseMoves()
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
                     />
                  )
               })}
            </div>
            <button onClick={this.shuffleCards} className={styles['reset-btn']}>
               Reset Game
            </button>
         </Fragment>
      )
   }
}

export default Board
