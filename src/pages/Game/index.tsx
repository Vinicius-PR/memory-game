import { useContext, useState, useEffect, useCallback } from 'react'
import { GameContext } from '../../context/GameContext'
import { useNavigate } from 'react-router-dom'

import Header from '../../components/Header'
import Board from '../../components/Board'
import Footer from '../../components/Footer';

import dragonSvg from '../../assets/icons/dragon-solid.svg'
import catSvg from '../../assets/icons/cat-solid.svg'
import champagneSvg from '../../assets/icons/champagne-glasses-solid.svg'
import chessSvg from '../../assets/icons/chess-knight-solid.svg'
import cloudSunSvg from '../../assets/icons/cloud-sun-rain-solid.svg'
import crossSvg from '../../assets/icons/cross-solid.svg'
import diceSvg from '../../assets/icons/dice-solid.svg'
import doveSvg from '../../assets/icons/dove-solid.svg'
import ghostSvg from '../../assets/icons/ghost-solid.svg'
import heartSvg from '../../assets/icons/heart-solid.svg'
import motorcycleSvg from '../../assets/icons/motorcycle-solid.svg'
import personSvg from '../../assets/icons/person-digging-solid.svg'
import pizzaSvg from '../../assets/icons/pizza-slice-solid.svg'
import planeSvg from '../../assets/icons/plane-solid.svg'
import rainbowSvg from '../../assets/icons/rainbow-solid.svg'
import skullSvg from '../../assets/icons/skull-crossbones-solid.svg'
import wifiSvg from '../../assets/icons/wifi-solid.svg'
import bugSvg from '../../assets/icons/bug-solid.svg'

import './styles.scss';

enum CardStatus {
  Empty = '',
  Up = 'up',
  Correct = 'correct',
  Wrong = 'wrong',
  UpSelected = 'up selected',
}

export interface CardProps {
  id: number
  data: string
  status: CardStatus
}

