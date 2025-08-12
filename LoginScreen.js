// LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha email e senha.");
      return;
    }
    setLoading(true);
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert("Sucesso", "Conta criada com sucesso!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onLogin();
    } catch (error) {
      Alert.alert("Erro", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isRegistering ? "Criar Conta" : "Login"}</Text>
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        editable={!loading}
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        editable={!loading}
      />
      <Button
        title={isRegistering ? "Criar Conta" : "Entrar"}
        onPress={handleLogin}
        disabled={loading}
      />
      <TouchableOpacity
        onPress={() => setIsRegistering(!isRegistering)}
        disabled={loading}
        style={{ marginTop: 20 }}
      >
        <Text style={styles.toggleText}>
          {isRegistering
            ? "Já tem conta? Faça login"
            : "Não tem conta? Crie uma aqui"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 32, marginBottom: 24, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 12, padding: 10 },
  toggleText: { color: '#0066cc', textAlign: 'center', fontSize: 16 }
});
