// screens/DashboardScreen.js
import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { setStatusBarStyle } from 'expo-status-bar';
import { CartaoSaldo } from '../components/CartaoSaldo';
import { CardsResumo } from '../components/CardsResumo';
import { ItemTransacao } from '../components/ItemTransacao';
import { cores, espacamento } from '../theme';

const TRANSACOES_INICIAIS = [
  { id: '1', descricao: 'Salário', valor: 3200, tipo: 'receita', categoria: 'salario', data: '01/05/2026' },
  { id: '2', descricao: 'Aluguel', valor: 900, tipo: 'despesa', categoria: 'moradia', data: '05/05/2026' },
  { id: '3', descricao: 'Supermercado', valor: 280.50, tipo: 'despesa', categoria: 'alimentacao', data: '07/05/2026' },
  { id: '4', descricao: 'Energia', valor: 400, tipo: 'despesa', categoria: 'moradia', data: '09/05/2026' },
  { id: '5', descricao: 'Água', valor: 70.50, tipo: 'despesa', categoria: 'moradia', data: '10/05/2026' },
];

export function DashboardScreen({ navigation, route }) {
  const [transacoes, setTransacoes] = React.useState(TRANSACOES_INICIAIS);

  // Recebe novas transações vindas da tela de formulário
  React.useEffect(() => {
    if (route.params?.novaTransacao) {
      setTransacoes(prev => [route.params.novaTransacao, ...prev]);
    }
  }, [route.params?.novaTransacao]);

  // Status bar claro enquanto o Dashboard está em foco (cabeçalho azul)
  useFocusEffect(
    React.useCallback(() => {
      setStatusBarStyle('light');
      return () => setStatusBarStyle('dark');
    }, [])
  );

  const receitas = transacoes
    .filter(t => t.tipo === 'receita')
    .reduce((acc, t) => acc + t.valor, 0);

  const despesas = transacoes
    .filter(t => t.tipo === 'despesa')
    .reduce((acc, t) => acc + t.valor, 0);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.cabecalho}>
          <Text style={styles.titulo}>Minhas Finanças</Text>
          <Text style={styles.subtitulo}>Maio 2026</Text>
        </View>

        <CartaoSaldo saldo={receitas - despesas} mes="Maio" />
        <CardsResumo receitas={receitas} despesas={despesas} />

        <View style={styles.secao}>
          <Text style={styles.tituloSecao}>Transações Recentes</Text>
          {transacoes.map(t => (
            <ItemTransacao
              key={t.id}
              descricao={t.descricao}
              valor={t.valor}
              tipo={t.tipo}
              categoria={t.categoria}
              data={t.data}
              // Navega para o detalhe passando a transação inteira via route.params
              // (a tela DetalheTransacao será criada no Passo 8)
              onPress={() => navigation.navigate('DetalheTransacao', { transacao: t })}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: cores.primaria },
  scroll: { flex: 1, backgroundColor: cores.fundo },
  cabecalho: {
    backgroundColor: cores.primaria,
    paddingHorizontal: espacamento.md,
    paddingVertical: espacamento.lg,
  },
  titulo: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  subtitulo: { color: '#bdc3c7', fontSize: 14, marginTop: 2 },
  secao: { padding: espacamento.md },
  tituloSecao: { fontSize: 17, fontWeight: '700', color: cores.texto, marginBottom: espacamento.md },
});