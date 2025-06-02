import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004f92',
  },
  spacer: {
    flex: 0.5,
  },
  card: {
    flex: 1,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  viewInput: {
    flex:1,
    justifyContent:'flex-start'
  },
  input: {
    height: 45,
    borderColor: '#004f92',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    //SOMBRAS//
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  viewButton:{
    justifyContent:'flex-end',
  },
  button: {
    backgroundColor: '#004f92',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    //SOMBRAS//
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signText: {
    color: '#004f92',
    textAlign: 'center',
    marginTop: 5,
    textDecorationLine: 'underline',
  },
});
