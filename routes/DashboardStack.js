// routes/DashboardStack.js -> Define o caminho do arquivo no projeto
import React from 'react'; // Importa a biblioteca principal do React para criar componentes
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Importa a ferramenta de navegação em pilha (tipo empilhar telas uma sobre a outra)
import { DashboardScreen } from '../screens/DashboardScreen'; // Importa a tela principal do painel financeiro
import { DetalheTransacaoScreen } from '../screens/DetalheTransacaoScreen'; // Importa a tela que mostra os detalhes de uma transação

const Stack = createNativeStackNavigator(); // Cria a constante que gerencia a pilha de telas

export function DashboardStack() { // Cria e exporta o componente responsável por agrupar as telas do painel
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}> // Inicia a pilha de telas e oculta o cabeçalho padrão de cima
      
      <Stack.Screen name="DashboardHome" component={DashboardScreen} /> 
      {/* Adiciona a primeira tela da pilha: a tela principal (Dashboard) */}
      
      <Stack.Screen name="DetalheTransacao" component={DetalheTransacaoScreen} /> 
      {/* Adiciona a segunda tela da pilha: a tela de detalhes que abre por cima ao clicar em uma transação */}
      
    </Stack.Navigator>
  );
}