import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, TextInput, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style' 

export default function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.spacer} />
      <View style={styles.card}>
        <View style={styles.viewInput}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry={true}
            value={senha}
            onChangeText={setSenha}
          />
        </View>
        <View style={styles.viewButton}>
          <Pressable 
            style={styles.button}
            onPress={() => navigation.replace('HomeDrawer')} // ou alguma tela principal
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </Pressable>
          <Pressable 
            onPress={() => navigation.navigate('Cadastro')}
            style={{ marginTop: 10 }}
          >
            <Text style={styles.signText}>Ainda não tem uma conta? Cadastre-se</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}