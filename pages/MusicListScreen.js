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

const musicDatabase = {
  Rock: [
    { id: '1', title: 'Bohemian Rhapsody', artist: 'Queen' },
    { id: '2', title: 'Smells Like Teen Spirit', artist: 'Nirvana' },
  ],
  Eletrônico: [
    { id: '1', title: 'Animals', artist: 'Martin Garrix' },
    { id: '2', title: 'Levels', artist: 'Avicii' },
  ],
  Sertanejo: [
    { id: '1', title: 'Evidências', artist: 'Chitãozinho & Xororó' },
    { id: '2', title: 'A Maior Saudade', artist: 'Henrique & Juliano' },
  ],
  Funk: [
    { id: '1', title: 'Baile de Favela', artist: 'MC João' },
    { id: '2', title: 'Bum Bum Tam Tam', artist: 'MC Fioti' },
  ],
  Rap: [
    { id: '1', title: 'Lose Yourself', artist: 'Eminem' },
    { id: '2', title: 'Vida Loka Pt. 2', artist: 'Racionais MCs' },
  ],
  Pagode: [
    { id: '1', title: 'Deixa Acontecer', artist: 'Revelação' },
    { id: '2', title: 'Tá Vendo Aquela Lua', artist: 'Exaltasamba' },
  ],
};

export default function MusicListScreen({ genre, onBack }) {
  const musics = musicDatabase[genre] || [];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#050505' }}>

      <View style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: StatusBar.currentHeight || 30 // 🔥 CORREÇÃO REAL
      }}>

        {/* 🔥 HEADER DESCIDO */}
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
            <Text style={{
              color: '#888',
              fontSize: 12,
              letterSpacing: 1
            }}>
              PLAYLIST
            </Text>

            <Text style={{
              color: '#fff',
              fontSize: 26,
              fontWeight: 'bold'
            }}>
              {genre}
            </Text>
          </View>
        </View>

        {/* LISTA */}
        <FlatList
          data={musics}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={0.8}
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
              <Text style={{
                color: '#ed145b',
                fontSize: 16,
                width: 30
              }}>
                {index + 1}
              </Text>

              <View style={{ flex: 1 }}>
                <Text style={{
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: '600'
                }}>
                  {item.title}
                </Text>

                <Text style={{
                  color: '#888',
                  fontSize: 13,
                  marginTop: 2
                }}>
                  {item.artist}
                </Text>
              </View>

              <Ionicons name="play-circle" size={28} color="#ed145b" />
            </TouchableOpacity>
          )}
        />

      </View>
    </SafeAreaView>
  );
}