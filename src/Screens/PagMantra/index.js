import { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import styles from './style'
import Header from '../../Components/Header'

export default function PagMantra() {
    const navigation = useNavigation();
    
    const [Frase, setFrase] = useState('');
    const [loading, setLoading] = useState(true);

    const buscarFrase = async () => {
        try {
            const response = await axios.get('https://api.adviceslip.com/advice');
            const Frase = response.data.slip.advice;
            setFrase(Frase);
        } catch (error) {
            console.error('Erro:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        buscarFrase();
    }, []);

    return (
    <View style={styles.container}>
        
        <Header title='Frase do Dia'/>

        <View style={styles.Frase}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <View style={styles.resultado}>
                    <Text style={styles.frase}>{Frase}"</Text>
                </View>
            )}
        </View>
    </View>
    );
}