import React, { useState, useEffect } from 'react'
import Card from './Card'
import FichePedagogique from './FichePedagogique'
import GameStart from '../assets/GameStart.png'
import Logo from '../assets/Logo.png'
import Quitter from '../assets/Quitter.png'
import Pause from '../assets/Pause.png'
import Play from '../assets/Play.png'

// Import des données JSON
import se from '../data/se.json'
import ia from '../data/ia.json'
import me from '../data/me.json'
import skillsData from '../data/sk.json'
// Import des fiches pédagogiques
import fichesPedagogiques from '../data/pdf.json'

function CardDetailPage({ cardData, onClose, isPaused = false, onTogglePause }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [timer, setTimer] = useState(240); // 4 minutes = 240 secondes
  const [showFichePedagogique, setShowFichePedagogique] = useState(false);

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

  // Fonction pour obtenir les données de la fiche pédagogique
  const getFicheData = () => {
    console.log('CardDetailPage - cardData.id:', cardData.id);
    console.log('CardDetailPage - cardData.backData:', cardData.backData);
    
    // Si la question a une clé pdf, on l'utilise pour mapper vers la bonne fiche
    if (cardData.backData && cardData.backData.pdf) {
      const pdfName = cardData.backData.pdf;
      console.log('PDF name from question:', pdfName);
      
      // Mapping des noms de PDF vers les titres des fiches pédagogiques
      const pdfToFicheMap = {
        'IA - IA dans la scorecard.pdf': 'L\'IA DANS LA SCORECARD',
        'IA - IA et le copywriting.pdf': 'L\'IA ET LE COPYWRITING',
        'IA - IA et le phoning.pdf': 'L\'IA ET LE PHONING',
        'IA - IA dans le brief.pdf': 'L\'IA DANS LE BRIEF',
        'OUTILS - Les techniques de sourcing.pdf': 'LES TECHNIQUES DE SOURCING',
        'OUTILS - Opérateurs  boléens.pdf': 'LES OPERATEURS BOOLEENS',
        'OUTILS - Linkedin.pdf': 'UTILISATION DE LINKEDIN',
        'OUTILS - Open Web .pdf': 'L\'UTILISATION DE L\'OPEN WEB (pour le sourcing)',
        'POSTURE - Comment séduire et attirer un candidat.pdf': 'COMMENT SEDUIRE ET ABORDER LES CANDIDATS',
        'POSTURE - Adapter sa posture face aux différents comportements des candidats et des clients internes.pdf': 'ADAPTER SA POSTURE FACE AUX DIFFERENTS COMPORTEMENTS DES CANDIDATS ET DES CLIENTS INTERNES',
        'POSTURE - Les techniques de brief .pdf': 'LES TECHNIQUES DE BRIEF',
        'POSTURE - phoning et pré-qualifications.pdf': 'PHONING ET PRE-QUALIFICATION TELEPHONIQUE',
        'SOFT-SKILSS - ANALYSE, CONFIANCE, ADAPTATION, CURIOSITÉ, CRÉATIVITÉ, BON RELATIONNEL, ÉCOUTE ET RÉSILIENCE.pdf': 'DÉVELOPPER LES SOFT SKILLS : ANALYSE, CONFIANCE, ADAPTATION, CURIOSITÉ, CRÉATIVITÉ, BON RELATIONNEL, ÉCOUTE ET RÉSILIENCE'
      };
      
      const titreRecherche = pdfToFicheMap[pdfName];
      console.log('Titre recherché:', titreRecherche);
      
      if (titreRecherche) {
        const data = fichesPedagogiques.find(fiche => fiche.titre === titreRecherche);
        console.log('Fiche trouvée:', data?.titre || 'Aucune fiche trouvée');
        return data || null;
      }
    }
    
    // Fallback : mapping par défaut selon l'ID de la carte si pas de clé pdf
    const ficheMap = {
      'sourcing': 'LES TECHNIQUES DE SOURCING',
      'ia': 'L\'IA DANS LA SCORECARD', 
      'me': 'COMMENT SEDUIRE ET ABORDER LES CANDIDATS',
      'skills': 'DÉVELOPPER LES SOFT SKILLS : ANALYSE, CONFIANCE, ADAPTATION, CURIOSITÉ, CRÉATIVITÉ, BON RELATIONNEL, ÉCOUTE ET RÉSILIENCE'
    };
    
    const titreRecherche = ficheMap[cardData.id];
    console.log('Fallback - Recherche du titre:', titreRecherche);
    
    const data = fichesPedagogiques.find(fiche => fiche.titre === titreRecherche);
    console.log('Données de fiche trouvées:', data?.titre || 'Aucune fiche trouvée');
    return data || null;
  };

  // Fonction pour ouvrir la fiche pédagogique
  const openFichePedagogique = () => {
    setShowFichePedagogique(true);
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
          onClick={openFichePedagogique}
          className="text-2xl hover:text-[#023047] bg-[#023047] border-4 hover:bg-transparent hover:border-[#023047] text-white font-semibold py-2 px-12 rounded-xl"
        >
          Voir la fiche pédagogique
        </button>
      </div>

      {/* Fiche Pédagogique Modal */}
      {showFichePedagogique && (
        <FichePedagogique 
          ficheData={getFicheData()} 
          onClose={() => setShowFichePedagogique(false)} 
        />
      )}
    </div>
  );
}

export default CardDetailPage;