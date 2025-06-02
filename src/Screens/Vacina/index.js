import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, ScrollView,Pressable } from 'react-native';
import styles from './styles'
import Header from '../../Components/Header'

export default function Vacinas() {
const navigation = useNavigation()

  return (
    <View style={styles.container}>
     
       <Header title="Vacinas"/>

      {/* Conteúdo com as vacinas por idade */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.vaccineSection}>
        <Text style={styles.ageGroup}>0-6 meses</Text>
          <Text style={styles.vaccine}>- <Text style={styles.bold}>Vacina BCG</Text></Text>
          <Text style={styles.vaccine}>- <Text style={styles.bold}>Vacina Hepatite B</Text></Text>
          <Text style={styles.vaccine}>- <Text style={styles.bold}>Vacina DTPa</Text></Text>
          <Text style={styles.vaccine}>- <Text style={styles.bold}>Vacina Rotavírus</Text></Text>
          <Text style={styles.vaccine}>- <Text style={styles.bold}>Vacina Pneumocócica</Text></Text>
          <Text style={styles.vaccine}>- <Text style={styles.bold}>Vacina Poliomielite</Text></Text>
        </View>

        <View style={styles.line}></View>

        <View style={styles.vaccineSection}>
          <Text style={styles.ageGroup}>1 ano</Text>
          <Text style={styles.vaccine}>- <Text style={styles.bold}>Vacina MMR (Sarampo, Caxumba e Rubéola)</Text></Text>
          <Text style={styles.vaccine}>- <Text style={styles.bold}>Vacina DTP (Difteria, Tétano e Coqueluche)</Text></Text>
          <Text style={styles.vaccine}>- <Text style={styles.bold}>Vacina Hepatite A</Text></Text>
          <Text style={styles.vaccine}>- <Text style={styles.bold}>Vacina Varicela</Text></Text>
          <Text style={styles.vaccine}>- <Text style={styles.bold}>Vacina Pneumocócica Reforço</Text></Text>
        </View>

        <View style={styles.line}></View>

        <View style={styles.vaccineSection}>
          <Text style={styles.ageGroup}>5 anos</Text>
          <Text style={styles.vaccine}>- <Text style={styles.bold}>Vacina dT (Difteria e Tétano)</Text></Text>
          <Text style={styles.vaccine}>- <Text style={styles.bold}>Vacina Poliomielite Reforço</Text></Text>
          <Text style={styles.vaccine}>- <Text style={styles.bold}>Vacina MMR Reforço</Text></Text>
          <Text style={styles.vaccine}>- <Text style={styles.bold}>Vacina Varicela Reforço</Text></Text>
        </View>

        <View style={styles.line}></View>

        <View style={styles.vaccineSection}>
          <Text style={styles.ageGroup}>Adultos (19 anos em diante)</Text>
          <Text style={styles.vaccine}>- <Text style={styles.bold}>Vacina Hepatite B (Dose de reforço)</Text></Text>
          <Text style={styles.vaccine}>- <Text style={styles.bold}>Vacina dT (Difteria e Tétano)</Text></Text>
          <Text style={styles.vaccine}>- <Text style={styles.bold}>Vacina Febre Amarela</Text></Text>
          <Text style={styles.vaccine}>- <Text style={styles.bold}>Vacina Influenza</Text></Text>
        </View>

        <View style={styles.line}></View>

        <View style={styles.vaccineSection}>
          <Text style={styles.ageGroup}>Idosos (60 anos em diante)</Text>
          <Text style={styles.vaccine}>- <Text style={styles.bold}>Vacina Pneumocócica</Text></Text>
          <Text style={styles.vaccine}>- <Text style={styles.bold}>Vacina Hepatite A</Text></Text>
          <Text style={styles.vaccine}>- <Text style={styles.bold}>Vacina Herpes Zóster</Text></Text>
          <Text style={styles.vaccine}>- <Text style={styles.bold}>Vacina Influenza</Text></Text>
        </View>
      </ScrollView>
    </View>
  );
}