import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  value: string;
}

export const PasswordDisplay = ({ value }: Props) => (
  <View style={styles.container}>
    <Text style={styles.text}>
      {value.length === 0 ? '----' : value.split('').map(() => '•').join(' ')}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 70, 
    backgroundColor: '#ecf0f1', 
    borderRadius: 16, 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    borderWidth: 2,
    borderColor: '#bdc3c7',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  text: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2c3e50',
    letterSpacing: 4,
  }
});