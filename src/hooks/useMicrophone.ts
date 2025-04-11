import {useEffect, useRef, useState} from "react";

export const useMicrophone = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [gainNode, setGainNode] = useState<GainNode | null>(null);
  const [volume, setVolume] = useState(1.0);

  useEffect(() => {
    const initAudio = async () => {
      try {
        audioContextRef.current = new AudioContext();
        const stream = await navigator.mediaDevices.getUserMedia({audio: true});
        setMediaStream(stream);
        const source = audioContextRef.current.createMediaStreamSource(stream);
        const gain = audioContextRef.current.createGain();
        gain.gain.value = volume;
        source.connect(gain);
        gain.connect(audioContextRef.current.destination);
        setGainNode(gain);
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    };

    initAudio();

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [volume]);

  const changeVolume = (newVolume: number) => {
    if (gainNode) {
      gainNode.gain.value = newVolume; // Изменение громкости
      setVolume(newVolume);
    }
  };

  return {mediaStream, changeVolume, volume};
};
