import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Modal, TextInput, Pressable, ActivityIndicator, Alert, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import Header from '../../Components/Header';
import * as ImagePicker from 'expo-image-picker';



export default function MeuPerfil() {
  const [usuario, setUsuario] = useState(null);
  const [campoAtual, setCampoAtual] = useState('');
  const [valorAtual, setValorAtual] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
        
    const carregarUsuario = async () => {
        const id = await AsyncStorage.getItem('id');
      try {
        const response = await axios.post(`http://localhost:8000/api/user/selecionarUser/${id}`);
        setUsuario(response.data.User);
        const usuario = response.data.User;
        console.log(usuario)
        setLoading(false)
      } catch (erro) {
        console.error('Erro ao carregar usuário:', erro);
      }
    };

    carregarUsuario();
  }, []);  

  const abrirModal = (campo, valor) => {
    setCampoAtual(campo);
    setValorAtual(valor);
    setModalVisible(true);
  };

  const salvarAlteracao = async () => {
    try {
      const idUser = usuario.id;
      const data = { [campoAtual]: valorAtual };

      await axios.post(`http://localhost:8000/api/user/alterar/${idUser}`, data);

      setUsuario(prev => ({ ...prev, [campoAtual]: valorAtual }));
      await AsyncStorage.setItem('usuario', JSON.stringify({ ...usuario, [campoAtual]: valorAtual }));

      setModalVisible(false);
    } catch (err) {
      console.error('Erro ao atualizar o campo:', err);
    }
  };

  const campos = [
    { label: 'Nome', chave: 'nomeUser' },
    { label: 'Data de nascimento', chave: 'dataNascUser' },
    { label: 'Gênero', chave: 'generoUser' },
    { label: 'Altura', chave: 'alturaUser' },
    { label: 'Peso', chave: 'pesoUser' },
  ];
  const [fotoUsuario, setFotoUsuario] = useState(null);
  const alterarImagem = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permission.status !== 'granted') {
        Alert.alert('Permissão negada', 'É necessário permitir acesso às fotos.');
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
  
      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setFotoUsuario(uri);
  
        const formData = new FormData();
  
        if (uri) {
          if (uri.startsWith("data:image")) {
            const response = await fetch(uri);
            const blob = await response.blob();
            const filename = `user_${Date.now()}.jpg`;
            const file = new File([blob], filename, { type: blob.type });
            formData.append("imgUser", file);
          } else {
            const uriParts = uri.split("/");
            const filename = uriParts[uriParts.length - 1];
            const match = /\.(\w+)$/.exec(filename);
            const fileType = match ? `image/${match[1]}` : "image/jpeg";
  
            formData.append("imgUser", {
              uri: uri,
              name: filename,
              type: fileType,
            });
          }
        }
  
        const id = usuario.id;
        const response = await axios.post(
          `http://localhost:8000/api/user/alterarImagem/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        if (!response.data || !response.data.image_url) {
          throw new Error("Resposta da API inválida");
        }
  
        const novaImagem = response.data.image_url;
        const usuarioAtualizado = {
          ...usuario,
          imgUser: novaImagem.replace("http://localhost:8000/", ""),
        };
  
        await AsyncStorage.setItem("usuario", JSON.stringify(usuarioAtualizado));
        setUsuario(usuarioAtualizado);
  
        Alert.alert("Sucesso", "Imagem de perfil atualizada!");
      }
    } catch (error) {
      console.error("Erro ao atualizar imagem:", error);
      Alert.alert("Erro", "Ocorreu um erro ao atualizar a imagem.");
    }
  };
  
  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <Header title='Meu Perfil' />
      <View style={styles.header} />

      <View style={styles.profileSection}>
        <TouchableOpacity onPress={alterarImagem} >
          <View style={styles.avatar}>
          <Image
            source={{ uri: `http://localhost:8000/${usuario?.imgUser}` }}
            style={styles.avatarImage}
          />
        </View>
        </TouchableOpacity>
        <Text style={styles.userName}>{usuario?.nomeUser || 'Carregando...'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dados pessoais</Text>
        {campos.map((item, index) => (
          <InfoRow
            key={index}
            label={item.label}
            value={usuario?.[item.chave] || '---'}
            onPress={() => abrirModal(item.chave, usuario?.[item.chave])}
          />
        ))}
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Editar {campoAtual}</Text>
            <TextInput
              value={valorAtual}
              onChangeText={setValorAtual}
              style={styles.input}
              placeholder="Digite o novo valor"
              placeholderTextColor="#888"
            />
            <View style={styles.buttonRow}>
              <Pressable onPress={() => setModalVisible(false)} style={styles.button}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </Pressable>
              <Pressable onPress={salvarAlteracao} style={styles.button}>
                <Text style={styles.buttonText}>Salvar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

function InfoRow({ label, value, onPress }) {
  return (
    <View style={styles.infoRow}>
      <View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      <TouchableOpacity onPress={onPress}>
        <Ionicons name="create-outline" size={22} color="#007bff" />
      </TouchableOpacity>
    </View>
  );
}
