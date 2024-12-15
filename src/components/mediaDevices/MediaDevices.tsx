import { ChangeEvent, RefObject, useRef } from "react";
import { useMediaDevices } from "../../hooks/useMediaDevices";
import useAudioVisualize from "../../hooks/useAudioVisualize";

const MediaDevices = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { mediaStream, error, loading, mediaDeviceInfo, handleSetVolume, volume, toggleStream } = useMediaDevices();
  useAudioVisualize(mediaStream, canvasRef);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleSetVolume(parseFloat(e.target.value));
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
      {mediaDeviceInfo.map((device, i) => <li key={i}>{`${device.label} ${device.kind}`}</li>)}
    </ul>
  </>);
};

export default MediaDevices;
