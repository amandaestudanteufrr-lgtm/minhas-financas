// screens/BoasVindasScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { cores, espacamento, raio } from '../theme';

export function BoasVindasScreen({ onConcluir }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Ionicons name="wallet" size={80} color={cores.receita} />
        <Text style={styles.titulo}>Bem-vindo ao{'\n'}Minhas Finanças!</Text>
        <Text style={styles.subtitulo}>
          Controle suas receitas e despesas de forma simples e rápida.
        </Text>

        <View style={styles.recursos}>
          {[
            { icone: 'add-circle-outline', texto: 'Registre receitas e despesas' },
            { icone: 'stats-chart-outline', texto: 'Veja seu saldo em tempo real' },
            { icone: 'save-outline', texto: 'Dados salvos no seu dispositivo' },
          ].map((item, i) => (
            <View key={i} style={styles.recurso}>
              <Ionicons name={item.icone} size={22} color={cores.primaria} />
              <Text style={styles.textoRecurso}>{item.texto}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.botao} onPress={onConcluir} activeOpacity={0.8}>
          <Text style={styles.textoBotao}>Começar</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: cores.fundo },
  container: {
    flex: 1, padding: espacamento.md,
    justifyContent: 'center', alignItems: 'center', gap: 16,
  },
  titulo: {
    fontSize: 28, fontWeight: 'bold', color: cores.texto,
    textAlign: 'center', lineHeight: 36,
  },
  subtitulo: { fontSize: 15, color: cores.subtexto, textAlign: 'center', lineHeight: 22 },
  recursos: { gap: 12, marginVertical: 8 },
  recurso: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  textoRecurso: { fontSize: 15, color: cores.texto },
  botao: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: cores.primaria, paddingVertical: 14,
    paddingHorizontal: 32, borderRadius: raio.pill, marginTop: 8,
  },
  textoBotao: { color: '#fff', fontSize: 16, fontWeight: '700' },
});