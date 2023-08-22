import { useContext } from 'react'
import { GameContext } from '../../context/GameContext'
import './styles.scss'
import FooterMultiPlayer from '../FooterMultiPlayer'
import FooterSinglePlayer from '../FooterSinglePlayer'

interface FooterProps {
  currentPlayer: number
  amountCardsAvailable: number
}

export default function Footer({ currentPlayer, amountCardsAvailable }: FooterProps) {
  const { numberOfPlayers } = useContext(GameContext)

  return (
    <footer>
      {
        numberOfPlayers > 1 ? (
          <FooterMultiPlayer currentPlayer={currentPlayer} />
        ) : (
          <FooterSinglePlayer amountCardsAvailable={amountCardsAvailable}/>
        )
      }
    </footer>
  )
}
