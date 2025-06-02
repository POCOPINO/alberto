import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    flex: 1,
  },
  header: {
    backgroundColor: '#f9f9f9',
    height: 100,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: -50,
    marginBottom: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#d9d9d9',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  editProfile: {
    color: '#007bff',
    marginTop: 8,
    fontWeight: '500',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  infoRow: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
  },
  label: {
    fontSize: 14,
    color: '#555',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginTop: 2,
  },
});