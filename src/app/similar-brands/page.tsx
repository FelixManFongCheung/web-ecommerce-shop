'use client'
import React, { useState } from 'react'
import styles from './page.module.scss'

// type Props = {

// }

export default function SimilarBrands() {
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = "http://localhost:4000/files"
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(input), // Convert formData to JSON
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log(`Success: ${result}`);
    } catch (error) {
        console.error('Error:', error);
    }
    
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }
  return (
    <form onSubmit={handleSubmit} className={styles['brand-form']}>
        <p>
            <label htmlFor="brand">Brand: </label>
            <input value={input} onChange={handleChange} type="text" id="brand" name="brand" />
        </p>
    </form>
  )
}