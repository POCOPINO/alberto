import React, { useState } from "react";
import { View, Alert, StyleSheet, ScrollView, TextInput, Button } from "react-native";
import axios from "axios";

export default function CadastroUsuario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [genero, setGenero] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");

  const enviarDados = async () => {
    if (!nome || !email || !senha) {
      Alert.alert("Erro", "Preencha pelo menos nome, email e senha.");
      return;
    }
  
    try {
      console.log("Preparando para enviar dados...");
      console.log("Dados a serem enviados:", {
        nome,
        email,
        senha,
        dataNasc,
        genero,
        peso: parseFloat(peso),
        altura: parseFloat(altura),
      });
  
      const url = "http://localhost:8000/api/usuarios";
      console.log("URL da requisição:", url);
  
      const response = await axios.post(url, {
        nome,
        email,
        senha,
        dataNasc,
        genero,
        peso: parseFloat(peso),
        altura: parseFloat(altura),
      });
  
      console.log("Resposta do servidor:", {
        status: response.status,
        data: response.data,
        headers: response.headers,
      });
  
      Alert.alert("Sucesso", "Usuário cadastrado!");
      
      // Limpar formulário
      setNome("");
      setEmail("");
      setSenha("");
      setDataNasc("");
      setGenero("");
      setPeso("");
      setAltura("");
  
    } catch (error) {
      console.group("Erro na requisição");
      console.error("Mensagem de erro:", error.message);
      
      if (error.response) {
        // O servidor respondeu com um status fora do range 2xx
        console.error("Status do erro:", error.response.status);
        console.error("Dados da resposta:", error.response.data);
        console.error("Cabeçalhos da resposta:", error.response.headers);
      } else if (error.request) {
        // A requisição foi feita mas nenhuma resposta foi recebida
        console.error("Requisição feita mas sem resposta:", error.request);
        console.error("Configuração da requisição:", error.config);
      } else {
        // Algum erro ocorreu durante a configuração da requisição
        console.error("Erro ao configurar a requisição:", error.message);
      }
      
      console.groupEnd();
      
      Alert.alert(
        "Erro", 
        error.response?.data?.message || 
        error.message || 
        "Erro desconhecido ao cadastrar usuário."
      );
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Nascimento (YYYY-MM-DD)"
        value={dataNasc}
        onChangeText={setDataNasc}
      />
      <TextInput
        style={styles.input}
        placeholder="Gênero (M/F)"
        value={genero}
        onChangeText={setGenero}
      />
      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />
      <TextInput
        style={styles.input}
        placeholder="Altura (m)"
        keyboardType="numeric"
        value={altura}
        onChangeText={setAltura}
      />

      <Button title="Cadastrar" onPress={enviarDados} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#f8f9fa",
    flexGrow: 1,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 15,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#004f92",
  },
});
