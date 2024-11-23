'use client';

import styles from './hero.module.scss';
import Snake from '../effects/snake';
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
      targetX: number,
      targetY: number,
      incrementX: number
    }
    let apex: number;
    let nadirY: number;
    let nadirX: number;
    let point: pointType;

    if (heroRef && canvasWidth && canvasHeight) {
      apex = 0.4 * canvasWidth;
      nadirY = 200;
      nadirX = 0.6 * canvasWidth;
      startY = canvasHeight/2-(250*4/3)/2;
      startX = canvasWidth*0.1;      

    point = {
      currentX: startX,
      currentY: startY,
      targetX: apex,
      targetY: 12,
      incrementX: 10
      };
    }

    const setupImage = async () => {
      const image = document.createElement('div');
      image.className = styles.snake;
      return image;
    };

    const imagePosSineUp = (image: HTMLDivElement, xIncrement: number) => {
        image.style.left = `${point.currentX}px`;
        image.style.top = `${point.currentY}px`;
        const progress = (point.currentX - startX) / (point.targetX - startX);
        point.currentY = startY - (point.targetY * Math.sin(progress * Math.PI/2) * 5); // multiply by 3
        point.currentX += xIncrement;
    }

    const imagePosExpDown = (image: HTMLDivElement, xIncrement: number) => {
        image.style.left = `${point.currentX}px`;
        image.style.top = `${point.currentY}px`;
        const progress = (point.currentX - apex) / (nadirX - apex);
        const decay = Math.exp(-progress);
        point.currentY = point.targetY + (nadirY - point.targetY) * (1-decay);
        console.log(decay);
        
        point.currentX += xIncrement;
    }

    const animation = async () => {        
        while (point.currentX <= point.targetX) {
            const image = await setupImage();
            imagePosSineUp(image, point.incrementX);
            if (heroRef.current && heroRef.current.childNodes.length === 0) {
                // Add to DOM
                await new Promise(resolve => setTimeout(resolve, 100));
                wrapper?.appendChild(image);
                image.classList.add(styles.blinking);
                await new Promise(resolve => setTimeout(resolve, 2100));
            } else {
                await new Promise(resolve => setTimeout(resolve, 100));
                wrapper?.appendChild(image);
            }
        }
        
        while (point.currentX > point.targetX && point.currentX <= nadirX) {
            const image = await setupImage();
            imagePosExpDown(image, point.incrementX);
            await new Promise(resolve => setTimeout(resolve, 100));
            wrapper?.appendChild(image);
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
