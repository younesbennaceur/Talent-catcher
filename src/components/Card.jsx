import React from 'react'
import card from '../assets/Card.png'

function Card() {
  return (
    <div className='rounded-3xl border-7 border-[#FB8500] relative overflow-hidden'> 
        {/* SVG Banner positionné en haut */}
        <div className="absolute z-10">
          <svg 
            width="288" 
            height="60" 
            viewBox="0 0 288 60" 
            className="drop-shadow-lg ml-12"  // <-- marge à gauche ajoutée ici
          >
            <path
              d="M 0 10 L 240 10 L 240 50 L 0 50 L 20 30 Z"
              fill="#FB8500"
              stroke="none"
            />
          </svg>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-white text-sm font-bold tracking-wide ml-4 px-4 text-center">
              Sourcing et évaluation
            </h2>
          </div>
        </div>

        {/* Image de la carte */}
        <img className='w-68' src={card} alt="" />
    </div>
  )
}

export default Card
