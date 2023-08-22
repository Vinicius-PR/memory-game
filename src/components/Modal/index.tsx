import { useContext } from 'react'
import { GameContext } from '../../context/GameContext'
import { useNavigate } from 'react-router-dom'
import './styles.scss'
import ModalMultiPlayer from '../ModalMultiPlayer'
import ModalSinglePlayer from '../ModalSinglePlayer'

interface ModalProps {
  restart: () => void
  newGame: () => void
}

export default function Modal({ restart, newGame } : ModalProps) {
  const { numberOfPlayers } = useContext(GameContext)
  let navigate = useNavigate()

  return (
    <section className="modal">
      <div className="result">
        
        {
          numberOfPlayers > 1 ? (
            <ModalMultiPlayer />
          ) : (
            <ModalSinglePlayer />
          )
        }

        <div className="buttons-modal">
          <button 
            onClick={() => {
              restart()
              navigate('/game')
            }}
          >
            Restart
          </button>

          <button
            onClick={() => {
              newGame()
              navigate('/')
            }}
          >
            Setup New Game
          </button>
        </div>
      </div>
    </section>
  )
}
