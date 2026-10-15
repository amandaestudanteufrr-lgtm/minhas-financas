// hooks/useCotacoes.js
import { useState, useEffect } from 'react';

// Documentação em https://docs.awesomeapi.com.br/api-de-moedas
// Tem limitacao de consultas
// const API_URL = 'https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL';

// API de exemplo
// Sem a limitacao de consulta
const API_URL = 'https://api.cotacoes.cloud.marcelomatos.dev/cotacoes.json';

export function useCotacoes() {
  const [cotacoes, setCotacoes] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    buscarCotacoes();
  }, []);

  async function buscarCotacoes() {
    try {
      setCarregando(true);
      setErro(null);
      const resposta = await fetch(API_URL);
      if (!resposta.ok) throw new Error('Falha na requisição');
      const dados = await resposta.json();
      setCotacoes({
        dolar: parseFloat(dados.USDBRL.bid),
        euro: parseFloat(dados.EURBRL.bid),
      });
    } catch (e) {
      setErro('Não foi possível carregar as cotações.');
    } finally {
      setCarregando(false);
    }
  }

  return { cotacoes, carregando, erro, atualizar: buscarCotacoes };
}