import React from 'react';

export default function Page() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      fontFamily: 'sans-serif',
      backgroundColor: '#0f172a',
      color: '#ffffff'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Sampa Vision AI</h1>
      <p style={{ color: '#94a3b8', fontSize: '1.2rem' }}>Seu projeto Next.js foi configurado com sucesso!</p>
    </div>
  );
}
