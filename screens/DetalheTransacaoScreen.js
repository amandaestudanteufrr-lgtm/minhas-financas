// screens/DetalheTransacaoScreen.js -> Define o arquivo que exibe os detalhes de uma transação específica
import React from 'react'; // Importa a biblioteca do React para criar componentes
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'; // Importa os componentes visuais básicos do React Native (blocos, textos, botão tocável e estilos)
import { SafeAreaView } from 'react-native-safe-area-context'; // Importa o componente para proteger o conteúdo contra o notch e bordas da tela
import { Ionicons } from '@expo/vector-icons'; // Importa a biblioteca de ícones para as setas e setas circulares
import { cores, espacamento, raio } from '../theme'; // Importa o arquivo de temas global com cores, espaçamentos e arredondamento de bordas

export function DetalheTransacaoScreen({ route, navigation }) { // Cria e exporta o componente da tela, recebendo dados da rota (route) e funções de navegação
  const { transacao } = route.params;  // Extrai o objeto 'transacao' que foi enviado por parâmetro ao clicar na lista do Dashboard
  const isReceita = transacao.tipo === 'receita'; // Cria uma variável booleana (true/false) para verificar se é uma receita ou despesa

  return (
    // Área segura que preenche todo o espaço considerando as margens do sistema do celular
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Botão de voltar que aciona a função goBack() para retornar à tela anterior */}
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={cores.texto} />
          <Text style={styles.textoVoltar}>Voltar</Text>
        </TouchableOpacity>

        {/* Bloco circular do ícone que muda de cor e desenho dependendo se for receita (verde) ou despesa (vermelho) */}
        <View style={[styles.icone, { backgroundColor: isReceita ? cores.receitaFundo : cores.despesaFundo }]}>
          <Ionicons
            name={isReceita ? 'arrow-up-circle' : 'arrow-down-circle'}
            size={48}
            color={isReceita ? cores.receita : cores.despesa}
          />
        </View>

        {/* Exibe o nome ou descrição da transação */}
        <Text style={styles.descricao}>{transacao.descricao}</Text>
        
        {/* Exibe o valor formatado com duas casas decimais e o sinal de mais (+) ou menos (-) na cor correspondente */}
        <Text style={[styles.valor, { color: isReceita ? cores.receita : cores.despesa }]}>
          {isReceita ? '+' : '-'} R$ {transacao.valor.toFixed(2)}
        </Text>

        {/* Bloco em formato de tabela/cartão contendo mais detalhes técnicos da transação */}
        <View style={styles.tabela}>
          
          {/* Linha 1: Tipo da transação (Receita ou Despesa) */}
          <View style={styles.linha}>
            <Text style={styles.rotulo}>Tipo</Text>
            <Text style={styles.dado}>{isReceita ? 'Receita' : 'Despesa'}</Text>
          </View>

          {/* Linha 2: Categoria da transação (ex: alimentação, moradia, etc.) */}
          <View style={styles.linha}>
            <Text style={styles.rotulo}>Categoria</Text>
            <Text style={styles.dado}>{transacao.categoria}</Text>
          </View>

          {/* Linha 3: Data em que a transação ocorreu */}
          <View style={styles.linha}>
            <Text style={styles.rotulo}>Data</Text>
            <Text style={styles.dado}>{transacao.data}</Text>
          </View>

        </View>
      </View>
    </SafeAreaView>
  );
}

// Objeto com todos os estilos visuais utilizados nesta tela
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: cores.fundo }, // Faz a área segura ocupar a tela inteira com a cor de fundo padrão
  container: { flex: 1, padding: espacamento.md, alignItems: 'center' }, // Centraliza os itens horizontalmente com espaçamento interno
  botaoVoltar: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    alignSelf: 'flex-start', marginBottom: espacamento.lg,
  }, // Alinha o botão de voltar à esquerda com espaço entre o ícone e o texto
  textoVoltar: { fontSize: 16, color: cores.texto }, // Estilo do texto do botão voltar
  icone: {
    width: 88, height: 88, borderRadius: 44,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: espacamento.md,
  }, // Cria um círculo perfeito de 88x88 pixels para o ícone central
  descricao: { fontSize: 22, fontWeight: 'bold', color: cores.texto, marginBottom: 4 }, // Estilo da descrição em destaque
  valor: { fontSize: 32, fontWeight: '800', marginBottom: espacamento.lg }, // Estilo grande e em negrito para o valor financeiro
  tabela: {
    width: '100%', backgroundColor: cores.cartao,
    borderRadius: raio.md, padding: espacamento.md, gap: 12,
  }, // Estilo do cartão em bloco que agrupa as linhas de detalhes
  linha: { flexDirection: 'row', justifyContent: 'space-between' }, // Posiciona o rótulo à esquerda e o dado à direita na mesma linha
  rotulo: { fontSize: 14, color: cores.subtexto }, // Estilo dos textos dos rótulos (tipo, categoria, data)
  dado: { fontSize: 14, fontWeight: '600', color: cores.texto }, // Estilo dos valores preenchidos na tabela
});