import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';
import styles from './styles'
import Header from '../../Components/Header'

export default function PagFrase() {
  const [fraseOriginal, setFraseOriginal] = useState('');
  const [fraseTraduzida, setFraseTraduzida] = useState('');
  const [loading, setLoading] = useState(true);

  // Função que busca e traduz a frase
  const buscarFrase = async () => {
    setLoading(true);
    try {
      // Busca frase da API
      const response = await axios.get('https://api.adviceslip.com/advice');
      const fraseIngles = response.data.slip.advice;

      setFraseOriginal(fraseIngles);

      // Traduz usando a API do Google Translate
      const traducao = await axios.get('https://translate.googleapis.com/translate_a/single', {
        params: {
          client: 'gtx',
          sl: 'en',
          tl: 'pt',
          dt: 't',
          q: fraseIngles,
        },
      });

      const frasePt = traducao.data[0][0][0];
      setFraseTraduzida(frasePt);
    } catch (error) {
      console.error('Erro ao buscar ou traduzir a frase:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarFrase();
  }, []);

  return (
    <View style={styles.containerPai}>
            <Header title='Frase do dia'/>
        <View style={styles.container}>
        {loading ? (
            <ActivityIndicator size="large" color="#555" />
        ) : (
            <>
                <View style={styles.Frase}>
                    <Text style={styles.titulo}>Frase dia</Text>
                    <Text style={styles.frase}>{fraseTraduzida}</Text>
                </View>

                <View style={styles.Frase}>
                    <Text style={styles.titulo}>Frase original</Text>
                    <Text style={styles.frase}>{fraseOriginal}</Text>
                </View>
            </>
        )}
        </View>
    </View>
  );
}
