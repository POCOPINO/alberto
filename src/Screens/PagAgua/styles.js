import { StyleSheet } from "react-native";

export default StyleSheet.create({
  containerPai:{
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    marginTop:'20%',
  },
  containerGrafico: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  RowBotaoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  BotaoContainer: {
    flexDirection:'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  botaoAdc: {
    width: 160,
    height: 70,
    backgroundColor: '#004f92',
    borderRadius:10,
    marginVertical: 2.5,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textoAdc: {
    fontWeight: '600',
    color: '#ffff',
  },
  botaoAdcModal: {
    width: 120,
    height: 50,
    backgroundColor: '#004f92',
    borderRadius:10,
    marginVertical: 2.5,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTexto: {
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',
    color: '#004f92',
    marginBottom:10,
  },
});