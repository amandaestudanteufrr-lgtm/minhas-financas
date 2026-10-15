// screens/SobreScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cores, espacamento } from '../theme';

export function SobreScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Minhas Finanças</Text>
        <Text style={styles.versao}>Versão 1.0.0</Text>
        <Text style={styles.descricao}>
          App de controle financeiro pessoal desenvolvido durante o Módulo 06
          do Curso de Capacitação em Desenvolvimento Full Stack — ITEAM.
        </Text>
        <Text style={styles.tech}>React Native · Expo · AsyncStorage</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: cores.fundo },
  container: { flex: 1, padding: espacamento.md, justifyContent: 'center', alignItems: 'center' },
  titulo: { fontSize: 26, fontWeight: 'bold', color: cores.texto, marginBottom: 4 },
  versao: { fontSize: 14, color: cores.subtexto, marginBottom: espacamento.lg },
  descricao: { fontSize: 15, color: cores.texto, textAlign: 'center', lineHeight: 22, marginBottom: espacamento.md },
  tech: { fontSize: 13, color: cores.subtexto },
});