// App.js -> Arquivo principal onde o aplicativo inicia e decide qual tela mostrar primeiro
import React, { useState } from 'react'; // Importa o React e o ganho useState para controlar estados (como saber se é o primeiro acesso)
import { NavigationContainer } from '@react-navigation/native'; // Importa o container de navegação obrigatório do React Navigation
import { SafeAreaProvider } from 'react-native-safe-area-context'; // Importa o provedor de áreas seguras para o aplicativo funcionar bem em qualquer celular
import { TabRoutes } from './routes/TabRoutes'; // Importa o arquivo que agrupa todas as abas principais do app
import { BoasVindasScreen } from './screens/BoasVindasScreen'; // Importa a tela de boas-vindas exibida no primeiro acesso

export default function App() { // Cria e exporta o componente raiz (principal) do projeto
  // Cria um estado 'primeiroAcesso' iniciado como true (verdadeiro) para saber se o usuário está abrindo o app pela primeira vez
  const [primeiroAcesso, setPrimeiroAcesso] = useState(true);

  // Navegação condicional: Se for o primeiro acesso, mostra a tela de boas-vindas direto,
  // sem precisar do container de navegação (já que ela é uma tela única, sem rotas)
  if (primeiroAcesso) {
    return (
      <SafeAreaProvider>
        {/* Renderiza a tela de boas-vindas e passa uma função que, ao ser concluída, muda o estado para false */}
        <BoasVindasScreen onConcluir={() => setPrimeiroAcesso(false)} />
      </SafeAreaProvider>
    );
  }

  // Se já passou das boas-vindas (primeiroAcesso virou false), renderiza o app normal com as abas e navegação
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {/* Ativa o sistema de rotas por abas inferiores (Dashboard, Nova Transação, Relatório e Sobre) */}
        <TabRoutes />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}