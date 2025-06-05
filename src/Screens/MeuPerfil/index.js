import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import Header from '../../Components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MeuPerfil() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    async function carregarUsuario() {
      try {
        const dados = await AsyncStorage.getItem('usuario');
        if (dados) {
          const usuarioObj = JSON.parse(dados);
          setUsuario(usuarioObj);
        }
      } catch (erro) {
        console.error('Erro ao carregar usuário:', erro);
      }
    }

    carregarUsuario();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Header title='Meu Perfil' />

      {/* fundo azul */}
      <View style={styles.header} />

      {/* Nome Usuário e foto */}
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Image
            source={{ uri: `http://localhost:8000/${usuario?.imgUser}` }}
            style={styles.avatarImage}
          />
        </View>
        <Pressable>
          <TouchableOpacity>
            <Text style={styles.editProfile}>Editar</Text>
          </TouchableOpacity>
        </Pressable>

        <Text style={styles.userName}>
          {usuario ? usuario.nomeUser : 'Carregando...'}
        </Text>
      </View>

      {/* Dados pessoais */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dados pessoais</Text>

        <InfoRow label="Nome" value={usuario?.nomeUser || '---'} />
        <InfoRow label="Data de nascimento" value={usuario?.dataNascUser || '---'} />
        <InfoRow label="Gênero" value={usuario?.generoUser || '---'} />
        <InfoRow label="Altura" value={usuario?.alturaUser || '---'} />
        <InfoRow label="Peso" value={usuario?.pesoUser || '---'} />
      </View>
    </ScrollView>
  );
}

function InfoRow({ label, value }) {
  return (
    <View style={styles.infoRow}>
      <View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      <TouchableOpacity>
        <Ionicons name="create-outline" size={22} color="#007bff" />
      </TouchableOpacity>
    </View>
  );
}
