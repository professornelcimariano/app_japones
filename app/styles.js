import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackground: {
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
    },
    scrollContainer: {
        flexDirection: 'column',
        padding: 20,
        margin: 20,
        backgroundColor: 'rgba(0,0,0,0.8)', // Fundo preto com transparência
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

export default styles;
