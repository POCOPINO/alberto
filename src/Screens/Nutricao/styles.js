import { StyleSheet } from "react-native";

export default StyleSheet.create({
    containerPai:{
        flex:1,
        backgroundColor: '#f8f9fa',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        marginTop:20,
    },
    header: {
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'flex-start',
        //SOMBRAS// 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
      },
      headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#004f92',
      },
      headerTitleContainer: {
        flex: 1,
      },
      backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
      backButtonText: {
        fontSize: 24,
        color: '#004f92',
      },
      card: {
        width: '80%',
        padding: 20,
        borderRadius: 10,
        elevation: 3,
    },
    cardFruta: {
        width: 330,
        height: 300,
        padding: 0,
        borderRadius: 10,
        elevation: 3,
    },
    text: {
        textAlign: 'center',
        marginBottom: 15,
        color: '#004f92',
        fontWeight: 'semi-bold',
    },
    textBotao: {
        color: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        fontFamily: 'Arial',
        marginTop: 15,
        fontSize: 15
    },
    carregando: {
        marginTop: 16
    },
    textCard: {
        textAlign: 'center',
        marginBottom: 7,
        marginTop: 10,
        color: '#004f92',
        fontWeight: 'bold',
    },
    botao: {
        backgroundColor: '#004f92',
        height: 50,
        width: 250,
        fontFamily: 'Arial',
        borderRadius: 10,
        marginRight: 42
    },
    input: {
        borderWidth: 1,
        borderColor: '#004f92',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    image: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginTop: 15,
        marginRight: 10,
    },  
});
