import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, reload } from 'firebase/auth';
import { auth } from '../lib/firebase';
import useGoogleAuth from '../hooks/useGoogleAuth';
import Card from '../components/Card';
import CardDetailPage from '../components/CardDetailPage';
import FichePedagogique from '../components/FichePedagogique';
import GameStart from '../assets/GameStart.png';
import Logo from '../assets/Logo.png';
import Rules from '../assets/Rules.png';
import Quitter from '../assets/Quitter.png';
import Pause from '../assets/Pause.png';
import Play from '../assets/Play.png';
import IA from '../assets/IA.png';
import ME from '../assets/ME.png';
import SK from '../assets/SK.png';
import card from '../assets/Card.png';

import se from '../data/se.json';
import ia from '../data/ia.json';
import me from '../data/me.json';
import skillsData from '../data/sk.json';
import fichesPedagogiques from '../data/pdf.json';

import Regle from '../components/Regle';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import Autoevo from '../components/Autoevo';

function getRandomBackData(backDataArray) {
  const randomIndex = Math.floor(Math.random() * backDataArray.length);
  return backDataArray[randomIndex];
}

function Home() {
  const [isPaused, setIsPaused] = useState(false);
  const [showRegle, setShowRegle] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [playedCards, setPlayedCards] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [showAutoEvaluation, setShowAutoEvaluation] = useState(false);
  const [showFichePedagogique, setShowFichePedagogique] = useState(false);
  const [selectedFicheData, setSelectedFicheData] = useState(null);

  const [token, setToken] = useState(false);
  const [user, setUser] = useState(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isCodeValidated, setIsCodeValidated] = useState(false);

  const { logout } = useGoogleAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setToken(true);
        setUser(firebaseUser);
        setIsEmailVerified(firebaseUser.emailVerified);
        
        const codeValidated = localStorage.getItem(`codeValidated_${firebaseUser.uid}`);
        setIsCodeValidated(codeValidated === 'true');
      } else {
        setToken(false);
        setUser(null);
        setIsEmailVerified(false);
        setIsCodeValidated(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let intervalId;
    if (token && user && !isEmailVerified && !isCodeValidated) {
      const checkEmailVerification = async () => {
        try {
          await reload(auth.currentUser);
          if (auth.currentUser.emailVerified) {
            setIsEmailVerified(true);
          }
        } catch (error) {
          console.error("Erreur lors de la vérification :", error);
        }
      };
      intervalId = setInterval(checkEmailVerification, 3000);
      return () => clearInterval(intervalId);
    }
  }, [token, user, isEmailVerified, isCodeValidated]);

  const handleLoginValidate = (userOrToken) => {
    setToken(true);
    setUser(userOrToken);
    setIsEmailVerified(userOrToken.emailVerified || true);
    
    const codeValidated = localStorage.getItem(`codeValidated_${userOrToken.uid}`);
    setIsCodeValidated(codeValidated === 'true');
    
    setShowLogin(false);
  };

  const handleCodeValidation = (userId) => {
    localStorage.setItem(`codeValidated_${userId}`, 'true');
    setIsCodeValidated(true);
  };

  const handleLogout = async () => {
    await logout();
    setToken(false);
    setUser(null);
    setIsEmailVerified(false);
    setIsCodeValidated(false);
    setIsPaused(false);
    setSelectedCard(null);
    setPlayedCards([]);
    setShowAutoEvaluation(false);
  };

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
  const handleHeaderLogin = () => setShowLogin(true);
  const handleLaunchGame = () => setShowLogin(true);
  const handleSwitchToRegistration = () => {
    setShowLogin(false);
    setShowRegistration(true);
  };
  const handleSwitchToLogin = () => {
    setShowRegistration(false);
    setShowLogin(true);
  };
  const handleCloseAuth = () => {
    setShowLogin(false);
    setShowRegistration(false);
  };

  const handleCardClick = (cardInfo) => {
    if (token && isEmailVerified && isCodeValidated) {
      const randomBack = getRandomBackData(cardInfo.backData);
      const cardWithRandomBack = { ...cardInfo, backData: randomBack };
      setSelectedCard(cardWithRandomBack);
    }
  };

  const handleCloseCardDetail = () => {
    setSelectedCard(null);
  };

  const handleViewFichePedagogique = (ficheType) => {
    const ficheMap = {
      'ia': 'L\'IA DANS LA SCORECARD',
      'skills': 'DÉVELOPPER LES SOFT SKILLS : ANALYSE, CONFIANCE, ADAPTATION, CURIOSITÉ, CRÉATIVITÉ, BON RELATIONNEL, ÉCOUTE ET RÉSILIENCE', 
      'sourcing': 'LES TECHNIQUES DE SOURCING',
      'me': 'COMMENT SEDUIRE ET ABORDER LES CANDIDATS'
    };
    
    const titreRecherche = ficheMap[ficheType];
    const ficheData = fichesPedagogiques.find(fiche => fiche.titre === titreRecherche);
    
    if (ficheData) {
      setSelectedFicheData(ficheData);
      setShowFichePedagogique(true);
    }
  };

  const handleCloseFichePedagogique = () => {
    setShowFichePedagogique(false);
    setSelectedFicheData(null);
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
          {token && isEmailVerified && isCodeValidated ? (
            <>
              <img
                className="w-14 h-14 cursor-pointer"
                src={isPaused ? Play : Pause}
                alt={isPaused ? "Play" : "Pause"}
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
              <img
                className="w-14 h-14 cursor-pointer"
                src={Rules}
                alt="Rules"
                onClick={() => setShowRegle(true)}
              />
              <button
                onClick={handleHeaderLogin}
                className="bg-[#023045] border-4 border-white text-white px-6 py-2 rounded-full text-lg font-medium hover:bg-[#021245] transition-colors"
              >
                Se connecter
              </button>
            </>
          )}
        </div>
      </div>

      {/* Corps principal */}
      <div className="flex flex-col gap-8">
        <h1 className="text-center text-5xl">
          {token && isEmailVerified && isCodeValidated
            ? "Laissez les dés choisir l'univers à explorer !"
            : "Prêt·e pour une partie ?"}
        </h1>

        {!showAutoEvaluation && (
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
        )}

        {!token ? (
          <div className='flex justify-center gap-4'>
            <button
              onClick={handleLaunchGame}
              className="text-2xl hover:bg-transparent bg-[#023047] border-4 hover:border-[#023047] border-white text-white hover:text-[#023047] font-semibold py-2 px-12 rounded-xl"
            >
              Lancer la partie
            </button>
            <button
              onClick={handleLaunchGame}
              className="text-2xl hover:bg-[#023047] border-4 border-[#023047] hover:border-white hover:text-white text-[#023047] font-semibold py-2 px-12 rounded-xl"
            >
              Business Case
            </button>
          </div>
        ) : isEmailVerified && isCodeValidated ? (
          <div className='flex justify-center'>
            <button
              onClick={() => setShowAutoEvaluation(true)}
              className="text-2xl hover:bg-transparent bg-[#023047] border-4 hover:border-[#023047] border-white text-white hover:text-[#023047] font-semibold py-2 px-12 rounded-xl"
            >
              Auto Évaluation
            </button>
          </div>
        ) : null}

        {showAutoEvaluation && (
          <Autoevo 
            onValidate={() => setShowAutoEvaluation(false)} 
            onViewFichePedagogique={handleViewFichePedagogique}
            ficheIsOpen={showFichePedagogique}
          />
        )}
      </div>

      {/* Popups */}
      {showRegle && <Regle onClose={() => setShowRegle(false)} />}
      {showLogin && (
        <Login
          onClose={handleCloseAuth}
          onValidate={handleLoginValidate}
          onRegisterSwitch={handleSwitchToRegistration}
          onCodeValidation={handleCodeValidation}
        />
      )}
      {showRegistration && (
        <SignUp
          onClose={handleCloseAuth}
          onLoginSwitch={handleSwitchToLogin}
          onCodeValidation={handleCodeValidation}
        />
      )}
      {selectedCard && (
        <CardDetailPage
          cardData={selectedCard}
          onClose={handleCloseCardDetail}
          isPaused={isPaused}
          onTogglePause={togglePause}
        />
      )}
      {showFichePedagogique && selectedFicheData && (
        <FichePedagogique 
          ficheData={selectedFicheData}
          onClose={handleCloseFichePedagogique}
        />
      )}
    </div>
  );
}

export default Home;