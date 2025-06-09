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
  Modal,
  TouchableOpacity
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Notifications from "expo-notifications";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import styles from './styles';
import Header from '../../Components/Header';

export default function Medicamentos() {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [nomeRemedio, setNomeRemedio] = useState("");
  const [intervalo, setIntervalo] = useState("");
  const [doses, setDoses] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [lastDose, setLastDose] = useState("");

  // Carrega medicamentos ao iniciar
  useEffect(() => {
    carregarMedicamentos();
    solicitarPermissoes();
  }, []);

  const solicitarPermissoes = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraStatus !== "granted") {
      Alert.alert("Permissão necessária", "Precisamos da sua permissão para acessar a câmera.");
    }
    const { status: notificationStatus } = await Notifications.requestPermissionsAsync();
    if (notificationStatus !== "granted") {
      Alert.alert("Permissão necessária", "Ative as notificações para receber alertas sobre os remédios.");
    }
  };

  const carregarMedicamentos = async () => {
    try {
      const response = await axios.get('');
      setMedicamentos(response.data);
    } catch (error) {
      console.error("Erro ao carregar medicamentos:", error);
      Alert.alert("Erro", "Não foi possível carregar os medicamentos.");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const salvarMedicamento = async () => {
    if (!nomeRemedio || !intervalo || !image) {
      Alert.alert("Atenção", "Preencha todos os campos e adicione uma imagem.");
      return;
    }

    try {
      const formData = new FormData();
      const uriParts = image.split('/');
      const filename = uriParts[uriParts.length - 1];
      const match = /\.(\w+)$/.exec(filename);
      const fileType = match ? `image/${match[1]}` : 'image/jpeg';

      // Converter para blob para enviar corretamente
      const response = await fetch(image);
      const blob = await response.blob();
      
      formData.append('nomeRemedio', nomeRemedio);
      formData.append('intervalo', intervalo);
      formData.append('imgRemedio', blob, filename);

      if (editingId) {
        // Atualizar medicamento existente
        await axios.put(`http://seu-servidor/api/medicamentos/${editingId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        Alert.alert("Sucesso", "Medicamento atualizado com sucesso!");
      } else {
        // Criar novo medicamento
        await axios.post('http://localhost:8000/api/medicamentos', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        Alert.alert("Sucesso", "Medicamento cadastrado com sucesso!");
      }

      // Limpar campos e recarregar lista
      setNomeRemedio("");
      setIntervalo("");
      setImage(null);
      setEditingId(null);
      setModalVisible(false);
      carregarMedicamentos();
      
    } catch (error) {
      console.error("Erro ao salvar medicamento:", error);
      Alert.alert("Erro", "Não foi possível salvar o medicamento.");
    }
  };

  const editarMedicamento = (medicamento) => {
    setNomeRemedio(medicamento.nomeRemedio);
    setIntervalo(medicamento.intervalo.toString());
    setImage(medicamento.imgRemedio);
    setEditingId(medicamento.id);
    setModalVisible(true);
  };

  const deletarMedicamento = async (id) => {
    Alert.alert(
      "Confirmar",
      "Tem certeza que deseja excluir este medicamento?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Excluir", 
          onPress: async () => {
            try {
              await axios.delete(`http://seu-servidor/api/medicamentos/${id}`);
              carregarMedicamentos();
              Alert.alert("Sucesso", "Medicamento excluído com sucesso!");
            } catch (error) {
              console.error("Erro ao excluir medicamento:", error);
              Alert.alert("Erro", "Não foi possível excluir o medicamento.");
            }
          } 
        }
      ]
    );
  };

  const agendarDose = (medicamento) => {
    if (!lastDose) {
      Alert.alert("Atenção", "Informe o horário da última dose.");
      return;
    }

    const proximaDose = new Date();
    const [hours, minutes] = lastDose.split(":").map(Number);
    proximaDose.setHours(hours, minutes, 0);
    proximaDose.setHours(proximaDose.getHours() + parseInt(medicamento.intervalo));
    
    setDoses([...doses, { 
      horario: proximaDose.toLocaleTimeString(),
      remedio: medicamento.nomeRemedio 
    }]);
    
    agendarNotificacao(proximaDose, medicamento.nomeRemedio);
    Alert.alert("Alerta definido", `Próxima dose de ${medicamento.nomeRemedio} às ${proximaDose.toLocaleTimeString()}`);
  };

  const agendarNotificacao = async (time, nomeRemedio) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hora do remédio!",
        body: `Está na hora de tomar ${nomeRemedio}`,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: { seconds: (time - new Date()) / 1000 },
    });
  };

  return (
    <View style={styles.container}>
      <Header title='Meus Medicamentos' showBackButton={false} />
      
      {/* Botão para adicionar novo medicamento */}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => {
          setEditingId(null);
          setModalVisible(true);
        }}
      >
        <Ionicons name="add-circle" size={24} color="#fff" />
        <Text style={styles.addButtonText}> Adicionar Medicamento</Text>
      </TouchableOpacity>

      {/* Lista de medicamentos */}
      <FlatList
        data={medicamentos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.medicamentoCard}>
            <Image 
              source={{ uri: item.imgRemedio }} 
              style={styles.medicamentoImage} 
            />
            
            <View style={styles.medicamentoInfo}>
              <Text style={styles.medicamentoNome}>{item.nomeRemedio}</Text>
              <Text style={styles.medicamentoIntervalo}>
                Intervalo: {item.intervalo} horas
              </Text>
              
              <View style={styles.actionsContainer}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => editarMedicamento(item)}
                >
                  <Ionicons name="pencil" size={18} color="#fff" />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.actionButton, { backgroundColor: '#dc3545' }]}
                  onPress={() => deletarMedicamento(item.id)}
                >
                  <Ionicons name="trash" size={18} color="#fff" />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.actionButton, { backgroundColor: '#28a745' }]}
                  onPress={() => agendarDose(item)}
                >
                  <Ionicons name="alarm" size={18} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />

      {/* Modal para adicionar/editar medicamento */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingId ? "Editar Medicamento" : "Novo Medicamento"}
            </Text>
            
            <TextInput
              placeholder="Nome do Medicamento"
              value={nomeRemedio}
              onChangeText={setNomeRemedio}
              style={styles.input}
              placeholderTextColor="#999"
            />
            
            <TextInput
              placeholder="Intervalo entre doses (horas)"
              keyboardType="numeric"
              value={intervalo}
              onChangeText={setIntervalo}
              style={styles.input}
              placeholderTextColor="#999"
            />
            
            <View style={styles.imageButtonsContainer}>
              <TouchableOpacity 
                style={styles.imageButton}
                onPress={takePhoto}
              >
                <Ionicons name="camera" size={20} color="#fff" />
                <Text style={styles.imageButtonText}> Tirar Foto</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.imageButton}
                onPress={pickImage}
              >
                <Ionicons name="image" size={20} color="#fff" />
                <Text style={styles.imageButtonText}> Escolher da Galeria</Text>
              </TouchableOpacity>
            </View>
            
            {image && (
              <Image 
                source={{ uri: image }} 
                style={styles.previewImage} 
              />
            )}
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, { backgroundColor: '#6c757d' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, { backgroundColor: '#007bff' }]}
                onPress={salvarMedicamento}
              >
                <Text style={styles.modalButtonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Seção para agendar doses */}
      <View style={styles.scheduleSection}>
        <Text style={styles.sectionTitle}>Agendar Próxima Dose</Text>
        
        <TextInput
          placeholder="Última dose (HH:MM)"
          value={lastDose}
          onChangeText={setLastDose}
          style={styles.scheduleInput}
          placeholderTextColor="#999"
        />
      </View>

      {/* Histórico de doses */}
      {doses.length > 0 && (
        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>Histórico de Doses</Text>
          
          <FlatList
            data={doses}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.historyItem}>
                <Ionicons name="time" size={18} color="#004f92" />
                <Text style={styles.historyText}>
                  {item.remedio} às {item.horario}
                </Text>
              </View>
            )}
            contentContainerStyle={styles.historyList}
          />
        </View>
      )}
    </View>
  );
}