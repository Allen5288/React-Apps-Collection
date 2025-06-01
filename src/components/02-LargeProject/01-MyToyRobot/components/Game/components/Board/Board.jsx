import React from 'react'
import Row from './Row'

const ROW_COUNT = 5

const Board = () => {
  return (
    <div className='border border-black'>
      {Array.from({ length: ROW_COUNT }).map((_, index) => (
        <Row key={index} />
      ))}
    </div>
  )
}

export default Board