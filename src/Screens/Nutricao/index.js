import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Pressable, TextInput, Image} from 'react-native';
import { Card } from 'react-native-paper';
import axios from 'axios';
import styles from './styles'
import Header from '../../Components/Header'

export default function InfoComidaScreen() {
    const navigation = useNavigation()

    const [nomeAlimento, setNomeAlimento] = useState('');
    const [informacoes, setInformacoes] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const buscarInformacoesNutricionais = async () => {
        if (!nomeAlimento.trim()) return;

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
            setInformacoes(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
    <View style={styles.containerPai}>
            
            <Header title='Informações Calóricas'/>

        <View style={styles.container}>
            <Card style={styles.card}>
                <Text style={styles.text}>Informe o nome do alimento</Text>
                    <TextInput
                    style={styles.input}
                    value={nomeAlimento}
                    onChangeText={setNomeAlimento}
                    /> 
                <Pressable onPress={buscarInformacoesNutricionais}>
                    <View style={styles.botao}>
                        <Text style={styles.textBotao}>Buscar informações</Text>

                    </View>
                </Pressable>
            </Card>
            
            {loading && <Text style={styles.carregando}>Carregando...</Text>}
            
            {informacoes && informacoes.foods && informacoes.foods[0] && (
                <View style={styles.imageContainer}>
                    <Card style={styles.cardFruta}>
                        {}
                        <Image
                            source={{ uri: informacoes.foods[0].photo.thumb }}
                            style={styles.image}
                        />
                        <Text style={styles.textCard}>Nome: {informacoes.foods[0].food_name}</Text>
                        <Text style={styles.textCard}>Calorias: {informacoes.foods[0].nf_calories} kcal</Text>
                        <Text style={styles.textCard}>Proteínas: {informacoes.foods[0].nf_protein} g</Text>
                        <Text style={styles.textCard}>Carboidratos: {informacoes.foods[0].nf_total_carbohydrate} g</Text>
                        <Text style={styles.textCard}>Gorduras: {informacoes.foods[0].nf_total_fat} g</Text>
                    </Card>
                </View>
            )}
        </View>
    </View>
    );
}