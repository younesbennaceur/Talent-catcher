import React, { useState, useEffect } from 'react'
import Card from './Card'
import GameStart from '../assets/GameStart.png'
import Logo from '../assets/Logo.png'
import Quitter from '../assets/Quitter.png'
import Pause from '../assets/Pause.png'
import Play from '../assets/Play.png'


function CardDetailPage({ cardData, onClose, isPaused = false, onTogglePause }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [timer, setTimer] = useState(240); // 3 minutes = 180 secondes

  useEffect(() => {
    if (isPaused) return;

    if (timer === 0) {
      onClose();  // Fin du tour : ferme la page détails
      return;
    }

    const interval = setInterval(() => {
      setTimer(t => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, isPaused, onClose]);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  // Fonction pour formatter le temps en minutes:secondes
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Fonction pour ouvrir le PDF spécifique à la question
  const openPDF = () => {
    if (cardData.backData && cardData.backData.pdf) {
      // Si la question a un PDF spécifique
      window.open(`/pdf/${cardData.backData.pdf}`, '_blank');
    } else {
      // Fallback : utiliser un PDF générique basé sur l'ID de la carte
      const pdfName = `${cardData.id}.pdf`;
      window.open(`/pdf/${pdfName}`, '_blank');
    }
  };

  return (
    <div
      className="fixed inset-0 bg-cover bg-center bg-no-repeat flex flex-col gap-4 py-6 px-10 z-50"
      style={{ backgroundImage: `url(${GameStart})` }}
    >
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <img className="w-32 h-14" src={Logo} alt="Logo" />
        <div className="flex gap-4 items-center">
          <div className="text-[#023047] font-bold text-xl">
            Temps restant: {formatTime(timer)}
          </div>
          <img
            className="w-14 h-14 cursor-pointer"
            src={isPaused ? Play : Pause}
            alt={isPaused ? 'Play' : 'Pause'}
            onClick={onTogglePause}
          />
          <img
            className="w-14 h-14 cursor-pointer"
            src={Quitter}
            alt="Quitter"
            onClick={onClose}
          />
        </div>
      </div>

      {/* Corps principal */}
      <div className="flex flex-col gap-6 flex-1 items-center justify-center">
        <h1 className="text-center text-5xl mb-4">{cardData.title}</h1>
        <div
          className="cursor-pointer"
          onClick={handleCardClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            boxShadow: isHovered ? `0 10px 40px ${cardData.color}88` : 'none',
            borderRadius: '1rem',
          }}
        >
          <Card
            image={cardData.image}
            title={cardData.title}
            alt={cardData.alt}
            color={cardData.color}
            backData={cardData.backData}
            isFlippable={true}
            isFlipped={isFlipped}
          />
        </div>
      </div>

      {/* Boutons */}
      <div className="flex gap-2 justify-center">
        <button
          onClick={onClose}
          className="text-2xl hover:bg-[#023047] border-4 border-[#023047] hover:border-white hover:text-white text-[#023047] font-semibold py-2 px-12 rounded-xl"
        >
          On change d'univers
        </button>
        <button
          onClick={openPDF}
          className="text-2xl hover:text-[#023047] bg-[#023047] border-4 hover:bg-transparent hover:border-[#023047] text-white font-semibold py-2 px-12 rounded-xl"
        >
          Voir la fiche pédagogique
        </button>
      </div>
    </div>
  );
}

export default CardDetailPage;