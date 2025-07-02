import React, { useState } from 'react';
import GameStart from '../assets/GameStart.png';
import Logo from '../assets/Logo.png';
import Rules from '../assets/Rules.png';
import Quitter from '../assets/Quitter.png';
import Pause from '../assets/Pause.png';
import Play from '../assets/Play.png';
import Regle from '../components/Regle'; // Import du popup règles
import LoginPopup from '../components/Login'; // Import du popup de connexion
import Card from '../components/Card';

function Home() {
  const [token, setToken] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showRegle, setShowRegle] = useState(false); // État popup règles
  const [showLogin, setShowLogin] = useState(false); // État popup connexion

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const handleLaunchGame = () => {
    setShowLogin(true); // Ouvrir le popup de connexion
  };

  const handleLoginValidate = (code) => {
    console.log('Code saisi:', code);
    // Ici vous pouvez ajouter la logique de validation du code
    // Par exemple, vérifier le code avec votre backend
    
    // Pour l'exemple, on accepte n'importe quel code de 6 chiffres
    setToken(true); // Connecter l'utilisateur
    setShowLogin(false); // Fermer le popup
  };

  const handleLogout = () => {
    setToken(false);
    setIsPaused(false);
  };

  return (
    <div
      className="h-screen bg-cover bg-center bg-no-repeat flex flex-col gap-4 py-6 px-10"
      style={{
        backgroundImage: `url(${GameStart})`,
      }}
    >
      <div className="flex justify-between">
        <img className="w-32 h-14" src={Logo} alt="Logo" />
        <div className="flex gap-4 items-center">
          {token ? (
            <>
              <img
                className="w-14 h-14 cursor-pointer"
                src={isPaused ? Play : Pause}
                alt={isPaused ? 'Play' : 'Pause'}
                onClick={togglePause}
              />
              <img 
                className="w-14 h-14 cursor-pointer" 
                src={Quitter} 
                alt="Quitter"
                onClick={handleLogout}
              />
            </>
          ) : (
            <>
              {/* Au clic sur Rules, on ouvre la popup */}
              <img
                className="w-14 h-14 cursor-pointer"
                src={Rules}
                alt="Rules"
                onClick={() => setShowRegle(true)}
              />
            </>
          )}
        </div>
      </div>
      
      <div className='flex flex-col gap-6'>
        <h1 className='text-center text-5xl'>
          {token ? 'Partie en cours !' : 'Prêt·e pour une partie ?'}
        </h1>
        
        {token ? (
          <div className='text-center text-2xl text-green-600 font-semibold'>
            Connecté au jeu ! La partie peut commencer.
          </div>
        ) : (
          <>
            <div className='flex flex-row justify-between'>
              <Card />
              <Card />
              <Card />
              <Card />
            </div>

            <button
              onClick={handleLaunchGame}
              className="block mx-auto text-2xl hover:bg-[#023047] border-4 border-[#023047] hover:border-white hover:text-white text-[#023047] font-semibold py-2 px-12 rounded-xl"
            >
              Lancer la partie
            </button>
          </>
        )}
      </div>

      {/* Popup règles conditionnelle */}
      {showRegle && <Regle onClose={() => setShowRegle(false)} />}
      
      {/* Popup connexion conditionnelle */}
      {showLogin && (
        <LoginPopup 
          onClose={() => setShowLogin(false)}
          onValidate={handleLoginValidate}
        />
      )}
    </div>
  );
}

export default Home;