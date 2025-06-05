import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Header from '../../Components/Header'
import styles from './styles'

export default function PagSono() {
  const navigation = useNavigation();
  const [tipoSelecionado, setTipoSelecionado] = useState('Todas');

  const Dicas = {
   'Antes de Dormir': [
    'Desligue telas (celular, computador, TV) pelo menos 1 hora antes de dormir.',
    'Evite cafeína, nicotina e bebidas energéticas após o meio da tarde.',
    'Evite refeições pesadas e álcool próximo da hora de dormir.',
    'Tome um banho morno para relaxar o corpo.',
    'Diminua as luzes da casa no período da noite para ajudar na produção de melatonina.',
  ],
  'Ambiente de Sono': [
    'Mantenha o quarto escuro, silencioso e com temperatura agradável.',
    'Use cortinas blackout ou máscara de dormir para bloquear luz externa.',
    'Utilize tampões de ouvido ou uma máquina de ruído branco, se necessário.',
    'Garanta que colchão e travesseiros sejam confortáveis.',
    'Reserve a cama apenas para dormir (evite trabalhar ou assistir TV nela).',
  ],
  'Hábitos Diários': [
    'Mantenha um horário regular para dormir e acordar, mesmo nos fins de semana.',
    'Evite cochilos longos durante o dia (máximo 30 minutos e nunca após as 15h).',
    'Pratique exercícios físicos regularmente, mas evite nas 2 horas antes de dormir.',
    'Tome sol durante o dia para ajudar a regular o relógio biológico.',
  ],
  'Relaxamento e Mente': [
    'Faça respiração profunda, meditação ou leitura leve antes de dormir.',
    'Evite pensar em problemas ou tarefas na hora de deitar — anote o que estiver te preocupando.',
    'Ouça sons relaxantes ou música calma para desacelerar o cérebro.',
    'Experimente técnicas como o método 4-7-8 para induzir o sono.',
  ],
};

  const TipoDicas = ['Todas', ...Object.keys(Dicas)];

  const renderDicas = () => {
    return Object.entries(Dicas)
      .filter(([tipo]) => tipoSelecionado === 'Todas' || tipo === tipoSelecionado)
      .map(([tipo, dica], index) => (
        <View key={index}>
          <View style={styles.hintSection}>
            <Text style={styles.hintTypeGroup}>{tipo}</Text>
            {dica.map((d, i) => (
              <Text key={i} style={styles.hint}>
                - <Text style={styles.bold}>{d}</Text>
              </Text>
            ))}
          </View>
          <View style={styles.line} />
        </View>
      ));
  };

  return (
    <View style={styles.container}>
      
      <Header title='Dicas para Dormir'/>

      {/* Filtro por idade */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filtrar Dicas:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={tipoSelecionado}
            onValueChange={(itemValue) => setTipoSelecionado(itemValue)}
            style={styles.picker}
            dropdownIconColor="#004f92"
          >
            {TipoDicas.map((tipo, idx) => (
              <Picker.Item key={idx} label={tipo} value={tipo} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Conteúdo filtrado */}
      <ScrollView contentContainerStyle={styles.content}>
        {renderDicas()}
      </ScrollView>
    </View>
  );
}