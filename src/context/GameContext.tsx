import { createContext, ReactNode, useRef, useState } from 'react';

interface GameContextTypes {
  themeGame: '' | 'numbers' | 'icons'
  numberOfPlayers: number
  gridSize: '' | '4x4' | '6x6'
  pointsPlayers: pointsPlayersProps[]
  singlePlayer: singlePlayerProps
  dateStartSinglePlayer: any

  handleSetThemeGame: (theme: '' | 'numbers' | 'icons') => void
  handleSetNumberOfPlayers: (num: number) => void
  handleSetGridSize: (grid:'' | '4x4' | '6x6') => void
  handleSetPointsPlayers: (id: number) => void
  handleIncrementMovesSinglePlayer: () => void
  handleSetTimeSinglePlayer: (time: string) => void
  handleCreatePointsPlayersArr: () => void
  handleNewGame: () => void

  handleRestartSinglePlayer: () => void
}

interface GameContextProviderProps {
  children: ReactNode
}

interface pointsPlayersProps {
  id: number
  name: string
  points: number
  status: string
}

interface singlePlayerProps {
  id: number
  name: string
  moves:number
  time: string
}

export const GameContext = createContext({} as GameContextTypes)

export function GameContextProvider({children}: GameContextProviderProps) {
  const [themeGame, setThemeGame] = useState<'' | 'numbers' | 'icons'>('')
  const [numberOfPlayers, setNumberOfPlayers] = useState(-1)
  const [gridSize, setGridSize] = useState<'' | '4x4' | '6x6'>('')
  const [pointsPlayers, setPointsPlayers] = useState<pointsPlayersProps[]>([])
  const [singlePlayer, setSinglePlayer] = useState<singlePlayerProps>({id: 1, name: 'Player 1', moves: 0, time: '00:00'})
  
  const dateStartSinglePlayer = useRef(Date.now()) // Using usRef so I can keep the same value during future renders.


  function handleSetNumberOfPlayers(num:number) {
    setNumberOfPlayers(num)
  }

  function handleSetThemeGame(theme:'' | 'numbers' | 'icons') {
    setThemeGame(theme)
  }

  function handleSetGridSize(grid:'' | '4x4' | '6x6') {
    setGridSize(grid)
  }

  function handleCreatePointsPlayersArr() {    
    setPointsPlayers(() => {
      let pointsPlayersArr:pointsPlayersProps[] = []
      for(let i = 1; i <= numberOfPlayers; i++) {
        pointsPlayersArr.push({
          id: i,
          name: `Player ${i}`,
          points: 0,
          status: ''
        })
      }
      return pointsPlayersArr
    })
  }

  function handleIncrementMovesSinglePlayer() {
    setSinglePlayer((state) => {
      return {
        ...state,
        moves: state.moves + 1
      }
    })
  }

  function handleSetTimeSinglePlayer(time: string) {
    setSinglePlayer((state) => {
      return {
        ...state,
        time: time
      }
    })
  }

  function handleSetPointsPlayers(id: number) {
    setPointsPlayers((state) => {
      let newPointsPlayersState = state.map((player) => {
        if (player.id === id) {
          return {...player, points: player.points + 1 }
        } else {
          return player
        }
      })
      return newPointsPlayersState
    })
  }

  function handleNewGame() {
    setThemeGame('')
    setNumberOfPlayers(-1)
    setGridSize('')
    setPointsPlayers([])
    setSinglePlayer({id: 1, name: 'Player 1', moves: 0, time: ''})
  }

  function handleRestartSinglePlayer() {
    dateStartSinglePlayer.current = Date.now()
    setSinglePlayer({id: 1, name: 'Player 1', moves: 0, time: '00:00'})
  }

  return (
    <GameContext.Provider value={{
      themeGame,
      numberOfPlayers,
      gridSize,
      pointsPlayers,
      singlePlayer,
      dateStartSinglePlayer,
      handleSetThemeGame,
      handleSetNumberOfPlayers,
      handleSetGridSize,
      handleSetPointsPlayers,
      handleIncrementMovesSinglePlayer,
      handleSetTimeSinglePlayer,
      handleCreatePointsPlayersArr,
      handleNewGame,
      handleRestartSinglePlayer
    }}>
    {children}
    </GameContext.Provider>
  )
}