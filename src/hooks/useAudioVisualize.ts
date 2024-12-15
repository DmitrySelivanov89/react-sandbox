import { RefObject, useEffect, useRef } from "react";

const useAudioVisualize = (mediaStream: MediaStream | null, canvasRef: RefObject<HTMLCanvasElement | null>) => {
  const analyserRef = useRef<AnalyserNode>(null);
  const animationRef = useRef<number>(null);
  const audiCtxRef = useRef<AudioContext>(null);

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
          let barHeight: number;
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
  }, [mediaStream, canvasRef]);
};

export default useAudioVisualize;
