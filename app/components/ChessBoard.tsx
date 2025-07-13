import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const BOARD_PADDING = 32;
const BOARD_SIZE = width - BOARD_PADDING; // máximo sin sobresalir
const SQUARE_SIZE = BOARD_SIZE / 8;

const ChessBoard = () => {
  return (
    <View style={[styles.board, { width: BOARD_SIZE, height: BOARD_SIZE }]}>
      {Array.from({ length: 8 }).map((_, row) => (
        <View key={row} style={styles.row}>
          {Array.from({ length: 8 }).map((_, col) => {
            const isDark = (row + col) % 2 === 1;
            const backgroundColor = isDark ? '#0f172a' : '#fdba74';

            return (
              <View
                key={`${row}-${col}`}
                style={[
                  styles.square,
                  {
                    backgroundColor,
                    width: SQUARE_SIZE,
                    height: SQUARE_SIZE,
                  },
                ]}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    alignSelf: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    borderWidth: 3,
    padding: 2,
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChessBoard;