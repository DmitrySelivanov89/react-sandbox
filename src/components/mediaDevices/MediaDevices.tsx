import { ChangeEvent, useEffect, useRef } from "react";
import { useMediaDevices } from "../../hooks/useMediaDevices";

const MediaDevices = () => {
  const { mediaStream, error, loading, mediaDeviceInfo, setVolume, volume, toggleStream } = useMediaDevices();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const audiCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (mediaStream) {
      audiCtxRef.current = new AudioContext();
      const source = audiCtxRef.current.createMediaStreamSource(mediaStream);
      analyserRef.current = audiCtxRef.current.createAnalyser();
      source.connect(analyserRef.current);
      analyserRef.current.connect(audiCtxRef.current.destination);

      const ctx = canvasRef.current?.getContext("2d");
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const draw = () => {
        animationRef.current = requestAnimationFrame(draw);
        analyserRef.current?.getByteFrequencyData(dataArray);

        if (ctx && canvasRef.current) {
          ctx.fillStyle = "rgba(200, 200, 200, 0.2)";
          ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          const barWidth = (canvasRef.current.width / bufferLength) * 2.5;
          let barHeight;
          let x = 0;

          for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];
            ctx.fillStyle = "rgb(" + (barHeight + 100) + ",50,50)";
            ctx.fillRect(x, canvasRef.current.height - barHeight / 2, barWidth, barHeight / 2);
            x += barWidth + 1;
          }
        }
      };
      draw();
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
      if (analyserRef.current) {
        analyserRef.current?.disconnect();
        analyserRef.current = null;
      }
      if (audiCtxRef.current) {
        audiCtxRef.current.close();
        audiCtxRef.current = null;
      }
    };
  }, [mediaStream]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  return (<>
    <div>
      <p>Громкость: {Math.round(volume * 100)}%</p>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
      />
      <button onClick={toggleStream}>
        {mediaStream?.active ? 'Stop Stream' : "Start Stream"}
      </button>
    </div>
    <canvas ref={canvasRef} width={300} height={100} />
    <ul>
      {mediaDeviceInfo.map((device) => <li key={device.deviceId}>{device.label} {device.kind}</li>)}
    </ul>
  </>);
};

export default MediaDevices;
