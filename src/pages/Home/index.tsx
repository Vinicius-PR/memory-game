import { GameContext } from '../../context/GameContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import './styles.scss';

export default function Home() {
  const {
    themeGame, 
    numberOfPlayers, 
    gridSize,
    dateStartSinglePlayer, 
    handleSetNumberOfPlayers, 
    handleSetThemeGame, 
    handleSetGridSize, 
    handleCreatePointsPlayersArr,
  } = useContext(GameContext)
  let navigate = useNavigate()

  return (
    <main className='home'>
      <h1>memory</h1>
      <form action='#'>
        <h2>Select Theme</h2>
        <div className='theme-filds'>
          <input type="radio" name="theme" id="numbers" onInput={() => handleSetThemeGame('numbers')}/>
          <label htmlFor="numbers"> Numbers </label>

          <input required={true} type="radio" name="theme" id="icons" onInput={() => handleSetThemeGame('icons')}/>
          <label htmlFor="icons"> Icons </label>
        </div>

        <h2>Numbers of Players</h2>
        <div className='number-players-fild'>
          <input type="radio" name="players" id="1" onInput={() => handleSetNumberOfPlayers(1)} />
          <label htmlFor="1">1 </label>

          <input type="radio" name="players" id="2" onInput={() => handleSetNumberOfPlayers(2)}/>
          <label htmlFor="2">2 </label>

          <input type="radio" name="players" id="3" onInput={() => handleSetNumberOfPlayers(3)}/>
          <label htmlFor="3">3 </label>

          <input type="radio" name="players" id="4" onInput={() => handleSetNumberOfPlayers(4)}/>  
          <label htmlFor="4">4 </label>
        </div>

        <h2>Grid size</h2>
        <div className='grid-filds'>
          <input type="radio" name="grid-size" id="4x4" onInput={() => handleSetGridSize('4x4')} />
          <label htmlFor="4x4">4x4 </label>

          <input type="radio" name="grid-size" id="6x6" onInput={() => handleSetGridSize('6x6')}/>
          <label htmlFor="6x6">6x6 </label>
        </div>

        <button
          disabled={themeGame === '' || numberOfPlayers === 0 || gridSize === ''}
          className='start-btn'
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            if (numberOfPlayers === 1) {
              dateStartSinglePlayer.current = Date.now()
            } else {
              handleCreatePointsPlayersArr()
            }
            navigate('/game')
          }}
        >
          Start Game
        </button>
      </form>
    </main>
  )
}
