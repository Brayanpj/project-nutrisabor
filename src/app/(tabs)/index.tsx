import { Image } from "expo-image";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView
      style={{ backgroundColor: "#333", flex: 1, alignItems: "stretch" }}
    >
      <ScrollView style={{ backgroundColor: "#333" }}>
        <Image
          source={require("@/assets/images/LogoNutriSabor.png")}
          style={styles.reactLogo}
        />
        <View style={styles.textBox}>
          <Text style={styles.title}>Bem-vindo ao NutriSabor!</Text>
          <Text style={styles.description}>
            O restaurante onde a comida saudável encontra o sabor
            extraordinário. Experimente nossos pratos feitos com ingredientes
            frescos e selecionados.
          </Text>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.title}>Combinação com Qualidade e Saúde</Text>
          <Text style={styles.description}>
            🌿 Nossa Filosofia - Ingredientes orgânicos locais - Zero
            conservantes artificiais - Cardápio equilibrado por nutricionistas -
            Compromisso com produtores regionais
          </Text>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.title}>Cardápio Variados</Text>
          <Text style={styles.description}>Venha Saborear essas delícias</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
{
  /* <ParallaxScrollView
  headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
  headerImage={
    <Image
      source={require("@/assets/images/LogoNutriSabor.png")}
      style={styles.reactLogo}
    />
  }
> */
}
{
  /* <ThemedView style={styles.titleContainer}>
    <ThemedText type="title">
      Bem Vindo ao Restaurante Nutrisabor!
    </ThemedText>
    <HelloWave />
  </ThemedView>
  <ThemedView style={styles.stepContainer}>
    <ThemedText type="subtitle">Step 1: Try it</ThemedText>
    <ThemedText>
      Edit{" "}
      <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
      to see changes. Press{" "}
      <ThemedText type="defaultSemiBold">
        {Platform.select({
          ios: "cmd + d",
          android: "cmd + m",
          web: "F12",
        })}
      </ThemedText>{" "}
      to open developer tools.
    </ThemedText>
  </ThemedView>
  <ThemedView style={styles.stepContainer}>
    <ThemedText type="subtitle">Step 2: Explore</ThemedText>
    <ThemedText>
      {`Tap the Explore tab to learn more about what's included in this starter app.`}
    </ThemedText>
  </ThemedView>
  <ThemedView style={styles.stepContainer}>
    <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
    <ThemedText>
      {`When you're ready, run `}
      <ThemedText type="defaultSemiBold">
        npm run reset-project
      </ThemedText>{" "}
      to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
      directory. This will move the current{" "}
      <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
      <ThemedText type="defaultSemiBold">app-example</ThemedText>.
    </ThemedText>
  </ThemedView>
</ParallaxScrollView> */
}

const styles = StyleSheet.create({
  textBox: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 200,
    width: 190,
    alignItems: "center",
    alignSelf: "center",
    textAlign: "center",
    // bottom: 0,
    // left: ,
    // position: "absolute",
  },
});
