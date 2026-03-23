import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as S from '../Css/styleMusicList';

const MUSIC_DATABASE = {
  // --- ANDAR 1 ---
  "1-Rock": [
    { id: '101', title: "Geração Alpha Rock", artist: "Heavy FIAP", url: "..." },
    { id: '102', title: "Neon Nights", artist: "The Electrons", url: "..." }
  ],
  "1-Eletrônico": [
    { id: '103', title: "Binary Beats", artist: "DJ Kernel", url: "..." },
    { id: '104', title: "Cyber Trance", artist: "System Overload", url: "..." }
  ],
  "1-Sertanejo": [
    { id: '105', title: "Modão do Primeiro", artist: "Dupla 01", url: "..." },
    { id: '106', title: "Berrante Digital", artist: "Cowboy Codador", url: "..." }
  ],
  "1-Funk": [
    { id: '107', title: "Baile do 1º", artist: "MC Logic", url: "..." },
    { id: '108', title: "Fluxo de Entrada", artist: "MC Script", url: "..." }
  ],
  "1-Rap": [
    { id: '109', title: "Versos do Início", artist: "Rhyme Bot", url: "..." },
    { id: '110', title: "Flow de Dados", artist: "Cyber Poet", url: "..." }
  ],
  "1-Samba": [
    { id: '111', title: "Pagode do Root", artist: "Grupo Sem Bug", url: "..." },
    { id: '112', title: "Samba de Input", artist: "Bateria de Silício", url: "..." }
  ],

  // --- ANDAR 2 ---
  "2-Rock": [
    { id: '201', title: "Hard Wired", artist: "Circuit Breakers", url: "..." },
    { id: '202', title: "Grunge Tech", artist: "The Null Pointers", url: "..." }
  ],
  "2-Eletrônico": [
    { id: '203', title: "Synth Wave 2.0", artist: "Retro Pixel", url: "..." },
    { id: '204', title: "Voltage Control", artist: "Analog Ghost", url: "..." }
  ],
  "2-Sertanejo": [
    { id: '205', title: "Interior 404", artist: "Viola e Código", url: "..." },
    { id: '206', title: "Agro Tech", artist: "Fazendeiro.js", url: "..." }
  ],
  "2-Funk": [
    { id: '207', title: "Ritmo do 2º", artist: "MC Node", url: "..." },
    { id: '208', title: "Grave de Cache", artist: "DJ React", url: "..." }
  ],
  "2-Rap": [
    { id: '209', title: "Underground Link", artist: "Street Code", url: "..." },
    { id: '210', title: "Punchlines de Python", artist: "Snake MC", url: "..." }
  ],
  "2-Samba": [
    { id: '211', title: "Cadência do Segundo", artist: "Cavaco.py", url: "..." },
    { id: '212', title: "Terreiro Tech", artist: "Mestre Sala Digital", url: "..." }
  ],

  // --- ANDAR 3 ---
  "3-Rock": [
    { id: '301', title: "Metal Madness", artist: "The Slayers", url: "..." },
    { id: '302', title: "Dark Web Rock", artist: "Black Hat Band", url: "..." }
  ],
  "3-Eletrônico": [
    { id: '303', title: "Techno Tower", artist: "Rave Master", url: "..." },
    { id: '304', title: "Acid House", artist: "pH Balance", url: "..." }
  ],
  "3-Sertanejo": [
    { id: '305', title: "Mágoa de Programador", artist: "Trio Ternário", url: "..." },
    { id: '306', title: "Coração de RAM", artist: "Sertanejo.zip", url: "..." }
  ],
  "3-Funk": [
    { id: '307', title: "Passinho do Andar 3", artist: "MC Deploy", url: "..." },
    { id: '308', title: "Mandelão Tech", artist: "DJ Cloud", url: "..." }
  ],
  "3-Rap": [
    { id: '309', title: "Voz do Terceiro", artist: "Real Talker", url: "..." },
    { id: '310', title: "Lirismo Binário", artist: "MC AI", url: "..." }
  ],
  "3-Samba": [
    { id: '311', title: "Samba Enredo 3.0", artist: "Escola de Código", url: "..." },
    { id: '312', title: "Pandeiro Virtuoso", artist: "Mestre Byte", url: "..." }
  ],

  // --- ANDAR 4 ---
  "4-Rock": [
    { id: '401', title: "Indie Infusion", artist: "The Hipsters", url: "..." },
    { id: '402', title: "Alt Rock 4", artist: "Fourth Floor", url: "..." }
  ],
  "4-Eletrônico": [
    { id: '403', title: "Deep Space", artist: "Galactic DJ", url: "..." },
    { id: '404', title: "Orbit Beats", artist: "Astro Tech", url: "..." }
  ],
  "4-Sertanejo": [
    { id: '405', title: "Rodeio no Cloud", artist: "Peão Digital", url: "..." },
    { id: '406', title: "Viola de Ouro", artist: "String Picker", url: "..." }
  ],
  "4-Funk": [
    { id: '407', title: "Beat de Elite", artist: "MC Premium", url: "..." },
    { id: '408', title: "Grave Absoluto", artist: "DJ Hertz", url: "..." }
  ],
  "4-Rap": [
    { id: '409', title: "Poesia de Rua 4", artist: "Street Legend", url: "..." },
    { id: '410', title: "Concrete Jungle", artist: "City Crawler", url: "..." }
  ],
  "4-Samba": [
    { id: '411', title: "Samba da Varanda", artist: "Grupo 4 Estações", url: "..." },
    { id: '412', title: "Clássicos do Pandeiro", artist: "Ritmo Certo", url: "..." }
  ],

  // --- ANDAR 5 ---
  "5-Rock": [
    { id: '501', title: "Punk Protocol", artist: "Rebel Devs", url: "..." },
    { id: '502', title: "Grunge Rooftop", artist: "High Altitude", url: "..." }
  ],
  "5-Eletrônico": [
    { id: '503', title: "Skyline Techno", artist: "Aura", url: "..." },
    { id: '504', title: "Atmosphere", artist: "Cloud 9", url: "..." }
  ],
  "5-Sertanejo": [
    { id: '505', title: "Modão do Quinto", artist: "Dupla Raiz", url: "..." },
    { id: '506', title: "Estrela do Topo", artist: "Voz do Campo", url: "..." }
  ],
  "5-Funk": [
    { id: '507', title: "Baile do Rooftop", artist: "MC Sky", url: "..." },
    { id: '508', title: "Funk de Grife", artist: "DJ Gold", url: "..." }
  ],
  "5-Rap": [
    { id: '509', title: "Visão do Topo", artist: "Apex MC", url: "..." },
    { id: '510', title: "Skyline Rhymes", artist: "High Flyer", url: "..." }
  ],
  "5-Samba": [
    { id: '511', title: "Samba nas Alturas", artist: "Grupo Elevation", url: "..." },
    { id: '512', title: "Batucada do 5º", artist: "Mestre Rooftop", url: "..." }
  ],

  // --- ANDAR 6 ---
  "6-Rock": [
    { id: '601', title: "Classic Circuit", artist: "Legacy Band", url: "..." },
    { id: '602', title: "Old School Rock", artist: "Vintage Sound", url: "..." }
  ],
  "6-Eletrônico": [
    { id: '603', title: "Minimal Mix", artist: "Less is More", url: "..." },
    { id: '604', title: "Deep Blue", artist: "Ocean Waves", url: "..." }
  ],
  "6-Sertanejo": [
    { id: '605', title: "Estrada de Chão", artist: "Sertão Puro", url: "..." },
    { id: '606', title: "Luar do Sertão", artist: "Violeiro Solitário", url: "..." }
  ],
  "6-Funk": [
    { id: '607', title: "Funk Retrô", artist: "MC Oldie", url: "..." },
    { id: '608', title: "Batida do 6º", artist: "DJ Rewind", url: "..." }
  ],
  "6-Rap": [
    { id: '609', title: "Consciência Elevada", artist: "Wise Mind", url: "..." },
    { id: '610', title: "Flow Eterno", artist: "Infinite", url: "..." }
  ],
  "6-Samba": [
    { id: '611', title: "Samba Tradicional", artist: "Velha Guarda Digital", url: "..." },
    { id: '612', title: "Raízes do Samba", artist: "Puro Som", url: "..." }
  ],

  // --- ANDAR 7 ---
  "7-Rock": [
    { id: '701', title: "Final Stage Rock", artist: "Boss Battle", url: "..." },
    { id: '702', title: "The Last Solo", artist: "End Game", url: "..." }
  ],
  "7-Eletrônico": [
    { id: '703', title: "Ultraviolet", artist: "Beyond", url: "..." },
    { id: '704', title: "Final Pulse", artist: "Infinity Beats", url: "..." }
  ],
  "7-Sertanejo": [
    { id: '705', title: "Última Moda", artist: "O Finalizador", url: "..." },
    { id: '706', title: "Adeus do Andar 7", artist: "Sertanejo Master", url: "..." }
  ],
  "7-Funk": [
    { id: '707', title: "Mega Baile Final", artist: "MC End", url: "..." },
    { id: '708', title: "Explosão de Grave", artist: "DJ Final", url: "..." }
  ],
  "7-Rap": [
    { id: '709', title: "The Last Rhyme", artist: "Master Poet", url: "..." },
    { id: '710', title: "Epilogue Flow", artist: "Conclusion", url: "..." }
  ],
  "7-Samba": [
    { id: '711', title: "O Grande Final", artist: "Show de Bola", url: "..." },
    { id: '712', title: "Carnaval no 7º", artist: "Campeã do Código", url: "..." }
  ]
};

export default function MusicListScreen({ floor, genre, onBack }) {
  // A mágica acontece aqui: monta a chave (ex: "1-Rock") e busca no banco
  const songs = MUSIC_DATABASE[`${floor}-${genre}`] || [{ id: '0', title: 'Em breve', artist: 'Playlist vazia' }];

  return (
    <S.Container>
      <S.MainBackground colors={['#000', '#ed145b20']} />
      <S.Header>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="close-circle" size={40} color="#ed145b" />
        </TouchableOpacity>
        <S.TitleMain>
          {genre} <S.TitleAccent>Andar {floor}º</S.TitleAccent>
        </S.TitleMain>
      </S.Header>

      <FlatList
        data={songs}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <S.MusicCard activeOpacity={0.7}>
            <S.MusicInfo>
              <S.SongName>{item.title}</S.SongName>
              <S.ArtistName>{item.artist}</S.ArtistName>
            </S.MusicInfo>
            <Ionicons name="play-outline" size={24} color="#ed145b" />
          </S.MusicCard>
        )}
      />
    </S.Container>
  );
}