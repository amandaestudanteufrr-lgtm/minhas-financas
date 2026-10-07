// components/CardsResumo.js
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores, espacamento, raio } from '../theme';

export function CardsResumo({ receitas, despesas }) {
  return (
    <View style={styles.row}>
      <View style={[styles.card, { backgroundColor: cores.receitaFundo }]}>
        <Ionicons name="arrow-up-circle" size={24} color={cores.receita} />
        <Text style={styles.label}>Receitas</Text>
        <Text style={[styles.valor, { color: cores.receita }]}>
          R$ {receitas.toFixed(2)}
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: cores.despesaFundo }]}>
        <Ionicons name="arrow-down-circle" size={24} color={cores.despesa} />
        <Text style={styles.label}>Despesas</Text>
        <Text style={[styles.valor, { color: cores.despesa }]}>
          R$ {despesas.toFixed(2)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',   // coloca os cards lado a lado
    gap: 12,
    marginHorizontal: espacamento.md,
    marginTop: espacamento.md,
  },
  card: {
    flex: 1,               // cada card ocupa metade da largura
    padding: espacamento.md,
    borderRadius: raio.md,
    alignItems: 'center',
    gap: 4,
  },
  label: {
    fontSize: 13,
    color: cores.texto,
    marginTop: 4,
  },
  valor: {
    fontSize: 18,
    fontWeight: '700',
  },
});