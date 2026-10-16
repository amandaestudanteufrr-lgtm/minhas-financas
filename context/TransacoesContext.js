// context/TransacoesContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  inicializarBanco,
  buscarTodasTransacoes,
  inserirTransacao,
  excluirTransacao,
} from '../database/db';

const TransacoesContext = createContext(null);

export function TransacoesProvider({ children }) {
  const [transacoes, setTransacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    (async () => {
      await inicializarBanco();   // cria a tabela se não existir
      await carregarTransacoes();
    })();
  }, []);

  async function carregarTransacoes() {
    try {
      setCarregando(true);
      const dados = await buscarTodasTransacoes();
      setTransacoes(dados);
    } catch (erro) {
      console.error('Erro ao carregar transações:', erro);
    } finally {
      setCarregando(false);
    }
  }

  async function adicionarTransacao(novaTransacao) {
    await inserirTransacao(novaTransacao);
    setTransacoes(prev => [novaTransacao, ...prev]);
  }

  async function removerTransacao(id) {
    await excluirTransacao(id);
    setTransacoes(prev => prev.filter(t => t.id !== id));
  }

  const receitas = transacoes
    .filter(t => t.tipo === 'receita')
    .reduce((soma, t) => soma + t.valor, 0);

  const despesas = transacoes
    .filter(t => t.tipo === 'despesa')
    .reduce((soma, t) => soma + t.valor, 0);

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

export function useTransacoes() {
  const contexto = useContext(TransacoesContext);
  if (!contexto) {
    throw new Error('useTransacoes precisa estar dentro de <TransacoesProvider>');
  }
  return contexto;
}