import React from 'react';
import Rules_Icon from '../assets/Rules_Icon.png';
import Time from '../assets/Time.png';
import Goale from '../assets/Goale.png';

function Regle({ onClose }) {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-opacity-40">
      <div className="bg-white rounded-4xl p-8 mx-4 shadow-lg relative border-3 border-[#023045] border-solid max-h-[80vh] w-full max-w-xl overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 font-bold text-2xl"
          aria-label="Close modal"
        >
          
        </button>

        {/* Titre */}
        <div className="flex items-center gap-2 text-[#023045] mb-2 mt-4">
          <img className="h-6 w-6" src={Rules_Icon} alt="Rules" />
          <h1 className="text-3xl font-bold">TALENT CATCHER</h1>
        </div>

        <h2 className="text-lg text-[#023045] font-semibold mb-4">Les règles du jeu</h2>

        <div className="text-gray-800 text-sm space-y-4 pr-2">
          {/* Objectif */}
          <p><strong>🎯 Objectif :</strong> Cumuler le plus de pions-thèmes en répondant collectivement à des questions liées au recrutement et au sourcing.</p>

          {/* Matériel */}
          <div>
            <strong>🧩 Matériel :</strong>
            <ul className="list-disc ml-5 mt-1 space-y-1">
              <li>1 plateau avec 4 univers (Sourcing, IA, Marque Employeur, Soft Skills)</li>
              <li>1 dé géant à 6 faces (avec joker ou rejouer)</li>
              <li>40 jetons (10 par univers)</li>
              <li>Des cartes numériques (recto : question / verso : réponses + fiche pédagogique)</li>
              <li>1 facilitateur RH</li>
              <li>2 équipes : TIC & TAC (3 à 6 joueurs)</li>
            </ul>
          </div>

          {/* Déroulé */}
          <div>
            <strong>🕹 Déroulé d’une manche :</strong>
            <ol className="list-decimal ml-5 mt-1 space-y-1">
              <li>Deux équipes sont formées, celle du plus jeune joueur commence.</li>
              <li>Le joueur lance le dé pour choisir un univers.</li>
              <li>Le facilitateur lit une question depuis l’application.</li>
              <li>Il attribue un chiffre (1 à 9) aux membres de son équipe.</li>
              <li>Chaque joueur répond sans dire son chiffre.</li>
              <li>Le joueur initial doit reconstituer l’ordre de classement.</li>
              <li>Temps limité : 3 minutes par manche.</li>
              <li>Bonne réponse : 1 jeton gagné sur l’univers joué.</li>
              <li>Mauvaise réponse : pas de point.</li>
              <li>Le facilitateur retourne la carte et explique les réponses RH.</li>
              <li>Puis l’autre équipe joue à son tour.</li>
            </ol>
          </div>

          {/* Fin de partie */}
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center gap-2">
              <img className="h-5 w-5" src={Time} alt="Temps" />
              <span>Temps par manche : 3 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <img className="h-5 w-5" src={Goale} alt="Goal" />
              <span>Fin de partie : quand un univers atteint 10 pions. L’équipe avec le plus de pions gagne.</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onClose}
          className="block mx-auto mt-6 bg-[#023045] hover:bg-[#021245] text-white text-lg font-bold py-2 px-8 rounded"
        >
          J'ai compris
        </button>
      </div>
    </div>
  );
}

export default Regle;
