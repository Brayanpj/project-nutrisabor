import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "../contexts/AuthContext"; // Ajuste o caminho conforme sua estrutura

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <StatusBar style="auto" />
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "fade",
            orientation: "portrait",
          }}
        >
          <Stack.Screen
            name="(tabs)"
            options={{
              animation: "slide_from_right",
            }}
          />

          <Stack.Screen name="(auth)" />

          <Stack.Screen
            name="checkout/success"
            options={{
              presentation: "modal",
            }}
          />
        </Stack>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
