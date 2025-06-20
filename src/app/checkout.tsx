import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";

type ItemCarrinho = {
  id: number;
  nome: string;
  preco: string;
  quantidade: number;
  imagem?: any;
};

export default function Checkout() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useLocalSearchParams();

  // Debug: Verifique os parâmetros recebidos
  console.log("Parâmetros recebidos no Checkout:", params);

  // Converter os parâmetros para array de itens com tratamento de erro
  const itensCarrinho: ItemCarrinho[] = (() => {
    try {
      return params.itens
        ? JSON.parse(decodeURIComponent(params.itens as string))
        : [];
    } catch (error) {
      console.error("Erro ao parsear itens do carrinho:", error);
      return [];
    }
  })();

  // Debug: Verifique os itens do carrinho após conversão
  console.log("Itens do carrinho:", itensCarrinho);

  // Calcular o total formatado com tratamento seguro
  const total = itensCarrinho.reduce((total, item) => {
    try {
      const precoNumerico = parseFloat(
        item.preco.replace("R$ ", "").replace(",", ".")
      );
      return total + precoNumerico * item.quantidade;
    } catch (error) {
      console.error("Erro ao calcular preço do item:", item, error);
      return total;
    }
  }, 0);

  const totalFormatado = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const handleFinalizarCompra = () => {
    if (!user) {
      Alert.alert(
        "Atenção",
        "Você precisa estar logado para finalizar a compra."
      );
      router.push("/login");
      return;
    }

    if (itensCarrinho.length === 0) {
      Alert.alert(
        "Carrinho vazio",
        "Adicione itens ao carrinho antes de finalizar"
      );
      return;
    }

    Alert.alert(
      "Sucesso",
      `Pedido de ${totalFormatado} realizado com sucesso!`
    );
    router.push("/cardapio");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>

      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.subtitle}>Resumo do Pedido</Text>

        {itensCarrinho.length === 0 ? (
          <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
        ) : (
          <>
            {itensCarrinho.map((item) => (
              <View
                key={`${item.id}-${item.quantidade}`}
                style={styles.itemContainer}
              >
                <Text style={styles.itemNome}>{item.nome}</Text>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemPreco}>{item.preco}</Text>
                  <Text style={styles.itemQuantidade}>
                    Qtd: {item.quantidade}
                  </Text>
                </View>
              </View>
            ))}

            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total: {totalFormatado}</Text>
            </View>
          </>
        )}
      </ScrollView>

      {/* Botão SEMPRE visível, mas desabilitado quando vazio */}
      <TouchableOpacity
        style={[
          styles.button,
          itensCarrinho.length === 0 && styles.buttonDisabled,
        ]}
        onPress={handleFinalizarCompra}
        disabled={itensCarrinho.length === 0}
      >
        <Text style={styles.buttonText}>Finalizar Compra</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color: "#555",
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
  itemContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  itemNome: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  itemDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemPreco: {
    fontSize: 16,
    color: "#27ae60",
    fontWeight: "bold",
  },
  itemQuantidade: {
    fontSize: 16,
    color: "#666",
  },
  totalContainer: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    alignItems: "flex-end",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  button: {
    backgroundColor: "#27ae60",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    backgroundColor: "#95a5a6",
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
