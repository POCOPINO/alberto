import { StyleSheet } from "react-native";

export default StyleSheet.create({
  containerPai: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
    marginTop: '5%',
  },
  card: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#fff',
    marginTop: 20,
  },
  text: {
    textAlign: 'center',
    marginBottom: 15,
    color: '#004f92',
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#004f92',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 15,
  },
  botao: {
    backgroundColor: '#004f92',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  textBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // 🔄 Alterações no cardFruta
  cardFruta: {
    width: '95%',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  // 🔄 Imagem mais responsiva
  image: {
    width: '60%',
    height: undefined,
    aspectRatio: 1,
    alignSelf: 'center',
    marginBottom: 15,
    resizeMode: 'contain',
  },

  // 🔄 Texto do card ajustado
  textCard: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#004f92',
    fontWeight: '600',
    fontSize: 16,
  },

  // 🔄 Espaço extra entre o card de busca e os resultados
  listContainer: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 5,
    width: '100%',
    marginTop: 30, // <--- Espaço extra adicionado
  },

  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 15,
    marginTop: 30,
  },
});
