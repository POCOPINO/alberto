import { StatusBar } from "expo-status-bar";
import { View, Pressable, Image, Text, Modal } from "react-native";
import { useState } from "react";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Header from "../../Components/Header";
import styles from './styles'

export default function PagAgua() {
  const [aguaConsumida, setAguaConsumida] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const atualizarAgua = (quantidade) => {
    let novaQuantidade = aguaConsumida + quantidade;

    if (novaQuantidade < 0) {
      novaQuantidade = 0;
    } else if (novaQuantidade > 2000) {
      novaQuantidade = 2000;
    }

    setAguaConsumida(novaQuantidade);

    if (novaQuantidade >= 2000) {
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        setAguaConsumida(0); 
      }, 2000);
    }
  };

  return (
    <View>

        <Header title='Consumo de Água'/>

    <View style={styles.container}>
        <View style={styles.containerGrafico}>
            <AnimatedCircularProgress
            size={240}
            width={60}
            fill={(aguaConsumida / 2000) * 100}
            tintColor="#73C2FE"
            onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor="#E8E8E8"
            />
            <Text style={{ fontWeight: 700, marginVertical: 20, color: '#004f92' }}>
            Você consumiu {aguaConsumida} ml de água
            </Text>
        </View>
        <View style={styles.BotaoContainer}>
            <Pressable style={styles.botaoAdc} onPress={() => atualizarAgua(200)}>
                <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    style={{ width: 43, height: 43, resizeMode: 'contain' }}
                    source={require('../../../assets/copoAgua.png')}
                />
                </View>
                <View style={{ flex: 0.5 }}>
                <Text style={styles.textoAdc}>+200ML</Text>
                </View>
            </Pressable>
            <Pressable style={styles.botaoAdc} onPress={() => atualizarAgua(500)}>
                <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    style={{ width: 47, height: 47, resizeMode: 'contain' }}
                    source={require('../../../assets//garrafaUmLitro.png')}
                />
                </View>
                <View style={{ flex: 0.5 }}>
                <Text style={styles.textoAdc}>+500ML</Text>
                </View>
            </Pressable>
        </View>

        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={styles.modalTexto}>Você atingiu a meta Diária!</Text>
                <Pressable style={styles.botaoAdcModal} onPress={() => setModalVisible(false)}>
                <Text style={styles.textoAdc}>Fechar</Text>
                </Pressable>
            </View>
            </View>
        </Modal>

        <StatusBar style="auto" />
    </View>
    </View>
  );
}