export default function Game() {
  const { 
    gridSize, 
    numberOfPlayers, 
    themeGame,
    handleSetPointsPlayers, 
    handleIncrementMovesSinglePlayer,
    handleCreatePointsPlayersArr, 
    handleNewGame,
    handleRestartSinglePlayer,
  } = useContext(GameContext)

  const arrayNumbers6x6 = [
    {id: 1, data: '1', status:CardStatus.Empty},
    {id: 2, data: '1', status:CardStatus.Empty},
    {id: 3, data: '2', status:CardStatus.Empty},
    {id: 4, data: '2', status:CardStatus.Empty},
    {id: 5, data: '3', status:CardStatus.Empty},
    {id: 6, data: '3', status:CardStatus.Empty},
    {id: 7, data: '4', status:CardStatus.Empty},
    {id: 8, data: '4', status:CardStatus.Empty},
    {id: 9, data: '5', status:CardStatus.Empty},
    {id: 10, data: '5', status:CardStatus.Empty},
    {id: 11, data: '6', status:CardStatus.Empty},
    {id: 12, data: '6', status:CardStatus.Empty},
    {id: 13, data: '7', status:CardStatus.Empty},
    {id: 14, data: '7', status:CardStatus.Empty},
    {id: 15, data: '8', status:CardStatus.Empty},
    {id: 16, data: '8', status:CardStatus.Empty},
    {id: 17, data: '9', status:CardStatus.Empty},
    {id: 18, data: '9', status:CardStatus.Empty},
    {id: 19, data: '10', status:CardStatus.Empty},
    {id: 20, data: '10', status:CardStatus.Empty},
    {id: 21, data: '11', status:CardStatus.Empty},
    {id: 22, data: '11', status:CardStatus.Empty},
    {id: 23, data: '12', status:CardStatus.Empty},
    {id: 24, data: '12', status:CardStatus.Empty},
    {id: 25, data: '13', status:CardStatus.Empty},
    {id: 26, data: '13', status:CardStatus.Empty},
    {id: 27, data: '14', status:CardStatus.Empty},
    {id: 28, data: '14', status:CardStatus.Empty},
    {id: 29, data: '15', status:CardStatus.Empty},
    {id: 30, data: '15', status:CardStatus.Empty},
    {id: 31, data: '16', status:CardStatus.Empty},
    {id: 32, data: '16', status:CardStatus.Empty},
    {id: 33, data: '17', status:CardStatus.Empty},
    {id: 34, data: '17', status:CardStatus.Empty},
    {id: 35, data: '18', status:CardStatus.Empty},
    {id: 36, data: '18', status:CardStatus.Empty},
  ]
  const arrayNumbers4x4 = [
    {id: 1, data: '1', status:CardStatus.Empty},
    {id: 2, data: '1', status:CardStatus.Empty},
    {id: 3, data: '2', status:CardStatus.Empty},
    {id: 4, data: '2', status:CardStatus.Empty},
    {id: 5, data: '3', status:CardStatus.Empty},
    {id: 6, data: '3', status:CardStatus.Empty},
    {id: 7, data: '4', status:CardStatus.Empty},
    {id: 8, data: '4', status:CardStatus.Empty},
    {id: 9, data: '5', status:CardStatus.Empty},
    {id: 10, data: '5', status:CardStatus.Empty},
    {id: 11, data: '6', status:CardStatus.Empty},
    {id: 12, data: '6', status:CardStatus.Empty},
    {id: 13, data: '7', status:CardStatus.Empty},
    {id: 14, data: '7', status:CardStatus.Empty},
    {id: 15, data: '8', status:CardStatus.Empty},
    {id: 16, data: '8', status:CardStatus.Empty}
  ]

  const arrayIcons4x4 = [
    {id: 1, data: dragonSvg, status:CardStatus.Empty},
    {id: 2, data: dragonSvg, status:CardStatus.Empty},
    {id: 3, data: catSvg, status:CardStatus.Empty},
    {id: 4, data: catSvg, status:CardStatus.Empty},
    {id: 5, data: champagneSvg, status:CardStatus.Empty},
    {id: 6, data: champagneSvg, status:CardStatus.Empty},
    {id: 7, data: chessSvg, status:CardStatus.Empty},
    {id: 8, data: chessSvg, status:CardStatus.Empty},
    {id: 9, data: cloudSunSvg, status:CardStatus.Empty},
    {id: 10, data: cloudSunSvg, status:CardStatus.Empty},
    {id: 11, data: crossSvg, status:CardStatus.Empty},
    {id: 12, data: crossSvg, status:CardStatus.Empty},
    {id: 13, data: diceSvg, status:CardStatus.Empty},
    {id: 14, data: diceSvg, status:CardStatus.Empty},
    {id: 15, data: doveSvg, status:CardStatus.Empty},
    {id: 16, data: doveSvg, status:CardStatus.Empty}
  ]

  const arrayIcons6x6 = [
    {id: 1, data: dragonSvg, status:CardStatus.Empty},
    {id: 2, data: dragonSvg, status:CardStatus.Empty},
    {id: 3, data: catSvg, status:CardStatus.Empty},
    {id: 4, data: catSvg, status:CardStatus.Empty},
    {id: 5, data: champagneSvg, status:CardStatus.Empty},
    {id: 6, data: champagneSvg, status:CardStatus.Empty},
    {id: 7, data: chessSvg, status:CardStatus.Empty},
    {id: 8, data: chessSvg, status:CardStatus.Empty},
    {id: 9, data: cloudSunSvg, status:CardStatus.Empty},
    {id: 10, data: cloudSunSvg, status:CardStatus.Empty},
    {id: 11, data: crossSvg, status:CardStatus.Empty},
    {id: 12, data: crossSvg, status:CardStatus.Empty},
    {id: 13, data: diceSvg, status:CardStatus.Empty},
    {id: 14, data: diceSvg, status:CardStatus.Empty},
    {id: 15, data: doveSvg, status:CardStatus.Empty},
    {id: 16, data: doveSvg, status:CardStatus.Empty},
    {id: 17, data: ghostSvg, status:CardStatus.Empty},
    {id: 18, data: ghostSvg, status:CardStatus.Empty},
    {id: 19, data: heartSvg, status:CardStatus.Empty},
    {id: 20, data: heartSvg, status:CardStatus.Empty},
    {id: 21, data: motorcycleSvg, status:CardStatus.Empty},
    {id: 22, data: motorcycleSvg, status:CardStatus.Empty},
    {id: 23, data: personSvg, status:CardStatus.Empty},
    {id: 24, data: personSvg, status:CardStatus.Empty},
    {id: 25, data: pizzaSvg, status:CardStatus.Empty},
    {id: 26, data: pizzaSvg, status:CardStatus.Empty},
    {id: 27, data: planeSvg, status:CardStatus.Empty},
    {id: 28, data: planeSvg, status:CardStatus.Empty},
    {id: 29, data: rainbowSvg, status:CardStatus.Empty},
    {id: 30, data: rainbowSvg, status:CardStatus.Empty},
    {id: 31, data: skullSvg, status:CardStatus.Empty},
    {id: 32, data: skullSvg, status:CardStatus.Empty},
    {id: 33, data: wifiSvg, status:CardStatus.Empty},
    {id: 34, data: wifiSvg, status:CardStatus.Empty},
    {id: 35, data: bugSvg, status:CardStatus.Empty},
    {id: 36, data: bugSvg, status:CardStatus.Empty},
  ]

  const [prev, setPrev] = useState(-1)
  const [cardItems, setCardItems] = useState<CardProps[]>([])
  const [amountCardsAvailable, setAmountCardsAvailable] = useState(-1)
  const [canClickCard, setCanClickCard] = useState(true)
  const [currentPlayer, setCurrentPlayer] = useState(1)
  let navigate = useNavigate()

  function shuffle(array: CardProps[]) {
    let currentIndex = array.length;
    let randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [{...array[randomIndex]}, {...array[currentIndex]}];
    }
  
    return array;
  }

  const handleCreateCardItems = useCallback(() => {
    setCardItems(() => {
      if (themeGame === 'numbers') {
        if (gridSize === '4x4') {
          setAmountCardsAvailable(16)
          return shuffle(arrayNumbers4x4)
        } else if (gridSize === '6x6') {
          setAmountCardsAvailable(36)
          return shuffle(arrayNumbers6x6)
        }
      } else if (themeGame === 'icons') {
        if (gridSize === '4x4') {
          setAmountCardsAvailable(16)
          return shuffle(arrayIcons4x4)
        } else if (gridSize === '6x6') {
          setAmountCardsAvailable(36)
          return shuffle(arrayIcons6x6)
        }
      }
      return []
    })
  }, [arrayIcons4x4, arrayIcons6x6, arrayNumbers4x4, arrayNumbers6x6, gridSize, themeGame])

  // Function to change the status fo the card (className) from 'correct' to 'up' and from 'wrong' to '', when change the currentPlayer.
  function changeStatusOfCards() {
    setCardItems((state) => {
      const newCardState = state.map((item) => {
        if (item.status === CardStatus.Correct && numberOfPlayers > 1) {
          return {
            ...item, status: CardStatus.Up
          }
        } else if (item.status === CardStatus.Wrong) {
          return {
            ...item, status: CardStatus.Empty
          }
        } else {
          return item
        }
      })
      return newCardState
    })
  }

  function checkChoices(current:number){

    if(cardItems[current].data === cardItems[prev].data){
      // In this case the current card data will be the same as previous card data
      setCardItems((state) => {
        const currentCardData = state[current].data; // same as previous card data
        const newCardState = state.map((item) => {
          if (currentCardData === item.data) {
            return {...item, status: CardStatus.Correct}
          } else {
            return item
          }
        })
        return newCardState
      })
      setPrev(-1)
      setAmountCardsAvailable((state) => state - 2)
      if (numberOfPlayers > 1) {
        handleSetPointsPlayers(currentPlayer)
      } else {
        handleIncrementMovesSinglePlayer()
      }

    } else {
      setCardItems((state) => {
        const prevCardId = state[prev].id
        const currentCardId = state[current].id
        const newCardState = state.map((item) => {
          if (currentCardId === item.id || prevCardId === item.id) {
            return {...item, status: CardStatus.Wrong}
          } else {
            return item
          }
        })
        return newCardState
      })    
      setCanClickCard(false)
      if (numberOfPlayers > 1) {
        setCurrentPlayer((state) => state === numberOfPlayers ? 1 : state + 1)
      } else {
        handleIncrementMovesSinglePlayer()
      }

      setTimeout(() => {
        changeStatusOfCards()
        setPrev(-1)
        setCanClickCard(true)
      }, 500)
    }
  }

  function handleClick(index:number){
    if (canClickCard && amountCardsAvailable > 0) {
      if(prev === -1){
        setCardItems((state) => {
          const currentCardClicked = state[index]
          const newCardState = state.map((item) => {
            if (currentCardClicked.id === item.id) {
              return {...item, status: CardStatus.UpSelected}
            } else {
              return item
            }
          })

          return newCardState
        })
        setPrev(index)
      } else {
        checkChoices(index)
      }
    }
  }

  function restart() {
    if (numberOfPlayers > 1) {
      handleCreatePointsPlayersArr()
    } else {
      handleRestartSinglePlayer()
    }
    handleCreateCardItems()
    setCurrentPlayer(1)
    setPrev(-1)
  }

  useEffect (() => {
    handleCreateCardItems()
  }, [])

  window.addEventListener('load', () => {
    handleNewGame()
    navigate('/')
  })
 
  return (
    <main className='container'>
      <div className='content'>
        <Header restart={restart} newGame={handleNewGame}/>
        <Board cardItems={cardItems} handleClick={handleClick} amountCardsAvailable={amountCardsAvailable} restart={restart} newGame={handleNewGame}/>
        <Footer currentPlayer={currentPlayer} amountCardsAvailable={amountCardsAvailable} />
      </div>
    </main>
  )
}
