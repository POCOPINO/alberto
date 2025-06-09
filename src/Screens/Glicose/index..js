import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, FlatList, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import Header from '../../Components/Header';

export default function Glicemia() {
  const [glicemia, setGlicemia] = useState('');
  const [medicoes, setMedicoes] = useState([]);
 
    // Carrega medições ao abrir
    useEffect(() => {
        carregarMedicoesSalvas();
    }, []);

    const carregarMedicoesSalvas = async () => {
        try {
        const data = await AsyncStorage.getItem('medicoes');
        if (data) {
            setMedicoes(JSON.parse(data));
        }
        } catch (error) {
        console.error('Erro ao carregar medições:', error);
        }
    };

    const salvarMedicoes = async (novasMedicoes) => {
        try {
        await AsyncStorage.setItem('medicoes', JSON.stringify(novasMedicoes));
        } catch (error) {
        console.error('Erro ao salvar medições:', error);
        }
    };

    const verificarNivelGlicemia = () => {
    const valor = parseFloat(glicemia);

    if (isNaN(valor)) return;

    let resultado = '';

    if (valor < 70) resultado = 'Hipoglicemia';
    else if (valor <= 99) resultado = 'Glicemia Normal';
    else if (valor <= 125) resultado = 'Pré-diabetes';
    else resultado = 'Diabetes';

    const novaMedicao = {
        id: Date.now().toString(),
        valor: glicemia,
        status: resultado,
        data: new Date().toLocaleString(),
    };

    const novasMedicoes = [novaMedicao, ...medicoes];
        setMedicoes(novasMedicoes);
        salvarMedicoes(novasMedicoes);
        setGlicemia('');
    };

    const renderItem = ({ item }) => (
    <View style={styles.resultCard}>
      <Text style={styles.resultTitle}>Medição</Text>
      <Text style={styles.resultText}>Glicemia: {item.valor} mg/dL</Text>
      <Text style={styles.resultDescricao}>Status: {item.status}</Text>
      <Text style={styles.resultData}>Data: {item.data}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Glicemia" />

      {/* Entrada */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua glicemia (mg/dL)"
          keyboardType="numeric"
          value={glicemia}
          onChangeText={setGlicemia}
        />
        <Pressable style={styles.button} onPress={verificarNivelGlicemia}>
          <Text style={styles.buttonText}>Salvar</Text>
        </Pressable>
      </View>

      {/* Lista de medições */}
      <FlatList
        data={medicoes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Imagem informativa */}
      <View style={styles.infoImageContainer}>
        <Image
          //source={require('')}
          style={styles.infoImage}
        />
      </View>
    </View>
  );
}
