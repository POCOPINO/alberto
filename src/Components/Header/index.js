import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

export default function Header({ title, showBack = true }) {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {showBack && (
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#004f92" />
        </Pressable>
      )}
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
}
