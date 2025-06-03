import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  Pressable,
  TextInput,
  Image,
  ActivityIndicator,
  FlatList,
  Keyboard,
} from 'react-native';
import { Card } from 'react-native-paper';
import axios from 'axios';
import Header from '../../Components/Header'
import styles from './styles'

export default function InfoComidaScreen() {
  const navigation = useNavigation();

  const [nomeAlimento, setNomeAlimento] = useState('');
  const [informacoes, setInformacoes] = useState([]);
  const [loading, setLoading] = useState(false);

  const buscarInformacoesNutricionais = async () => {
    if (!nomeAlimento.trim()) return;

    Keyboard.dismiss();
    setLoading(true);

    try {
      const response = await axios.post(
        'https://trackapi.nutritionix.com/v2/natural/nutrients',
        { query: nomeAlimento },
        {
          headers: {
            'x-app-id': '634d62ae',
            'x-app-key': '4662fdcfb10b6071eaf00faedbef4b86',
          },
        }
      );
      setInformacoes(response.data.foods || []);
    } catch (error) {
      console.error(error);
      setInformacoes([]);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <Card style={styles.cardFruta}>
      <Image source={{ uri: item.photo.thumb }} style={styles.image} />
      <Text style={styles.textCard}>Nome: {item.food_name}</Text>
      <Text style={styles.textCard}>Calorias: {item.nf_calories} kcal</Text>
      <Text style={styles.textCard}>Proteínas: {item.nf_protein} g</Text>
      <Text style={styles.textCard}>Carboidratos: {item.nf_total_carbohydrate} g</Text>
      <Text style={styles.textCard}>Gorduras: {item.nf_total_fat} g</Text>
    </Card>
  );

  return (
    <View style={styles.containerPai}>
      
      <Header title='Nutrição'/>

      {/* FORM */}
      <View style={styles.container}>
        <Card style={styles.card}>
          <Text style={styles.text}>Informe o nome do alimento</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: banana, arroz, maçã..."
            value={nomeAlimento}
            onChangeText={setNomeAlimento}
          />
          <Pressable onPress={buscarInformacoesNutricionais} style={styles.botao}>
            <Text style={styles.textBotao}>Buscar informações</Text>
          </Pressable>
        </Card>

        {loading && <ActivityIndicator size="large" color="#004f92" style={{ marginTop: 20 }} />}

        <FlatList
          data={informacoes}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            !loading && (
              <Text style={styles.emptyText}>
                Nenhuma informação encontrada. Tente outro alimento.
              </Text>
            )
          }
        />
      </View>
    </View>
  );
}