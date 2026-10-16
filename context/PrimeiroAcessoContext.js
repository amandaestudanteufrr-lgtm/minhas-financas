// context/PrimeiroAcessoContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE = '@minhasfinancas:primeiro_acesso_concluido';

const PrimeiroAcessoContext = createContext(null);

export function PrimeiroAcessoProvider({ children }) {
  const [primeiroAcesso, setPrimeiroAcesso] = useState(true);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(CHAVE).then(valor => {
      if (valor === 'true') setPrimeiroAcesso(false);
      setCarregando(false);
    });
  }, []);

  async function concluir() {
    await AsyncStorage.setItem(CHAVE, 'true');
    setPrimeiroAcesso(false);
  }

  return (
    <PrimeiroAcessoContext.Provider value={{ primeiroAcesso, carregando, concluir }}>
      {children}
    </PrimeiroAcessoContext.Provider>
  );
}

export function usePrimeiroAcesso() {
  const contexto = useContext(PrimeiroAcessoContext);
  if (!contexto) {
    throw new Error('usePrimeiroAcesso precisa estar dentro de <PrimeiroAcessoProvider>');
  }
  return contexto;
}