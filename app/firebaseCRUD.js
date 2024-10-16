import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TextInput, Pressable, ScrollView, Alert, StyleSheet, Modal, StatusBar, ActivityIndicator } from 'react-native';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import styles from './styles';

export default function App() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const usersCollection = collection(db, 'users');
            const usersSnapshot = await getDocs(usersCollection);
            const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUsers(usersList);
        } catch (error) {
            console.error("Erro ao buscar usuários: ", error);
        } finally {
            setLoading(false);
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
        <ImageBackground source={require("../assets/images/bkg-home.jpg")} 
            style={styles.imageBackground}
        >
            {loading ? (
                <ActivityIndicator size="large" color="#FF3737" />
            ) : (
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={{ width: '100%', paddingHorizontal: 20 }}>
                        <Pressable style={styles.openModalButton} onPress={() => setModalVisible(true)}>
                            <FontAwesome name="plus" size={20} color="white" />
                            <Text style={styles.openModalButtonText}>Adicionar Usuário</Text>
                        </Pressable>
                    </View>

                    {loading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        users.map(user => (
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
                        ))
                    )}

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
            )}
        </ImageBackground>
    );
}