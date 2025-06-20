import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "../../contexts/AuthContext";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const activeColor = Colors[colorScheme ?? "light"].tint;
  const inactiveColor = "activeColor";

  return (
    <AuthProvider>
      <SafeAreaProvider>
        <Tabs
          screenOptions={{
            headerShown: true,
            tabBarActiveTintColor: activeColor,
            tabBarInactiveTintColor: inactiveColor,
            tabBarStyle: {
              paddingBottom: 10,
              backgroundColor: "rgb(104, 185, 51)",
              borderTopWidth: 0,
              elevation: 8,
              shadowOpacity: 0.1,
              shadowRadius: 4,
            },
            tabBarItemStyle: {
              height: 60,
              paddingVertical: 6,
            },
            tabBarLabelStyle: {
              fontSize: 14,
              marginBottom: 6,
              fontWeight: "600",
              textTransform: "capitalize",
            },
            tabBarIconStyle: {
              marginTop: 4,
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Início",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="home" size={28} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Perfil",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="person" size={28} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="cardapio"
            options={{
              title: "Cardápio",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="restaurant" size={28} color={color} />
              ),
            }}
          />
        </Tabs>
      </SafeAreaProvider>
    </AuthProvider>
  );
}
