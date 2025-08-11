import { useState, useEffect } from "react";
import { useRegister } from "../hooks/useRegister";
import useGoogleAuth from "../hooks/useGoogleAuth";
import { onAuthStateChanged, reload } from 'firebase/auth';
import { auth } from '../lib/firebase';
import CodeValidation from './CodeValidation';

function SignUp({ onClose, onLoginSwitch, onCodeValidation }) { // 👈 Nouvelle prop
  const { register, isLoading, error, setError } = useRegister();
  const {
    signInWithGoogle,
    loading: googleLoading,
    error: googleError,
  } = useGoogleAuth();

  const [rememberMe, setRememberMe] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isGoogleSignup, setIsGoogleSignup] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // 👈 Pour stocker l'utilisateur

  useEffect(() => {
    if (step === 2 && !isGoogleSignup) {
      let intervalId;
      
      const checkEmailVerification = async () => {
        if (auth.currentUser) {
          await reload(auth.currentUser);
          
          if (auth.currentUser.emailVerified) {
            clearInterval(intervalId);
            setStep(3);
            return true;
          }
        }
        return false;
      };

      checkEmailVerification();
      intervalId = setInterval(checkEmailVerification, 3000);

      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          await reload(user);
          if (user.emailVerified) {
            clearInterval(intervalId);
            setStep(3);
          }
        }
      });

      return () => {
        clearInterval(intervalId);
        unsubscribe();
      };
    }
  }, [step, isGoogleSignup]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (error) setError("");
  };

  const handleSubmitForm = async () => {
    await register(
      formData.email,
      formData.password,
      formData.confirmPassword,
      () => setStep(2)
    );
  };

  const handleGoogleSignup = async () => {
    const user = await signInWithGoogle();
    if (user) {
      setIsGoogleSignup(true);
      setCurrentUser(user); // 👈 Stocker l'utilisateur
      setStep(3);
      
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }
    }
  };

  const handleCodeValidationSuccess = () => {
    // 👇 Marquer le code comme validé pour cet utilisateur
    const userId = isGoogleSignup ? currentUser?.uid : auth.currentUser?.uid;
    if (userId && onCodeValidation) {
      onCodeValidation(userId);
    }
    
    // Fermer le modal après un délai
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  // Étape 3: Validation du code
  if (step === 3) {
    return (
      <CodeValidation 
        onValidate={handleCodeValidationSuccess} // 👈 Fonction modifiée
        onClose={onClose}
        isGoogleSignup={isGoogleSignup}
      />
    );
  }

  // Étape 2: Vérification email (seulement pour inscription normale)
  if (step === 2) {
    return (
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="bg-white rounded-4xl p-12 mx-4 flex flex-col gap-8 shadow-lg relative border-3 border-[#023045] border-solid max-w-md w-full">
          <div className="text-center">
            <div className="text-6xl mb-4">📧</div>
            <h1 className="text-3xl font-bold text-[#023045] mb-4">
              Vérifiez votre email
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Un email de vérification a été envoyé à :
            </p>
            <p className="text-lg font-semibold text-[#023045] mb-6">
              {formData.email}
            </p>
            <p className="text-sm text-gray-500 ">
              Cliquez sur le lien dans l'email pour activer votre compte.
              Une fois votre email vérifié, vous pourrez entrer le code du jeu.
            </p>
          </div>

          {error && (
            <div className="text-red-500 text-center font-medium text-sm mb-4">{error}</div>
          )}

          <div className="flex flex-col gap-3">
            <div className="text-center">
              <p className="text-sm text-gray-400 ">
                Vous n'avez pas reçu l'email ? Vérifiez vos spams.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Étape 1: Formulaire d'inscription
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#023045] text-lg"
              placeholder="jonas_kahnwald@gmail.com"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirmer le mot de passe
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
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
          <div className="text-red-500 text-center font-medium">{error}</div>
        )}
        <button
          onClick={handleSubmitForm}
          disabled={isLoading}
          className={`w-full text-xl font-bold py-3 px-8 rounded-xl transition-colors ${
            !isLoading
              ? "bg-[#023045] hover:bg-[#021245] text-white cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isLoading ? "Inscription..." : "S'inscrire"}
        </button>
        <div className="text-center">
          <span className="text-gray-600">ou</span>
        </div>
        <button
          onClick={handleGoogleSignup}
          disabled={googleLoading}
          className="w-full border-2 border-gray-300 text-gray-700 font-medium py-3 px-8 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          <span className="text-lg">G</span>
          {googleLoading ? "Inscription..." : "S'inscrire avec Google"}
        </button>
        {googleError && (
          <div className="text-red-500 text-center font-medium">
            {googleError.message}
          </div>
        )}
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