"use client";

import React, { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';

export default function ClientEthikaPortal({ params }: { params: { client_slug: string } }) {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_TENANT_API_URL}?slug=${params.client_slug}`, {
          cache: 'no-store'
        });
        if (!res.ok) { setLoading(false); return; }
        const data = await res.json();
        setConfig(data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    }
    fetchConfig();
  }, [params.client_slug]);

  if (!loading && (!config || config.modules?.ethika35_enabled === false)) return notFound();
  if (loading) return <div className="loading">Cargando portal de seguridad...</div>;

  const primaryColor = config.branding?.primary_color || '#00D09C';
  const clientLogo = `/pictures/${params.client_slug}_logo.png`;
  const reportUrl = `https://ethika35.factorintegracion.net/test?slug=${params.client_slug}`;

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Montserrat', sans-serif; background-color: #F8FAFC; color: #1E293B; }
        
        /* HEADER 3 SECCIONES ESTILO PULSO35 */
        header {
          background: #FFFFFF;
          padding: 15px 20px;
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 2px solid #E2E8F0;
        }
        .header-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
        }
        .h-left { justify-self: start; }
        .h-center { justify-self: center; }
        .h-right { justify-self: end; }
        
        .logo-c { height: 45px; max-width: 150px; object-fit: contain; }
        .logo-e { height: 35px; }

        .btn-header {
          background: ${primaryColor};
          color: white;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 700;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* CONTENIDO DE CONFIANZA */
        .main-content { max-width: 800px; margin: 40px auto; padding: 0 20px; }
        .safe-card { 
          background: white; 
          padding: 30px; 
          border-radius: 12px; 
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
          border-top: 5px solid ${primaryColor};
        }
        .shield-icon { font-size: 40px; margin-bottom: 20px; color: ${primaryColor}; }
        h1 { font-size: 1.8rem; margin-bottom: 15px; color: #0F172A; }
        p { margin-bottom: 20px; line-height: 1.6; color: #475569; }

        /* LISTA DE INCIDENCIAS */
        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 15px;
          margin: 30px 0;
        }
        .category-item {
          background: #F1F5F9;
          padding: 15px;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          border: 1px solid #E2E8F0;
        }
        .category-item:before { content: "•"; color: ${primaryColor}; margin-right: 10px; font-size: 1.5rem; }

        .evidence-box {
          background: #FFFBEB;
          border: 1px dashed #F59E0B;
          padding: 20px;
          border-radius: 8px;
          margin-top: 20px;
          font-size: 0.9rem;
        }

        .btn-lg {
          display: block;
          background: ${primaryColor};
          color: white;
          text-align: center;
          padding: 20px;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 700;
          font-size: 1.2rem;
          margin-top: 30px;
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
        }

        footer { text-align: center; padding: 60px 20px; }
        .logo-k { height: 30px; opacity: 0.6; filter: grayscale(100%); margin-bottom: 10px; }
        .link-main { display: block; color: #94A3B8; text-decoration: none; font-size: 0.75rem; }

        @media (max-width: 600px) {
          .header-grid { grid-template-columns: 1fr 1fr; }
          .h-center { display: none; }
          h1 { font-size: 1.4rem; }
        }
      `}} />

      <header>
        <div className="header-grid">
          <div className="h-left">
            <img src={clientLogo} alt="Logo" className="logo-c" onError={(e) => e.currentTarget.style.display='none'} />
          </div>
          <div className="h-center">
            <a href={reportUrl} className="btn-header">Iniciar Denuncia</a>
          </div>
          <div className="h-right">
            <img src="/pictures/logo_ethika35.png" alt="Ethika35" className="logo-e" />
          </div>
        </div>
      </header>

      <div className="main-content">
        <div className="safe-card">
          <div className="shield-icon">🛡️</div>
          <h1>Espacio Seguro y Confidencial</h1>
          <p>
            En <strong>{config.legal_name}</strong>, tu seguridad es lo más importante. Este canal NO es manejado por la empresa, sino por <strong>BAHUMANA</strong>, un tercero independiente.
          </p>
          <p>
            Puedes reportar con total confianza. Nadie dentro de la empresa sabrá quién eres si decides que tu reporte sea anónimo. Todas las denuncias dejan evidencia legal ante el tercero para asegurar que se investiguen justamente.
          </p>

          <h2 style={{fontSize: '1.1rem', marginBottom: '15px'}}>¿Qué puedes reportar aquí?</h2>
          <div className="category-grid">
            <div className="category-item">Acoso Laboral</div>
            <div className="category-item">Acoso Sexual</div>
            <div className="category-item">Sobornos</div>
            <div className="category-item">Conflicto de Intereses</div>
            <div className="category-item">Robo o Fraude</div>
            <div className="category-item">Maltrato / NOM-035</div>
            <div className="category-item">Discriminación</div>
            <div className="category-item">Uso de Drogas/Alcohol</div>
          </div>

          <div className="evidence-box">
            <strong>Protección Garantizada:</strong> Al enviar tu reporte, se genera un folio único. <strong>BAHUMANA</strong> resguarda la evidencia de forma externa para evitar que la información sea borrada o alterada por alguien de la organización.
          </div>

          <a href={reportUrl} className="btn-lg">Iniciar Denuncia Segura</a>
        </div>
      </div>

      <footer>
        <img src="/pictures/logo_konfidente.png" alt="Konfidente" className="logo-k" />
        <a href="https://ethika35.com" className="link-main">Visitar ethika35.com</a>
      </footer>
    </>
  );
}
