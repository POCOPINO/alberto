import React, { useState } from 'react';
import {
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha email e senha');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        senha,
      });

      if (response.data.success) {
        Alert.alert('Sucesso', 'Login realizado!');

        // Salva os dados do usuário localmente (opcional)
        await AsyncStorage.setItem('usuario', JSON.stringify(response.data.user));

        // Navega para a tela principal
        navigation.navigate('HomeDrawer');
      } else {
        Alert.alert('Erro', response.data.error || 'Erro no login');
      }
    } catch (error) {
      Alert.alert('Erro', error.response?.data?.error || 'Erro ao conectar com o servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.innerContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Bem-vindo</Text>
          <Text style={styles.subtitle}>Faça login para continuar</Text>

          <View style={styles.viewInput}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#999"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.viewButton}>
            <Pressable
              style={styles.button}
              onPress={login} // 👈 agora chama a função correta
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Entrando...' : 'Entrar'}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate('Cadastro')}
              style={styles.linkContainer}
            >
              <Text style={styles.signText}>
                Ainda não tem uma conta?{' '}
                <Text style={styles.signLink}>Cadastre-se</Text>
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
