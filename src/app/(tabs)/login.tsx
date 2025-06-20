import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Dados dos usuários cadastrados (simulando um banco de dados)
const usuariosCadastrados = [
  {
    email: "usuario@exemplo.com",
    senha: "Senha123!",
    nome: "Usuário Exemplo",
    cpf: "123.456.789-00",
    id: "1",
  },
];

export default function LoginScreen() {
  const { login } = useAuth();
  const router = useRouter();

  const [isCadastro, setIsCadastro] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Campos do formulário
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [errors, setErrors] = useState<any>({});

  const validarEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.toLowerCase());
  };

  const senhaValida = (senha: string) => {
    return senha.length >= 6 && /[!@#$%^&*(),.?":{}|<>]/.test(senha);
  };

  const handleLogin = async () => {
    setIsLoading(true);

    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos.");
      setIsLoading(false);
      return;
    }

    if (!validarEmail(email)) {
      Alert.alert("Erro", "E-mail inválido.");
      setIsLoading(false);
      return;
    }

    try {
      // Simulação de autenticação
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Verifica se existe um usuário com este email e senha
      const usuario = usuariosCadastrados.find(
        (user) => user.email === email && user.senha === senha
      );

      if (!usuario) {
        Alert.alert("Erro", "E-mail ou senha estão incorretos.");
        return;
      }

      await login(usuario);

      Alert.alert("Sucesso", "Login realizado com sucesso!", [
        {
          text: "OK",
          onPress: () => router.push("/profile"),
        },
      ]);
    } catch (error) {
      console.error("Erro durante o login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCadastro = async () => {
    const novoErros: any = {};

    if (!nome) novoErros.nome = true;
    if (!cpf) novoErros.cpf = true;
    if (!email || !validarEmail(email)) novoErros.email = true;
    if (!senha || !senhaValida(senha)) novoErros.senha = true;
    if (senha !== confirmarSenha) novoErros.confirmarSenha = true;

    if (Object.keys(novoErros).length > 0) {
      setErrors(novoErros);
      return;
    }

    setIsLoading(true);

    try {
      // Simulação de cadastro na API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Adiciona o novo usuário à lista de cadastrados
      const novoUsuario = {
        email,
        senha,
        nome,
        cpf,
        id: String(usuariosCadastrados.length + 1),
      };

      usuariosCadastrados.push(novoUsuario);

      Alert.alert(
        "Sucesso",
        "Cadastro realizado com sucesso! Faça login para continuar.",
        [
          {
            text: "OK",
            onPress: () => {
              setNome("");
              setCpf("");
              setSenha("");
              setConfirmarSenha("");
              setErrors({});
              setIsCadastro(false);
            },
          },
        ]
      );
    } catch (error) {
      console.error("ocorreu um erro:", error);
      Alert.alert("Erro", "Ocorreu um erro ao cadastrar. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/LogoNutriSabor.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>{isCadastro ? "Cadastro" : "Login"}</Text>

      {isCadastro && (
        <>
          <TextInput
            placeholder="Nome Completo"
            value={nome}
            onChangeText={(t) => {
              setNome(t);
              setErrors((e: any) => ({ ...e, nome: false }));
            }}
            style={[styles.input, errors.nome && styles.inputErro]}
          />
          <TextInput
            placeholder="CPF"
            value={cpf}
            onChangeText={(t) => {
              setCpf(t);
              setErrors((e: any) => ({ ...e, cpf: false }));
            }}
            style={[styles.input, errors.cpf && styles.inputErro]}
            keyboardType="numeric"
          />
        </>
      )}

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(t) => {
          setEmail(t);
          setErrors((e: any) => ({ ...e, email: false }));
        }}
        style={[styles.input, errors.email && styles.inputErro]}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={(t) => {
          setSenha(t);
          setErrors((e: any) => ({ ...e, senha: false }));
        }}
        secureTextEntry
        style={[styles.input, errors.senha && styles.inputErro]}
      />

      {isCadastro && (
        <TextInput
          placeholder="Confirmar Senha"
          value={confirmarSenha}
          onChangeText={(t) => {
            setConfirmarSenha(t);
            setErrors((e: any) => ({ ...e, confirmarSenha: false }));
          }}
          secureTextEntry
          style={[styles.input, errors.confirmarSenha && styles.inputErro]}
        />
      )}

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={isCadastro ? handleCadastro : handleLogin}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Carregando..." : isCadastro ? "Cadastrar" : "Entrar"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setIsCadastro(!isCadastro)}
        disabled={isLoading}
      >
        <Text style={styles.toggleText}>
          {isCadastro
            ? "Já tem uma conta? Faça login"
            : "Não tem uma conta? Cadastre-se"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 200,
    height: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  inputErro: {
    borderColor: "red",
  },
  button: {
    backgroundColor: "#27ae60",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  buttonDisabled: {
    backgroundColor: "#7f8c8d",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  toggleText: {
    color: "#2980b9",
    textAlign: "center",
    marginTop: 20,
    textDecorationLine: "underline",
  },
});
