import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Modal, TextInput, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import Header from '../../Components/Header';

export default function MeuPerfil() {
  const [usuario, setUsuario] = useState(null);
  const [campoAtual, setCampoAtual] = useState('');
  const [valorAtual, setValorAtual] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    async function carregarUsuario() {
      try {
        const dados = await AsyncStorage.getItem('usuario');
        if (dados) {
          setUsuario(JSON.parse(dados));
        }
      } catch (erro) {
        console.error('Erro ao carregar usuário:', erro);
      }
    }
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

  return (
    <ScrollView style={styles.container}>
      <Header title='Meu Perfil' />
      <View style={styles.header} />

      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Image
            source={{ uri: `http://localhost:8000/${usuario?.imgUser}` }}
            style={styles.avatarImage}
          />
        </View>
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
