// screens/DetalheTransacaoScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { cores, espacamento, raio } from '../theme';

export function DetalheTransacaoScreen({ route, navigation }) {
  const { transacao } = route.params;  // recebe os dados via navigate()
  const isReceita = transacao.tipo === 'receita';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Botão voltar */}
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={cores.texto} />
          <Text style={styles.textoVoltar}>Voltar</Text>
        </TouchableOpacity>

        {/* Ícone do tipo */}
        <View style={[styles.icone, { backgroundColor: isReceita ? cores.receitaFundo : cores.despesaFundo }]}>
          <Ionicons
            name={isReceita ? 'arrow-up-circle' : 'arrow-down-circle'}
            size={48}
            color={isReceita ? cores.receita : cores.despesa}
          />
        </View>

        <Text style={styles.descricao}>{transacao.descricao}</Text>
        <Text style={[styles.valor, { color: isReceita ? cores.receita : cores.despesa }]}>
          {isReceita ? '+' : '-'} R$ {transacao.valor.toFixed(2)}
        </Text>

        <View style={styles.tabela}>
          <View style={styles.linha}>
            <Text style={styles.rotulo}>Tipo</Text>
            <Text style={styles.dado}>{isReceita ? 'Receita' : 'Despesa'}</Text>
          </View>
          <View style={styles.linha}>
            <Text style={styles.rotulo}>Categoria</Text>
            <Text style={styles.dado}>{transacao.categoria}</Text>
          </View>
          <View style={styles.linha}>
            <Text style={styles.rotulo}>Data</Text>
            <Text style={styles.dado}>{transacao.data}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: cores.fundo },
  container: { flex: 1, padding: espacamento.md, alignItems: 'center' },
  botaoVoltar: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    alignSelf: 'flex-start', marginBottom: espacamento.lg,
  },
  textoVoltar: { fontSize: 16, color: cores.texto },
  icone: {
    width: 88, height: 88, borderRadius: 44,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: espacamento.md,
  },
  descricao: { fontSize: 22, fontWeight: 'bold', color: cores.texto, marginBottom: 4 },
  valor: { fontSize: 32, fontWeight: '800', marginBottom: espacamento.lg },
  tabela: {
    width: '100%', backgroundColor: cores.cartao,
    borderRadius: raio.md, padding: espacamento.md, gap: 12,
  },
  linha: { flexDirection: 'row', justifyContent: 'space-between' },
  rotulo: { fontSize: 14, color: cores.subtexto },
  dado: { fontSize: 14, fontWeight: '600', color: cores.texto },
});