'use client'

import { clsx } from 'clsx'
import { useState } from 'react';
import Image from 'next/image'

export default function Page() {
  const [imageIndex, setImageIndex] = useState(0);

  const imageArray: string[] = ['https://placehold.co/600x400/orange/white', 'https://placehold.co/600x400/white/black', 'https://placehold.co/600x400/black/white', 'https://placehold.co/600x400/pink/white', 'https://placehold.co/600x400/yellow/white'];

  function prev(): void {
    if (imageIndex > 0) setImageIndex(imageIndex - 1)
  }
  
  function next(): void {
    if (imageIndex < imageArray.length - 1) {
      setImageIndex(imageIndex + 1);
    }
  }
  
  return (
    <>
    <div className={styles['products-page']}>
      {imageArray.map((url) => (
        <Image fill key={url} src={url} className={styles['image']} alt="" style={{
          translate: `${imageIndex*-100}%`,
        }} />
      ))}
      <button onClick={prev} className={""}></button>
      <button onClick={next} className={""}></button>
    </div>
    <div className={styles['pagiantion']}>
      {imageArray.map((url,index) => (
        <button key={index} style={index == imageIndex ? {all: 'unset', scale: '1.5', transition: 'scale 0.5s ease', cursor: 'pointer'} : {all: 'unset', cursor: 'pointer'}} onClick={()=> {
          setImageIndex(index)
        }}>{index}</button>
      ))}
    </div>
    </>
  )
};