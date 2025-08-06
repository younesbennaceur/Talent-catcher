import { useState } from "react";
import { useResetPassword } from "../hooks/useResetPassword";

function ResetPassword({ onClose, onBackToLogin }) {
  const { resetPassword, isLoading, error, success, setError } = useResetPassword();
  const [email, setEmail] = useState("");

  const handleInputChange = (value) => {
    setEmail(value);
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await resetPassword(email);
  };

  if (success) {
    return (
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="bg-white rounded-4xl p-8 mx-4 flex flex-col gap-6 shadow-lg relative border-3 border-[#023045] border-solid max-w-md w-full">
          <button
            onClick={onClose}
            className="absolute top-4 right-6 text-gray-700 hover:text-gray-900 font-bold text-3xl"
            aria-label="Fermer"
          >
            ×
          </button>
          
          <div className="text-center">
            <div className="text-6xl mb-4">📧</div>
            <h1 className="text-3xl font-bold text-[#023045] mb-4">
              Email envoyé !
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Un lien de réinitialisation a été envoyé à votre adresse email.
              Vérifiez votre boîte de réception et suivez les instructions.
            </p>
          </div>

          <button
            onClick={onBackToLogin}
            className="w-full bg-[#023045] hover:bg-[#021245] text-white font-bold py-3 px-8 rounded-xl transition-colors"
          >
            Retour à la connexion
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white rounded-4xl p-8 mx-4 flex flex-col gap-6 shadow-lg relative border-3 border-[#023045] border-solid max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-gray-700 hover:text-gray-900 font-bold text-3xl"
          aria-label="Fermer"
        >
          ×
        </button>
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#023045] mb-2">
            Mot de passe oublié ?
          </h1>
          <p className="text-lg text-gray-600">
            Entrez votre adresse email pour recevoir un lien de réinitialisation
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#023045] text-lg"
              placeholder="jonas_kahnwald@gmail.com"
              disabled={isLoading}
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-center font-medium text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !email}
            className={`w-full text-xl font-bold py-3 px-8 rounded-xl transition-colors ${
              !isLoading && email
                ? "bg-[#023045] hover:bg-[#021245] text-white cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isLoading ? "Envoi en cours..." : "Envoyer le lien"}
          </button>
        </form>

        <div className="text-center">
          <button
            type="button"
            onClick={onBackToLogin}
            className="text-[#023045] underline font-medium hover:text-[#021245] cursor-pointer"
          >
            Retour à la connexion
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;