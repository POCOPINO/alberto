import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Header from '../../Components/Header'
import styles from './styles'

export default function Vacinas() {
  const navigation = useNavigation();
  const [faixaSelecionada, setFaixaSelecionada] = useState('Todas');

  const vacinasPorIdade = {
    '0-6 meses': [
      'Vacina BCG',
      'Vacina Hepatite B',
      'Vacina DTPa',
      'Vacina Rotavírus',
      'Vacina Pneumocócica',
      'Vacina Poliomielite',
    ],
    '1 ano': [
      'Vacina MMR (Sarampo, Caxumba e Rubéola)',
      'Vacina DTP (Difteria, Tétano e Coqueluche)',
      'Vacina Hepatite A',
      'Vacina Varicela',
      'Vacina Pneumocócica Reforço',
    ],
    '5 anos': [
      'Vacina dT (Difteria e Tétano)',
      'Vacina Poliomielite Reforço',
      'Vacina MMR Reforço',
      'Vacina Varicela Reforço',
    ],
    'Adultos (19+)': [
      'Vacina Hepatite B (Dose de reforço)',
      'Vacina dT (Difteria e Tétano)',
      'Vacina Febre Amarela',
      'Vacina Influenza',
    ],
    'Idosos (60+)': [
      'Vacina Pneumocócica',
      'Vacina Hepatite A',
      'Vacina Herpes Zóster',
      'Vacina Influenza',
    ],
  };

  const faixasEtarias = ['Todas', ...Object.keys(vacinasPorIdade)];

  const renderVacinas = () => {
    return Object.entries(vacinasPorIdade)
      .filter(([faixa]) => faixaSelecionada === 'Todas' || faixa === faixaSelecionada)
      .map(([faixa, vacinas], index) => (
        <View key={index}>
          <View style={styles.vaccineSection}>
            <Text style={styles.ageGroup}>{faixa}</Text>
            {vacinas.map((v, i) => (
              <Text key={i} style={styles.vaccine}>
                - <Text style={styles.bold}>{v}</Text>
              </Text>
            ))}
          </View>
          <View style={styles.line} />
        </View>
      ));
  };

  return (
    <View style={styles.container}>
      
      <Header title='Vacinas'/>

      {/* Filtro por idade */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filtrar por faixa etária:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={faixaSelecionada}
            onValueChange={(itemValue) => setFaixaSelecionada(itemValue)}
            style={styles.picker}
            dropdownIconColor="#004f92"
          >
            {faixasEtarias.map((faixa, idx) => (
              <Picker.Item key={idx} label={faixa} value={faixa} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Conteúdo filtrado */}
      <ScrollView contentContainerStyle={styles.content}>
        {renderVacinas()}
      </ScrollView>
    </View>
  );
}