import { useContext } from 'react'
import { GameContext } from '../../context/GameContext'

import './styles.scss'
import Card from './Card'
import Modal from '../Modal'
import { CardProps } from '../../pages/Game'

interface BoardProps {
  cardItems: CardProps[]
  handleClick: (index: number) => void
  amountCardsAvailable: number
  restart: () => void
  newGame: () => void
}

export default function Board({cardItems, handleClick, amountCardsAvailable, newGame, restart } : BoardProps) {
  const { gridSize, themeGame} = useContext(GameContext)
  

  return (
    <>
      <section className={gridSize === '4x4' ? 'board board-4x4' : 'board board-6x6'}>
        {
          cardItems.map((card, index) => (
            <Card key={index} themeGame={themeGame} card={card} index={index} handleClick={handleClick} />
          ))
        }
      </section>
      {
        amountCardsAvailable === 0 && <Modal newGame={newGame} restart={restart}/>
      }
    </>
  )
}
