import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../Components/Header';
import styles from './styles';

export default function Pressao() {
  const [sistolica, setSistolica] = useState('');
  const [diastolica, setDiastolica] = useState('');
  const [medicoes, setMedicoes] = useState([]);

  useEffect(() => {
    carregarMedicoes();
  }, []);

  const carregarMedicoes = async () => {
    try {
      const data = await AsyncStorage.getItem('pressao_medicoes');
      if (data) setMedicoes(JSON.parse(data));
    } catch (err) {
      console.error('Erro ao carregar:', err);
    }
  };

  const salvarMedicoes = async (dados) => {
    try {
      await AsyncStorage.setItem('pressao_medicoes', JSON.stringify(dados));
    } catch (err) {
      console.error('Erro ao salvar:', err);
    }
  };

  const avaliarPressao = (sys, dia) => {
    if (sys < 90 || dia < 60) return 'Pressão baixa';
    if (sys <= 120 && dia <= 80) return 'Pressão normal';
    if (sys <= 129 && dia <= 84) return 'Pressão elevada';
    if (sys <= 139 || dia <= 89) return 'Hipertensão estágio 1';
    return 'Hipertensão estágio 2';
  };

  const registrarMedicao = () => {
    const sys = parseInt(sistolica);
    const dia = parseInt(diastolica);

    if (isNaN(sys) || isNaN(dia)) return;

    const status = avaliarPressao(sys, dia);
    const novaMedicao = {
      id: Date.now().toString(),
      sistolica: sys,
      diastolica: dia,
      status,
      data: new Date().toLocaleString(),
    };

    const novas = [novaMedicao, ...medicoes];
    setMedicoes(novas);
    salvarMedicoes(novas);
    setSistolica('');
    setDiastolica('');
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Medição</Text>
      <Text style={styles.cardText}>Sistólica: {item.sistolica} mmHg</Text>
      <Text style={styles.cardText}>Diastólica: {item.diastolica} mmHg</Text>
      <Text style={styles.cardText}>Status: {item.status}</Text>
      <Text style={styles.cardDate}>{item.data}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Pressão Arterial" />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Sistólica (mmHg)"
          style={styles.input}
          keyboardType="numeric"
          value={sistolica}
          onChangeText={setSistolica}
        />
        <TextInput
          placeholder="Diastólica (mmHg)"
          style={styles.input}
          keyboardType="numeric"
          value={diastolica}
          onChangeText={setDiastolica}
        />
        <Pressable style={styles.button} onPress={registrarMedicao}>
          <Text style={styles.buttonText}>Salvar</Text>
        </Pressable>
      </View>

      <FlatList
        data={medicoes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
