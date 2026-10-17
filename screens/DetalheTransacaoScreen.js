// screens/DetalheTransacaoScreen.js
import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Alert, Platform, Image, ScrollView                     // ← NOVO: Image e ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTransacoes } from '../context/TransacoesContext';
import { cores, espacamento, raio } from '../theme';

export function DetalheTransacaoScreen({ route, navigation }) {
  const { transacao } = route.params;
  const isReceita = transacao.tipo === 'receita';
  const { removerTransacao } = useTransacoes();

  function confirmarExclusao() {
    const mensagem = `Deseja excluir "${transacao.descricao}"?`;
    const excluir = () => {
      removerTransacao(transacao.id);
      navigation.goBack();
    };

    if (Platform.OS === 'web') {
      if (window.confirm(mensagem)) excluir();
      return;
    }

    Alert.alert(
      'Excluir transação',
      mensagem,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: excluir },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* ← NOVO: ScrollView para permitir rolar quando há foto de comprovante */}
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={cores.texto} />
          <Text style={styles.textoVoltar}>Voltar</Text>
        </TouchableOpacity>

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

          {/* ← NOVO: mostra coordenadas se existirem */}
          {transacao.latitude != null && transacao.longitude != null && (
            <View style={styles.linha}>
              <Text style={styles.rotulo}>Local</Text>
              <Text style={styles.dado}>
                {transacao.latitude.toFixed(4)}, {transacao.longitude.toFixed(4)}
              </Text>
            </View>
          )}
        </View>

        {/* ← NOVO: mostra a foto do comprovante se existir */}
        {transacao.comprovante && (
          <View style={styles.comprovanteWrapper}>
            <Text style={styles.comprovanteTitulo}>Comprovante</Text>
            <Image source={{ uri: transacao.comprovante }} style={styles.comprovante} resizeMode="contain" />
          </View>
        )}

        <TouchableOpacity
          style={styles.botaoExcluir}
          onPress={confirmarExclusao}
          accessibilityRole="button"
          accessibilityLabel="Excluir transação"
        >
          <Ionicons name="trash-outline" size={20} color={cores.despesa} />
          <Text style={styles.textoExcluir}>Excluir</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: cores.fundo },
  container: {
    flexGrow: 1,                       // ← NOVO: dentro de ScrollView, flex vira flexGrow
    padding: espacamento.md,
    paddingBottom: espacamento.xl,     // ← NOVO: respiro pro botão Excluir não colar na borda
    alignItems: 'center',
  },
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

  // ← NOVO: comprovante
  comprovanteWrapper: {
    width: '100%',
    marginTop: espacamento.lg,
    alignItems: 'center',
  },
  comprovanteTitulo: {
    fontSize: 14, fontWeight: '600', color: cores.subtexto,
    marginBottom: espacamento.sm, alignSelf: 'flex-start',
  },
  comprovante: {
    width: '100%', height: 280,
    borderRadius: raio.md,
    backgroundColor: '#eee',
  },

  botaoExcluir: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, width: '100%',
    marginTop: espacamento.lg,
    paddingVertical: espacamento.md,
    borderRadius: raio.md, borderWidth: 1, borderColor: cores.despesa,
    backgroundColor: 'transparent',
  },
  textoExcluir: { fontSize: 16, fontWeight: '600', color: cores.despesa },
});