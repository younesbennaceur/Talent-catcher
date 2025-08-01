import React, { useState } from 'react';

function Login({ onClose, onValidate, onRegisterSwitch }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      setError('Tous les champs sont obligatoires');
      return;
    }

    // Mode test pour développement - accès direct avec test@test.com / test123
    if (formData.email === 'test@test.com' && formData.password === 'test123') {
      setIsLoading(true);
      setTimeout(() => {
        onValidate('test-token');
        setIsLoading(false);
      }, 1000);
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
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        onValidate(data.token || 'authenticated');
      } else {
        setError(data.message || 'Email ou mot de passe incorrect');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      setError('Erreur de connexion au serveur. Essayez test@test.com / test123 pour le mode test');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = formData.email && formData.password;

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
          <h1 className="text-3xl font-bold text-[#023045] ">Se connecter</h1>
          <p className="text-lg text-gray-600">
            Connecter vous pour accéder au jeu
          </p>
         
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 ">Email</label>
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
            <label className="block text-sm font-medium text-gray-700 ">Mot de passe</label>
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
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-600">Rester connecté</span>
          </label>
          <button className="text-sm text-[#023045] underline hover:text-[#021245]">
            Mot de passe oublié ?
          </button>
        </div>

        {error && (
          <div className="text-red-500 text-center font-medium">
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!isFormValid || isLoading}
          className={`w-full text-xl font-bold py-3 px-8 rounded-xl transition-colors ${
            isFormValid && !isLoading
              ? 'bg-[#023045] hover:bg-[#021245] text-white cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isLoading ? 'Connexion...' : 'Se connecter'}
        </button>

        <div className="text-center">
          <span className="text-gray-600">ou</span>
        </div>

        <button className="w-full border-2 border-gray-300 text-gray-700 font-medium py-3 px-8 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
          <span className="text-lg">G</span>
          Se connecter avec Google
        </button>

        <div className="text-center">
          <span className="text-gray-600">Pas encore de compte ? </span>
          <button
            type="button"
            onClick={onRegisterSwitch}
            className="text-[#023045] underline font-medium hover:text-[#021245] cursor-pointer"
          >
            Créer en un compte
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;