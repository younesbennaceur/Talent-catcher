import React, { useState, useRef } from 'react';

function Login({ onClose, onValidate }) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);

  const handleInputChange = (index, value) => {
    // Ne garder que les chiffres
    const numericValue = value.replace(/\D/g, '');
    
    if (numericValue.length <= 1) {
      const newCode = [...code];
      newCode[index] = numericValue;
      setCode(newCode);

      // Effacer l'erreur quand l'utilisateur tape
      if (error) setError('');

      // Passer au champ suivant si on saisit un chiffre
      if (numericValue && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Retour arrière : effacer et passer au champ précédent
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    // Flèches pour naviguer
    else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newCode = [...code];
    
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newCode[i] = pastedData[i];
    }
    
    setCode(newCode);
    
    // Focus sur le dernier champ rempli ou le suivant
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleValidate = async () => {
    const fullCode = code.join('');
    if (fullCode.length === 6) {
      setIsLoading(true);
      setError('');

      try {
        // URL mise à jour pour pointer vers votre serveur Render
        const response = await fetch('https://talent-catcher.onrender.com/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code: fullCode }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          onValidate(fullCode);
        } else {
          setError(data.message || 'Code invalide');
        }
      } catch (error) {
        console.error('Erreur lors de la validation:', error);
        setError('Erreur de connexion au serveur');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const isCodeComplete = code.every(digit => digit !== '');

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white rounded-4xl p-12 mx-4 flex flex-col gap-8 shadow-lg relative border-3 border-[#023045] border-solid max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-gray-700 hover:text-gray-900 font-bold text-3xl"
          aria-label="Fermer"
        >
          ×
        </button>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#023045] mb-4">Connexion au jeu</h1>
          <p className="text-lg text-gray-600">
            Scannez le QR code fourni avec le jeu, et entrez le code affiché.
          </p>
        </div>

        <div className="flex justify-center gap-3">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className={`w-12 h-12 text-center text-2xl font-bold border-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023045] focus:border-transparent ${
                error ? 'border-red-500' : 'border-[#023045]'
              }`}
              maxLength={1}
              inputMode="numeric"
              disabled={isLoading}
            />
          ))}
        </div>

        {error && (
          <div className="text-red-500 text-center font-medium">
            {error}
          </div>
        )}

        <button
          onClick={handleValidate}
          disabled={!isCodeComplete || isLoading}
          className={`block mx-auto text-2xl font-bold py-3 px-8 rounded-xl transition-colors ${
            isCodeComplete && !isLoading
              ? 'bg-[#023045] hover:bg-[#021245] text-white cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isLoading ? 'Validation...' : 'Valider'}
        </button>
      </div>
    </div>
  );
}

export default Login;