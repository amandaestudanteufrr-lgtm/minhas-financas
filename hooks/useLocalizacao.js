// hooks/useLocalizacao.js
import { useState } from 'react';
import * as Location from 'expo-location';

export function useLocalizacao() {
  const [obtendo, setObtendo] = useState(false);

  async function obterLocalizacao() {
    setObtendo(true);
    try {
      // 1. Solicita permissão ao usuário
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return null; // usuário negou
      }

      // 2. Obtém as coordenadas atuais
      const posicao = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      return {
        latitude: posicao.coords.latitude,
        longitude: posicao.coords.longitude,
      };
    } catch (erro) {
      console.error('Erro ao obter localização:', erro);
      return null;
    } finally {
      setObtendo(false);
    }
  }

  return { obterLocalizacao, obtendo };
}