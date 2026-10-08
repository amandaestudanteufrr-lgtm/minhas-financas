// screens/DashboardScreen.js -> Define o arquivo da tela principal do painel financeiro
import React from 'react'; // Importa a biblioteca do React para construir o componente
import { ScrollView, View, Text, StyleSheet } from 'react-native'; // Importa componentes visuais básicos do React Native (rolagem, blocos, textos e estilos)
import { SafeAreaView } from 'react-native-safe-area-context'; // Importa o componente que protege a área da tela para não encostar na barra de status
import { useFocusEffect } from '@react-navigation/native'; // Importa um ganho (hook) para monitorar quando a tela entra ou sai de foco
import { setStatusBarStyle } from 'expo-status-bar'; // Importa a função para alterar a cor dos ícones da barra de status do celular
import { CartaoSaldo } from '../components/CartaoSaldo'; // Importa o componente visual que exibe o cartão com o saldo total
import { CardsResumo } from '../components/CardsResumo'; // Importa o componente que mostra o resumo das receitas e despesas
import { ItemTransacao } from '../components/ItemTransacao'; // Importa o componente que desenha cada linha de transação na lista
import { cores, espacamento } from '../theme'; // Importa as configurações globais de cores e espaçamentos do app

// Lista inicial de transações mockadas (de exemplo) que aparecem assim que o app abre
const TRANSACOES_INICIAIS = [
  { id: '1', descricao: 'Salário', valor: 3200, tipo: 'receita', categoria: 'salario', data: '01/05/2026' },
  { id: '2', descricao: 'Aluguel', valor: 900, tipo: 'despesa', categoria: 'moradia', data: '05/05/2026' },
  { id: '3', descricao: 'Supermercado', valor: 280.50, tipo: 'despesa', categoria: 'alimentacao', data: '07/05/2026' },
  { id: '4', descricao: 'Energia', valor: 400, tipo: 'despesa', categoria: 'moradia', data: '09/05/2026' },
  { id: '5', descricao: 'Água', valor: 70.50, tipo: 'despesa', categoria: 'moradia', data: '10/05/2026' },
];

export function DashboardScreen({ navigation, route }) { // Cria e exporta o componente principal da tela, recebendo ferramentas de navegação e parâmetros
  const [transacoes, setTransacoes] = React.useState(TRANSACOES_INICIAIS); // Cria o estado local para armazenar e atualizar a lista de transações

  // Fica escutando se veio alguma nova transação cadastrada pela tela de formulário para adicioná-la no topo da lista
  React.useEffect(() => {
    if (route.params?.novaTransacao) {
      setTransacoes(prev => [route.params.novaTransacao, ...prev]);
    }
  }, [route.params?.novaTransacao]);

  // Altera a cor dos ícones do topo do celular para claro quando esta tela está aberta, e volta ao normal ao sair
  useFocusEffect(
    React.useCallback(() => {
      setStatusBarStyle('light');
      return () => setStatusBarStyle('dark');
    }, [])
  );

  // Soma todas as receitas (entradas de dinheiro) cadastradas
  const receitas = transacoes
    .filter(t => t.tipo === 'receita')
    .reduce((acc, t) => acc + t.valor, 0);

  // Soma todas as despesas (saídas de dinheiro) cadastradas
  const despesas = transacoes
    .filter(t => t.tipo === 'despesa')
    .reduce((acc, t) => acc + t.valor, 0);

  return (
    // Área segura limitada apenas ao topo para pintar a barra de status com a cor azul principal
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Área com rolagem vertical para permitir rolar a tela se o conteúdo for grande */}
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        
        {/* Cabeçalho azul contendo o título do app e o mês atual */}
        <View style={styles.cabecalho}>
          <Text style={styles.titulo}>Minhas Finanças</Text>
          <Text style={styles.subtitulo}>Outubro 2026</Text>
        </View>

        {/* Componente que exibe o saldo total subtraindo despesas de receitas */}
        <CartaoSaldo saldo={receitas - despesas} mes="Outubro" />
        
        {/* Componente que exibe os cartões lado a lado com o total de receitas e despesas */}
        <CardsResumo receitas={receitas} despesas={despesas} />

        {/* Seção que lista as transações recentes */}
        <View style={styles.secao}>
          <Text style={styles.tituloSecao}>Transações Recentes</Text>
          
          {/* Percorre cada transação da lista e desenha um item na tela */}
          {transacoes.map(t => (
            <ItemTransacao
              key={t.id}
              descricao={t.descricao}
              valor={t.valor}
              tipo={t.tipo}
              categoria={t.categoria}
              data={t.data}
              // Ao tocar em uma transação, navega para a tela de detalhes enviando os dados dela
              onPress={() => navigation.navigate('DetalheTransacao', { transacao: t })}
            />
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// Objeto de estilos visuais da tela
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: cores.primaria }, // Ocupa a tela inteira e define fundo primário no topo
  scroll: { flex: 1, backgroundColor: cores.fundo }, // Define a cor de fundo padrão para a área rolável
  cabecalho: {
    backgroundColor: cores.primaria,
    paddingHorizontal: espacamento.md,
    paddingVertical: espacamento.lg,
  }, // Estiliza o bloco do cabeçalho superior com espaçamento interno
  titulo: { color: '#fff', fontSize: 22, fontWeight: 'bold' }, // Estilo do título principal (branco e negrito)
  subtitulo: { color: '#bdc3c7', fontSize: 14, marginTop: 2 }, // Estilo do subtítulo do mês
  secao: { padding: espacamento.md }, // Espaçamento ao redor da seção de transações
  tituloSecao: { fontSize: 17, fontWeight: '700', color: cores.texto, marginBottom: espacamento.md }, // Estilo do título da seção
});