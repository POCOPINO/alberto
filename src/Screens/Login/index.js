import React, { useState } from 'react';
import {
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style'

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

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
              onPress={() => navigation.navigate('HomeDrawer')}
            >
              <Text style={styles.buttonText}>Entrar</Text>
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