import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  FlatList,
  Alert,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Notifications from "expo-notifications";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import styles from './styles'
import Header from '../../Components/Header'
import { ScrollView } from "react-native-web";

export default function Medicamentos() {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [interval, setInterval] = useState("");
  const [doses, setDoses] = useState([]);
  const [lastDose, setLastDose] = useState("");

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraStatus !== "granted") {
        Alert.alert("Permissão necessária", "Precisamos da sua permissão para acessar a câmera.");
      }
      const { status: notificationStatus } = await Notifications.requestPermissionsAsync();
      if (notificationStatus !== "granted") {
        Alert.alert("Permissão necessária", "Ative as notificações para receber alertas sobre os remédios.");
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
      Alert.alert("Erro", "Informe um intervalo válido e selecione um horário inicial.");
      return;
    }

    const nextDose = new Date();
    const [hours, minutes] = lastDose.split(":").map(Number);
    nextDose.setHours(hours, minutes, 0);
    nextDose.setHours(nextDose.getHours() + parseInt(interval));
    setDoses([...doses, { horario: nextDose.toLocaleTimeString() }]);
    scheduleNotification(nextDose);

    Alert.alert("Alerta definido", `Próxima dose às ${nextDose.toLocaleTimeString()}`);
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

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.inner}>
        <View style={styles.body}>
          <Pressable style={styles.btn} onPress={pickImage}>
            <Ionicons name="camera" size={20} color="#fff" />
            <Text style={styles.btnText}> Tirar Foto do Remédio</Text>
          </Pressable>

          {image && <Image source={{ uri: image }} style={styles.img} />}

          <TextInput
            placeholder="Intervalo entre doses (horas)"
            keyboardType="numeric"
            value={interval}
            onChangeText={setInterval}
            style={styles.input}
            placeholderTextColor="#888"
          />

          <TextInput
            placeholder="Última dose (HH:MM)"
            value={lastDose}
            onChangeText={setLastDose}
            style={styles.input}
            placeholderTextColor="#888"
          />

          <Pressable style={styles.btn} onPress={scheduleDose}>
            <Ionicons name="calendar" size={20} color="#fff" />
            <Text style={styles.btnText}> Agendar Alerta</Text>
          </Pressable>

          <Text style={styles.historyTitle}>Histórico de Doses</Text>

          <FlatList
            data={doses}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.historyItem}>
                <Ionicons name="alarm" size={18} color="#004f92" />
                <Text style={styles.historyText}> Dose às {item.horario}</Text>
              </View>
            )}
            contentContainerStyle={styles.historyList}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}