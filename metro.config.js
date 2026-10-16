// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);
config.resolver.assetExts.push('wasm');   // permite servir o .wasm como asset
config.resolver.sourceExts.push('wasm');  // permite o bundler resolver `import` de .wasm

module.exports = config;