import { memo, useEffect, useRef, useState } from "react";
import { Flex } from "@chakra-ui/react";

interface VisualizerProps {
  mediaRecorder: MediaRecorder | undefined;
}

const Visualizer: React.FC<VisualizerProps> = memo(({ mediaRecorder }) => {
  const [audioContext] = useState(() => new AudioContext());
  const [analyser, setAnalyser] = useState<AnalyserNode>();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!mediaRecorder?.stream) return;

    const analyserNode = audioContext.createAnalyser();
    setAnalyser(analyserNode);
    analyserNode.fftSize = 1024;
    const source = audioContext.createMediaStreamSource(mediaRecorder?.stream);
    source.connect(analyserNode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaRecorder?.stream]);

  useEffect(() => {
    if (analyser && mediaRecorder?.state === "recording") {
      report();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [analyser, mediaRecorder?.state]);

  const report = () => {
    if (!analyser) return;

    const data = new Uint8Array(analyser?.frequencyBinCount);

    if (mediaRecorder?.state === "recording") {
      analyser?.getByteFrequencyData(data);
      processFrequencyData(data);
      requestAnimationFrame(report);
    } else if (mediaRecorder?.state === "paused") {
      processFrequencyData(data);
    } else if (
      mediaRecorder?.state === "inactive" &&
      audioContext.state !== "closed"
    ) {
      audioContext.close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const calculateBarData = (
    frequencyData: Uint8Array,
    width: number,
    barWidth: number,
    gap: number
  ): number[] => {
    let units = width / (barWidth + gap);
    let step = Math.floor(frequencyData.length / units);

    if (units > frequencyData.length) {
      units = frequencyData.length;
      step = 1;
    }

    const data: number[] = [];

    for (let i = 0; i < units; i++) {
      let sum = 0;

      for (let j = 0; j < step && i * step + j < frequencyData.length; j++) {
        sum += frequencyData[i * step + j];
      }
      data.push(sum / step);
    }
    return data;
  };

  const draw = (
    data: number[],
    canvas: HTMLCanvasElement,
    barWidth: number,
    gap: number,
    backgroundColor: string,
    barColor: string
  ): void => {
    const amp = canvas.height / 2;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (backgroundColor !== "transparent") {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    data.forEach((dp, i) => {
      ctx.fillStyle = barColor;

      const x = i * (barWidth + gap);
      const y = amp - dp / 2;
      const w = barWidth;
      const h = dp || 1;

      ctx.beginPath();
      ctx.fillRect(x, y, w, h);
    });
  };

  const processFrequencyData = (data: Uint8Array): void => {
    if (!canvasRef.current) return;

    const dataPoints = calculateBarData(data, canvasRef.current.width, 1, 2);
    draw(dataPoints, canvasRef.current, 2, 15, "#EFEFEF", "#1717f4");
  };

  return (
    <Flex width="full">
      <canvas
        style={{
          position: "absolute",
          height: "40px",
          width: "100%",
          top: "-20px",
        }}
        ref={canvasRef}
      />
    </Flex>
  );
});

export default Visualizer;
