'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import styles from './page.module.scss'

export default function SimilarBrands() {
  const [file, setFile] = useState<File | null>(null)
  const [similarImages, setSimilarImages] = useState<Array<{ link: string }>>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0])
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return

    setIsLoading(true)
    const reader = new FileReader()
    reader.onloadend = async () => {
      const base64String = reader.result as string
      const imageBuffer = base64String.split(',')[1]

      try {
        const response = await fetch('/api/similar-brands', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBuffer }),
        })
        const data = await response.json()
        setSimilarImages(data)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setIsLoading(false)
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className={styles['similar-brands-container']}>
      <h1>Find Similar Brands</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button type="submit" disabled={!file || isLoading}>
          {isLoading ? 'Processing...' : 'Find Similar Images'}
        </button>
      </form>
      {similarImages.length > 0 && (
        <div className={styles['similar-images']}>
          <h2>Similar Images:</h2>
          <div className={styles["image-grid"]}>
            {similarImages.map((img, index) => (
              <div key={index} className={styles['image-item']}>
                <Image src={img.link} alt={`Similar image ${index + 1}`} width={200} height={200} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}