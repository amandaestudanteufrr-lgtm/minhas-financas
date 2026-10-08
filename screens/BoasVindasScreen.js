// screens/BoasVindasScreen.js -> Indica o caminho e o nome do arquivo da tela de boas-vindas
import React from 'react'; // Importa a biblioteca do React
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'; // Importa os componentes visuais básicos do React Native (container, textos, botão clicável e estilos)
import { SafeAreaView } from 'react-native-safe-area-context'; // Importa o componente que protege o conteúdo para não ficar em cima do notch ou barras do celular
import { Ionicons } from '@expo/vector-icons'; // Importa a biblioteca de ícones vetoriais
import { cores, espacamento, raio } from '../theme'; // Importa as configurações globais de cores, espaçamentos e bordas do arquivo de tema

export function BoasVindasScreen({ onConcluir }) { // Cria e exporta a função da tela, recebendo uma função 'onConcluir' que avança para o app principal quando clicada
  return (
    <SafeAreaView style={styles.safeArea}> {/* Garante que o conteúdo respeite a área segura da tela */}
      <View style={styles.container}> {/* Container principal que centraliza todos os elementos */}
        
        <Ionicons name="wallet" size={80} color={cores.receita} /> {/* Desenha um ícone grande de carteira na cor de receita */}
        
        <Text style={styles.titulo}>Bem-vindo ao{'\n'}Minhas Finanças!</Text> {/* Título principal de boas-vindas com quebra de linha */}
        
        <Text style={styles.subtitulo}>
          Controle suas receitas e despesas de forma simples e rápida.
        </Text> {/* Subtítulo explicativo sobre o propósito do aplicativo */}

        <View style={styles.recursos}> {/* Bloco que agrupa os tópicos de vantagens/recursos do app */}
          {[
            { icone: 'add-circle-outline', texto: 'Registre receitas e despesas' },
            { icone: 'stats-chart-outline', texto: 'Veja seu saldo em tempo real' },
            { icone: 'save-outline', texto: 'Dados salvos no seu dispositivo' },
          ].map((item, i) => ( // Percorre a lista de recursos para gerar cada item automaticamente
            <View key={i} style={styles.recurso}> {/* Linha individual de cada recurso */}
              <Ionicons name={item.icone} size={22} color={cores.primaria} /> {/* Ícone ao lado do texto */}
              <Text style={styles.textoRecurso}>{item.texto}</Text> {/* Texto descritivo do recurso */}
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.botao} onPress={onConcluir} activeOpacity={0.8}> 
          {/* Botão interativo "Começar" que, ao ser pressionado, executa a função 'onConcluir' para entrar no app */}
          <Text style={styles.textoBotao}>Começar</Text> {/* Texto de dentro do botão */}
          <Ionicons name="arrow-forward" size={20} color="#fff" /> {/* Ícone de seta para frente */}
        </TouchableOpacity>
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ // Objeto que guarda todos os estilos visuais da tela
  safeArea: { flex: 1, backgroundColor: cores.fundo }, // Faz a tela ocupar todo o espaço e define a cor de fundo
  container: {
    flex: 1, padding: espacamento.md,
    justifyContent: 'center', alignItems: 'center', gap: 16,
  }, // Centraliza os itens no meio da tela com espaçamento interno e distância de 16 entre eles
  titulo: {
    fontSize: 28, fontWeight: 'bold', color: cores.texto,
    textAlign: 'center', lineHeight: 36,
  }, // Estilo do título (fonte grande, negrito, centralizado)
  subtitulo: { fontSize: 15, color: cores.subtexto, textAlign: 'center', lineHeight: 22 }, // Estilo do subtítulo
  recursos: { gap: 12, marginVertical: 8 }, // Espaçamento da lista de recursos
  recurso: { flexDirection: 'row', alignItems: 'center', gap: 12 }, // Alinha o ícone e o texto do recurso lado a lado
  textoRecurso: { fontSize: 15, color: cores.texto }, // Estilo do texto do recurso
  botao: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: cores.primaria, paddingVertical: 14,
    paddingHorizontal: 32, borderRadius: raio.pill, marginTop: 8,
  }, // Estilo do botão principal (fundo com cor primária, formato arredondado de pílula)
  textoBotao: { color: '#fff', fontSize: 16, fontWeight: '700' }, // Estilo do texto do botão (branco e em negrito)
});