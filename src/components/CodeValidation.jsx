import React, { useState, useRef, useEffect } from 'react';

const CodeValidation = ({ onValidate, onClose }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);

  // Focus sur le premier input au montage
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInputChange = (index, value) => {
    // Ne permettre que les chiffres
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError(''); // Effacer l'erreur lors de la saisie

    // Passer au champ suivant si une valeur est saisie
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Gérer la suppression (Backspace)
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    // Gérer la navigation avec les flèches
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Gérer la validation avec Entrée
    if (e.key === 'Enter' && code.every(digit => digit !== '')) {
      handleValidate();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    
    // Vérifier que c'est bien 6 chiffres
    if (/^\d{6}$/.test(pastedData)) {
      const newCode = pastedData.split('');
      setCode(newCode);
      setError('');
      // Focus sur le dernier input
      inputRefs.current[5]?.focus();
    }
  };

  const handleValidate = async () => {
    const fullCode = code.join('');
    
    if (fullCode.length !== 6) {
      setError('Veuillez saisir les 6 chiffres');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://talent-catcher.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: fullCode }),
      });

      const data = await response.json();

      if (data.success) {
        onValidate(); // Code valide, continuer
      } else {
        setError('Code invalide. Veuillez réessayer.');
        // Vider les champs et refocus sur le premier
        setCode(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      console.error('Erreur lors de la validation:', error);
      setError('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const isCodeComplete = code.every(digit => digit !== '');

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-lg w-full mx-4 relative border-4 border-[#023047]">
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-gray-700 hover:text-gray-900 font-bold text-3xl"
          aria-label="Fermer"
        >
          ×
        </button>

        {/* Contenu */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#023047] mb-4">
            Dernière étape
          </h2>
          <p className="text-lg text-gray-600">
            Scannez le QR code fourni avec le jeu, et entrez le code affiché.
          </p>
        </div>

        {/* Champs de saisie du code */}
        <div className="flex justify-center gap-3 mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="w-12 h-12 text-center text-xl font-bold border-4 border-[#023047] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023047] focus:border-[#023047]"
              maxLength={1}
              disabled={isLoading}
            />
          ))}
        </div>

        {/* Message d'erreur */}
        {error && (
          <div className="text-red-500 text-center mb-4 font-medium">
            {error}
          </div>
        )}

        {/* Bouton de validation */}
        <div className="text-center">
          <button
            onClick={handleValidate}
            disabled={!isCodeComplete || isLoading}
            className={`px-12 py-3 text-xl font-bold rounded-xl transition-colors ${
              isCodeComplete && !isLoading
                ? 'bg-[#023047] text-white hover:bg-[#034563]'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isLoading ? 'Validation...' : 'Valider'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeValidation;