import React, { useState } from "react";
import {
  View,
  Image,
  Alert,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import styles from './styles';

export default function CadastroRemedio() {
  const [nomeRemedio, setNomeRemedio] = useState("");
  const [intervalo, setIntervalo] = useState("");
  const [imagem, setImagem] = useState(null);
  const [carregando, setCarregando] = useState(false);

  const selecionarImagem = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permission.status !== 'granted') {
        Alert.alert('Permissão negada', 'É necessário permitir acesso às fotos.');
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        setImagem(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Erro ao selecionar imagem:", error);
      Alert.alert("Erro", "Não foi possível selecionar a imagem.");
    }
  };

  const tirarFoto = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (permission.status !== 'granted') {
        Alert.alert('Permissão negada', 'É necessário permitir acesso à câmera.');
        return;
      }
  
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        setImagem(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Erro ao tirar foto:", error);
      Alert.alert("Erro", "Não foi possível tirar a foto.");
    }
  };

  const cadastrarRemedio = async () => {
    if (!nomeRemedio || !intervalo || !imagem) {
      Alert.alert("Atenção", "Preencha todos os campos e adicione uma imagem.");
      return;
    }

    setCarregando(true);

    try {
      const formData = new FormData();
      
      // Adiciona os dados do remédio
      formData.append('nomeRemedio', nomeRemedio);
      formData.append('intervalo', intervalo);
      
      // Prepara a imagem para envio
      const uriParts = imagem.split('/');
      const filename = uriParts[uriParts.length - 1];
      const match = /\.(\w+)$/.exec(filename);
      const fileType = match ? `image/${match[1]}` : 'image/jpeg';

      // Converte a URI para blob (melhor compatibilidade com Laravel)
      const response = await fetch(imagem);
      const blob = await response.blob();
      
      // Adiciona a imagem ao FormData
      formData.append('imgRemedio', blob, filename);

      // Configuração do Axios
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        }
      };

      // Envia para o backend
      await axios.post('http://localhost:8000/api/medicamentos', formData, config);
      
      // Limpa o formulário após cadastro
      setNomeRemedio("");
      setIntervalo("");
      setImagem(null);
      
      Alert.alert("Sucesso", "Medicamento cadastrado com sucesso!");
      
    } catch (error) {
      console.error("Erro ao cadastrar medicamento:", error);
      
      let errorMessage = "Não foi possível cadastrar o medicamento.";
      if (error.response) {
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status === 422) {
          errorMessage = "Dados inválidos. Verifique os campos.";
        }
      }
      
      Alert.alert("Erro", errorMessage);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Medicamento</Text>
      
      <TextInput
        placeholder="Nome do Medicamento"
        value={nomeRemedio}
        onChangeText={setNomeRemedio}
        style={styles.input}
        placeholderTextColor="#999"
      />
      
      <TextInput
        placeholder="Intervalo entre doses (horas)"
        keyboardType="numeric"
        value={intervalo}
        onChangeText={setIntervalo}
        style={styles.input}
        placeholderTextColor="#999"
      />
      
      <View style={styles.botoesImagemContainer}>
        <TouchableOpacity 
          style={styles.botaoImagem}
          onPress={tirarFoto}
        >
          <Ionicons name="camera" size={20} color="#fff" />
          <Text style={styles.textoBotaoImagem}> Tirar Foto</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.botaoImagem}
          onPress={selecionarImagem}
        >
          <Ionicons name="image" size={20} color="#fff" />
          <Text style={styles.textoBotaoImagem}> Escolher da Galeria</Text>
        </TouchableOpacity>
      </View>
      
      {imagem && (
        <Image 
          source={{ uri: imagem }} 
          style={styles.imagemPreview} 
        />
      )}
      
      <TouchableOpacity 
        style={styles.botaoCadastrar}
        onPress={cadastrarRemedio}
        disabled={carregando}
      >
        {carregando ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Ionicons name="save" size={20} color="#fff" />
            <Text style={styles.textoBotaoCadastrar}> Cadastrar Medicamento</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}