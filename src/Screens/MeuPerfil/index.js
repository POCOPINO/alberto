import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from'./styles'
import Header from '../../Components/Header'

export default function MeuPerfil(){
  return (
    <ScrollView style={styles.container}>

        <Header title='Meu Perfil'/>

      {/*fundo azul*/}
      <View style={styles.header} />

      {/*Nome Usuário e foto*/}
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Image
            source={{ uri:'https://upload.wikimedia.org/wikipedia/commons/9/9e/Foto_oficial_de_Luiz_In%C3%A1cio_Lula_da_Silva_%28ombros%29_denoise.jpg' }}style={styles.avatarImage}/>
        </View>
        <Pressable>
            <TouchableOpacity>
                <Text style={styles.editProfile}>Editar</Text>
            </TouchableOpacity>
        </Pressable>
        <Text style={styles.userName}>Edivan Guedes Araujo Junior</Text>
      </View>

      {/* Dados pessoais */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dados pessoais</Text>

        <InfoRow label="Nome" value="Edivan Guedes Araujo Junior" />
        <InfoRow label="Data de nascimento" value="15/03/1990" />
        <InfoRow label="Gênero" value="Masculino" />
        <InfoRow label="Altura" value="1,78 m" />
        <InfoRow label="Peso" value="78 kg" />
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