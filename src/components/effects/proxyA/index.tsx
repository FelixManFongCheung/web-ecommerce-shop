'use client'

import {useEffect, useRef} from 'react';
import matrix from './effect';

export default function Effect() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canv1 = canvasRef.current;
    if (canv1) {
      matrix(canv1);
    }
  }, [])
  
  return (
    <canvas className={""} ref={canvasRef}></canvas>
  )
};