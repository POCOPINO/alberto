import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004f92',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
