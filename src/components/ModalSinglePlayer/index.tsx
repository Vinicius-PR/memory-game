import { useContext } from 'react'
import { GameContext } from '../../context/GameContext'

export default function ModalSinglePlayer() {
  const { singlePlayer } = useContext(GameContext)

  return (
    <>
      <h1 className='title'>
        You did it!
      </h1>
      <p className='subtitle'>Game over! Here's how you got on...</p>

      <div className='result-list'>
      <>
          <div>
            <p>time Elapsed</p>
            <span>{singlePlayer.time}</span>
          </div>

          <div>
          <p>Moves Taken</p>
          <span>{singlePlayer.moves} Moves</span>
          </div>
        </>

      </div>
    </>
  )
}
