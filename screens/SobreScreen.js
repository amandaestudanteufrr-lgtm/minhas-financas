// screens/SobreScreen.js -> Define o arquivo da tela que exibe as informações sobre o aplicativo
import React from 'react'; // Importa a biblioteca principal do React
import { View, Text, StyleSheet } from 'react-native'; // Importa os componentes visuais básicos do React Native (blocos e textos)
import { SafeAreaView } from 'react-native-safe-area-context'; // Importa o componente para proteger o conteúdo contra o notch e bordas da tela
import { cores, espacamento } from '../theme'; // Importa o arquivo de tema global com cores e espaçamentos

export function SobreScreen() { // Cria e exporta o componente funcional da tela Sobre
  return (
    // Área segura que preenche o espaço respeitando as margens do sistema operacional
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        <Text style={styles.titulo}>Minhas Finanças</Text> {/* Título principal com o nome do aplicativo */}
        <Text style={styles.versao}>Versão 1.0.0</Text> {/* Exibe o número da versão atual do app */}
        
        <Text style={styles.descricao}>
          App de controle financeiro pessoal desenvolvido durante o Módulo 06
          do Curso de Capacitação em Desenvolvimento Full Stack — ITEAM.
        </Text> {/* Texto descritivo contando o contexto e o curso onde o app foi criado */}

        <Text style={styles.tech}>React Native · Expo · AsyncStorage</Text> {/* Lista as principais tecnologias utilizadas no projeto */}
        
      </View>
    </SafeAreaView>
  );
}

// Objeto contendo todos os estilos visuais da tela Sobre
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: cores.fundo }, // Faz a área segura ocupar toda a tela com a cor de fundo padrão
  container: { flex: 1, padding: espacamento.md, justifyContent: 'center', alignItems: 'center' }, // Centraliza todo o conteúdo perfeitamente no meio da tela (tanto vertical quanto horizontalmente)
  titulo: { fontSize: 26, fontWeight: 'bold', color: cores.texto, marginBottom: 4 }, // Estilo grande e em negrito para o título
  versao: { fontSize: 14, color: cores.subtexto, marginBottom: espacamento.lg }, // Estilo sutil para o texto da versão
  descricao: { fontSize: 15, color: cores.texto, textAlign: 'center', lineHeight: 22, marginBottom: espacamento.md }, // Estilo do texto explicativo (centralizado e com espaçamento entre linhas)
  tech: { fontSize: 13, color: cores.subtexto }, // Estilo menor e discreto para listar as tecnologias
});