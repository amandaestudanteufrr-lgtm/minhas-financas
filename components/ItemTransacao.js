// components/ItemTransacao.js
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores, espacamento, raio } from '../theme';

// Mapeamento de categoria para ícone Ionicons
const ICONES = {
  alimentacao: 'restaurant',
  transporte: 'car',
  saude: 'medical',
  lazer: 'game-controller',
  salario: 'cash',
  moradia: 'home',
  educacao: 'school',
  outros: 'ellipsis-horizontal-circle',
};

export function ItemTransacao({ descricao, valor, categoria, tipo, data, onPress }) {
  const isReceita = tipo === 'receita';
  const nomeIcone = ICONES[categoria] ?? 'ellipsis-horizontal-circle';

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      {/* Ícone da categoria */}
      <View style={[
        styles.iconeContainer,
        { backgroundColor: isReceita ? cores.receitaFundo : cores.despesaFundo }
      ]}>
        <Ionicons
          name={nomeIcone}
          size={22}
          color={isReceita ? cores.receita : cores.despesa}
        />
      </View>

      {/* Descrição e data */}
      <View style={styles.info}>
        <Text style={styles.descricao} numberOfLines={1}>{descricao}</Text>
        <Text style={styles.data}>{data}</Text>
      </View>

      {/* Valor */}
      <Text style={[styles.valor, { color: isReceita ? cores.receita : cores.despesa }]}>
        {isReceita ? '+' : '-'} R$ {valor.toFixed(2)}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cores.cartao,
    borderRadius: raio.md,
    padding: espacamento.md,
    marginBottom: espacamento.sm,
    // Sombra (iOS):
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    // Sombra (Android):
    elevation: 2,
  },
  iconeContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,            // círculo perfeito (metade do width/height)
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: espacamento.md,
  },
  info: {
    flex: 1,                     // ocupa todo o espaço entre o ícone e o valor
  },
  descricao: {
    fontSize: 15,
    fontWeight: '600',
    color: cores.texto,
  },
  data: {
    fontSize: 12,
    color: cores.subtexto,
    marginTop: 2,
  },
  valor: {
    fontSize: 15,
    fontWeight: '700',
    marginLeft: espacamento.sm,
  },
});