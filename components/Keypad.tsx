import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  onPress: (key: string) => void;
  disabled?: boolean;
}

export const Keypad = ({ onPress, disabled = false }: Props) => {
  const Button = ({ label, color = '#2c3e50', bg = '#fff' }: any) => (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: bg, opacity: disabled ? 0.6 : 1 }]} 
      onPress={() => !disabled && onPress(label)}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, { color }]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Button label="1" /><Button label="2" /><Button label="3" />
      </View>
      <View style={styles.row}>
        <Button label="4" /><Button label="5" /><Button label="6" />
      </View>
      <View style={styles.row}>
        <Button label="7" /><Button label="8" /><Button label="9" />
      </View>
      <View style={styles.row}>
        <Button label="C" color="#fff" bg="#e74c3c" />
        <Button label="0" />
        <Button label="#" color="#fff" bg="#2ecc71" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    width: '100%', 
    gap: 15 
  },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    gap: 15 
  },
  button: {
    flex: 1,
    height: 75, 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20, 
    backgroundColor: '#fff',
    shadowColor: "#bdc3c7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 8,
  },
  text: { 
    fontSize: 28, 
    fontWeight: '600' 
  },
}); 