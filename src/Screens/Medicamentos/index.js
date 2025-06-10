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
import Header from "../../Components/Header";

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

      // Processamento da imagem
      if (imagem) {
        const response = await fetch(imagem);
        const blob = await response.blob();
        const filename = `remedio_${Date.now()}.jpg`;

        const file = new File([blob], filename, { type: blob.type });
        formData.append("imgRemedio", file);
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        }
      };

      await axios.post('http://localhost:8000/api/medicamentos', formData, config);

      setNomeRemedio("");
      setIntervalo("");
      setImagem(null);

      Alert.alert("Sucesso", "Medicamento cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar medicamento:", error);

      let errorMessage = "Não foi possível cadastrar o medicamento.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 422) {
        errorMessage = "Dados inválidos. Verifique os campos.";
      }

      Alert.alert("Erro", errorMessage);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.containerPai}>
      <Header title="Medicamentos" />
      <View style={styles.container}>
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
    </View>
  );
}
