// app/[client_slug]/error.tsx
// Se activa si el fetch a Lambda lanza una excepción no capturada
'use client';
import React from 'react';

export default function TenantError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
      <div style={{ fontSize: '3rem' }}>⚠</div>
      <h2 style={{ color: '#1A1A2E', fontWeight: 700, margin: 0 }}>
        Error temporal del sistema
      </h2>
      <p style={{ color: '#94A3B8', fontSize: '0.9rem', margin: 0 }}>
        Intenta de nuevo en unos momentos.
      </p>
      <button
        onClick={reset}
        style={{
          marginTop: '1rem',
          padding: '0.6rem 1.5rem',
          background: '#DC2626',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontWeight: 700,
          cursor: 'pointer',
          fontSize: '0.85rem',
        }}
      >
        Reintentar
      </button>
    </div>
  );
}
