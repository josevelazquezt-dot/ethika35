import { notFound } from 'next/navigation';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

async function getTenantConfig(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_TENANT_API_URL}?slug=${encodeURIComponent(slug)}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}

export default async function EthikaClientPage({ params }: { params: { client_slug: string } }) {
  const { client_slug } = params;
  const config = await getTenantConfig(client_slug);

  if (!config || !config.modules?.ethika35_enabled) {
    return notFound();
  }

  const primaryColor = config.branding?.primary_color || '#00D09C';
  const reportUrl = `https://ethika35.factorintegracion.net/test?tenant=${client_slug}`;

  return (
    <div className="min-h-screen bg-white font-sans">
      
      {/* HEADER: ARQUITECTURA PULSO35 (3 COLUMNAS RÍGIDAS) */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-100 py-3 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-row items-center justify-between w-full">
          
          {/* Bloque Izquierdo: Logo Cliente (33.3%) */}
          <div className="w-1/3 flex justify-start items-center">
            <Image 
              src={`/pictures/${client_slug}_logo.png`} 
              alt="Logo Cliente" 
              width={140} 
              height={40} 
              className="h-8 md:h-10 w-auto object-contain"
              // Si no existe el logo local, el equipo debe asegurar el fallback
            />
          </div>

          {/* Bloque Central: Botón App (33.3%) */}
          <div className="w-1/3 flex justify-center items-center">
            <a 
              href={reportUrl}
              target="_blank"
              className="px-4 py-2 md:px-6 md:py-2.5 text-white text-[11px] md:text-sm font-bold rounded shadow-md transition-transform hover:scale-105 whitespace-nowrap text-center"
              style={{ backgroundColor: primaryColor }}
            >
              HACER UN REPORTE
            </a>
          </div>

          {/* Bloque Derecho: Logo Ethika35 (33.3%) */}
          <div className="w-1/3 flex justify-end items-center">
            <Image 
              src="/pictures/logo_ethika35.png" 
              alt="Ethika35" 
              width={120} 
              height={35} 
              className="h-7 md:h-9 w-auto object-contain opacity-80"
            />
          </div>

        </div>
      </header>

      {/* CONTENIDO DEL PORTAL (HERO) */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 font-serif">
            Canal de Ética Independiente
          </h1>
          <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Bienvenido al portal de transparencia de <strong>{config.legal_name}</strong>. 
            Este espacio es operado por terceros para garantizar imparcialidad y anonimato.
          </p>
          <a 
            href={reportUrl}
            className="inline-block px-10 py-4 text-white font-bold rounded-lg shadow-xl"
            style={{ backgroundColor: primaryColor }}
          >
            Iniciar Denuncia Confidencial
          </a>
        </div>
      </section>

      {/* FOOTER MULTI-TENANT */}
      <footer className="mt-20 py-10 border-t border-slate-50 bg-slate-50 text-center">
        <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
          Seguridad y Cumplimiento por Konfidente Workforce Suite
        </p>
      </footer>
    </div>
  );
}
