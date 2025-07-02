import React, { useState } from 'react';
import GameStart from '../assets/GameStart.png';
import Logo from '../assets/Logo.png';
import Rules from '../assets/Rules.png';
import Quitter from '../assets/Quitter.png';
import Pause from '../assets/Pause.png';
import Play from '../assets/Play.png'; // ajoute cette ligne

function Home() {
  const [token, setToken] = useState(false);
  const [isPaused, setIsPaused] = useState(false); // nouvel état

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div
      className="h-screen bg-cover bg-center bg-no-repeat flex flex-col p-10"
      style={{
        backgroundImage: `url(${GameStart})`,
      }}
    >
      <div className="flex justify-between">
        <img className="w-46 h-16" src={Logo} alt="Logo" />
        <div className="flex gap-4 items-center">
          {token ? (
            <>
              <img
                className="w-16 h-16 cursor-pointer"
                src={isPaused ? Play : Pause}
                alt={isPaused ? 'Play' : 'Pause'}
                onClick={togglePause}
              />
              <img className="w-16 h-16 cursor-pointer" src={Quitter} alt="Quitter" />
            </>
          ) : (
            <>
              <img className="w-16 h-16" src={Rules} alt="Rules" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;

