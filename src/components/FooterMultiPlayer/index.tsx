import { useContext,useState, useEffect } from 'react'
import { GameContext } from '../../context/GameContext'

interface FooterMultiPlayerProps {
  currentPlayer: number
}

export default function FooterMultiPlayer({ currentPlayer } : FooterMultiPlayerProps) {

  const { pointsPlayers} = useContext(GameContext)

  const [windowWidthSize, setWindowWidthSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidthSize(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <>
      {
        pointsPlayers.map((player) => (
          <div 
            key={player.name} 
            className={player.id === currentPlayer ? 'current multiPlayer': 'multiPlayer'}
          >
            <p>
              {/* 590 is the same as $tablet-middle-breakpoint variable, inside the variable.scss file */}
              {windowWidthSize < 590 ? (
                <>
                  P{player.id}
                </>
              ) : (
                <>
                  {player.name}
                </>
              )}
            </p>
            <span>{player.points}</span>
          </div>
        ))
      }
    </>
  )
}
