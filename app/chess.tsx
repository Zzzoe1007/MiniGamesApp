import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ChessBoard from './components/ChessBoard'; // O usa la ruta correcta según lo tengas

export default function ChessScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>♟️ Ajedrez</Text>
      <ChessBoard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    color: '#f97316',
    fontWeight: 'bold',
    marginBottom: 20,
  },
});