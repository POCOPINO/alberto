import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Image, StyleSheet,ScrollView } from 'react-native';
import styles from './style'
import Header from '../../Components/Header'

export default function IMC() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [imc, setIMC] = useState(null);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);

  const navigation = useNavigation()

  const calculateIMC = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100; 
    
    if (!weightNum || !heightNum) {
      setMessage('Por favor, insira valores válidos para peso e altura.');
      setIMC(null);
      setImage(null);
      return;
    }
    
    const imcValue = (weightNum / (heightNum * heightNum)).toFixed(2);
    setIMC(imcValue);
    
    if (imcValue < 18.5) {
      setImage(require('../../../assets/Magro.png'));
    } else if (imcValue >= 18.5 && imcValue < 24.9) {
      setImage(require('../../../assets/Normal.png'));
    } else if (imcValue >= 25 && imcValue < 29.9) {
      setImage(require('../../../assets/Sobrepeso.png'));
    }else if(imcValue >= 30 && imcValue < 34.9){
      setImage(require('../../../assets/Obeso.png'));
    } else {
      setImage(require('../../../assets/ObesoM.png'));
    }
  };

  return (
    <View style={styles.container}>
      
      <Header title='IMC'/>

      {/* Área de entrada */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Peso (kg)"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
        <TextInput
          style={styles.input}
          placeholder="Altura (cm)"
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />
        <Pressable style={styles.button} onPress={calculateIMC}>
          <Text style={styles.buttonText}>Calcular</Text>
        </Pressable>
      </View>

      {/* Area do resultado */}
      <ScrollView>
      {imc && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Seu IMC: {imc}</Text>
          {image && <Image source={image} style={styles.image} />}
        </View>
      )}

      {/*image sobre IMC */}
      <View style={styles.infoImageContainer}>
        <Image source={require('../../../assets/InfoIMC.png')} style={styles.infoImage} />
      </View>
      </ScrollView>
    </View>
  );
}