import React, { Component, Fragment } from 'react'
import Header from './components/Header'
import Board from './components/Board'
import Helmet from 'react-helmet'

const images = [
   { src: '/images/card-1.jpeg', matched: false },
   { src: '/images/card-2.jpeg', matched: false },
   { src: '/images/card-3.jpeg', matched: false },
   { src: '/images/card-4.jpeg', matched: false },
   { src: '/images/card-5.jpeg', matched: false },
   { src: '/images/card-6.jpeg', matched: false },
]

class Secondtask extends Component {
   state = {
      moves: 5,
      score: 0,
   }

   resetHeader = () => {
      this.setState({ moves: 5, score: 0 })
   }

   decreaseMoves = () => {
      const currMoves = this.state.moves - 1
      this.setState({ moves: currMoves })
   }

   increaseScore = () => {
      const currScore = this.state.score + 1
      this.setState({ score: currScore })
   }

   render() {
      return (
         <Fragment>
            <Helmet>
               <title>Task-2</title>
            </Helmet>
            <Header moves={this.state.moves} score={this.state.score} />
            <Board
               score={this.state.score}
               moves={this.state.moves}
               images={images}
               decreaseMoves={this.decreaseMoves}
               increaseScore={this.increaseScore}
               reset={this.resetHeader}
            />
         </Fragment>
      )
   }
}

export default Secondtask
