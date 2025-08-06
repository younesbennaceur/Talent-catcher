import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../lib/firebase';

export function useResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const resetPassword = async (email) => {
    if (!email) {
      setError('L\'adresse email est obligatoire');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (err) {
      console.error('Reset password error:', err);
      
      // Gestion des erreurs spécifiques Firebase
      switch (err.code) {
        case 'auth/user-not-found':
          setError('Aucun compte associé à cette adresse email');
          break;
        case 'auth/invalid-email':
          setError('Adresse email invalide');
          break;
        case 'auth/too-many-requests':
          setError('Trop de tentatives. Veuillez réessayer plus tard');
          break;
        default:
          setError('Erreur lors de l\'envoi de l\'email de réinitialisation');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
  };

  return { 
    resetPassword, 
    isLoading, 
    error, 
    success,
    setError,
    resetState
  };
}