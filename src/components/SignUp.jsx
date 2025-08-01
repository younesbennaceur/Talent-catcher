import React, { useState, useRef } from 'react';

function SignUp({ onClose, onLoginSwitch }) {
  const [step, setStep] = useState(1); // 1: formulaire, 2: code validation
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [code, setCode] = useState(['', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const inputRefs = useRef([]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) setError('');
  };

  const handleCodeInputChange = (index, value) => {
    const numericValue = value.replace(/\D/g, '');
    
    if (numericValue.length <= 1) {
      const newCode = [...code];
      newCode[index] = numericValue;
      setCode(newCode);

      if (error) setError('');

      if (numericValue && index < 4) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    else if (e.key === 'ArrowRight' && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 5);
    const newCode = [...code];
    
    for (let i = 0; i < pastedData.length && i < 5; i++) {
      newCode[i] = pastedData[i];
    }
    
    setCode(newCode);
    
    const nextIndex = Math.min(pastedData.length, 4);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmitForm = async () => {
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError('Tous les champs sont obligatoires');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simuler l'envoi du formulaire d'inscription
      const response = await fetch('https://talent-catcher.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStep(2); // Passer à l'étape de validation du code
      } else {
        setError(data.message || 'Erreur lors de l\'inscription');
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      setError('Erreur de connexion au serveur');
    } finally {
      setIsLoading(false);
    }
  };

  const handleValidateCode = async () => {
    const fullCode = code.join('');
    if (fullCode.length === 5) {
      setIsLoading(true);
      setError('');

      try {
        const response = await fetch('https://talent-catcher.onrender.com/validate-registration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            email: formData.email,
            code: fullCode 
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          // Inscription réussie, rediriger vers la connexion
          onLoginSwitch();
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

  const isFormValid = formData.email && formData.password && formData.confirmPassword;
  const isCodeComplete = code.every(digit => digit !== '');

  if (step === 2) {
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
            <h1 className="text-3xl font-bold text-[#023045] mb-4">Dernière étape</h1>
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
                onChange={(e) => handleCodeInputChange(index, e.target.value)}
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
            onClick={handleValidateCode}
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

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white rounded-4xl p-8 mx-4 flex flex-col gap-8 shadow-lg relative border-3 border-[#023045] border-solid max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-gray-700 hover:text-gray-900 font-bold text-3xl"
          aria-label="Fermer"
        >
          ×
        </button>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#023045]">Créer un compte</h1>
          <p className="text-lg text-gray-600">
            Créer un compte pour accéder au jeu
          </p>
        </div>

        <div className="flex flex-col ">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#023045] text-lg"
              placeholder="jonas_kahnwald@gmail.com"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#023045] text-lg pr-12"
                placeholder="Mot de passe"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                👁️
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#023045] text-lg pr-12"
                placeholder="Confirmer le mot de passe"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                👁️
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-center font-medium">
            {error}
          </div>
        )}

        <button
          onClick={handleSubmitForm}
          disabled={!isFormValid || isLoading}
          className={`w-full text-xl font-bold py-3 px-8 rounded-xl transition-colors ${
            isFormValid && !isLoading
              ? 'bg-[#023045] hover:bg-[#021245] text-white cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isLoading ? 'Inscription...' : "S'inscrire"}
        </button>

        <div className="text-center">
          <span className="text-gray-600">ou</span>
        </div>

        <button className="w-full border-2 border-gray-300 text-gray-700 font-medium py-3 px-8 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
          <span className="text-lg">G</span>
          S'inscrire avec Google
        </button>

        <div className="text-center">
          <span className="text-gray-600">Déjà un compte ? </span>
          <button
            type="button"
            onClick={onLoginSwitch}
            className="text-[#023045] underline font-medium hover:text-[#021245] cursor-pointer"
          >
            Se connecter
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;