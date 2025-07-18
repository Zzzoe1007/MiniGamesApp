import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState<'❌' | '⭕'>('❌');
  const [winner, setWinner] = useState<string | null>(null);
  const router = useRouter();

  const handlePress = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    if (checkWinner(newBoard)) {
      setWinner(turn);
    } else {
      setTurn(turn === '❌' ? '⭕' : '❌');
    }
  };

  const checkWinner = (b: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    return lines.some(([a, b_, c]) => b[a] && b[a] === b[b_] && b[a] === b[c]);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn('❌');
    setWinner(null);
  };

  const renderRow = (rowIndex: number) => {
    return (
      <View style={styles.row}>
        {[0, 1, 2].map((colIndex) => {
          const index = rowIndex * 3 + colIndex;
          return (
            <Pressable
              key={index}
              style={styles.cell}
              onPress={() => handlePress(index)}
            >
              <Text style={styles.cellText}>{board[index]}</Text>
            </Pressable>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>❌⭕ Tres en Raya</Text>
      <View style={styles.board}>
        {[0, 1, 2].map((row) => renderRow(row))}
      </View>
      <Text style={styles.status}>
        {winner ? `🎉 Ganó ${winner}` : `Turno de ${turn}`}
      </Text>
      <Pressable style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetText}>🔄 Reiniciar</Text>
      </Pressable>
      <Pressable style={styles.backButton} onPress={() => router.push('/')}>
        <Text style={styles.backText}>⬅️ Volver al menú</Text>
      </Pressable>
    </View>
  );
}

const CELL_SIZE = 80;

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
  board: {
    borderWidth: 2,
    borderColor: '#f97316',
    borderRadius: 8,
    backgroundColor: '#1e293b',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    fontSize: 36,
    color: '#fff',
  },
  status: {
    fontSize: 18,
    color: '#e2e8f0',
    marginTop: 20,
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: '#f97316',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  resetText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 20,
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