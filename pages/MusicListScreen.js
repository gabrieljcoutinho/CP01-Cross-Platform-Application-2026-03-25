import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import musicDatabase from '../music/music.json';

export default function MusicListScreen({ genre, onSelectMusic, onBack }) {
  const musics = musicDatabase[genre] || [];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#050505' }}>
      <View style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: StatusBar.currentHeight || 30
      }}>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 25
        }}>
          <TouchableOpacity
            onPress={onBack}
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: '#111',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 15
            }}
          >
            <Ionicons name="chevron-back" size={24} color="#ed145b" />
          </TouchableOpacity>

          <View>
            <Text style={{ color: '#888', fontSize: 12, letterSpacing: 1 }}>PLAYLIST</Text>
            <Text style={{ color: '#fff', fontSize: 26, fontWeight: 'bold' }}>
              {genre.toUpperCase()}
            </Text>
          </View>
        </View>

        <FlatList
          data={musics}
          keyExtractor={(item) => item.song_id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onSelectMusic(item)}
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
              <Text style={{ color: '#ed145b', fontSize: 16, width: 30 }}>
                {index + 1}
              </Text>

              <View style={{ flex: 1 }}>
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
                  {item.title}
                </Text>
                <Text style={{ color: '#888', fontSize: 13, marginTop: 2 }}>
                  {item.artist}
                </Text>
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
/* Use paddings dinâmicos baseados em Dimensions.get('window') se necessário */