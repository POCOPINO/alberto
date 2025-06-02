import { StyleSheet } from "react-native";

export default StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
  app: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
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
    elevation: 4,
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

  title: {
    fontWeight: "800",
    fontSize: 25,
    margin: 10,
  },

  btn: {
    width: 250,
    margin: 10,
  },

  img: {
    width: 200,
    height: 200,
    borderRadius: 5,
  },

  input: {
    borderBottomWidth: 1,
    width: 250,
    textAlign: "center",
    margin: 10,
  },

  history: {
    marginTop: 10,
    fontSize: 25,
  },

  textItem: {
    margin: 2.5,
    fontSize: 18,
  },
});