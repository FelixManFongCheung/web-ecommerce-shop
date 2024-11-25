'use client';

import styles from './hero.module.scss';
import { useRef, useEffect } from 'react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = heroRef.current;
    const canvasWidth = heroRef.current?.clientWidth;
    const canvasHeight = heroRef.current?.clientHeight;
    let startY: number;
    let startX: number;

    type pointType = {
      currentX: number,
      currentY: number,
      incrementX: number,
      amplitude: number,
      frequency: number,
      maxAmplitude: number 
    }
    let point: pointType;

    if (heroRef && canvasWidth && canvasHeight) {
      startX = canvasWidth * 0.05;
      startY = canvasHeight / 2 - (250 * 4/3/2);

      point = {
        currentX: startX,
        currentY: startY,
        incrementX: 15,
        amplitude: 50,
        frequency: 1,
        maxAmplitude: startY - 5
      };
    }

    const setupImage = async () => {
        const image = document.createElement('div');
        image.className = styles.snake;
        return image;
    };

    const imagePosWave = (image: HTMLDivElement, xIncrement: number) => {        
        image.style.left = `${point.currentX}px`;
        image.style.top = `${point.currentY}px`;
        const progress = (point.currentX - startX) / ((canvasWidth ?? 0) * 0.4);
        const angle = progress * (3 * Math.PI / 2);
        
        const sineValue = Math.sin(angle * point.frequency);
        const clampedAmplitude = Math.min(point.amplitude * Math.abs(sineValue), point.maxAmplitude);
        point.currentY = startY - (clampedAmplitude * Math.sign(sineValue));
        point.currentX += xIncrement;
    }

    const animation = async () => {
        const endX = startX + ((canvasWidth ?? 0) * 0.4);
        
        while (point.currentX <= endX) {
            const image = await setupImage();
            imagePosWave(image, point.incrementX);
            
            if (heroRef.current && heroRef.current.childNodes.length === 0) {
                await new Promise(resolve => setTimeout(resolve, 100));
                wrapper?.appendChild(image);
                image.classList.add(styles.blinking);
                await new Promise(resolve => setTimeout(resolve, 1300));
            } else {
                await new Promise(resolve => setTimeout(resolve, 100));
                wrapper?.appendChild(image);
            }
        }
    }

    animation();
  }, []);

  return (
    <div ref={heroRef} className={styles.hero}>
      {/* <Snake /> */}
    </div>
  )
}
