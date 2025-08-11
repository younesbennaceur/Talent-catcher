import React, { useState } from 'react';

const questions = [
  {
    id: 1,
    type: 'slider',
    question: "Sur une échelle de 1 à 5, à quel point t'es-tu senti·e à l'aise pour t'exprimer à l'oral ?",
    labels: {
      left: "Très mal à l'aise",
      center: "Moyennement",
      right: "Très à l'aise"
    }
  },
  {
    id: 2,
    type: 'multiple',
    question: "As-tu eu des difficultés à formuler tes idées clairement pendant la partie ?",
    options: [
      "Oui, souvent",
      "Parfois",
      "Rarement",
      "Pas du tout"
    ]
  },
  {
    id: 3,
    type: 'multiple',
    question: "Quel univers t'a semblé le plus facile à comprendre ?",
    options: [
      "IA",
      "Soft skills",
      "Sourcing & Évaluation",
      "Marque employeur"
    ]
  },
  {
    id: 4,
    type: 'slider',
    question: "Sur une échelle de 1 à 5, comment évalues-tu ta capacité à écouter les autres joueurs ?",
    labels: {
      left: "Très faible",
      center: "Moyenne",
      right: "Très élevée"
    }
  },
  {
    id: 5,
    type: 'multiple',
    question: "Parmi ces compétences, laquelle as-tu le plus mobilisée pendant le jeu ?",
    options: [
      "Communication",
      "Créativité",
      "Esprit critique",
      "Analyse / Réflexion"
    ]
  },
  {
    id: 6,
    type: 'slider',
    question: "Sur une échelle de 1 à 5, dans quelle mesure comprends-tu l'impact de l'IA dans le recrutement ?",
    labels: {
      left: "Pas du tout",
      center: "Un peu",
      right: "Très bien"
    }
  },
  {
    id: 7,
    type: 'multiple',
    question: "Te sens-tu capable d'évaluer objectivement un profil après cette partie ?",
    options: [
      "Oui",
      "Un peu",
      "Pas de tout"
    ]
  },
  {
    id: 8,
    type: 'slider',
    question: "Sur une échelle de 1 à 5, à quel point as-tu compris l'importance de la marque employeur ?",
    labels: {
      left: "Pas du tout",
      center: "Moyennement",
      right: "Très bien"
    }
  },
  {
    id: 9,
    type: 'multiple',
    question: "As-tu eu du mal à comprendre les consignes des cartes ?",
    options: [
      "Oui, souvent",
      "Parfois",
      "Non, tout était clair",
    ]
  },
   {
    id: 10,
    type: 'multiple',
    question: "Est-ce que tu te sens plus préparé·e à évaluer un profil ou à être évalué·e après ce jeu ?",
    options: [
      "Oui, clairement",
      "Un peu",
      "Non, pas encore",
    ]
  }
];

