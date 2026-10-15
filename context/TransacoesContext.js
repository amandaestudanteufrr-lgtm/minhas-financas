// context/TransacoesContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Chave usada para salvar no AsyncStorage
// Prefixo '@minhasfinancas:' evita conflito com outros apps
const CHAVE_STORAGE = '@minhasfinancas:transacoes';

// 1. Criamos o contexto vazio
const TransacoesContext = createContext(null);

// 2. O Provider é o componente que envolve o app e disponibiliza o estado
export function TransacoesProvider({ children }) {
  const [transacoes, setTransacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Executa uma única vez quando o app abre
  useEffect(() => {
    carregarTransacoes();
  }, []);

  // Lê as transações salvas no dispositivo
  async function carregarTransacoes() {
    try {
      setCarregando(true);
      const json = await AsyncStorage.getItem(CHAVE_STORAGE);
      if (json !== null) {
        setTransacoes(JSON.parse(json));
      }
    } catch (erro) {
      console.error('Erro ao carregar transações:', erro);
    } finally {
      // "finally" sempre executa, mesmo se der erro
      setCarregando(false);
    }
  }

  // Adiciona uma nova transação e salva no AsyncStorage
  async function adicionarTransacao(novaTransacao) {
    const atualizadas = [novaTransacao, ...transacoes];
    setTransacoes(atualizadas);  // atualiza a UI imediatamente
    await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(atualizadas));
  }

  // Remove uma transação pelo id e salva no AsyncStorage
  async function removerTransacao(id) {
    const atualizadas = transacoes.filter(t => t.id !== id);
    setTransacoes(atualizadas);
    await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(atualizadas));
  }

  // Calcula os totais a partir do estado atual
  const receitas = transacoes
    .filter(t => t.tipo === 'receita')
    .reduce((soma, t) => soma + t.valor, 0);

  const despesas = transacoes
    .filter(t => t.tipo === 'despesa')
    .reduce((soma, t) => soma + t.valor, 0);

  // Tudo que o contexto disponibiliza para as telas
  const valor = {
    transacoes,
    carregando,
    receitas,
    despesas,
    saldo: receitas - despesas,
    adicionarTransacao,
    removerTransacao,
  };

  return (
    <TransacoesContext.Provider value={valor}>
      {children}
    </TransacoesContext.Provider>
  );
}

// 3. Hook customizado — facilita o uso do contexto nas telas
export function useTransacoes() {
  const contexto = useContext(TransacoesContext);
  if (!contexto) {
    throw new Error('useTransacoes precisa estar dentro de <TransacoesProvider>');
  }
  return contexto;
}