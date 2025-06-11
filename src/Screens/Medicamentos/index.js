import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Alert,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Modal,
  ScrollView
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import styles from './styles';
import Header from "../../Components/Header";

export default function CadastroRemedio() {
  const [nomeRemedio, setNomeRemedio] = useState("");
  const [intervalo, setIntervalo] = useState("");
  const [imagem, setImagem] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [remedios, setRemedios] = useState([]);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [remedioEditando, setRemedioEditando] = useState(null);

  useEffect(() => {
        
    // Adicione esta função no seu componente (ela já é chamada mas não estava definida)
const carregarMedicamentos = async () => {
  try {
    const response = await axios.post(`http://localhost:8000/api/medicamentos/select`);
    console.log("Dados recebidos:", response.data); // Verifique a estrutura real
    
    // Verifique a estrutura real da resposta e ajuste conforme necessário
    const dados = response.data.Remedio || response.data || [];
    setRemedios(Array.isArray(dados) ? dados : []);
  } catch (erro) {
    console.error('Erro ao carregar medicamentos:', erro);
    Alert.alert("Erro", "Não foi possível carregar os medicamentos.");
    setRemedios([]);
  }
};
    carregarMedicamentos();
  }, []);  
  console.log(remedios)
  const selecionarImagem = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permission.status !== 'granted') {
        Alert.alert('Permissão negada', 'É necessário permitir acesso às fotos.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImagem(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Erro ao selecionar imagem:", error);
      Alert.alert("Erro", "Não foi possível selecionar a imagem.");
    }
  };

  const tirarFoto = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (permission.status !== 'granted') {
        Alert.alert('Permissão negada', 'É necessário permitir acesso à câmera.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImagem(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Erro ao tirar foto:", error);
      Alert.alert("Erro", "Não foi possível tirar a foto.");
    }
  };

  const cadastrarRemedio = async () => {
    if (!nomeRemedio || !intervalo || !imagem) {
      Alert.alert("Atenção", "Preencha todos os campos e adicione uma imagem.");
      return;
    }

    setCarregando(true);

    try {
      const formData = new FormData();
      formData.append('nomeRemedio', nomeRemedio);
      formData.append('intervalo', intervalo);

      // Processamento da imagem
      const response = await fetch(imagem);
      const blob = await response.blob();
      const filename = `remedio_${Date.now()}.jpg`;

      const file = new File([blob], filename, { type: blob.type });
      formData.append("imgRemedio", file);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        }
      };

      await axios.post('http://localhost:8000/api/medicamentos', formData, config);

      setNomeRemedio("");
      setIntervalo("");
      setImagem(null);
      await carregarMedicamentos();

      Alert.alert("Sucesso", "Medicamento cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar medicamento:", error);
      let errorMessage = "Não foi possível cadastrar o medicamento.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 422) {
        errorMessage = "Dados inválidos. Verifique os campos.";
      }
      Alert.alert("Erro", errorMessage);
    } finally {
      setCarregando(false);
    }
  };

  const deletarRemedio = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/medicamentos/deletar/${id}`);
      await carregarMedicamentos();
      Alert.alert("Sucesso", "Medicamento deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar medicamento:", error);
      Alert.alert("Erro", "Não foi possível deletar o medicamento.");
    }
  };

  const abrirModalEdicao = (remedio) => {
    setRemedioEditando(remedio);
    setNomeRemedio(remedio.nomeRemedio);
    setIntervalo(remedio.intervalo.toString());
    setImagem(remedio.imgRemedio ? `http://localhost:8000${remedio.imgRemedio}` : null);
    setModalVisivel(true);
  };

  const fecharModalEdicao = () => {
    setModalVisivel(false);
    setRemedioEditando(null);
    setNomeRemedio("");
    setIntervalo("");
    setImagem(null);
  };

  const atualizarRemedio = async () => {
    if (!nomeRemedio || !intervalo) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    setCarregando(true);

    try {
      const formData = new FormData();
      formData.append('nomeRemedio', nomeRemedio);
      formData.append('intervalo', intervalo);

      if (imagem && !imagem.includes('http://localhost:8000')) {
        const response = await fetch(imagem);
        const blob = await response.blob();
        const filename = `remedio_${Date.now()}.jpg`;
        const file = new File([blob], filename, { type: blob.type });
        formData.append("imgRemedio", file);
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        }
      };

      await axios.post(`http://localhost:8000/api/medicamentos/${remedioEditando.id}`, formData, config);

      fecharModalEdicao();
      await carregarMedicamentos();
      Alert.alert("Sucesso", "Medicamento atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar medicamento:", error);
      let errorMessage = "Não foi possível atualizar o medicamento.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 422) {
        errorMessage = "Dados inválidos. Verifique os campos.";
      }
      Alert.alert("Erro", errorMessage);
    } finally {
      setCarregando(false);
    }
  };

  const confirmarDelecao = (id) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja excluir este medicamento?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", onPress: () => deletarRemedio(id) }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {item.imgRemedio && (
        <Image
          source={{ uri: `http://localhost:8000/${item.imgRemedio}` }}
          style={styles.cardImagem}
        />
      )}
      <View style={styles.cardInfo}>
        <View>
          <Text style={styles.cardTitulo}>{item.nomeRemedio}</Text>
          <Text>Intervalo: {item.intervalo} horas</Text>
        </View>
        <View style={styles.cardBotoes}>
          <TouchableOpacity
            style={styles.botaoEditar}
            onPress={() => abrirModalEdicao(item)}
          >
            <Ionicons name="pencil" size={16} color="#fff" />
            <Text style={styles.textoBotao}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botaoDeletar}
            onPress={() => confirmarDelecao(item.id)}
          >
            <Ionicons name="trash" size={16} color="#fff" />
            <Text style={styles.textoBotao}>Deletar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.containerPai}>
      <Header title="Medicamentos" />
      <ScrollView style={styles.container}>
        <Text style={styles.titulo}>Cadastrar Novo Medicamento</Text>
        
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

        <View style={styles.botoesImagemContainer}>
          <TouchableOpacity
            style={styles.botaoImagem}
            onPress={tirarFoto}
          >
            <Ionicons name="camera" size={20} color="#fff" />
            <Text style={styles.textoBotaoImagem}> Tirar Foto</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoImagem}
            onPress={selecionarImagem}
          >
            <Ionicons name="image" size={20} color="#fff" />
            <Text style={styles.textoBotaoImagem}> Escolher da Galeria</Text>
          </TouchableOpacity>
        </View>

        {imagem && (
          <Image
            source={{ uri: imagem }}
            style={styles.imagemPreview}
          />
        )}

        <TouchableOpacity
          style={styles.botaoCadastrar}
          onPress={remedioEditando ? atualizarRemedio : cadastrarRemedio}
          disabled={carregando}
        >
          {carregando ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="save" size={20} color="#fff" />
              <Text style={styles.textoBotaoCadastrar}>
                {remedioEditando ? "Atualizar Medicamento" : "Cadastrar Medicamento"}
              </Text>
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.listaTitulo}>Medicamentos Cadastrados</Text>
        <FlatList
          data={remedios}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </ScrollView>

      {/* Modal de Edição */}
      <Modal
        visible={modalVisivel}
        animationType="slide"
        transparent={true}
        onRequestClose={fecharModalEdicao}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>Editar Medicamento</Text>
            
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

            <View style={styles.botoesImagemContainer}>
              <TouchableOpacity
                style={styles.botaoImagem}
                onPress={tirarFoto}
              >
                <Ionicons name="camera" size={20} color="#fff" />
                <Text style={styles.textoBotaoImagem}> Tirar Foto</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botaoImagem}
                onPress={selecionarImagem}
              >
                <Ionicons name="image" size={20} color="#fff" />
                <Text style={styles.textoBotaoImagem}> Escolher da Galeria</Text>
              </TouchableOpacity>
            </View>

            {imagem && (
              <Image
                source={{ uri: imagem }}
                style={styles.imagemPreview}
              />
            )}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity
                style={[styles.botaoCadastrar, { backgroundColor: '#6c757d', flex: 1, marginRight: 10 }]}
                onPress={fecharModalEdicao}
              >
                <Text style={styles.textoBotaoCadastrar}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.botaoCadastrar, { flex: 1 }]}
                onPress={atualizarRemedio}
                disabled={carregando}
              >
                {carregando ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.textoBotaoCadastrar}>Salvar</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}