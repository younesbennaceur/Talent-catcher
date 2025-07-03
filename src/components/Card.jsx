import React, { useState } from 'react'
import MiniLogo from '../assets/MiniLogo.png'

function Card({ image, title, alt = "", color = "#FB8500", backData = null, isFlippable = false, isFlipped = false, onFlip = null }) {
  const [internalFlipped, setInternalFlipped] = useState(false);

  const handleFlip = () => {
    if (isFlippable) {
      if (onFlip) {
        onFlip();
      } else {
        setInternalFlipped(!internalFlipped);
      }
    }
  };

  const currentFlipped = onFlip ? isFlipped : internalFlipped;

  return (
    <div 
      className={`flip-card ${isFlippable ? 'cursor-pointer' : ''}`}
      onClick={handleFlip}
    >
      <div className={`flip-card-inner ${currentFlipped ? 'flipped' : ''}`}>
        {/* Face avant */}
        <div className="flip-card-front">
          <div className="rounded-3xl border-7 relative overflow-hidden h-full" style={{ borderColor: color }}>
            {/* SVG Banner positionné en haut */}
            <div className="absolute z-10">
              <svg 
                width="288" 
                height="60" 
                viewBox="0 0 288 60" 
                className="drop-shadow-lg ml-12"
              >
                <path
                  d="M 0 10 L 240 10 L 240 50 L 0 50 L 20 30 Z"
                  fill={color}
                  stroke="none"
                />
              </svg>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-white text-sm font-bold tracking-wide ml-4 px-4 text-center">
                  {title}
                </h2>
              </div>
            </div>

            {/* Image de la carte */}
            <img className='w-68 h-full object-cover' src={image} alt={alt} />
          </div>
        </div>

        {/* Face arrière */}
        {backData && (
          <div className="flip-card-back">
            <div 
              className="rounded-3xl relative overflow-hidden h-full flex flex-col"
              style={{ backgroundColor: color, border: `7px solid ${color}` }}
            >
              <div className="bg-white rounded-2xl p-4 h-full flex flex-col" style={{ margin: '6px' }}>
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold mb-2" style={{ color: color }}>
                    {backData.question}
                  </h3>
                  <p className="text-md text-gray-600 italic">
                    {backData.subtitle}
                  </p>
                </div>
                
                <div className="flex-1 overflow-y-auto">
                  <ol className="space-y-1 text-left">
                    {backData.items.map((item, index) => (
                      <li key={index} className="text-md text-gray-800 leading-relaxed">
                        <span className="font-semibold">{index + 1}.</span> {item}
                      </li>
                    ))}
                  </ol>
                </div>
                
                <div className=" flex justify-end">
                  <img className=' w-14 h-8' src={MiniLogo} alt="" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Styles CSS pour l'animation flip */}
      <style jsx>{`
        .flip-card {
          width: 272px;
          height: 380px;
          perspective: 1000px;
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }

        .flip-card-inner.flipped {
          transform: rotateY(180deg);
        }

        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          box-sizing: border-box;
        }

        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  )
}

export default Card
