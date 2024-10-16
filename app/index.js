import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, ImageBackground, Button, TouchableOpacity, StyleSheet, Pressable, Modal } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'; // Importando o ícone
import { Link } from 'expo-router';
import { auth } from './firebaseConfig'; // Importando auth
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import styles from './styles';


export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // Função para registrar um novo usuário
  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Usuário registrado com sucesso!');
      setModalVisible(false);
    } catch (error) {
      setErrorMessage(error.message);
     
    }
  };

  // Função para login
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Usuário logado com sucesso!');
      setModalVisible(false);
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
    <ImageBackground
      source={require("../assets/images/bkg-home.jpg")} // Certifique-se de que o caminho da imagem está correto
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 40, color: "#FFF", marginTop: 20 }}>
        oJaponês!
      </Text>
      <Icon name="cutlery" size={32} color="#FFFFFF" style={styles.icon} />

      {user ? (
        <View>
          <Text style={{ color: "#FFF", marginTop: 20 }}>Bem-vindo, {user.email}</Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      ) : (
        <View>
          {errorMessage ? <Text style={styles.error} > {errorMessage}</Text> : null
          }
        </View>
      )}
      <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 20, width: '100%', alignItems: 'center' }}>

        <Pressable style={{ backgroundColor: "#FF3737", padding: 15, borderRadius: 10, width: '95%', marginBottom: 10 }} onPress={() => setModalVisible(true)} >
          <Text style={{ fontSize: 22, color: "#FFFFFF", textAlign: "center" }}>Logar</Text>
        </Pressable>

        {/* <Link href="/products" style={{ backgroundColor: "#FF3737", padding: 15, borderRadius: 10, width: '95%', marginBottom: 10 }} asChild>
          <Pressable>
            <Text style={{ fontSize: 22, color: "#FFFFFF", textAlign: "center" }}>TI</Text>
          </Pressable>
        </Link> */}

        {/* <Link href="/firebaseListData" style={{ backgroundColor: "#FF3737", padding: 15, borderRadius: 10, width: '95%', marginBottom: 10 }} asChild>
          <Pressable>
            <Text style={{ fontSize: 22, color: "#FFFFFF", textAlign: "center" }}>Fire List</Text>
          </Pressable>
        </Link> */}

        <Link href="/firebaseCRUD" style={{ backgroundColor: "#FF3737", padding: 15, borderRadius: 10, width: '95%', marginBottom: 10 }} asChild>
          <Pressable>
            <Text style={{ fontSize: 22, color: "#FFFFFF", textAlign: "center" }}>Fire CRUD</Text>
          </Pressable>
        </Link>

        {/* <Link href="/auth" style={{ backgroundColor: "#FF3737", padding: 15, borderRadius: 10, width: '95%', marginBottom: 10 }} asChild>
          <Pressable>
            <Text style={{ fontSize: 22, color: "#FFFFFF", textAlign: "center" }}>Auth</Text>
          </Pressable>
        </Link> */}

        <Pressable onPress={handleRegister} style={{ backgroundColor: "#FF3737", padding: 15, borderRadius: 10, width: '95%', marginBottom: 10 }}>
          <Text style={{ fontSize: 22, color: "#FFFFFF", textAlign: "center" }}>Registrar Usuário</Text>
        </Pressable>

        {/* <Button title="Registrar" onPress={handleRegister} /> */}
        {/* <Button title="Login" onPress={handleLogin} /> */}

      </View>



      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Logar</Text>

            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
              placeholderTextColor="#FFF"
              keyboardType="email-address"
            />

            <TextInput
              placeholder="Senha"
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={styles.input}
              placeholderTextColor="#FFF"
              secureTextEntry

            />

            <View style={styles.modalButtons}>
            <Button title="Registrar" onPress={handleRegister} />
            <Button title="Login" onPress={handleLogin} />
              {/* <Pressable style={styles.addButton} onPress={handleLogin}>
                <Text style={styles.addButtonText}>Logar</Text>
              </Pressable>
              <Pressable style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </Pressable> */}
            </View>
          </View>
        </View>
      </Modal>

    </ImageBackground >
  );
}

// const styles = StyleSheet.create({
//   background: {
//     display: 'flex',
//     width: '100%',
//     height: '100%',
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 40,
//     color: "#FFF",
//     marginTop: 20,
//   },
//   buttonContainer: {
//     flex: 1,
//     justifyContent: "flex-end",
//     marginBottom: 20,
//     width: '100%',
//     alignItems: 'center',
//   },
//   button: {
//     backgroundColor: "#FF3737",
//     padding: 15,
//     borderRadius: 10,
//     width: '95%',
//   },
//   buttonContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonText: {
//     fontSize: 22,
//     color: "#FFFFFF",
//     textAlign: "center",
//   },
//   icon: {
//     marginRight: 10,
//   },
// });