const ResultPopup = ({ result, onClose, onViewFiche }) => {
  const popupContent = {
    ia: {
      title: "Besoin d'un petit coup de pouce en IA ?",
      message: "Tu sembles avoir rencontré quelques difficultés dans l'univers de l'Intelligence Artificielle. Pas de panique ! Consulte la fiche pédagogique pour mieux comprendre ses enjeux et son rôle dans les RH d'aujourd'hui.",
      buttonText: "Voir la fiche pédagogique IA",
      ficheType: "ia"
    },
    softskills: {
      title: "Et si tu renforçais tes soft skills ?",
      message: "Tu as montré de belles choses, mais certaines compétences humaines peuvent encore être développées : communication, confiance, écoute... La fiche pédagogique Soft Skills est là pour t'aider à progresser !",
      buttonText: "Voir la fiche Soft Skills",
      ficheType: "skills"
    },
    sourcing: {
      title: "À l'aise avec le recrutement ? Pas totalement...",
      message: "Tu peux encore t'améliorer dans la détection de talents, la lecture de profils et la formulation d'évaluations justes. Consulte la fiche dédiée pour gagner en assurance et en méthode.",
      buttonText: "Voir la fiche Sourcing & Évaluation",
      ficheType: "sourcing"
    },
    marque: {
      title: "Besoin de mieux comprendre la marque employeur ?",
      message: "Tu sembles avoir du mal à saisir son importance stratégique. La fiche pédagogique t'aidera à construire une vision claire et impactante de ce levier RH essentiel.",
      buttonText: "Voir la fiche Marque Employeur",
      ficheType: "me"
    },
    excellent: {
      title: "Bravo, talent confirmé !",
      message: "Tu ne sembles manquer d'aucune compétence clé pour le moment. Continue à t'entraîner, à t'exprimer, et à explorer tes talents : tu es sur la bonne voie pour briller dans le monde professionnel !",
      buttonText: "Finir la partie",
      ficheType: null
    }
  };

  const content = popupContent[result];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-60 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full mx-4 text-center border-4 border-[#023047]">
        <h2 className="text-3xl font-bold text-[#023047] mb-6">
          {content.title}
        </h2>
        
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          {content.message}
        </p>
        
        <div className="flex gap-4 justify-center">
          <button
            onClick={onClose}
            className="px-8 py-3 text-xl border-4 border-[#023047] text-[#023047] font-semibold rounded-xl hover:bg-[#023047] hover:text-white transition-colors"
          >
            Finir la partie
          </button>
          
          {content.ficheType && (
            <button
              onClick={() => onViewFiche(content.ficheType)}
              className="px-8 py-3 text-xl bg-[#023047] text-white font-semibold rounded-xl hover:bg-[#034563] transition-colors"
            >
              {content.buttonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Autoevo = ({ onValidate, onViewFichePedagogique, ficheIsOpen }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [resultType, setResultType] = useState(null);

  const handleSliderChange = (questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: parseInt(value)
    }));
  };

  const handleMultipleChoice = (questionId, option) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: option
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const analyzeResponses = (responses) => {
    // Analyse basée sur les réponses
    let scores = {
      ia: 0,
      softskills: 0,
      sourcing: 0,
      marque: 0,
      excellent: 0
    };

    // Question 6 : IA
    if (responses[6] <= 2) scores.ia += 2;
    else if (responses[6] === 3) scores.ia += 1;

    // Questions 1, 4, 5 : Soft Skills
    if (responses[1] <= 2) scores.softskills += 1;
    if (responses[4] <= 2) scores.softskills += 1;
    if (responses[5] === "Communication") scores.softskills += 1;

    // Question 7 : Sourcing/Évaluation
    if (responses[7] === "Pas de tout" || responses[7] === "Un peu") scores.sourcing += 2;

    // Question 8 : Marque employeur
    if (responses[8] <= 2) scores.marque += 2;
    else if (responses[8] === 3) scores.marque += 1;

    // Question 3 : Univers le moins compris
    if (responses[3] === "IA") scores.ia += 1;
    if (responses[3] === "Soft skills") scores.softskills += 1;
    if (responses[3] === "Sourcing & Évaluation") scores.sourcing += 1;
    if (responses[3] === "Marque employeur") scores.marque += 1;

    // Critères pour "excellent"
    const hasGoodOralSkills = responses[1] >= 4;
    const hasGoodListening = responses[4] >= 4;
    const understandsIA = responses[6] >= 4;
    const canEvaluate = responses[7] === "Oui";
    const understandsBrand = responses[8] >= 4;

    if (hasGoodOralSkills && hasGoodListening && understandsIA && canEvaluate && understandsBrand) {
      scores.excellent = 10;
    }

    // Retourner le domaine avec le score le plus élevé
    const maxScore = Math.max(...Object.values(scores));
    const result = Object.keys(scores).find(key => scores[key] === maxScore);
    
    return result;
  };

  const handleSubmit = () => {
    console.log("Résultats de l'auto-évaluation :", responses);
    const result = analyzeResponses(responses);
    setResultType(result);
    setShowResult(true);
  };

  const handleCloseResult = () => {
    setShowResult(false);
    onValidate();
  };

  const handleViewFiche = (ficheType) => {
    onViewFichePedagogique(ficheType);
  };

  const isLastQuestion = currentQuestion === questions.length - 1;
  const canProceed = responses[questions[currentQuestion].id] !== undefined;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const currentQ = questions[currentQuestion];

  if (showResult && resultType && !ficheIsOpen) {
    return (
      <ResultPopup 
        result={resultType}
        onClose={handleCloseResult}
        onViewFiche={handleViewFiche}
      />
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-4xl w-full mx-4 relative border-4 border-[#023047]">
        {/* Barre de progression */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div 
            className="bg-[#023047] h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#023047] mb-6">
            {currentQ.question}
          </h2>

          {currentQ.type === 'slider' ? (
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={responses[currentQ.id] || 3}
                  onChange={(e) => handleSliderChange(currentQ.id, e.target.value)}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #ccc 0%, #ccc ${((responses[currentQ.id] || 3) - 1) * 25}%, #023047 ${((responses[currentQ.id] || 3) - 1) * 25}%, #023047 ${((responses[currentQ.id] || 3) - 1) * 25 + 4}%, #ccc ${((responses[currentQ.id] || 3) - 1) * 25 + 4}%, #ccc 100%)`
                  }}
                />
                <style jsx>{`
                  .slider::-webkit-slider-thumb {
                    appearance: none;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: #023047;
                    cursor: pointer;
                    border: 3px solid white;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                  }
                  .slider::-moz-range-thumb {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: #023047;
                    cursor: pointer;
                    border: 3px solid white;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                  }
                `}</style>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>{currentQ.labels.left}</span>
                <span>{currentQ.labels.center}</span>
                <span>{currentQ.labels.right}</span>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleMultipleChoice(currentQ.id, option)}
                  className={`w-full p-4 rounded-xl text-center font-medium transition-all border-2 ${
                    responses[currentQ.id] === option
                      ? 'bg-[#023047] text-white border-[#023047]'
                      : 'bg-white text-[#023047] border-[#023047] hover:bg-gray-50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Bouton de validation centré */}
        <div className="flex justify-center">
          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              disabled={!canProceed}
              className={`px-12 py-3 rounded-xl font-bold transition-all ${
                canProceed
                  ? 'bg-[#023047] text-white hover:bg-[#034563]'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Valider
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!canProceed}
              className={`px-12 py-3 rounded-xl font-medium transition-all ${
                canProceed
                  ? 'bg-[#023047] text-white hover:bg-[#034563]'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Valider
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Autoevo;