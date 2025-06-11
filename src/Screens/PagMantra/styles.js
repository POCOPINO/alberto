import { StyleSheet } from "react-native";

export default StyleSheet.create({
    containerPai:{
    flex:1,
    backgroundColor: '#f8f9fa',
    },
    container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    marginTop:'5%',
    padding: 20,
    },
    content: {
    alignItems: 'center',
    marginTop: 20,
    },
    title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    },
    image: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
    },
    timeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '90%',
    marginBottom: 15,
    },
    controls: {
    flexDirection: 'row',
    alignItems:'center',
    gap: 20,
  },
});
