import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    paddingVertical: 10,
  },
  filterContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop:'5%',
    backgroundColor: '#fff',
    elevation: 2,
  },
  filterLabel: {
    fontSize: 16,
    color: '#004f92',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#004f92',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 45,
    color: '#004f92',
  },
  hintSection: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  hintTypeGroup: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004f92',
    marginBottom: 10,
  },
  hint: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
  },
  line: {
    backgroundColor: '#708090',
    height: 2,
    marginHorizontal: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
});