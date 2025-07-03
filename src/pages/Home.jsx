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
import card from '../assets/card.png'

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

  const togglePause = () => setIsPaused(!isPaused);

  const handleLaunchGame = () => setShowLogin(true);

  const handleLoginValidate = (code) => {
    console.log('Code saisi:', code);
    setToken(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setToken(false);
    setIsPaused(false);
    setSelectedCard(null);
    setPlayedCards([]);
  };

  const cardData = [
    {
      id: 'sourcing',
      image: card,
      title: 'Sourcing et évaluation',
      alt: 'Planning projet',
      color: '#FB8500',
      backData: [
        {
          question: 'Quels sont les éléments les plus convaincants pour attirer un candidat ?',
          subtitle: 'De l\'élément le moins convaincant au plus convaincant',
          items: [
            'Salaire compétitif',
            'Horaires de travail flexibles',
            'Avantages sociaux (mutuelle, tickets restaurant)',
            'Bonnes conditions de travail',
            'Opportunités de formation et de développement',
          ],
        },
        {
          question: 'Qu\'est-ce qui motive un candidat à rester dans une entreprise ?',
          subtitle: 'Facteurs de fidélisation',
          items: [
            'Climat de travail agréable',
            'Possibilités d\'évolution',
            'Reconnaissance du travail',
            'Équilibre vie pro/perso',
            'Management bienveillant',
          ],
        },
      ],
    },
    {
      id: 'ia',
      image: IA,
      title: 'Intelligence Artificielle',
      alt: 'IA stratégie',
      color: '#219EBC',
      backData: [
        {
          question: 'Comment l\'IA transforme-t-elle le recrutement ?',
          subtitle: 'Des outils les moins utilisés aux plus révolutionnaires',
          items: [
            'Tri automatique des CV',
            'Analyse prédictive des performances',
            'Chatbots pour premiers entretiens',
            'Matching candidat-poste intelligent',
          ],
        },
        {
          question: 'Quels sont les défis liés à l\'IA dans le recrutement ?',
          subtitle: 'Points à surveiller',
          items: [
            'Biais algorithmiques',
            'Manque de transparence',
            'Dépendance à la technologie',
            'Protection des données personnelles',
          ],
        },
      ],
    },
    {
      id: 'skills',
      image: SK,
      title: 'Posture et soft skills',
      alt: 'Skill player',
      color: '#8ECAE6',
      backData: [
        {
          question: 'Quelles soft skills sont essentielles aujourd\'hui ?',
          subtitle: 'Des compétences de base aux plus recherchées',
          items: [
            'Ponctualité et fiabilité',
            'Communication écrite claire',
            'Travail en équipe',
            'Adaptation au changement',
            'Résolution de problèmes',
          ],
        },
        {
          question: 'Postures professionnelles clés',
          subtitle: 'Attitudes recommandées',
          items: [
            'Leadership et influence',
            'Intelligence émotionnelle',
            'Pensée critique et analytique',
            'Créativité et innovation',
            'Agilité mentale et apprentissage continu',
          ],
        },
      ],
    },
    {
      id: 'marque',
      image: ME,
      title: 'Marque employeur',
      alt: 'Mon parcours',
      color: '#023047',
      backData: [
        {
          question: 'Comment construire une marque employeur forte ?',
          subtitle: 'Des actions basiques aux stratégies avancées',
          items: [
            'Présence sur les réseaux sociaux',
            'Témoignages d\'employés authentiques',
            'Transparence sur les valeurs d\'entreprise',
            'Processus de recrutement optimisé',
          ],
        },
        {
          question: 'Stratégies pour renforcer la marque employeur',
          subtitle: 'Idées avancées',
          items: [
            'Programmes de développement visible',
            'Engagement sociétal affiché',
            'Innovation dans les pratiques RH',
            'Expérience candidat exceptionnelle',
            'Ambassadeurs internes actifs',
            'Écosystème de marque cohérent et différenciant',
          ],
        },
      ],
    },
  ];

  const handleCardClick = (cardInfo) => {
    if (token && !playedCards.includes(cardInfo.id)) {
      const randomBack = getRandomBackData(cardInfo.backData);
      const cardWithRandomBack = {
        ...cardInfo,
        backData: randomBack,
      };
      setSelectedCard(cardWithRandomBack);
    }
  };

  const handleCloseCardDetail = () => {
    if (selectedCard) {
      setPlayedCards([...playedCards, selectedCard.id]);
      setSelectedCard(null);
    }
  };

  useEffect(() => {
    if (playedCards.length === cardData.length && cardData.length !== 0) {
      alert('Fin de partie ! Toutes les cartes ont été jouées.');
      setPlayedCards([]);
      setToken(false);
      setSelectedCard(null);
      setIsPaused(false);
    }
  }, [playedCards, cardData.length]);

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
          {token ? ' Laissez les dés choisir l’univers à explorer !' : 'Prêt·e pour une partie ?'}
        </h1>

        <div className="flex flex-row justify-between">
          {cardData.map((cardInfo) => (
            <div
              key={cardInfo.id}
              onClick={() => handleCardClick(cardInfo)}
              style={{ opacity: playedCards.includes(cardInfo.id) ? 0.5 : 1, pointerEvents: playedCards.includes(cardInfo.id) ? 'none' : 'auto' }}
            >
              <Card 
                image={cardInfo.image} 
                title={cardInfo.title} 
                alt={cardInfo.alt} 
                color={cardInfo.color} 
                backData={null}  // pas de backData sur la vue liste
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
