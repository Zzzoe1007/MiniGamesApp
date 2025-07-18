import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const allEmojis = [
  '🍎', '🚗', '🐶', '🎈', '🌟', '🎮', '🐱', '🍕',
  '⚽', '🎵', '🧃', '📚', '🧸', '🍩', '🎁', '🪁'
];

export default function MemoryGame() {
  const [grid, setGrid] = useState<string[]>([]);
  const [sequence, setSequence] = useState<string[]>([]);
  const [showSequence, setShowSequence] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState('');
  const router = useRouter();

  useEffect(() => {
    const shuffled = [...allEmojis].sort(() => 0.5 - Math.random());
    const gridEmojis = shuffled.slice(0, 16);
    const sequenceEmojis = [...gridEmojis].sort(() => 0.5 - Math.random()).slice(0, 3);

    setGrid(gridEmojis);
    setSequence(sequenceEmojis);
    setShowSequence(true);
    setSelected([]);
    setResult('');

    const timer = setTimeout(() => {
      setShowSequence(false);
      const reshuffled = [...gridEmojis].sort(() => 0.5 - Math.random());
      setGrid(reshuffled);
    }, 2000); // ⏱️ 2 segundos

    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (emoji: string) => {
    if (selected.includes(emoji)) return;
    const newSelected = [...selected, emoji];
    setSelected(newSelected);

    if (newSelected.length === 3) {
      const correct = sequence.every((e) => newSelected.includes(e));
      setResult(correct ? '🎉 ¡Correcto!' : '❌ Intenta de nuevo');
    }
  };

  const resetGame = () => {
    const shuffled = [...allEmojis].sort(() => 0.5 - Math.random());
    const gridEmojis = shuffled.slice(0, 16);
    const sequenceEmojis = [...gridEmojis].sort(() => 0.5 - Math.random()).slice(0, 3);

    setGrid(gridEmojis);
    setSequence(sequenceEmojis);
    setShowSequence(true);
    setSelected([]);
    setResult('');

    setTimeout(() => {
      setShowSequence(false);
      const reshuffled = [...gridEmojis].sort(() => 0.5 - Math.random());
      setGrid(reshuffled);
    }, 2000); // ⏱️ 2 segundos
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧠 Memoria Rápida</Text>
      <Text style={styles.subtitle}>
        {showSequence ? 'Memoriza los emojis destacados' : 'Selecciona los que viste'}
      </Text>

      <View style={styles.grid}>
        {grid.map((emoji, index) => {
          const isHighlighted = showSequence && sequence.includes(emoji);
          const isSelected = selected.includes(emoji);

          return (
            <Pressable
              key={index}
              style={[
                styles.cell,
                isHighlighted ? styles.highlighted : null,
                !showSequence && isSelected ? styles.selected : null,
              ]}
              onPress={() => !showSequence && handleSelect(emoji)}
            >
              <Text style={styles.emoji}>{emoji}</Text>
            </Pressable>
          );
        })}
      </View>

      {result !== '' && <Text style={styles.result}>{result}</Text>}

      <Pressable style={styles.button} onPress={resetGame}>
        <Text style={styles.buttonText}>🔄 Reiniciar</Text>
      </Pressable>

      <Pressable style={styles.backButton} onPress={() => router.push('/')}>
        <Text style={styles.backText}>⬅️ Volver al menú</Text>
      </Pressable>
    </View>
  );
}

const CELL_SIZE = 64;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
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
  grid: {
    width: CELL_SIZE * 4 + 32,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    margin: 4,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  highlighted: {
    backgroundColor: '#f97316',
  },
  selected: {
    backgroundColor: '#f97316',
  },
  emoji: {
    fontSize: 32,
  },
  result: {
    fontSize: 20,
    color: '#e2e8f0',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#f97316',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
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