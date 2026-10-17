// components/SeletorLocalMapa.js
// Modal com mapa para o usuário tocar e escolher um ponto.
// Funciona no Android/iOS (react-native-maps) e no web (Leaflet) via MapaCompat.
import React, { useState } from 'react';
import {
  View, Text, Modal, TouchableOpacity, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { MapView, Marker } from './MapaCompat';
import { cores, espacamento, raio } from '../theme';

const REGIAO_BRASIL = {
  latitude: -2.8235, longitude: -60.6753,
  latitudeDelta: 0.5, longitudeDelta: 0.5,
};

export function SeletorLocalMapa({ visivel, localizacaoAtual, onConfirmar, onCancelar }) {
  const [pinTemp, setPinTemp] = useState(null);

  const regiaoInicial = localizacaoAtual
    ? { ...localizacaoAtual, latitudeDelta: 0.05, longitudeDelta: 0.05 }
    : REGIAO_BRASIL;

  function confirmar() {
    if (pinTemp) onConfirmar(pinTemp);
    setPinTemp(null);
  }

  function cancelar() {
    setPinTemp(null);
    onCancelar();
  }

  return (
    <Modal visible={visivel} animationType="slide" onRequestClose={cancelar}>
      <SafeAreaView style={styles.modal}>
        <Text style={styles.instrucao}>Toque no mapa para marcar o local</Text>
        <MapView
          style={styles.mapa}
          initialRegion={regiaoInicial}
          onPress={e => setPinTemp(e.nativeEvent.coordinate)}
        >
          {pinTemp && <Marker coordinate={pinTemp} />}
        </MapView>
        <View style={styles.botoes}>
          <TouchableOpacity style={styles.botaoCancelar} onPress={cancelar}>
            <Text style={styles.textoCancelar}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.botaoConfirmar, !pinTemp && { opacity: 0.4 }]}
            onPress={confirmar}
            disabled={!pinTemp}
          >
            <Ionicons name="checkmark" size={18} color="#fff" />
            <Text style={styles.textoConfirmar}>Confirmar local</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: { flex: 1, backgroundColor: '#fff' },
  instrucao: {
    textAlign: 'center', padding: espacamento.sm,
    fontSize: 14, fontWeight: '600', color: cores.texto,
  },
  mapa: { flex: 1 },
  botoes: {
    flexDirection: 'row', gap: 12,
    padding: espacamento.md, borderTopWidth: 1, borderTopColor: '#eee',
  },
  botaoCancelar: {
    flex: 1, padding: 14, borderRadius: raio.md,
    borderWidth: 1, borderColor: '#ddd', alignItems: 'center',
  },
  textoCancelar: { fontSize: 15, fontWeight: '600', color: '#555' },
  botaoConfirmar: {
    flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, padding: 14, borderRadius: raio.md, backgroundColor: cores.primaria,
  },
  textoConfirmar: { fontSize: 15, fontWeight: '700', color: '#fff' },
});