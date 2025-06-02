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
  content: {
    paddingVertical: 20,
  },
  vaccineSection: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  ageGroup: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004f92',
    marginBottom: 10,
  },
  vaccine: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#000',
    marginBottom: 5,
  },
  line: {
    backgroundColor:'#708090',
    height:2,
  },
  bold: {
    fontWeight: 'bold',
  },
});