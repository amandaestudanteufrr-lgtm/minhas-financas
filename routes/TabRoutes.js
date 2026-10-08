// routes/TabRoutes.js -> Indica o caminho e o nome do arquivo de rotas das abas
import React from 'react'; // Importa a biblioteca do React para criar componentes
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Importa a função que cria a barra de abas na parte inferior da tela
import { Ionicons } from '@expo/vector-icons'; // Importa a biblioteca de ícones para usar nos botões das abas
import { DashboardStack } from './DashboardStack'; // Importa o grupo de telas do painel (que inclui a lista e a tela de detalhes)
import { NovaTransacaoScreen } from '../screens/NovaTransacaoScreen'; // Importa a tela de cadastro de nova transação
import { RelatorioScreen } from '../screens/RelatorioScreen'; // Importa a tela de relatório financeiro mensal
import { SobreScreen } from '../screens/SobreScreen'; // Importa a tela com informações sobre o aplicativo

const Tab = createBottomTabNavigator(); // Cria a constante que gerencia a navegação por abas inferiores

// Define quais ícones serão exibidos para cada aba, mudando o desenho dependendo se ela está selecionada (ativa) ou não (inativa)
const ICONES_TAB = {
  Dashboard: { ativa: 'home', inativa: 'home-outline' },
  'Nova Transação': { ativa: 'add-circle', inativa: 'add-circle-outline' },
  Relatório: { ativa: 'bar-chart', inativa: 'bar-chart-outline' },
  Sobre: { ativa: 'information-circle', inativa: 'information-circle-outline' },
};

export function TabRoutes() { // Cria e exporta o componente principal que monta a barra de abas inferior
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({ // Configura o estilo e comportamento geral de todas as abas
        headerShown: false, // Esconde o cabeçalho padrão de cima em todas as abas
        tabBarActiveTintColor: '#2c3e50', // Define a cor do texto e do ícone quando a aba estiver selecionada
        tabBarInactiveTintColor: '#95a5a6', // Define a cor do texto e do ícone quando a aba NÃO estiver selecionada
        tabBarStyle: { // Configura a aparência visual da barra inferior
          backgroundColor: '#fff', // Cor de fundo da barra (branco)
          borderTopColor: '#eee', // Cor da linha sutil que fica logo acima da barra
          height: 60, // Altura total da barra em pixels
          paddingBottom: 8, // Espaçamento interno na parte de baixo
          paddingTop: 4, // Espaçamento interno na parte de cima
        },
        tabBarIcon: ({ focused, color, size }) => { // Função que escolhe e exibe o ícone correto de cada aba
          const { ativa, inativa } = ICONES_TAB[route.name]; // Pega o nome do ícone ativo ou inativo com base no nome da aba
          return <Ionicons name={focused ? ativa : inativa} size={size} color={color} />; // Retorna o ícone desenhado na tela
        },
      })}
    >
      {/* Aba 1: Abre o painel principal (que pode navegar para os detalhes da transação) */}
      <Tab.Screen name="Dashboard" component={DashboardStack} />
      
      {/* Aba 2: Abre a tela para preencher e salvar uma nova transação */}
      <Tab.Screen name="Nova Transação" component={NovaTransacaoScreen} />
      
      {/* Aba 3: Abre a tela que mostra o relatório e o gráfico de receitas x despesas */}
      <Tab.Screen name="Relatório" component={RelatorioScreen} />
      
      {/* Aba 4: Abre a tela com informações sobre o aplicativo e o curso */}
      <Tab.Screen name="Sobre" component={SobreScreen} />
    </Tab.Navigator>
  );
}