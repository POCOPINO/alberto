import React from 'react';
import { View, Text, Pressable,} from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import styles from './style'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CustomDrawer(props) {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.replace('Login');
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />

      <View style={styles.logoutContainer}>
        <Pressable onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={22} color="#004f92" />
          <Text style={styles.logoutText}>Sair</Text>
        </Pressable>
      </View>
    </DrawerContentScrollView>
  );
}
