import React, { useRef, useEffect } from 'react';

const Visualizer = ({ analyserNode }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!analyserNode) return;

    analyserNode.fftSize = 32;
    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext('2d');

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    const renderFrame = () => {
      requestAnimationFrame(renderFrame);
      analyserNode.getByteFrequencyData(dataArray);

      canvasCtx.fillStyle = 'rgb(0, 0, 0)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      const barWidth = (WIDTH / bufferLength) * 1.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 6;

        canvasCtx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
        canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    renderFrame();

    return () => {

    };
  }, [analyserNode]);

  return <canvas ref={canvasRef} width="300" height="50"></canvas>;
};

export default Visualizer;
