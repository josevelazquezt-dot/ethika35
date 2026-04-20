// app/[client_slug]/not-found.tsx
// Se activa cuando notFound() se llama desde page.tsx
import React from 'react';

export default function TenantNotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'DM Sans', system-ui, sans-serif",
        background: '#F8F7F4',
        gap: '1rem',
      }}
    >
      <div
        style={{
          fontSize: '4rem',
          marginBottom: '0.5rem',
        }}
      >
        🔒
      </div>
      <h1 style={{ color: '#1A1A2E', fontWeight: 700, fontSize: '1.5rem', margin: 0 }}>
        Portal no disponible
      </h1>
      <p style={{ color: '#94A3B8', fontSize: '0.95rem', margin: 0, textAlign: 'center', maxWidth: '340px' }}>
        Si eres empleado de una empresa registrada, verifica el enlace que te proporcionó tu empresa.
      </p>
      <a
        href="https://ethika35.com"
        style={{
          marginTop: '1rem',
          color: '#DC2626',
          fontSize: '0.8rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          textDecoration: 'none',
        }}
      >
        Regresar a Ethika35.com
      </a>
    </div>
  );
}
