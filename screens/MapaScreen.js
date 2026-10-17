// screens/MapaScreen.js
// Funciona no Android/iOS (react-native-maps) e no web (Leaflet) via MapaCompat.
import React, { useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { MapView, Marker, Callout } from '../components/MapaCompat';
import { useTransacoes } from '../context/TransacoesContext';
import { cores, espacamento, raio } from '../theme';

// Região exibida quando não há nenhum ponto marcado (Brasil inteiro)
const REGIAO_BRASIL = {
  latitude: -15.7801, longitude: -47.9292,
  latitudeDelta: 30, longitudeDelta: 30,
};

export function MapaScreen() {
  const { transacoes } = useTransacoes();
  const mapaRef = useRef(null);

  // Filtra apenas transações que têm coordenadas salvas
  const comLocalizacao = transacoes.filter(t => t.latitude && t.longitude);

  // Quando o mapa termina de carregar, ajusta o zoom para abranger todos os pins
  function aoMapaCarregar() {
    if (comLocalizacao.length === 0 || !mapaRef.current) return;
    mapaRef.current.fitToCoordinates(
      comLocalizacao.map(t => ({ latitude: t.latitude, longitude: t.longitude })),
      {
        edgePadding: { top: 80, right: 80, bottom: 80, left: 80 },
        animated: true,
      }
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {comLocalizacao.length === 0 ? (
        <View style={styles.vazio}>
          <Ionicons name="map-outline" size={64} color="#bdc3c7" />
          <Text style={styles.textoVazio}>Nenhuma transação com localização</Text>
          <Text style={styles.subtextoVazio}>
            Toque em "Minha localização" ao registrar uma transação
          </Text>
        </View>
      ) : (
        <MapView
          ref={mapaRef}
          style={styles.mapa}
          initialRegion={REGIAO_BRASIL}
          onMapReady={aoMapaCarregar}
        >
          {comLocalizacao.map(t => (
            <Marker
              key={t.id}
              coordinate={{ latitude: t.latitude, longitude: t.longitude }}
              pinColor={t.tipo === 'receita' ? cores.receita : cores.despesa}
            >
              <Callout tooltip>
                <View style={styles.callout}>
                  <Text style={styles.calloutTitulo}>{t.descricao}</Text>
                  <Text style={[
                    styles.calloutValor,
                    { color: t.tipo === 'receita' ? cores.receita : cores.despesa },
                  ]}>
                    {t.tipo === 'receita' ? '+' : '-'} R$ {t.valor.toFixed(2)}
                  </Text>
                  <Text style={styles.calloutData}>{t.data}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  mapa:     { flex: 1 },
  vazio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    padding: espacamento.md,
  },
  textoVazio:    { fontSize: 17, fontWeight: '600', color: cores.subtexto },
  subtextoVazio: { fontSize: 13, color: '#bdc3c7', textAlign: 'center' },
  callout: {
    backgroundColor: '#fff',
    borderRadius: raio.md,
    padding: espacamento.sm,
    minWidth: 160,
  },
  calloutTitulo: { fontSize: 14, fontWeight: '700', color: cores.texto },
  calloutValor:  { fontSize: 16, fontWeight: '800', marginTop: 2 },
  calloutData:   { fontSize: 12, color: cores.subtexto, marginTop: 2 },
});