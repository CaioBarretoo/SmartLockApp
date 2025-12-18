import { ChangePasswordModal } from '@/components/ChangePasswordModal';
import { Keypad } from '@/components/Keypad';
import { PasswordDisplay } from '@/components/PasswordDisplay';
import { StatusIndicator } from '@/components/StatusIndicator';
import { useSmartLock } from '@/hooks/useSmartLock';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import React, { useState } from 'react';
import { Alert, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Home() {
  const { 
    password, status, isConnecting, 
    handleKeyPress, changePassword 
  } = useSmartLock();

  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenSettings = () => {

    const statusAllowed = 'OPEN';

    if (status === statusAllowed) {
      setModalVisible(true);
    } else {
      Alert.alert(
        "Acesso Negado", 
        "Por segurança, você só pode alterar a senha quando a porta estiver DESTRANCADA."
      );
    }
  };

  const isSettingsEnabled = status === 'OPEN';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4f6f8" />
      
      <View style={styles.container}>
        
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Smart Lock Pro</Text>
            <Text style={styles.subtitle}>Sistema IoT Seguro</Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.settingsBtn, { opacity: isSettingsEnabled ? 1 : 0.5 }]} 
            onPress={handleOpenSettings}
            activeOpacity={isSettingsEnabled ? 0.6 : 1}
          >
            <Ionicons name="settings-sharp" size={24} color="#2c3e50" />
          </TouchableOpacity>
        </View>

        <View style={styles.centerArea}>
          <View style={styles.statusWrapper}>
             <StatusIndicator status={status} loading={isConnecting} />
          </View>
          
          <PasswordDisplay value={password} />
        </View>

        <View style={styles.bottomArea}>
          <Keypad onPress={handleKeyPress} />
          
          <TouchableOpacity 
            style={styles.lockButtonMain} 
            onPress={() => handleKeyPress('CLOSE')}
          >
             <Text style={styles.lockButtonText}>TRANCAR PORTA</Text>
          </TouchableOpacity>
        </View>

        <ChangePasswordModal 
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={changePassword}
        />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },
  container: {
    flex: 1,
    padding: 24, 
    justifyContent: 'space-between', 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: 32, 
    fontWeight: '800',
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 4,
  },
  settingsBtn: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: "#bdc3c7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  centerArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20, 
  },
  statusWrapper: {
    alignItems: 'center', 
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  bottomArea: {
    gap: 20,
  },
  lockButtonMain: {
    width: '100%',
    paddingVertical: 18,
    backgroundColor: '#34495e',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: "#2c3e50",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  lockButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  }
});