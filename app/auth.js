/*
Acesse o console do Firebase: Firebase Console.
Crie um novo projeto ou use um existente.
No menu lateral, selecione "Authentication" e, em seguida, "Get Started".
Habilite o método de autenticação com e-mail e senha.
*/
// npm install @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore

import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';
import { auth } from './firebaseConfig'; // Importando auth
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import styles from './styles';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Função para registrar um novo usuário
  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Usuário registrado com sucesso!');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // Função para login
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Usuário logado com sucesso!');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // Função para logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('Usuário deslogado com sucesso!');
      setUser(null);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // Monitorar o estado de autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
      if (loggedUser) {
        setUser(loggedUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {user ? (
          <View>
            <Text>Bem-vindo, {user.email}</Text>
            <Button title="Logout" onPress={handleLogout} />
          </View>
        ) : (
          <View>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Senha"
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={styles.input}
              secureTextEntry
            />

            <Button title="Registrar" onPress={handleRegister} />
            <Button title="Login" onPress={handleLogin} />

            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
          </View>
        )}
      </ScrollView >
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 16,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 12,
//     paddingHorizontal: 8,
//   },
//   error: {
//     color: 'red',
//     marginTop: 10,
//   },
// });
