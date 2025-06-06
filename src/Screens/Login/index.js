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

      console.log('Resposta completa:', response); // 🔍 Ver toda a resposta da API

      if (response.data.success) {
        console.log('Usuário logado:', response.data.user);
        const user =  response.data.user
        Alert.alert('Sucesso', 'Login realizado!');
        await AsyncStorage.setItem('usuario', JSON.stringify(response.data.user));
        await AsyncStorage.setItem('logado', '1')
        await AsyncStorage.setItem('id', String(user.id));
        navigation.navigate('HomeDrawer');
      } else {
        console.log('Erro retornado pela API:', response.data); // ❌ Se a API respondeu com erro
        Alert.alert('Erro', response.data.error || 'Erro no login');
      }
    } catch (error) {
      console.log('Erro de conexão ou exceção:', error); // 🚨 Captura erro geral
      Alert.alert('Erro', error.response?.data?.error || 'Erro ao conectar com o servidor');
    }
  }    

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
              onPress={login} 
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
