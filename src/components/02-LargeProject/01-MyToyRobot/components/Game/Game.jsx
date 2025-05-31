import React from 'react'
import Board from './components/Board/Board'
import Robot from './components/Robot/Robot'
import Commands from './components/Commands/Commands'

const Game = () => {
  return (
    <div>
      <Board />
      <Robot />
      <Commands />
    </div>
  )
}

export default Game