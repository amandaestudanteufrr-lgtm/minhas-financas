// App.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TabRoutes } from './routes/TabRoutes';
import { TransacoesProvider } from './context/TransacoesContext';
import { BoasVindasScreen } from './screens/BoasVindasScreen';

export default function App() {
  // Mantém a navegação condicional da Aula 4 (tela de boas-vindas no primeiro acesso)
  const [primeiroAcesso, setPrimeiroAcesso] = useState(true);

  if (primeiroAcesso) {
    return (
      <SafeAreaProvider>
        <BoasVindasScreen onConcluir={() => setPrimeiroAcesso(false)} />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <TransacoesProvider>
        <NavigationContainer>
          <TabRoutes />
        </NavigationContainer>
      </TransacoesProvider>
    </SafeAreaProvider>
  );
}