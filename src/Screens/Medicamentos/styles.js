import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  inner: {
    flex: 1,
  },
  body: {
    alignItems: 'center',
    padding: 20,
    marginTop: '5%',
  },
  input: {
    width: '100%',
    marginVertical: 10,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#004f92',
    fontSize: 15,
  },
  btn: {
    flexDirection: 'row',
    backgroundColor: '#004f92',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 15,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 5,
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  historyTitle: {
    marginTop: 25,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004f92',
    alignSelf: 'flex-start',
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: '100%',
  },
  historyText: {
    fontSize: 16,
    color: '#004f92',
  },
  historyList: {
    marginTop: 10,
    width: '100%',
  },
});