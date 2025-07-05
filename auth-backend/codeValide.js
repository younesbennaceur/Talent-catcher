const validCodes = new Set(['123456', '654321', '000000']);

function isCodeValid(code) {
  // Vérifie que c'est une chaîne de 6 chiffres
  const regex = /^\d{6}$/;
  if (!regex.test(code)) return false;

  // Vérifie si le code est dans la liste
  return validCodes.has(code);
}

export { isCodeValid };