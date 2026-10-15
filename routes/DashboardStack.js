// routes/DashboardStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DashboardScreen } from '../screens/DashboardScreen';
import { DetalheTransacaoScreen } from '../screens/DetalheTransacaoScreen';

const Stack = createNativeStackNavigator();

export function DashboardStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DashboardHome" component={DashboardScreen} />
      <Stack.Screen name="DetalheTransacao" component={DetalheTransacaoScreen} />
    </Stack.Navigator>
  );
}