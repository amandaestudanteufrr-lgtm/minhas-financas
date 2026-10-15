// components/CartaoCotacoes.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCotacoes } from '../hooks/useCotacoes';
import { cores, espacamento, raio } from '../theme';

export function CartaoCotacoes() {
  const { cotacoes, carregando, erro, atualizar } = useCotacoes();

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>Cotações do Dia</Text>
        <TouchableOpacity onPress={atualizar}>
          <Ionicons name="refresh" size={18} color={cores.subtexto} />
        </TouchableOpacity>
      </View>

      {carregando ? (
        <ActivityIndicator size="small" color={cores.primaria} />
      ) : erro ? (
        <Text style={styles.erro}>{erro}</Text>
      ) : (
        <View style={styles.linha}>
          <View style={styles.item}>
            <Text style={styles.moeda}>🇺🇸 Dólar</Text>
            <Text style={styles.valor}>R$ {cotacoes.dolar.toFixed(2)}</Text>
          </View>
          <View style={styles.separador} />
          <View style={styles.item}>
            <Text style={styles.moeda}>🇪🇺 Euro</Text>
            <Text style={styles.valor}>R$ {cotacoes.euro.toFixed(2)}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: cores.cartao,
    borderRadius: raio.md,
    padding: espacamento.md,
    marginHorizontal: espacamento.md,
    marginBottom: espacamento.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: espacamento.sm,
  },
  titulo: { fontSize: 14, fontWeight: '600', color: cores.subtexto },
  linha: { flexDirection: 'row', alignItems: 'center' },
  item: { flex: 1, alignItems: 'center' },
  moeda: { fontSize: 13, color: cores.subtexto, marginBottom: 2 },
  valor: { fontSize: 18, fontWeight: '700', color: cores.texto },
  separador: { width: 1, height: 36, backgroundColor: '#eee' },
  erro: { fontSize: 13, color: cores.despesa, textAlign: 'center' },
});