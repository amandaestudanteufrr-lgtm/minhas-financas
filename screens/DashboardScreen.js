// screens/DashboardScreen.js
import React from 'react';
import {
  ScrollView, View, Text, StyleSheet,
  ActivityIndicator, Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { setStatusBarStyle } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { CartaoSaldo } from '../components/CartaoSaldo';
import { CardsResumo } from '../components/CardsResumo';
import { CartaoCotacoes } from '../components/CartaoCotacoes';   // ← NOVO
import { ItemTransacao } from '../components/ItemTransacao';
import { useTransacoes } from '../context/TransacoesContext';
import { cores, espacamento } from '../theme';

export function DashboardScreen({ navigation, route }) {
  const { transacoes, saldo, receitas, despesas, carregando, removerTransacao } = useTransacoes();

  // Mantém o status bar claro enquanto o Dashboard está em foco (cabeçalho azul) — vindo da Aula 4
  useFocusEffect(
    React.useCallback(() => {
      setStatusBarStyle('light');
      return () => setStatusBarStyle('dark');
    }, [])
  );

  function confirmarExclusao(id, descricao) {
    Alert.alert(
      'Excluir transação',
      `Deseja excluir "${descricao}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => removerTransacao(id) },
      ]
    );
  }

  // Tela de carregamento
  if (carregando) {
    return (
      <View style={styles.centralizador}>
        <ActivityIndicator size="large" color={cores.primaria} />
        <Text style={styles.textoCarregando}>Carregando suas finanças...</Text>
      </View>
    );
  }

  // Renderiza o Dashboard: cabeçalho, cartão de saldo, resumo, cotações do dia e lista de transações
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.cabecalho}>
          <Text style={styles.titulo}>Minhas Finanças</Text>
          <Text style={styles.subtitulo}>
            {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
          </Text>
        </View>

        <CartaoSaldo
          saldo={saldo}
          mes={new Date().toLocaleDateString('pt-BR', { month: 'long' })}
        />

        <CardsResumo receitas={receitas} despesas={despesas} />

        <CartaoCotacoes />

        <View style={styles.secao}>
          <Text style={styles.tituloSecao}>Transações Recentes</Text>

          {transacoes.length === 0 ? (
            <View style={styles.vazio}>
              <Ionicons name="wallet-outline" size={64} color="#bdc3c7" />
              <Text style={styles.textoVazio}>Nenhuma transação ainda</Text>
              <Text style={styles.subtextoVazio}>
                Toque em "Nova Transação" para começar
              </Text>
            </View>
          ) : (
            transacoes.map(t => (
              <ItemTransacao
                key={t.id}
                descricao={t.descricao}
                valor={t.valor}
                tipo={t.tipo}
                categoria={t.categoria}
                data={t.data}
                // Navega para o detalhe (DetalheTransacaoScreen criada na Aula 4)
                onPress={() => navigation.navigate('DetalheTransacao', { transacao: t })}
                onLongPress={() => confirmarExclusao(t.id, t.descricao)}
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: cores.primaria },
  scroll: { flex: 1, backgroundColor: cores.fundo },
  centralizador: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: cores.fundo,
  },
  textoCarregando: { marginTop: 12, color: cores.subtexto, fontSize: 14 },
  cabecalho: {
    backgroundColor: cores.primaria,
    paddingHorizontal: espacamento.md,
    paddingVertical: espacamento.lg,
  },
  titulo: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  subtitulo: { color: '#bdc3c7', fontSize: 14, marginTop: 2, textTransform: 'capitalize' },
  secao: { padding: espacamento.md },
  tituloSecao: { fontSize: 17, fontWeight: '700', color: cores.texto, marginBottom: espacamento.md },
  vazio: { alignItems: 'center', paddingVertical: 48, gap: 8 },
  textoVazio: { fontSize: 17, fontWeight: '600', color: cores.subtexto },
  subtextoVazio: { fontSize: 13, color: '#bdc3c7', textAlign: 'center' },
});