import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
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
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004f92',
  },
  message: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    color: '#333',
  },
  image: {
    width: 400,
    height: 400,
    marginTop: 10,
    resizeMode: 'contain',
  },
  infoImageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  infoImage: {
    width: '90%',
    height: 100,
    resizeMode: 'contain',
  },
});