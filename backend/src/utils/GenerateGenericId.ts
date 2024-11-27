function generateCustomerId(): number {
  // Gera um número aleatório entre 1 e 999999
  return Math.floor(1 + Math.random() * 900000);
}

export { generateCustomerId };
