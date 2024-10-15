import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet, StatusBar } from 'react-native';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'; // Importar biblioteca de ícones

export default function App() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

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
        <View style={styles.container}>
            <StatusBar backgroundColor="#6200EE" barStyle="light-content" />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Usuários do Firestore</Text>

                {/* Formulário de Adicionar Usuário */}
                <View style={styles.form}>
                    <TextInput
                        placeholder="Nome"
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        keyboardType="email-address"
                    />
                    <TextInput
                        placeholder="Telefone"
                        value={phone}
                        onChangeText={setPhone}
                        style={styles.input}
                        keyboardType="phone-pad"
                    />
                    <TouchableOpacity style={styles.addButton} onPress={addUser}>
                        <FontAwesome name="plus" size={20} color="white" />
                        <Text style={styles.addButtonText}>Adicionar Usuário</Text>
                    </TouchableOpacity>
                </View>

                {/* Lista de Usuários */}
                {users.map(user => (
                    <View key={user.id} style={styles.userCard}>
                        <View style={styles.userDetails}>
                            <Text style={styles.userName}>{user.name}</Text>
                            {user.email && <Text style={styles.userEmail}>Email: {user.email}</Text>}
                            {user.phone && <Text style={styles.userPhone}>Telefone: {user.phone}</Text>}
                        </View>
                        <TouchableOpacity onPress={() => deleteUser(user.id)} style={styles.deleteButton}>
                            <MaterialIcons name="delete" size={24} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDEDED',
    },
    scrollContainer: {
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#6200EE',
        textAlign: 'center',
    },
    form: {
        marginBottom: 20,
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    input: {
        borderWidth: 1,
        borderColor: '#BFBFBF',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#F9F9F9',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6200EE',
        padding: 15,
        borderRadius: 5,
    },
    addButtonText: {
        color: '#FFF',
        fontSize: 16,
        marginLeft: 10,
    },
    userCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#FFF',
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
        color: '#333',
    },
    userEmail: {
        fontSize: 14,
        color: '#666',
    },
    userPhone: {
        fontSize: 14,
        color: '#666',
    },
    deleteButton: {
        backgroundColor: '#B00020',
        padding: 10,
        borderRadius: 5,
    },
});
