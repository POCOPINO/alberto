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
import styles from'./styles'

export default function Cadastro() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nomeUsuario: '',
    emailUsuario: '',
    senhaUsuario: '',
    dataNascUsuario: '',
    generoUsuario: '',
    alturaUsuario: '',
    pesoUsuario: ''
  });
  const [fotoUsuario, setFotoUsuario] = useState(null);
  const [erros, setErros] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (!touched[name]) setTouched(prev => ({ ...prev, [name]: true }));
    if (name === 'emailUsuario' && touched.emailUsuario) validarEmail(value);
  };

  const selecionarImagem = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos acessar sua galeria');
        return;
      }

      const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
        aspect: [1, 1]
      });

      if (!resultado.cancelled) setFotoUsuario(resultado.uri);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível selecionar a imagem');
    }
  };

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setErros(prev => ({ ...prev, emailUsuario: 'Email é obrigatório' }));
      return false;
    }
    if (!regex.test(email)) {
      setErros(prev => ({ ...prev, emailUsuario: 'Email inválido' }));
      return false;
    }
    setErros(prev => ({ ...prev, emailUsuario: '' }));
    return true;
  };

  const verificarEmailExistente = async (email) => {
    try {
      const response = await axios.get('http://localhost:8000/api/usuarios/verificar-email', {
        params: { emailUsuario: email }
      });
      return response.data.existe;
    } catch (error) {
      console.error('Erro ao verificar email:', error);
      return false;
    }
  };

  const validarFormulario = async () => {
    const novosErros = {};
    let valido = true;

    if (!formData.nomeUsuario.trim()) {
      novosErros.nomeUsuario = 'Nome completo é obrigatório';
      valido = false;
    }

    if (!formData.emailUsuario.trim()) {
      novosErros.emailUsuario = 'Email é obrigatório';
      valido = false;
    } else if (!validarEmail(formData.emailUsuario)) {
      valido = false;
    } else {
      const emailExiste = await verificarEmailExistente(formData.emailUsuario);
      if (emailExiste) {
        novosErros.emailUsuario = 'Este email já está cadastrado';
        valido = false;
      }
    }

    if (!formData.senhaUsuario.trim()) {
      novosErros.senhaUsuario = 'Senha é obrigatória';
      valido = false;
    } else if (formData.senhaUsuario.length < 6) {
      novosErros.senhaUsuario = 'Senha deve ter pelo menos 6 caracteres';
      valido = false;
    }

    if (!formData.dataNascUsuario.trim()) {
      novosErros.dataNascUsuario = 'Data de nascimento é obrigatória';
      valido = false;
    } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(formData.dataNascUsuario)) {
      novosErros.dataNascUsuario = 'Use o formato DD/MM/AAAA';
      valido = false;
    }

    setErros(novosErros);
    return valido;
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      if (!await validarFormulario()) {
        setLoading(false);
        return;
      }

      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key]) data.append(key, formData[key]);
      });

      if (fotoUsuario) {
        const filename = fotoUsuario.split('/').pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : 'image/jpeg';

        data.append('fotoUsuario', {
          uri: fotoUsuario,
          name: filename,
          type
        });
      }

      const response = await axios.post('http://localhost:8000/api/usuarios/cadastrar', data, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        }
      });

      if (response.data.sucesso) {
        Alert.alert('Sucesso', response.data.mensagem, [
          { text: 'OK', onPress: () => navigation.navigate('Login') }
        ]);
      } else {
        throw new Error(response.data.mensagem || 'Erro ao cadastrar');
      }
    } catch (error) {
      let mensagemErro = 'Erro ao cadastrar';
      if (error.response) {
        if (error.response.data.error === 'email_existente') {
          setErros(prev => ({ ...prev, emailUsuario: error.response.data.mensagem }));
          mensagemErro = error.response.data.mensagem;
        } else if (error.response.status === 422) {
          mensagemErro = error.response.data.mensagem || 'Dados inválidos';
        }
      }
      Alert.alert('Erro', mensagemErro);
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
                {/* <View style={styles.photoEditBadge}>
                  <Ionicons name="camera" size={16} color="#fff" />
                </View> */}
              </Pressable>
            </View>

            <Text style={styles.title}>Criar Conta</Text>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Nome completo</Text>
              <TextInput
                style={[styles.input, erros.nomeUsuario && styles.inputError]}
                placeholder="Digite seu nome completo"
                value={formData.nomeUsuario}
                onChangeText={(text) => handleChange('nomeUsuario', text)}
                onBlur={() => setTouched(prev => ({ ...prev, nomeUsuario: true }))}
              />
              {erros.nomeUsuario && <Text style={styles.errorText}>{erros.nomeUsuario}</Text>}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[styles.input, erros.emailUsuario && styles.inputError]}
                placeholder="Digite seu email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.emailUsuario}
                onChangeText={(text) => handleChange('emailUsuario', text)}
                onBlur={() => {
                  setTouched(prev => ({ ...prev, emailUsuario: true }));
                  validarEmail(formData.emailUsuario);
                }}
              />
              {erros.emailUsuario && <Text style={styles.errorText}>{erros.emailUsuario}</Text>}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Senha</Text>
              <TextInput
                style={[styles.input, erros.senhaUsuario && styles.inputError]}
                placeholder="Crie uma senha segura"
                secureTextEntry
                value={formData.senhaUsuario}
                onChangeText={(text) => handleChange('senhaUsuario', text)}
                onBlur={() => setTouched(prev => ({ ...prev, senhaUsuario: true }))}
              />
              {erros.senhaUsuario && <Text style={styles.errorText}>{erros.senhaUsuario}</Text>}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Data de Nascimento</Text>
              <TextInput
                style={[styles.input, erros.dataNascUsuario && styles.inputError]}
                placeholder="DD/MM/AAAA"
                value={formData.dataNascUsuario}
                onChangeText={(text) => handleChange('dataNascUsuario', text)}
                onBlur={() => setTouched(prev => ({ ...prev, dataNascUsuario: true }))}
              />
              {erros.dataNascUsuario && <Text style={styles.errorText}>{erros.dataNascUsuario}</Text>}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Gênero</Text>
              <TextInput
                style={styles.input}
                placeholder="Masculino, Feminino, Outro"
                value={formData.generoUsuario}
                onChangeText={(text) => handleChange('generoUsuario', text)}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.formGroup, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.label}>Altura (cm)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: 175"
                  value={formData.alturaUsuario}
                  onChangeText={(text) => handleChange('alturaUsuario', text)}
                  keyboardType="numeric"
                />
              </View>

              <View style={[styles.formGroup, { flex: 1 }]}>
                <Text style={styles.label}>Peso (kg)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: 68.5"
                  value={formData.pesoUsuario}
                  onChangeText={(text) => handleChange('pesoUsuario', text)}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <Pressable
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleSubmit}
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