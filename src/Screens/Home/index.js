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
        { name: 'PagMantra', title: 'MANTRA', description: 'Veja a frase motivacional do dia.', image: require('../../../assets/padraoIcon.png') },
        { name: 'Pag3', title: 'NOME PÁGINA', description: 'Descrição básica para esta página.', image: require('../../../assets/padraoIcon.png') },
        { name: 'Pag4', title: 'NOME PÁGINA', description: 'Descrição básica para esta página.', image: require('../../../assets/padraoIcon.png') },
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
                        <View style={styles.buttonContent}>
                            <Image source={page.image} style={styles.image} />
                            <View>
                                <Text style={styles.text}>{page.title}</Text>
                                <Text style={styles.description}>{page.description}</Text>
                            </View>
                            <Ionicons name="arrow-forward" size={20} color="#fff" style={styles.icon} />
                        </View>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    );
}