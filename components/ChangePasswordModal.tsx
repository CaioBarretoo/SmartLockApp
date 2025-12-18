import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text, TextInput, TouchableOpacity,
  View
} from 'react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (pass: string) => void;
}

export const ChangePasswordModal = ({ visible, onClose, onSubmit }: Props) => {
  const [newPass, setNewPass] = useState('');

  const handleSubmit = () => {
    onSubmit(newPass);
    setNewPass('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.overlay}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Trocar Senha</Text>
          <Text style={styles.subtitle}>Digite a nova senha para a fechadura</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Nova Senha (ex: 1234)"
            keyboardType="numeric"
            value={newPass}
            onChangeText={setNewPass}
            secureTextEntry
            maxLength={8}
          />

          <View style={styles.row}>
            <TouchableOpacity style={[styles.btn, styles.btnCancel]} onPress={onClose}>
              <Text style={styles.btnTextCancel}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btn, styles.btnConfirm]} onPress={handleSubmit}>
              <Text style={styles.btnTextConfirm}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center', alignItems: 'center', padding: 20
  },
  card: {
    backgroundColor: 'white', width: '100%', borderRadius: 20,
    padding: 25, elevation: 10, shadowColor: '#000',
    shadowOpacity: 0.25, shadowRadius: 4, shadowOffset: { width: 0, height: 2 }
  },
  title: { fontSize: 22, fontWeight: 'bold', color: '#2c3e50', marginBottom: 5 },
  subtitle: { fontSize: 14, color: '#7f8c8d', marginBottom: 20 },
  input: {
    backgroundColor: '#f1f2f6', borderRadius: 10, padding: 15,
    fontSize: 18, marginBottom: 20, borderWidth: 1, borderColor: '#dfe4ea',
    textAlign: 'center'
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 15 },
  btn: { flex: 1, padding: 15, borderRadius: 10, alignItems: 'center' },
  btnCancel: { backgroundColor: '#f1f2f6' },
  btnConfirm: { backgroundColor: '#2ecc71' },
  btnTextCancel: { color: '#7f8c8d', fontWeight: 'bold' },
  btnTextConfirm: { color: 'white', fontWeight: 'bold' }
});