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
  const [userImg, setUserImg] = useState('https://cdn.pixabay.com/photo/2017/08/16/00/29/add-person-2646097_1280.png');
  

  const enviarDados = async () => {
    if (!nome || !email || !senha) {
      Alert.alert("Erro", "Preencha pelo menos nome, email e senha.");
      return;
    }
  
    try {
      const formData = new FormData();
  
      formData.append("nome", nome);
      formData.append("email", email);
      formData.append("senha", senha);
      formData.append("dataNasc", dataNasc);
      formData.append("genero", genero);
      formData.append("peso", peso);
      formData.append("altura", altura);
  
      // Processar a imagem, se necessário
      if (userImg.startsWith("data:image")) {
        const response = await fetch(userImg);
        const blob = await response.blob();
        const filename = `user_${Date.now()}.jpg`;
        const file = new File([blob], filename, { type: blob.type });
        formData.append("imgUser", file);
      } else {
        const uriParts = userImg.split("/");
        const filename = uriParts[uriParts.length - 1];
        const match = /\.(\w+)$/.exec(filename);
        const fileType = match ? `image/${match[1]}` : "image/jpeg";
  
        formData.append("imgUser", {
          uri: userImg,
          name: filename,
          type: fileType,
        });
      }
  
      const url = "http://localhost:8000/api/usuarios";
  
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log("Resposta do servidor:", response.data);
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
        console.error("Status do erro:", error.response.status);
        console.error("Dados da resposta:", error.response.data);
      } else if (error.request) {
        console.error("Requisição feita mas sem resposta:", error.request);
      } else {
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
