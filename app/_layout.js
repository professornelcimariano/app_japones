import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
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
      />
    </Stack>
  );
}
