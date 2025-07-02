import React from 'react';
import Rules from '../assets/Rules.png';
import Time from '../assets/Time.png';
import Goale from '../assets/Goale.png';
import Rules_Icon from '../assets/Rules_Icon.png';

function Regle({ onClose }) {
  return (
    <div className="fixed inset-0  flex justify-center items-center z-50">
      <div className="bg-white rounded-4xl p-12  mx-4 flex flex-col gap-5 shadow-lg relative border-3 border-[#023045] border-solid ">
        <button
          onClick={onClose}
          className="absolute top-12 right-8 text-gray-700 hover:text-gray-900 font-bold text-3xl"
          aria-label="Close modal"
        >
          ×
        </button>

        <div className=" flex items-center gap-2 text-[#023045]  ">
            <img className="h-6 w-6" src={Rules_Icon} alt="Rules" />
      
          <h1 className="text-4xl font-bold">Règles du jeu</h1>
        </div>

        <ul className="list-decimal list-inside ml-4 space-y-2 text-lg ">
          <li>Lancez les dés pour découvrir un univers.</li>
          <li>Piochez une carte liée à cet univers.</li>
          <li>Répondez à l'oral.</li>
          <li>À chaque tour, un·e joueur·se différent·e répond.</li>
        </ul>

        <div className='flex flex-col gap-2 '>
            <div className=" flex items-center gap-2">
          <img className="h-6 w-6" src={Time} alt="Time" />
          <h2 className="text-sm ">Temps par tour : 45 sec</h2>
        </div>

        <div className=" flex items-center gap-2">
          <img className="h-6 w-6" src={Goale} alt="Goal" />
          <h2 className="text-sm ">Fin de partie : quand toutes les cartes sont jouées.</h2>
        </div>
        </div>

        

        <button
          onClick={onClose}
          className="block mx-auto bg-[#023045] text-2xl hover:bg-[#021245] text-white font-bold py-2 px-12 rounded"
        >
          J'ai compris
        </button>
      </div>
    </div>
  );
}

export default Regle;
