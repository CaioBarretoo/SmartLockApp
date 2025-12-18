import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import mqttService from '../services/MqttService';
import { DoorStatus } from '../types';

const CHANGE = 'CHANGE:';

const MQTT_CONFIG = {
  HOST: 'broker.hivemq.com',
  PORT: 8000,
  PATH: '/mqtt',
  TOPIC_CMD: 'iot/fechadura/comando',
  TOPIC_STATE: 'iot/fechadura/estado',
};

export const useSmartLock = () => {
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<DoorStatus>('DISCONNECTED');
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

useEffect(() => {
    setIsConnecting(true);

    const clientId = "App-" + Math.floor(Math.random() * 10000); 
    
    mqttService.setCallbacks(
      (newStatus) => setStatus(newStatus as DoorStatus),
      (connected) => {
        setIsConnected(connected);
        setIsConnecting(!connected); 
        if (connected) setStatus('WAITING...');
        else setStatus('DISCONNECTED'); 
      }
    );
    mqttService.connect(
      MQTT_CONFIG.HOST, 
      MQTT_CONFIG.PORT, 
      MQTT_CONFIG.PATH, 
      clientId,
      MQTT_CONFIG.TOPIC_STATE
    );

    return () => mqttService.disconnect();
  }, []);


  const handleKeyPress = useCallback((key: string) => {
    if (!isConnected) {
      Alert.alert("Offline", "Aguardando conexão...");
      return;
    }

    if (status === 'OPEN' && key !== 'CLOSE') {
      Alert.alert("Aviso", "A porta já está aberta. Tranque-a primeiro.");
      setPassword('');
      return;
    }

    if (key === 'C') {
      setPassword('');
    } 
    else if (key === '#') {
      if (password.length > 0) {
        mqttService.publish(MQTT_CONFIG.TOPIC_CMD, password);
        setPassword('');
      } else {
        Alert.alert("Erro", "Digite a senha primeiro.");
      }
    } 
    else if (key === 'CLOSE') {
      if (status === key) {
        Alert.alert("Info", "A porta já está trancada.");
      } else {
        mqttService.publish(MQTT_CONFIG.TOPIC_CMD, "CLOSE");
      }
    } 
    else {
      if (password.length < 6) {
        setPassword((prev) => prev + key);
      }
    }
  }, [password, isConnected, status]);

  const changePassword = useCallback((newPassword: string) => {
    if (!isConnected) {
      Alert.alert("Offline", "Conecte-se para trocar a senha.");
      return;
    }
    if (newPassword.length < 4) {
      Alert.alert("Erro", "A nova senha deve ter pelo menos 4 dígitos.");
      return;
    }
    
    mqttService.publish(MQTT_CONFIG.TOPIC_CMD, `${CHANGE}${newPassword}`);
    Alert.alert("Sucesso", "Comando de troca enviado! Teste sua nova senha.");
    
  }, [isConnected]);

  return {
    password,
    status,
    isConnected,
    isConnecting,
    handleKeyPress,
    changePassword
  };
};