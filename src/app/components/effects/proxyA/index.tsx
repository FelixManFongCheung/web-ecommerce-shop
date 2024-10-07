'use client'

import {useEffect, useRef} from 'react';
import effect from './effect';
import styles from './effect.module.scss';

export default function Effect() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasRef2 = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canv1 = canvasRef.current;
    const canv2 = canvasRef2.current;
    if (canv1 && canv2) {
        effect(canv1, canv2);
    }
  }, [])
  
  return (
    <>
        <canvas className={styles.canvas} ref={canvasRef}></canvas>
        <canvas className={styles.canvas} ref={canvasRef2}></canvas>
    </>
  )
};