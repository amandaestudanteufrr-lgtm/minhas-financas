// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TabRoutes } from './routes/TabRoutes';
import { TransacoesProvider } from './context/TransacoesContext';
import { BoasVindasScreen } from './screens/BoasVindasScreen';
import {
  PrimeiroAcessoProvider,
  usePrimeiroAcesso,
} from './context/PrimeiroAcessoContext';

function ConteudoApp() {
  const { primeiroAcesso, carregando, concluir } = usePrimeiroAcesso();

  // Enquanto lê o AsyncStorage, evita o flash da tela de boas-vindas
  if (carregando) return null;

  if (primeiroAcesso) {
    return <BoasVindasScreen onConcluir={concluir} />;
  }

  return (
    <TransacoesProvider>
      <NavigationContainer>
        <TabRoutes />
      </NavigationContainer>
    </TransacoesProvider>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <PrimeiroAcessoProvider>
        <ConteudoApp />
      </PrimeiroAcessoProvider>
    </SafeAreaProvider>
  );
}