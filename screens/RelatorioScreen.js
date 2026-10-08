// screens/RelatorioScreen.js -> Define o arquivo da tela que exibe o resumo e gráfico de receitas versus despesas
import React from 'react'; // Importa a biblioteca principal do React
import { View, Text, StyleSheet } from 'react-native'; // Importa os componentes visuais básicos do React Native (blocos e textos)
import { SafeAreaView } from 'react-native-safe-area-context'; // Importa o componente para proteger o conteúdo contra o notch e bordas da tela
import { cores, espacamento, raio } from '../theme'; // Importa o arquivo de tema global com cores, espaçamentos e raios de borda

export function RelatorioScreen() { // Cria e exporta o componente funcional da tela de relatório
  // Na Aula 4, estes dados virão do Context (AsyncStorage); por enquanto, usamos valores fixos de exemplo
  const receitas = 3700; // Define o valor total de receitas do mês
  const despesas = 2206.30; // Define o valor total de despesas do mês
  const saldo = receitas - despesas; // Calcula o saldo subtraindo as despesas das receitas
  const total = receitas + despesas; // Calcula a soma total entre receitas e despesas para usar na proporção da barra

  return (
    // Área segura que preenche o espaço respeitando as margens do sistema operacional
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Relatório — Maio 2026</Text> {/* Título principal da página de relatório */}

        {/* Barra visual dividida proporcionalmente entre receitas e despesas */}
        <View style={styles.barra}>
          {/* Segmento da barra que representa as receitas (proporção calculada dividindo receitas pelo total) */}
          <View style={[styles.segmento, {
            flex: receitas / total,
            backgroundColor: cores.receita,
          }]} />
          {/* Segmento da barra que representa as despesas (proporção calculada dividindo despesas pelo total) */}
          <View style={[styles.segmento, {
            flex: despesas / total,
            backgroundColor: cores.despesa,
          }]} />
        </View>

        {/* Bloco de legenda detalhando os valores numéricos */}
        <View style={styles.legenda}>
          {/* Item de legenda das Receitas */}
          <View style={styles.itemLegenda}>
            <View style={[styles.ponto, { backgroundColor: cores.receita }]} />
            <Text style={styles.textoLegenda}>Receitas</Text>
            <Text style={styles.valorLegenda}>R$ {receitas.toFixed(2)}</Text>
          </View>
          {/* Item de legenda das Despesas */}
          <View style={styles.itemLegenda}>
            <View style={[styles.ponto, { backgroundColor: cores.despesa }]} />
            <Text style={styles.textoLegenda}>Despesas</Text>
            <Text style={styles.valorLegenda}>R$ {despesas.toFixed(2)}</Text>
          </View>
        </View>

        {/* Cartão em destaque exibindo o saldo final do mês */}
        <View style={styles.saldoContainer}>
          <Text style={styles.saldoLabel}>Saldo do mês</Text>
          {/* Exibe o saldo formatado, ficando verde se for positivo/zero ou vermelho se for negativo */}
          <Text style={[styles.saldoValor, { color: saldo >= 0 ? cores.receita : cores.despesa }]}>
            R$ {saldo.toFixed(2)}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

// Objeto contendo todos os estilos visuais da tela de relatório
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: cores.fundo }, // Faz a área segura ocupar toda a tela com a cor de fundo padrão
  container: { flex: 1, padding: espacamento.md }, // Organiza o container interno com espaçamento nas bordas
  titulo: { fontSize: 20, fontWeight: 'bold', color: cores.texto, marginBottom: espacamento.lg }, // Estilo do título da página
  barra: {
    flexDirection: 'row', height: 24, borderRadius: raio.pill,
    overflow: 'hidden', marginBottom: espacamento.md,
  }, // Estilo da barra em formato de pílula deitada, escondendo o que passa para fora (overflow hidden)
  segmento: { height: '100%' }, // Altura total de cada pedaço proporcional da barra
  legenda: { gap: 12, marginBottom: espacamento.lg }, // Espaçamento entre os itens da legenda
  itemLegenda: { flexDirection: 'row', alignItems: 'center', gap: 8 }, // Alinha o ponto colorido, o texto e o valor na mesma linha
  ponto: { width: 12, height: 12, borderRadius: 6 }, // Desenha um círculo pequeno colorido (indicador da legenda)
  textoLegenda: { flex: 1, fontSize: 15, color: cores.texto }, // Texto descritivo da legenda
  valorLegenda: { fontSize: 15, fontWeight: '700', color: cores.texto }, // Valor numérico da legenda em negrito
  saldoContainer: {
    backgroundColor: cores.cartao, borderRadius: raio.md,
    padding: espacamento.md, alignItems: 'center',
  }, // Estilo do cartão de fundo onde fica o saldo final centralizado
  saldoLabel: { fontSize: 14, color: cores.subtexto }, // Rótulo "Saldo do mês"
  saldoValor: { fontSize: 28, fontWeight: 'bold', marginTop: 4 }, // Valor grande do saldo em destaque
});