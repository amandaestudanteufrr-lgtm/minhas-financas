// components/MapaCompat.native.js
// Em iOS/Android, MapaCompat é apenas um re-export do react-native-maps.
// O Metro escolhe este arquivo automaticamente; MapaCompat.web.js usa Leaflet.
import MapView, { Marker, Callout } from 'react-native-maps';

export { MapView, Marker, Callout };
export default MapView;