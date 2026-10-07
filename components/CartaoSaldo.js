// components/CartaoSaldo.js
import { View, Text, StyleSheet } from 'react-native';
import { cores, espacamento, raio } from '../theme';

export function CartaoSaldo({ saldo, mes }) {
  const isPositivo = saldo >= 0;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Saldo em {mes}</Text>
      <Text style={[styles.valor, { color: isPositivo ? cores.receita : cores.despesa }]}>
        R$ {Math.abs(saldo).toFixed(2)}
      </Text>
      {!isPositivo && (
        <Text style={styles.alerta}>⚠️ Saldo negativo</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: cores.primaria,
    borderRadius: raio.lg,
    padding: espacamento.lg,
    marginHorizontal: espacamento.md,
    marginTop: espacamento.md,
    alignItems: 'center',
  },
  label: {
    color: '#bdc3c7',
    fontSize: 14,
    marginBottom: espacamento.sm,
  },
  valor: {
    fontSize: 38,
    fontWeight: 'bold',
  },
  alerta: {
    color: cores.alerta,
    fontSize: 13,
    marginTop: espacamento.sm,
  },
});