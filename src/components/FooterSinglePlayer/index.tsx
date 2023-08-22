import { useContext, useState, useEffect } from 'react'
import { GameContext } from '../../context/GameContext'

interface FooterSinglePlayerProps {
  amountCardsAvailable: number
}

export default function FooterSinglePlayer({ amountCardsAvailable } : FooterSinglePlayerProps) {

  const {
    numberOfPlayers,
    singlePlayer, 
    handleSetTimeSinglePlayer,
    dateStartSinglePlayer
  } = useContext(GameContext)

  const [timerRunning, setTimerRunning] = useState(() => {
    if (numberOfPlayers === 1)
      return true
    return false
  })

  function getTime() {
    const minutes = (Math.floor(((Date.now() - dateStartSinglePlayer.current)/ 1000 / 60) % 60))
    const seconds = (Math.floor(((Date.now() - dateStartSinglePlayer.current)/ 1000) % 60))
    const timeString = `${minutes < 10 ? '0' + minutes : minutes}` + ':' + `${seconds < 10 ? '0' + seconds : seconds}`
    return timeString
  };

  useEffect(() => {
    if (amountCardsAvailable === 0) {
      setTimerRunning(false)
      handleSetTimeSinglePlayer(getTime())
    } else {
      setTimerRunning(true)
    }
  }, [amountCardsAvailable])

  let interval: NodeJS.Timeout

  useEffect(() => {
    if (timerRunning) {
      interval = setInterval(() => {
        handleSetTimeSinglePlayer(getTime()) 
      }, 1000)
    } else {
      clearInterval(interval)
    }    
    return () => clearInterval(interval)
  }, [timerRunning])

  return (  
    <>
      <div className='singlePlayer'>
        <p>Time</p>
        <span>
          {singlePlayer.time}
        </span>
      </div>
      <div className='singlePlayer'>
        <p>Moves</p>
        <span>{singlePlayer.moves}</span>
      </div>
  </>
      
  )
}
