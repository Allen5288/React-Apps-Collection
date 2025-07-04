import React from 'react'
import Row from './Row'
import Block from './Block'
import Monster from '../Monster/Monster'
import Goal from '../Goal/Goal'

const ROW_COUNT = 5

const Board = ({ blocks = [], monster, goal }) => {
  return (
    <div className="bg-white">
      {/* Y-axis labels */}
      <div className="flex">
        <div className="w-8 h-8"></div> {/* Empty corner */}
        {Array.from({ length: ROW_COUNT }).map((_, index) => (
          <div key={index} className="w-[60px] h-8 flex items-center justify-center text-sm font-semibold text-gray-600">
            {index}
          </div>
        ))}
      </div>
      
      <div className="flex">
        {/* X-axis labels */}
        <div className="flex flex-col">
          {Array.from({ length: ROW_COUNT }).map((_, index) => (
            <div key={index} className="w-8 h-[60px] flex items-center justify-center text-sm font-semibold text-gray-600">
              {index}
            </div>
          ))}
        </div>
        
        {/* Game board */}
        <div role='grid' aria-label='Game Board' className='border-2 border-black bg-gray-50 relative' style={{ zIndex: 1 }}>
          {Array.from({ length: ROW_COUNT }).map((_, index) => (
            <Row key={index} y={index} />
          ))}
          
          {/* Render blocks */}
          {blocks.map((block, index) => (
            <Block key={index} position={block} />
          ))}
          
          {/* Render monster and goal if props传递 */}
          {monster && <Monster position={monster} />}
          {goal && <Goal position={goal} />}
        </div>
      </div>
    </div>
  )
}

export default Board