import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        title: 'Peça o seu Japonês!', // Substitui o texto do título na navbar
        headerStyle: {
          backgroundColor: '#000000', // Cor de fundo preta para a navbar
        },
        headerTintColor: '#FFFFFF', // Cor do texto e ícones na navbar
        headerTitleStyle: {
          fontSize: 18, /* tamanho da fonte do título */
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center', // Centraliza o título na navbar
      }}
    >
      <Stack.Screen name="index" options={{ title: "Japonês" }} />
      <Stack.Screen name="products" options={{ title: "Produtos" }} />
      <Stack.Screen name="firebaseListData" options={{ title: "Firebase" }} />
      <Stack.Screen name="firebaseCRUD" options={{ title: "Firebase" }} />
    </Stack>
  );
}
