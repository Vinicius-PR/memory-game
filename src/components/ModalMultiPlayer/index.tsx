import { useContext } from 'react'
import { GameContext } from '../../context/GameContext'

interface pointsPlayersProps {
  id: number
  name: string
  points: number
  status: string
}

export default function ModalMultiPlayer() {
  const { pointsPlayers } = useContext(GameContext)

  let isATie: boolean = false
  let result: pointsPlayersProps[] = checkWinnerOrTie([...pointsPlayers].sort((a, b) => b.points - a.points))

  function checkWinnerOrTie(arr: pointsPlayersProps[]) {
    // Check if first two is a tie
    if (arr[0].points === arr[1].points) {
      arr[0].status = 'tie'
      arr[1].status = 'tie'
      
      // Check if there is more ties
      for (let i = 2; i < arr.length; i++) {
        if (arr[0].points === arr[i].points) {
          arr[i].status = 'tie'
        }
      }
      isATie = true
    } else { //In case no tie, the first one is the winner
      arr[0].status = 'winner'
      for (let i = 1; i < arr.length; i++) {
        arr[i].status = ''
      }
    }
    return arr
  }

  return (
    <>
      <h1 className='title'>
        {
          isATie ? (
            <>
              It's a tie!
            </>
          ) : (
            <> 
              {result[0].name} Wins!
            </>
          )
        }
      </h1>
      <p className='subtitle'>Game over! Here are the results</p>
      <div className='result-list'>

        {
        isATie ? (
          <>
            {
              result.map((player) => (
                <div key={player.id} className={player.status === 'tie' ? 'winner' : ''}>
                  <p>{player.name} {player.status === 'tie' ? ' (Winner!)' : ''}</p>
                  <span>{player.points} Pairs</span>
                </div>
              ))
            }
          </>
        ) : (
          <>
            {
              result.map((player) => (
                <div key={player.id} className={player.status === 'winner' ? 'winner' : ''}>
                  <p>{player.name} {player.status === 'winner' ? ' (Winner!)' : ''}</p>
                  <span>{player.points} Pairs</span>
                </div>
              ))
            }
          </>
        )
        }
        
      </div>
    </>
  )
}
