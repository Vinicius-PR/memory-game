import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logoImg from '../../assets/logo.svg';
import './styles.scss';

interface HeaderProps {
  restart: () => void
  newGame: () => void
}

export default function Header({restart, newGame } : HeaderProps) {
  let navigate = useNavigate()

  const [windowWidthSize, setWindowWidthSize] = useState(window.innerWidth);
  const [isModal, setIsModal] = useState(false)

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidthSize(window.innerWidth);
      if (window.innerWidth > 490) {
        setIsModal(false)
      }
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [])

  return (
    <header>
      <img src={logoImg} alt="Logo" />
      {
        windowWidthSize < 490 ? (
          <>
            <div>
              <button className='mainBtn' onClick={() => setIsModal(true)}>Menu</button>
            </div>
          </>
        ) : (
          <div>
            <button className='mainBtn' onClick={() => restart()}>Restart</button>
            <button className='normalBtn' onClick={() => {
              newGame()
              navigate('/')
            }}>New Game</button>
          </div>
        )
      }

      {
        isModal && (
          <div className='headerModal'>
            <div className='content'>
              <button className='mainBtn' onClick={() => {
                restart()
                setIsModal(false)
              }}>Restart</button>
              <button className='normalBtn' onClick={() => {
                newGame()
                navigate('/')
              }}>New Game</button>
              <button className='normalBtn' onClick={() => setIsModal(false)}>Resume Game</button>
            </div>
          </div>
        )
      }
    </header>
  )
}
