import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Pressable, ScrollView, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles'

export default function Home() {
    const navigation = useNavigation();

    const pages = [
        { name: 'PagVacina', title: 'VACINAS', description: 'Verifique as vacinas que você deve tomar.', image: require('../../../assets/vacinaIcon.png') },
        { name: 'PagIMC', title: 'IMC', description: 'Calcule seu Índice de Massa Corporal.', image: require('../../../assets/imcIcon.png') },
        { name: 'PagNutricao', title: 'CALORIAS', description: 'Saiba mais sobre a contagem de calorias.', image: require('../../../assets/nutriIcon.png') },
        { name: 'PagRemedio', title: 'MEDICAMENTOS', description: 'Saiba mais sobre suas medicações', image: require('../../../assets/padraoIcon.png') },
        { name: 'PagMantra', title: 'SEUS MANTRAS', description: 'Mantras para você alcançar sua paz.', image: require('../../../assets/padraoIcon.png') },
        { name: 'PagFrase', title: 'FRASE DO DIA', description: 'Veja uma frase para motivar o seu dia.', image: require('../../../assets/padraoIcon.png') },
        { name: 'PagSono', title: 'DICAS DE SONO', description: 'Veja algumas dicas para pegar no sono.', image: require('../../../assets/padraoIcon.png') },
        { name: 'Pag5', title: 'NOME PÁGINA', description: 'Descrição básica para esta página.', image: require('../../../assets/padraoIcon.png') },
        { name: 'Pag6', title: 'NOME PÁGINA', description: 'Descrição básica para esta página.', image: require('../../../assets/padraoIcon.png') },
        { name: 'Pag7', title: 'NOME PÁGINA', description: 'Descrição básica para esta página.', image: require('../../../assets/padraoIcon.png') }
    ];

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            
            {/* Header */}
            <View style={styles.header}>
                {/* Botão de menu */}
                <Pressable onPress={() => navigation.openDrawer()} style={styles.menuButton}>
                    <Ionicons name="menu" size={28} color="#004f92" />
                </Pressable>

                <Text style={styles.headerText}>Home</Text>


                <View style={styles.menuButton} />
            </View>

            {/* Conteúdo rolável */}
            <ScrollView contentContainerStyle={styles.content}>
                {pages.map((page, index) => (
                    <Pressable 
                        key={index} 
                        style={styles.button} 
                        onPress={() => navigation.navigate(page.name)}>
                        <View style={styles.buttonView}>
                            <View style={styles.buttonDescription}>
                                <Image source={page.image} style={styles.image} />
                                <Text style={styles.text}>{page.title}</Text>
                            </View>
                            <View style={styles.buttonContent}>
                                <Text style={styles.description}>{page.description}</Text>
                                <Ionicons name="arrow-forward" size={20} color="#fff" style={styles.icon} />
                            </View>
                        </View>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    );
}