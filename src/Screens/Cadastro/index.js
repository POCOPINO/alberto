import React, { useState } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import styles from './styles';
import { MaskedTextInput } from 'react-native-mask-text';

export default function Cadastro() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [genero, setGenero] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [fotoUsuario, setFotoUsuario] = useState(null);
  const [erros, setErros] = useState({});
  const [touched, setTouched] = useState({});

  const selecionarImagem = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos acessar sua galeria');
        return;
      }

      let resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
        aspect: [1, 1]
      });
      

      if (!resultado.canceled) {setFotoUsuario(resultado.assets[0].uri);
        console.log(resultado.assets[0].uri)
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível selecionar a imagem');
    }
    console.log
  };

  const validarFormulario = () => {
    const novosErros = {};
    let valido = true;

    if (!nome.trim()) {
      novosErros.nome = 'Nome completo é obrigatório';
      valido = false;
    }

    if (!email.trim()) {
      novosErros.email = 'Email é obrigatório';
      valido = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      novosErros.email = 'Email inválido';
      valido = false;
    }

    if (!senha.trim()) {
      novosErros.senha = 'Senha é obrigatória';
      valido = false;
    } else if (senha.length < 6) {
      novosErros.senha = 'Senha deve ter pelo menos 6 caracteres';
      valido = false;
    }

    if (!dataNasc.trim()) {
      novosErros.dataNasc = 'Data de nascimento é obrigatória';
      valido = false;
    }

    setErros(novosErros);
    return valido;
  };

  const enviarDados = async () => {
    if (!nome || !email || !senha) {
      Alert.alert("Erro", "Preencha pelo menos nome, email e senha.");
      return;
    }

    if (!validarFormulario()) {
      return;
    }

    setLoading(true);
  
    try {
      const formData = new FormData();
  
      formData.append("nome", nome);
      formData.append("email", email);
      formData.append("senha", senha);
      formData.append("dataNasc", dataNasc);
      formData.append("genero", genero);
      formData.append("peso", peso);
      formData.append("altura", altura);
      
  
      // Processar a imagem, se necessário
      if (fotoUsuario) {
        if (fotoUsuario.startsWith("data:image")) {
          const response = await fetch(fotoUsuario);
          const blob = await response.blob();
          const filename = `user_${Date.now()}.jpg`;
          const file = new File([blob], filename, { type: blob.type });
          formData.append("imgUser", file);
        } else {
          const uriParts = fotoUsuario.split("/");
          const filename = uriParts[uriParts.length - 1];
          const match = /\.(\w+)$/.exec(filename);
          const fileType = match ? `image/${match[1]}` : "image/jpeg";
    
          formData.append("imgUser", {
            uri: fotoUsuario,
            name: filename,
            type: fileType,
          });
        }
      }
        // Depois de adicionar tudo no formData:
  for (let pair of formData.entries()) {
    console.log("FormData key:", pair[0]);
    console.log("FormData value:", pair[1]);
  }
  
      const url = "http://localhost:8000/api/usuarios";
  
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log("Resposta do servidor:", response.data);
      Alert.alert("Sucesso", "Usuário cadastrado!", [
        { text: 'OK', onPress: () => navigation.navigate('Login') }
      ]);
  
      // Limpar formulário
      setNome("");
      setEmail("");
      setSenha("");
      setDataNasc("");
      setGenero("");
      setPeso("");
      setAltura("");
      setFotoUsuario(null);
  
    } catch (error) {
      console.group("Erro na requisição");
      console.error("Mensagem de erro:", error.message);
  
      if (error.response) {
        console.error("Status do erro:", error.response.status);
        console.error("Dados da resposta:", error.response.data);
        
        if (error.response.data.error === 'email_existente') {
          setErros(prev => ({ ...prev, email: error.response.data.mensagem }));
        }
      } else if (error.request) {
        console.error("Requisição feita mas sem resposta:", error.request);
      } else {
        console.error("Erro ao configurar a requisição:", error.message);
      }
  
      console.groupEnd();
  
      Alert.alert(
        "Erro",
        error.response?.data?.message ||
        error.message ||
        "Erro desconhecido ao cadastrar usuário."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <View style={styles.photoContainer}>
              <Pressable onPress={selecionarImagem} style={styles.photoButton}>
                {fotoUsuario ? (
                  <Image source={{ uri: fotoUsuario }} style={styles.photoImage} />
                ) : (
                  <View style={styles.photoPlaceholder}>
                    <Ionicons name="person" size={50} color="#888" />
                    <Text style={styles.photoText}>Adicionar foto</Text>
                  </View>
                )}
              </Pressable>
            </View>

            <Text style={styles.title}>Criar Conta</Text>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Nome completo</Text>
              <TextInput
                style={[styles.input, erros.nome && styles.inputError]}
                placeholder="Digite seu nome completo"
                value={nome}
                onChangeText={setNome}
                onBlur={() => setTouched(prev => ({ ...prev, nome: true }))}
              />
              {erros.nome && <Text style={styles.errorText}>{erros.nome}</Text>}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[styles.input, erros.email && styles.inputError]}
                placeholder="Digite seu email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
              />
              {erros.email && <Text style={styles.errorText}>{erros.email}</Text>}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Senha</Text>
              <TextInput
                style={[styles.input, erros.senha && styles.inputError]}
                placeholder="Crie uma senha segura"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
                onBlur={() => setTouched(prev => ({ ...prev, senha: true }))}
              />
              {erros.senha && <Text style={styles.errorText}>{erros.senha}</Text>}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Data de Nascimento</Text>
              <MaskedTextInput
                 mask="99/99/9999"
              style={[styles.input, erros.dataNasc && styles.inputError]}
               placeholder="DD/MM/AAAA"
                    value={dataNasc}
                    onChangeText={(text, rawText) => setDataNasc(text)}
                         keyboardType="numeric"
                    onBlur={() => setTouched(prev => ({ ...prev, dataNasc: true }))}
/>
              {erros.dataNasc && <Text style={styles.errorText}>{erros.dataNasc}</Text>}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Gênero</Text>
              <TextInput
                style={styles.input}
                placeholder="Masculino, Feminino, Outro"
                value={genero}
                onChangeText={setGenero}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.formGroup, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.label}>Altura (cm)</Text>
                <MaskedTextInput
                  mask="999"
                  style={styles.input}
                  placeholder="Ex: 175"
                  value={altura}
                  onChangeText={setAltura}
                  keyboardType="numeric"
                />
              </View>

              <View style={[styles.formGroup, { flex: 1 }]}>
                <Text style={styles.label}>Peso (kg)</Text>
                <MaskedTextInput
                  mask="99.9"
                  style={styles.input}
                  placeholder="Ex: 68.5"
                  value={peso}
                  onChangeText={setPeso}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <Pressable
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={enviarDados}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Cadastrar</Text>
              )}
            </Pressable>

            <Pressable 
              style={styles.loginLink}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.loginLinkText}>
                Já tem uma conta? <Text style={styles.loginLinkBold}>Faça login</Text>
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}