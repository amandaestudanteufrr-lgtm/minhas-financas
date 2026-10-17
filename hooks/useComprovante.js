// hooks/useComprovante.js
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export function useComprovante() {
  const [obtendo, setObtendo] = useState(false);

  // Opção 1 — abre a câmera do dispositivo
  async function tirarFoto() {
    setObtendo(true);
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') return null;

      const resultado = await ImagePicker.launchCameraAsync({
        quality: 0.5,
        allowsEditing: true,
        aspect: [3, 4],
      });

      if (resultado.canceled) return null;
      return resultado.assets[0].uri;
    } catch (erro) {
      console.error('Erro ao tirar foto:', erro);
      return null;
    } finally {
      setObtendo(false);
    }
  }

  // Opção 2 — abre a galeria do dispositivo
  async function escolherDaGaleria() {
    setObtendo(true);
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') return null;

      const resultado = await ImagePicker.launchImageLibraryAsync({
        quality: 0.5,
        allowsEditing: true,
        aspect: [3, 4],
      });

      if (resultado.canceled) return null;
      return resultado.assets[0].uri;
    } catch (erro) {
      console.error('Erro ao escolher imagem:', erro);
      return null;
    } finally {
      setObtendo(false);
    }
  }

  return { tirarFoto, escolherDaGaleria, obtendo };
}