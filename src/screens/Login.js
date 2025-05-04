import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

export default function Login() {
  const navigation = useNavigation();
  
  // Estados do formulário
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  
  // Estados de controle de fluxo
  const [isCadastro, setIsCadastro] = useState(false);
  const [isRecuperacao, setIsRecuperacao] = useState(false);
  const [emailRecuperacao, setEmailRecuperacao] = useState('');
  
  // Estado para armazenar usuários
  const [usuarios, setUsuarios] = useState([]);

  // Carrega usuários ao iniciar
  useEffect(() => {
    carregarUsuarios();
  }, []);

  // Funções de persistência
  const carregarUsuarios = async () => {
    try {
      const usuariosSalvos = await AsyncStorage.getItem('usuarios');
      if (usuariosSalvos) {
        setUsuarios(JSON.parse(usuariosSalvos));
      }
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    }
  };

  const salvarUsuarios = async (novosUsuarios) => {
    try {
      await AsyncStorage.setItem('usuarios', JSON.stringify(novosUsuarios));
      setUsuarios(novosUsuarios);
    } catch (error) {
      console.error('Erro ao salvar usuários:', error);
    }
  };

  // Validação de e-mail
  const validarEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  // Função de login corrigida
  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    if (!validarEmail(email)) {
      Alert.alert('Erro', 'Digite um e-mail válido!');
      return;
    }

    try {
      const usuario = usuarios.find(user => user.email === email);
      
      if (!usuario) {
        Alert.alert('Erro', 'Esse e-mail não está cadastrado!');
      } else if (usuario.senha !== senha) {
        Alert.alert('Erro', 'Senha incorreta!');
      } else {
        Alert.alert('Sucesso', 'Login efetuado com sucesso!', [
          { text: 'OK', onPress: () => navigation.navigate('Cardapio') }
        ]);
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao fazer login.');
      console.error(error);
    }
  };

  // Função de cadastro corrigida
  const handleCadastro = async () => {
    if (!nome || !email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    if (!validarEmail(email)) {
      Alert.alert('Erro', 'Digite um e-mail válido!');
      return;
    }

    const usuarioExistente = usuarios.find(user => user.email === email);
    
    if (usuarioExistente) {
      Alert.alert('Erro', 'Este e-mail já está cadastrado!');
    } else {
      const novoUsuario = { nome, email, senha };
      const novosUsuarios = [...usuarios, novoUsuario];
      await salvarUsuarios(novosUsuarios);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      setIsCadastro(false);
      setEmail('');
      setSenha('');
    }
  };

  const handleRecuperacaoSenha = async () => {
    if (!emailRecuperacao) {
      Alert.alert('Erro', 'Digite seu e-mail para recuperação');
      return;
    }

    if (!validarEmail(emailRecuperacao)) {
      Alert.alert('Erro', 'Digite um e-mail válido!');
      return;
    }

    const usuario = usuarios.find(user => user.email === emailRecuperacao);
    
    if (!usuario) {
      Alert.alert('Erro', 'E-mail não cadastrado');
    } else {
      Alert.alert(
        'Recuperação de Senha', 
        `Um link de recuperação foi enviado para ${emailRecuperacao}\n\n(SIMULAÇÃO: Sua senha é "${usuario.senha}")`,
        [{ text: 'OK', onPress: () => setIsRecuperacao(false) }]
      );
    }
  };

  const handleAcao = () => {
    if (isRecuperacao) {
      handleRecuperacaoSenha();
    } else if (isCadastro) {
      handleCadastro();
    } else {
      handleLogin();
    }
  };

  // Renderização condicional
  return (
    <View style={styles.container}>
      {isRecuperacao ? (
        /* TELA DE RECUPERAÇÃO DE SENHA */
        <>
          <Text style={styles.title}>RECUPERAR SENHA</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail cadastrado"
            value={emailRecuperacao}
            onChangeText={setEmailRecuperacao}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TouchableOpacity 
            style={styles.button} 
            onPress={handleAcao}
          >
            <Text style={styles.buttonText}>ENVIAR LINK</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.switchButton} 
            onPress={() => {
              setIsRecuperacao(false);
              setEmailRecuperacao('');
            }}
          >
            <Text style={styles.switchText}>Voltar para Login</Text>
          </TouchableOpacity>
        </>
      ) : isCadastro ? (
        /* TELA DE CADASTRO */
        <>
          <Text style={styles.title}>CADASTRO</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite seu nome completo"
            value={nome}
            onChangeText={setNome}
          />

          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          <TouchableOpacity 
            style={styles.button} 
            onPress={handleAcao}
          >
            <Text style={styles.buttonText}>CADASTRAR</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.switchButton} 
            onPress={() => {
              setIsCadastro(false);
              setNome('');
              setEmail('');
              setSenha('');
            }}
          >
            <Text style={styles.switchText}>Já tem conta? Faça login</Text>
          </TouchableOpacity>
        </>
      ) : (
        /* TELA DE LOGIN */
        <>
          <Text style={styles.title}>LOGIN</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          <TouchableOpacity 
            style={styles.button} 
            onPress={handleAcao}
          >
            <Text style={styles.buttonText}>ENTRAR</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.switchButton} 
            onPress={() => setIsCadastro(true)}
          >
            <Text style={styles.switchText}>Não tem conta? Cadastre-se</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.switchButton} 
            onPress={() => setIsRecuperacao(true)}
          >
            <Text style={[styles.switchText, {color: '#FF0000'}]}>Esqueceu sua senha?</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  switchButton: {
    alignItems: 'center',
    padding: 10,
  },
  switchText: {
    color: '#000',
    fontSize: 20, 
  },
});