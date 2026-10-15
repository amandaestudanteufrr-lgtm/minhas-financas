// screens/RelatorioScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cores, espacamento, raio } from '../theme';
import { useTransacoes } from '../context/TransacoesContext';  // ← NOVO

export function RelatorioScreen() {
  const { receitas, despesas, saldo, transacoes } = useTransacoes();  // ← NOVO

  const total = receitas + despesas || 1;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Relatório — Maio 2026</Text>

        <View style={styles.barra}>
          <View style={[styles.segmento, {
            flex: receitas / total,
            backgroundColor: cores.receita,
          }]} />
          <View style={[styles.segmento, {
            flex: despesas / total,
            backgroundColor: cores.despesa,
          }]} />
        </View>

        <View style={styles.legenda}>
          <View style={styles.itemLegenda}>
            <View style={[styles.ponto, { backgroundColor: cores.receita }]} />
            <Text style={styles.textoLegenda}>Receitas</Text>
            <Text style={styles.valorLegenda}>R$ {receitas.toFixed(2)}</Text>
          </View>
          <View style={styles.itemLegenda}>
            <View style={[styles.ponto, { backgroundColor: cores.despesa }]} />
            <Text style={styles.textoLegenda}>Despesas</Text>
            <Text style={styles.valorLegenda}>R$ {despesas.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.saldoContainer}>
          <Text style={styles.saldoLabel}>Saldo do mês</Text>
          <Text style={[styles.saldoValor, { color: saldo >= 0 ? cores.receita : cores.despesa }]}>
            R$ {saldo.toFixed(2)}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: cores.fundo },
  container: { flex: 1, padding: espacamento.md },
  titulo: { fontSize: 20, fontWeight: 'bold', color: cores.texto, marginBottom: espacamento.lg },
  barra: {
    flexDirection: 'row', height: 24, borderRadius: raio.pill,
    overflow: 'hidden', marginBottom: espacamento.md,
  },
  segmento: { height: '100%' },
  legenda: { gap: 12, marginBottom: espacamento.lg },
  itemLegenda: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  ponto: { width: 12, height: 12, borderRadius: 6 },
  textoLegenda: { flex: 1, fontSize: 15, color: cores.texto },
  valorLegenda: { fontSize: 15, fontWeight: '700', color: cores.texto },
  saldoContainer: {
    backgroundColor: cores.cartao, borderRadius: raio.md,
    padding: espacamento.md, alignItems: 'center',
  },
  saldoLabel: { fontSize: 14, color: cores.subtexto },
  saldoValor: { fontSize: 28, fontWeight: 'bold', marginTop: 4 },
});