import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { DoorStatus } from '../types';

interface Props {
  status: DoorStatus;
  loading: boolean;
}

export const StatusIndicator = ({ status, loading }: Props) => {
  if (loading && status === 'DISCONNECTED') {
    return (
      <View style={[styles.circle, { borderColor: '#f1c40f' }]}> 
        <ActivityIndicator size="large" color="#f1c40f" />
        <Text style={[styles.text, { color: '#f1c40f', fontSize: 16, marginTop: 10 }]}>
          RECONECTANDO...
        </Text>
      </View>
    );
  }
  const getConfig = () => {
    switch (status) {
      case 'OPEN':
        return { color: '#2ecc71', text: 'ABERTA' }; 
      case 'CLOSE':
        return { color: '#e74c3c', text: 'TRANCADA' }; 
      case 'ERROR':
        return { color: '#e67e22', text: 'SENHA\nINCORRETA' }; 
      case 'DISCONNECTED':
        return { color: '#95a5a6', text: 'OFFLINE' };
      default:
        return { color: '#34495e', text: status }; 
    }
  };

  const config = getConfig();

  return (
    <View style={[styles.circle, { borderColor: config.color }]}>
      {loading ? (
        <ActivityIndicator size="large" color="#333" />
      ) : (
        <Text style={[styles.text, { color: config.color }]}>
          {config.text}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 180, 
    height: 180,
    borderRadius: 90,
    borderWidth: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});