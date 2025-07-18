import React, { useState } from 'react';
import { View, Text, TextInput, Button, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function GuessGame() {
  const [secretNumber] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const checkGuess = () => {
    const num = parseInt(guess);
    if (isNaN(num)) {
      setMessage('❌ Ingresa un número válido');
    } else if (num === secretNumber) {
      setMessage('🎉 ¡Correcto! Adivinaste el número');
    } else if (num < secretNumber) {
      setMessage('📉 Muy bajo');
    } else {
      setMessage('📈 Muy alto');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔢 Adivina el número</Text>
      <Text style={styles.subtitle}>Estoy pensando en un número del 1 al 100</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Tu intento..."
        value={guess}
        onChangeText={setGuess}
      />

      <Button title="Adivinar" onPress={checkGuess} color="#f97316" />

      <Text style={styles.message}>{message}</Text>

      <Pressable style={styles.backButton} onPress={() => router.push('/')}>
        <Text style={styles.backText}>⬅️ Volver al menú</Text>
      </Pressable>
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
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#e2e8f0',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 18,
    textAlign: 'center',
  },
  message: {
    fontSize: 18,
    color: '#e2e8f0',
    marginTop: 20,
    textAlign: 'center',
  },
  backButton: {
    marginTop: 30,
    backgroundColor: '#f97316',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});