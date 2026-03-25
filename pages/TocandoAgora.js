import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TocandoAgora({ floor, onContinue, onBack }) {
  return (
    <View style={{
      flex: 1,
      backgroundColor: '#000',
      justifyContent: 'center',
      alignItems: 'center'
    }}>

      <Text style={{
        color: '#fff',
        fontSize: 24,
        marginBottom: 20
      }}>
        Tocando agora no andar {floor}º 🎵
      </Text>

      <TouchableOpacity
        onPress={onContinue}
        style={{
          backgroundColor: '#ed145b',
          padding: 15,
          borderRadius: 10,
          marginBottom: 10
        }}
      >
        <Text style={{ color: '#fff' }}>Adicionar Música</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onBack}>
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>

    </View>
  );
}