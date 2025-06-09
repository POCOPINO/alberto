import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    inputContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    input: {
        width: '80%',
        height: 50,
        borderColor: '#004f92',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#004f92',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 20,
        borderRadius: 12,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    cardText: {
        fontSize: 16,
    },
    cardDate: {
        fontSize: 14,
        marginTop: 6,
        color: '#888',
    },
});
