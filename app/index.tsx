// app/index.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { useRouter } from 'expo-router';

export default function MenuScreen() {
  const router = useRouter();

  const GameButton = ({ label, path }: { label: string; path: string }) => {
    const scaleAnim = new Animated.Value(1);

    const pressIn = () => Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true }).start();
    const pressOut = () => Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();

    return (
      <Pressable onPressIn={pressIn} onPressOut={pressOut} onPress={() => router.push(path)}>
        <Animated.View style={[styles.button, { transform: [{ scale: scaleAnim }] }]}>
          <Text style={styles.buttonText}>{label}</Text>
        </Animated.View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍊 Bienvenido, Yalel</Text>
      <Text style={styles.subtitle}>¡Elegí qué juego querés jugar!</Text>

      <GameButton label="♟️ Ajedrez" path="/chess" />
      <GameButton label="⭕ Tres en Raya" path="/ticTacToe" />
      <GameButton label="🐍 Culebrita" path="/snake" />
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
    fontSize: 32,
    color: '#f97316',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#e2e8f0',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#f97316',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 16,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});