import React, { useState, useEffect } from "react";
import { View, Image, FlatList, Alert, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Notifications from "expo-notifications";
import { Text, Button, TextInput } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import styles from './styles'
import Header from '../../Components/Header'

export default function Medicamentos() {
  const navigation = useNavigation()
  const [image, setImage] = useState(null);
  const [interval, setInterval] = useState("");
  const [doses, setDoses] = useState([]);
  const [lastDose, setLastDose] = useState("");

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } =
        await ImagePicker.requestCameraPermissionsAsync();
      if (cameraStatus !== "granted") {
        Alert.alert(
          "Permissão necessária",
          "Precisamos da sua permissão para acessar a câmera."
        );
      }
      const { status: notificationStatus } =
        await Notifications.requestPermissionsAsync();
      if (notificationStatus !== "granted") {
        Alert.alert(
          "Permissão necessária",
          "Ative as notificações para receber alertas sobre os remédios."
        );
      }
    })();
  }, []);

  async function pickImage() {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  function scheduleDose() {
    if (!interval || isNaN(interval) || interval <= 0 || !lastDose) {
      Alert.alert(
        "Erro",
        "Informe um intervalo válido e selecione um horário inicial."
      );
      return;
    }
    const nextDose = new Date();
    const [hours, minutes] = lastDose.split(":").map(Number);
    nextDose.setHours(hours, minutes, 0);
    nextDose.setHours(nextDose.getHours() + parseInt(interval));
    setDoses([...doses, { horario: nextDose.toLocaleTimeString() }]);
    scheduleNotification(nextDose);
    Alert.alert(
      "Alerta definido",
      `Próxima dose às ${nextDose.toLocaleTimeString()}`
    );
  }

  async function scheduleNotification(time) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hora do remédio",
        body: "Tomar o remédio agora!",
      },
      trigger: { seconds: (time - new Date()) / 1000 },
    });
  }

  return (
    <View style={styles.container}>
      
      <Header title='Medicamentos'/>

    <View style={styles.app}>
      <Button
        style={styles.btn}
        icon="camera"
        mode="contained"
        onPress={pickImage}
      >
        Tirar Foto
      </Button>
      {image && <Image source={{ uri: image }} style={styles.img} />}

      <TextInput
        label="Intervalo entre doses (horas):"
        style={styles.input}
        keyboardType="numeric"
        value={interval}
        onChangeText={setInterval}
      />

      <TextInput
        label="Última dose (HH:MM):"
        style={styles.input}
        onChangeText={setLastDose}
        value={lastDose}
      />

      <Button
        style={styles.btn}
        icon="calendar"
        mode="contained"
        onPress={scheduleDose}
      >
        Agendar Alerta
      </Button>
      <Text style={styles.history}>Histórico de Doses:</Text>
      <FlatList
        data={doses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.textItem}>{item.horario}</Text>
        )}
      />
    </View>
    </View>
  );
}