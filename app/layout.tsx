import './globals.css';
import type { Metadata } from 'next';

// Inyección de Metadata B2B para el posicionamiento del sitio
export const metadata: Metadata = {
  title: 'Ethika35 | Canal de Ética y Cumplimiento Normativo',
  description: 'Motor de ética y cumplimiento corporativo operado por Bahumana. Gestión de denuncias, acoso laboral (LFT) y riesgo psicosocial (NOM-035). Parte de Kimia Workforce Suite.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
