import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import Header from '../../Components/Header';
import styles from './styles'


const playlist = [
  {
    id: '1',
    title: 'Ja sei - Zimbra',
    audio: require('../../../assets/mantra1.mp3'),
    image: require('../../../assets/musica.png'),
  },
  {
    id: '2',
    title: 'Será que é amor - Arlindo Cruz',
    audio: require('../../../assets/mantra2.mp3'),
    image: require('../../../assets/musica.png'),
  },
  {
    id: '3',
    title: 'Música Misteriosa',
    audio: require('../../../assets/mantraSecreto.mp3'),
    image: require('../../../assets/musica.png'),
  },
];

export default function PagMantra() {
    const [currentTrack, setCurrentTrack] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [sound, setSound] = useState(null);
    const [playbackStatus, setPlaybackStatus] = useState({});

    const playerRef = useRef(null);

    const [isSeeking, setIsSeeking] = useState(false);
    const [seekValue, setSeekValue] = useState(0);

// função da linha que mostra o tempo da musica//
const onSeekSliderComplete = async (value) => {
    if (sound && playbackStatus.durationMillis) {
const position = value * playbackStatus.durationMillis;
    await sound.setPositionAsync(position);
    setIsSeeking(false);
    }
};


// esta parte deixa os icones funcionando como botões de um player//
useEffect(() => {
    tocarMantraAtual();
return () => {
    if (sound) sound.unloadAsync();
    };
}, [currentTrack]);

const tocarMantraAtual = async () => {
    if (sound) await sound.unloadAsync();

    const current = playlist[currentTrack];

    const { sound: newSound } = await Audio.Sound.createAsync(
        current.audio,
        { shouldPlay: true },
        updateStatus
    );

    playerRef.current = newSound;
    setSound(newSound);
    setIsPlaying(true);
};

const updateStatus = (status) => {
    setPlaybackStatus(status);
    if (status.didJustFinish) proximo();
};

const playPause = async () => {
    if (!sound) return;

    if (isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      await sound.playAsync();
      setIsPlaying(true);
    }
};

const proximo = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
};

const anterior = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
};

// esse faz o calculo para exibir o tempo de duraçào da musica//
const formatTime = (millis) => {
    const total = Math.floor(millis / 1000);
    const minutes = Math.floor(total / 60);
    const seconds = total % 60;
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
};

const current = playlist[currentTrack];

return (
    <View style={styles.containerPai}>

        <Header title="Mantras" />

    <View style={styles.container}>
      
      <View style={styles.content}>

        <Image source={current.image} style={styles.image} />

        <Text style={styles.title}>{current.title}</Text>

        

        <View style={styles.timeInfo}>
          <Text>{formatTime(playbackStatus.positionMillis || 0)}</Text>
          <Slider
            style={{ width: '75%', height: 40,}}
            minimumValue={0}
            maximumValue={1}
            value={
                isSeeking
                ? seekValue
                : playbackStatus.positionMillis / playbackStatus.durationMillis || 0
            }
            minimumTrackTintColor="#004f92"
            maximumTrackTintColor="#ccc"
            thumbTintColor="#004f92"
            onValueChange={(val) => {
                setSeekValue(val);
                setIsSeeking(true);
            }}
            onSlidingComplete={onSeekSliderComplete}
            />
          <Text>{formatTime(playbackStatus.durationMillis || 0)}</Text>
        </View>

        <View style={styles.controls}>
            <Pressable onPress={anterior} style={styles.skipButton}>
                <Ionicons name="play-skip-back" size={30} color="#004f92" />
            </Pressable>
            <Pressable onPress={playPause}>
                <Ionicons name={isPlaying ? 'pause-circle' : 'play-circle'} size={50} color="#004f92" />
            </Pressable>
            <Pressable onPress={proximo}>
                <Ionicons name="play-skip-forward" size={30} color="#004f92" />
            </Pressable>
        </View>
      </View>
    </View>
    </View>
  );
}
