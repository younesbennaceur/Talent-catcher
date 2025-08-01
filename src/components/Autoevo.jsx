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
    type: 'slider',
    question: "À quel niveau évalues-tu ta confiance en toi durant cette session ?",
    labels: {
      left: "Très faible",
      center: "Moyenne",
      right: "Très élevée"
    }
  },
  {
    id: 4,
    type: 'multiple',
    question: "Comment évalues-tu ta compréhension du sujet abordé ?",
    options: [
      "Excellente",
      "Bonne",
      "Moyenne",
      "Insuffisante"
    ]
  },
  {
    id: 5,
    type: 'slider',
    question: "À quel point as-tu écouté activement les autres participants ?",
    labels: {
      left: "Pas du tout",
      center: "Partiellement",
      right: "Totalement"
    }
  },
  {
    id: 6,
    type: 'multiple',
    question: "As-tu réussi à adapter ton discours au contexte de la discussion ?",
    options: [
      "Toujours",
      "La plupart du temps",
      "Parfois",
      "Rarement"
    ]
  },
  {
    id: 7,
    type: 'slider',
    question: "Comment évalues-tu le professionnalisme de ton attitude ?",
    labels: {
      left: "Peu professionnel",
      center: "Acceptable",
      right: "Très professionnel"
    }
  },
  {
    id: 8,
    type: 'multiple',
    question: "As-tu bien géré ton temps de parole pendant la session ?",
    options: [
      "Oui, parfaitement",
      "Globalement oui",
      "Pas vraiment",
      "Non, pas du tout"
    ]
  },
  {
    id: 9,
    type: 'slider',
    question: "À quel point tes arguments étaient-ils pertinents et bien construits ?",
    labels: {
      left: "Peu pertinents",
      center: "Moyennement",
      right: "Très pertinents"
    }
  },
  {
    id: 10,
    type: 'slider',
    question: "Globalement, à quel niveau es-tu satisfait·e de ta performance ?",
    labels: {
      left: "Très insatisfait·e",
      center: "Moyennement",
      right: "Très satisfait·e"
    }
  }
];

const Autoevo = ({ onValidate }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});

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

  const handleSubmit = () => {
    console.log("Résultats de l'auto-évaluation :", responses);
    onValidate();
  };

  const isLastQuestion = currentQuestion === questions.length - 1;
  const canProceed = responses[questions[currentQuestion].id] !== undefined;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const currentQ = questions[currentQuestion];

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 max-w-4xl w-full mx-4 relative">
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
                  className={`w-full p-4 rounded-xl text-left font-medium transition-all ${
                    responses[currentQ.id] === option
                      ? 'bg-[#023047] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Boutons de navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              currentQuestion === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            }`}
          >
            Précédent
          </button>

          <span className="text-gray-500 font-medium">
            {currentQuestion + 1} / {questions.length}
          </span>

          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              disabled={!canProceed}
              className={`px-8 py-3 rounded-xl font-bold transition-all ${
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
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                canProceed
                  ? 'bg-[#023047] text-white hover:bg-[#034563]'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Suivant
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Autoevo;