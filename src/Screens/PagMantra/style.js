import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
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
    Frase: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    resultado: {
        padding: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
    },
    frase: {
        fontSize: 20,
        marginBottom: 10,
        fontStyle: 'italic',
        textAlign: 'center',
    },
});
