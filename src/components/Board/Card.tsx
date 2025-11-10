import { CardProps } from "../../pages/Game"
import './styles.scss'

interface CardsProps {
  card: CardProps
  index: number
  themeGame: '' | 'numbers' | 'icons'
  handleClick: (id: number) => void
}

export default function Card({card, themeGame, index, handleClick}:CardsProps) {
  const cardClass = card.status ? card.status : ''
  return (
    <div 
      className={cardClass}
      onClick={() => {
        if (cardClass === '')
          handleClick(index)
      }}
    >
      {
        themeGame === 'numbers' ? (
          <span>{card.data}</span>
        ) : (
          <span><img src={card.data} alt="" /></span>
        )
      }
    </div>
  )
}
