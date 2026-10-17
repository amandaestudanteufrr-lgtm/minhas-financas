// components/MapaCompat.web.js
// Implementação web da API do react-native-maps usando Leaflet + OpenStreetMap.
// Expõe MapView, Marker e Callout com a mesma assinatura usada no native,
// para que MapaScreen e SeletorLocalMapa funcionem nos dois ambientes.
import React, {
  forwardRef, useImperativeHandle, useRef, useEffect, useMemo,
} from 'react';

// Injeta o CSS do Leaflet via <link> em vez de `import 'leaflet/dist/leaflet.css'`.
// Motivo: o Metro do Expo Web ainda não resolve `url(images/...)` dentro de arquivos
// CSS de node_modules, gerando warnings. Carregar o CSS direto da CDN evita o problema —
// a CDN serve o arquivo com paths absolutos já resolvidos.
if (typeof document !== 'undefined' && !document.getElementById('leaflet-css')) {
  const link = document.createElement('link');
  link.id = 'leaflet-css';
  link.rel = 'stylesheet';
  link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
  link.crossOrigin = '';
  document.head.appendChild(link);
}
import { View } from 'react-native';
import {
  MapContainer, TileLayer, Marker as LMarker, Popup, useMap, useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';

// L.Icon.Default sobrescreve _getIconUrl para prefixar `imagePath` (detectado
// a partir do <link> do leaflet.css) na URL — isso ignora URLs absolutas e
// resulta em pin em branco. Deletar o método força o fallback para o
// _getIconUrl da classe base, que apenas lê options.iconUrl literalmente.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Converte a região do react-native-maps {latitude, longitude, *Delta}
// em centro + zoom do Leaflet.
function regiaoParaLeaflet({ latitude, longitude, latitudeDelta, longitudeDelta }) {
  const delta = Math.max(latitudeDelta || 0.1, longitudeDelta || 0.1);
  const zoom = Math.max(2, Math.min(18, Math.round(Math.log2(360 / delta))));
  return { center: [latitude, longitude], zoom };
}

// Subcomponente que captura cliques no mapa e dispara onPress no formato
// do react-native-maps: { nativeEvent: { coordinate: { latitude, longitude } } }
function CaptadorDeClique({ onPress }) {
  useMapEvents({
    click: (e) => {
      if (!onPress) return;
      onPress({
        nativeEvent: {
          coordinate: { latitude: e.latlng.lat, longitude: e.latlng.lng },
        },
      });
    },
  });
  return null;
}

// Expõe a instância do mapa para o ref imperativo (fitToCoordinates).
function PonteDoMapa({ aoCarregar }) {
  const map = useMap();
  useEffect(() => { aoCarregar(map); }, [map, aoCarregar]);
  return null;
}

export const MapView = forwardRef(function MapView(props, ref) {
  const { style, initialRegion, onPress, onMapReady, children } = props;
  const mapRef = useRef(null);

  useImperativeHandle(ref, () => ({
    fitToCoordinates(coords, opcoes = {}) {
      if (!mapRef.current || !coords || coords.length === 0) return;
      const bounds = coords.map(c => [c.latitude, c.longitude]);
      const pad = opcoes.edgePadding || {};
      mapRef.current.fitBounds(bounds, {
        paddingTopLeft:     [pad.left  ?? 0, pad.top    ?? 0],
        paddingBottomRight: [pad.right ?? 0, pad.bottom ?? 0],
        animate: opcoes.animated !== false,
      });
    },
  }), []);

  const { center, zoom } = useMemo(
    () => regiaoParaLeaflet(initialRegion || { latitude: 0, longitude: 0 }),
    [initialRegion]
  );

  return (
    <View style={style}>
      <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <CaptadorDeClique onPress={onPress} />
        <PonteDoMapa aoCarregar={(map) => {
          mapRef.current = map;
          if (onMapReady) onMapReady();
        }} />
        {children}
      </MapContainer>
    </View>
  );
});

// Marker — recebe coordinate e pinColor; usa DivIcon para colorir o pin.
// Sem pinColor, NÃO passamos a prop `icon` (o Leaflet usa L.Icon.Default — ver
// L.Icon.Default.mergeOptions no topo do arquivo). Passar `icon={undefined}`
// explicitamente quebra: o react-leaflet grava options.icon = undefined e o
// Leaflet estoura com "options.icon is undefined" ao tentar createIcon().
export function Marker({ coordinate, pinColor, children }) {
  const icon = useMemo(() => {
    if (!pinColor) return null;
    return L.divIcon({
      className: '',
      iconSize: [22, 30],
      iconAnchor: [11, 30],
      popupAnchor: [0, -28],
      html: `
        <svg width="22" height="30" viewBox="0 0 22 30" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 0C4.9 0 0 4.9 0 11c0 8 11 19 11 19s11-11 11-19c0-6.1-4.9-11-11-11z"
                fill="${pinColor}" stroke="white" stroke-width="2"/>
          <circle cx="11" cy="11" r="4" fill="white"/>
        </svg>`,
    });
  }, [pinColor]);

  const position = [coordinate.latitude, coordinate.longitude];
  return icon ? (
    <LMarker position={position} icon={icon}>{children}</LMarker>
  ) : (
    <LMarker position={position}>{children}</LMarker>
  );
}

// Callout — no native vira balão ao tocar no pin; no web é um Popup do Leaflet.
export function Callout({ children }) {
  return <Popup>{children}</Popup>;
}

export default MapView;