import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, TextInput, Pressable, ScrollView, View } from 'react-native';
import { Card } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [genero, setGenero] = useState('');
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');

  const carregar = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/usuario');
      const data = response.data;
      setNome(data.nomeUsuario);
      setEmail(data.emailUsuario);
      setSenha(data.senhaUsuario);
      setDataNasc(data.datanascUsuario);
      setGenero(data.generoUsuario);
      setAltura(data.alturaUsuario);
      setPeso(data.pesoUsuario);
    } catch (error) {
      console.error(error);
    }
  };

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.spacer}/>
          <View style={styles.card}>
            <TextInput
              style={styles.input}
              placeholder="Nome completo"
              value={nome}
              onChangeText={setNome}
            />
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
            <TextInput
              style={styles.input}
              placeholder="Data de Nascimento"
              value={dataNasc}
              onChangeText={setDataNasc}
            />
            <TextInput
              style={styles.input}
              placeholder="Gênero"
              value={genero}
              onChangeText={setGenero}
            />
            <TextInput
              style={styles.input}
              placeholder="Altura"
              keyboardType="numeric"
              value={altura}
              onChangeText={setAltura}
            />
            <TextInput
              style={styles.input}
              placeholder="Peso"
              keyboardType="numeric"
              value={peso}
              onChangeText={setPeso}
            />

            <Pressable 
            style={styles.button}
            onPress={() => navigation.navigate('Login')}>
              <Text style={styles.buttonText}>Cadastre-se</Text>
            </Pressable>
          </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004f92',
  },

  spacer: {
    flex:0.3
  },
  card: {
    flex:1,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },

  input: {
    height: 45,
    borderColor: '#004f92',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    //SOMBRAS//dir 
    elevation:4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  button: {
    backgroundColor: '#004f92',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    //SOMBRAS//
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation:4
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
