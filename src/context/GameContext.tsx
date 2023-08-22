import { createContext, ReactNode, useEffect, useRef, useState } from 'react';

interface GameContextTypes {
  themeGame: string
  numberOfPlayers: number
  gridSize: string 
  pointsPlayers: pointsPlayersProps[]
  singlePlayer: singlePlayerProps
  dateStartSinglePlayer: any

  handleSetThemeGame: (theme: string) => void
  handleSetNumberOfPlayers: (num: number) => void
  handleSetGridSize: (grid:string) => void
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
  const [themeGame, setThemeGame] = useState('')
  const [numberOfPlayers, setNumberOfPlayers] = useState(-1)
  const [gridSize, setGridSize] = useState('')
  const [pointsPlayers, setPointsPlayers] = useState<pointsPlayersProps[]>([])
  const [singlePlayer, setSinglePlayer] = useState<singlePlayerProps>({id: 1, name: 'Player 1', moves: 0, time: '00:00'})
  
  const dateStartSinglePlayer = useRef(Date.now()) // Using usRef so I can keep the same value during future renders.


  function handleSetNumberOfPlayers(num:number) {
    setNumberOfPlayers(num)
  }

  function handleSetThemeGame(theme:string) {
    setThemeGame(theme)
  }

  function handleSetGridSize(grid:string) {
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