import React from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView, StatusBar, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import musicDatabase from '../music/music.json';
import { API_URL } from "../services/api";

export default function MusicListScreen({ genre, floor, onMusicAdded, onBack }) {
  const genreKey = genre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const musics = musicDatabase[genreKey] || [];

  const handleAddMusic = async (songId) => {
    try {
      // POST para criar a música na playlist do andar
      const response = await fetch(`${API_URL}/playlist/${floor}/${songId}`, {
        method: 'POST',
      });

      if (response.ok) {
        const createdObj = await response.json();
        // O createdObj contém o playlist_id gerado
        onMusicAdded();
      } else {
        Alert.alert("Erro", "Não foi possível adicionar a música.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Falha na conexão com o servidor.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#050505' }}>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: StatusBar.currentHeight || 30 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 25 }}>
          <TouchableOpacity onPress={onBack} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: '#111', alignItems: 'center', justifyContent: 'center', marginRight: 15 }}>
            <Ionicons name="chevron-back" size={24} color="#ed145b" />
          </TouchableOpacity>
          <View>
            <Text style={{ color: '#888', fontSize: 12, letterSpacing: 1 }}>ADICIONAR AO {floor}º ANDAR</Text>
            <Text style={{ color: '#fff', fontSize: 26, fontWeight: 'bold' }}>{genre}</Text>
          </View>
        </View>

        <FlatList
          data={musics}
          keyExtractor={(item) => item.song_id.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleAddMusic(item.song_id)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 15,
                marginBottom: 12,
                backgroundColor: '#0f0f0f',
                borderRadius: 14,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.05)'
              }}
            >
              <Text style={{ color: '#ed145b', fontSize: 16, width: 30 }}>{index + 1}</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>{item.title}</Text>
                <Text style={{ color: '#888', fontSize: 13, marginTop: 2 }}>{item.artist}</Text>
              </View>
              <Ionicons name="add-circle" size={28} color="#ed145b" />
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

// Css da responsividade desse componente
// Ajuste o paddingHorizontal dinamicamente para tablets se necessário