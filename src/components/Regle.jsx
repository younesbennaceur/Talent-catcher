import React from 'react'
import Rules from '../assets/Rules.png'
function Regle() {
  return (
    <div>
        <div>
            <img className='h-16 w-16' src={Rules} alt="Rules" />
            <h1 className='text-4xl text-center font-bold'>Règles du jeu</h1>
        </div>
        <ul>
            <ol>Lancez les dés pour découvrir un univers.</ol>
            <ol>Piochez une carte liée à cet univers.</ol>
            <ol>Répondez à l’oral.</ol>
            <ol>À chaque tour, un·e joueur·se différent·e répond.</ol>
        </ul>
          <div>
            <img className='h-16 w-16' src={Rules} alt="Rules" />
            <h1 className='text-4xl text-center font-bold'>Temps par tour : 45 sec</h1>
        </div>
          <div>
            <img className='h-16 w-16' src={Rules} alt="Rules" />
            <h1 className='text-4xl text-center font-bold'>Fin de partie : quand toutes les cartes sont jouées.</h1>
        </div>



    </div>
  )
}

export default Regle