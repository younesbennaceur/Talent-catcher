import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import CardDetailPage from '../components/CardDetailPage'
import GameStart from '../assets/GameStart.png'
import Logo from '../assets/Logo.png'
import Rules from '../assets/Rules.png'
import Quitter from '../assets/Quitter.png'
import Pause from '../assets/Pause.png'
import Play from '../assets/Play.png'
import IA from '../assets/IA.png'
import ME from '../assets/ME.png'
import SK from '../assets/SK.png'
import card from '../assets/Card.png'

// Import des fichiers JSON
import se from '../data/se.json'
import ia from '../data/ia.json'
import me from '../data/me.json'
import skillsData from '../data/sk.json'


import Regle from '../components/Regle'
import LoginPopup from '../components/Login'

function getRandomBackData(backDataArray) {
  const randomIndex = Math.floor(Math.random() * backDataArray.length);
  return backDataArray[randomIndex];
}

function Home() {
  const [token, setToken] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showRegle, setShowRegle] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [playedCards, setPlayedCards] = useState([]);
  const [cardData, setCardData] = useState([]);

  // Initialiser les données des cartes avec les fichiers JSON
  useEffect(() => {
    const initialCardData = [
      {
        id: 'sourcing',
        image: card,
        title: 'Sourcing',
        alt: 'Sourcing',
        color: '#FB8500',
        backData: se,
      },
      {
        id: 'ia',
        image: IA,
        title: 'Intelligence Artificielle',
        alt: 'IA',
        color: '#023047',
        backData: ia,
      },
      {
        id: 'me',
        image: ME,
        title: 'Marque Employeur',
        alt: 'ME',
        color: '#FFB703',
        backData: me,
      },

      
      {
        id: 'skills',
        image: SK,
        title: 'Posture et soft skills',
        alt: 'Skill player',
        color: '#8ECAE6',
        backData: skillsData,
      }

    ];
    
    setCardData(initialCardData);
  }, []);

  const togglePause = () => setIsPaused(!isPaused);

  const handleLaunchGame = () => setShowLogin(true);

  const handleLoginValidate = (code) => {
    console.log("Code saisi:", code);
    setToken(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setToken(false);
    setIsPaused(false);
    setSelectedCard(null);
    setPlayedCards([]);
  };

  const handleCardClick = (cardInfo) => {
    if (token) {
      const randomBack = getRandomBackData(cardInfo.backData);
      const cardWithRandomBack = {
        ...cardInfo,
        backData: randomBack,
      };
      setSelectedCard(cardWithRandomBack);
    }
  };

  const handleCloseCardDetail = () => {
    setSelectedCard(null);
  };

  return (
    <div
      className="h-screen bg-cover bg-center bg-no-repeat flex flex-col gap-12 py-6 px-10"
      style={{ backgroundImage: `url(${GameStart})` }}
    >
      {/* En-tête */}
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
            <img
              className="w-14 h-14 cursor-pointer"
              src={Rules}
              alt="Rules"
              onClick={() => setShowRegle(true)}
            />
          )}
        </div>
      </div>

      {/* Corps principal */}
      <div className="flex flex-col gap-8">
        <h1 className="text-center text-5xl">
          {token ? "Laissez les dés choisir l'univers à explorer !" : "Prêt·e pour une partie ?"}
        </h1>

        <div className="flex flex-row justify-between">
          {cardData.map((cardInfo) => (
            <div
              key={cardInfo.id}
              onClick={() => handleCardClick(cardInfo)}
              className="cursor-pointer"
            >
              <Card 
                image={cardInfo.image} 
                title={cardInfo.title} 
                alt={cardInfo.alt} 
                color={cardInfo.color} 
                backData={null}
                isFlippable={false}
              />
            </div>
          ))}
        </div>

        {!token && (
          <button
            onClick={handleLaunchGame}
            className="block mx-auto text-2xl hover:bg-[#023047] border-4 border-[#023047] hover:border-white hover:text-white text-[#023047] font-semibold py-2 px-12 rounded-xl"
          >
            Lancer la partie
          </button>
        )}
      </div>

      {/* Popups conditionnels */}
      {showRegle && <Regle onClose={() => setShowRegle(false)} />}
      {showLogin && <LoginPopup onClose={() => setShowLogin(false)} onValidate={handleLoginValidate} />}
      {selectedCard && (
        <CardDetailPage 
          cardData={selectedCard} 
          onClose={handleCloseCardDetail}
          isPaused={isPaused}
          onTogglePause={togglePause}
        />
      )}
    </div>
  );
}

export default Home;