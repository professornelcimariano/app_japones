import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TextInput, Pressable, ScrollView, Alert, StyleSheet, Modal, StatusBar } from 'react-native';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

export default function App() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const fetchUsers = async () => {
        try {
            const usersCollection = collection(db, 'users');
            const usersSnapshot = await getDocs(usersCollection);
            const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUsers(usersList);
        } catch (error) {
            console.error("Erro ao buscar usuários: ", error);
        }
    };

    const addUser = async () => {
        if (!name) {
            Alert.alert('Erro', 'O nome não pode ser nulo');
            return;
        }
        try {
            const newUser = { name, email, phone };
            await addDoc(collection(db, 'users'), newUser);
            setName('');
            setEmail('');
            setPhone('');
            setModalVisible(false);
            fetchUsers();
        } catch (error) {
            console.error("Erro ao adicionar usuário: ", error);
        }
    };

    const deleteUser = async (id) => {
        Alert.alert(
            'Confirmar',
            'Você tem certeza que deseja deletar este usuário?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Deletar',
                    onPress: async () => {
                        try {
                            await deleteDoc(doc(db, 'users', id));
                            fetchUsers();
                        } catch (error) {
                            console.error("Erro ao deletar usuário: ", error);
                        }
                    }
                }
            ]
        );
    };

    useEffect(() => {
        fetchUsers();
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
            { /* <View style={styles.container}> */}
            <Text style={styles.title}>Usuários</Text>

            <View style={{ width: '100%', paddingHorizontal: 20 }}>
                <Pressable style={styles.openModalButton} onPress={() => setModalVisible(true)}>
                    <FontAwesome name="plus" size={20} color="white" />
                    <Text style={styles.openModalButtonText}>Adicionar Usuário</Text>
                </Pressable>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>

                {/* Lista de Usuários */}
                {users.map(user => (
                    <View key={user.id} style={styles.userCard}>
                        <View style={styles.userDetails}>
                            <Text style={styles.userName}>{user.name}</Text>
                            {user.email && <Text style={styles.userEmail}>Email: {user.email}</Text>}
                            {user.phone && <Text style={styles.userPhone}>Telefone: {user.phone}</Text>}
                        </View>
                        <Pressable onPress={() => deleteUser(user.id)} style={styles.deleteButton}>
                            <MaterialIcons name="delete" size={24} color="#FFF" />
                        </Pressable>
                    </View>
                ))}

                {/* Modal para adicionar usuário */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Adicionar Usuário</Text>
                            <TextInput
                                placeholder="Nome"
                                value={name}
                                onChangeText={setName}
                                style={styles.input}
                                placeholderTextColor="#FFF"
                            />
                            <TextInput
                                placeholder="Email"
                                value={email}
                                onChangeText={setEmail}
                                style={styles.input}
                                placeholderTextColor="#FFF"
                                keyboardType="email-address"
                            />
                            <TextInput
                                placeholder="Telefone"
                                value={phone}
                                onChangeText={setPhone}
                                style={styles.input}
                                placeholderTextColor="#FFF"
                                keyboardType="phone-pad"
                            />
                            <View style={styles.modalButtons}>
                                <Pressable style={styles.addButton} onPress={addUser}>
                                    <Text style={styles.addButtonText}>Salvar</Text>
                                </Pressable>
                                <Pressable style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
            { /* </View> */}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexDirection: 'column',
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#FFF',
        textAlign: 'center',
    },
    openModalButton: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF3737', // Vermelho dos botões
        padding: 15,
        borderRadius: 5,
        marginBottom: 20,
    },
    openModalButtonText: {
        color: '#FFF',
        fontSize: 16,
        marginLeft: 10,
    },
    userCard: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#1A1A1A', // Preto mais suave para os cards
        borderRadius: 10,
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    userDetails: {
        flex: 1,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#FFF', // Branco
    },
    userEmail: {
        fontSize: 14,
        color: '#CCC', // Cinza claro
    },
    userPhone: {
        fontSize: 14,
        color: '#CCC',
    },
    deleteButton: {
        backgroundColor: '#B00020', // Vermelho escuro para o botão de deletar
        padding: 10,
        borderRadius: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)', // Fundo preto com transparência
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#1A1A1A', // Preto para o modal
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#FFF',
    },
    input: {
        borderWidth: 1,
        borderColor: '#FFF',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        color: '#FFF', // Texto branco nos inputs
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    addButton: {
        backgroundColor: '#FF3737', // Vermelho do botão de salvar
        padding: 10,
        borderRadius: 5,
        width: '45%',
        alignItems: 'center',
    },
    addButtonText: {
        color: '#FFF',
        fontSize: 16,
    },
    cancelButton: {
        backgroundColor: '#B00020', // Vermelho escuro para o botão de cancelar
        padding: 10,
        borderRadius: 5,
        width: '45%',
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#FFF',
        fontSize: 16,
    },
});
