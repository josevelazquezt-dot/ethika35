// 1. SSR PURO: Crítico para la arquitectura Multi-Tenant
export const dynamic = 'force-dynamic';

import React from 'react';

const LAMBDA_URL = process.env.NEXT_PUBLIC_TENANT_API_URL;
const STATIC_PICTURES_PATH = '/pictures'; 

async function getTenantConfig(slug: string) {
  if (slug.includes('.')) return null;
  try {
    const cleanUrl = LAMBDA_URL?.trim().replace(/\/$/, "");
    const fullIdentifier = `TENANT#${slug.toLowerCase()}`;
    const res = await fetch(`${cleanUrl}/?slug=${encodeURIComponent(fullIdentifier)}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}

export default async function EthikaCustomerPortal({ params }: { params: Promise<{ client_slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.client_slug;
  const tenant = await getTenantConfig(slug);

  if (!tenant || tenant.modules?.ethika35_enabled === false) {
    return <div className="p-20 text-center font-sans text-slate-400">Portal no disponible para {slug}</div>;
  }

  const { legal_name } = tenant;
  // URLs de activos (Case sensitive según tu captura: Logo_Ethika35.png)
  const clientLogoUrl = `${STATIC_PICTURES_PATH}/${slug}_logo.png`;
  const ethikaLogoUrl = `${STATIC_PICTURES_PATH}/Logo_Ethika35.png`;
  const konfidenteLogoUrl = `${STATIC_PICTURES_PATH}/Logo_Konfidente.png`;
  const reportUrl = `https://ethika35.factorintegracion.net/test?slug=${slug}`;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      
      {/* HEADER ARMÓNICO (3 SECCIONES) */}
      <header className="w-full bg-white border-b-2 border-slate-200 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-6">
          
          {/* 1. SECCIÓN IZQUIERDA: Logo Cliente */}
          <div className="w-1/3 flex justify-start">
            <img src={clientLogoUrl} alt={legal_name} className="h-10 md:h-12 w-auto object-contain max-w-[150px]" />
          </div>

          {/* 2. SECCIÓN CENTRAL: Botón Alerta (Rojo/Amarillo) */}
          <div className="w-1/3 flex justify-center">
            <a 
              href={reportUrl}
              className="relative inline-flex items-center justify-center px-6 py-3 font-black uppercase tracking-tighter text-black bg-yellow-400 rounded-lg group overflow-hidden shadow-xl border-b-4 border-red-700 active:border-b-0 active:translate-y-1 transition-all"
              style={{ background: 'linear-gradient(to right, #FACC15, #F87171)' }}
            >
              <span className="relative">INICIAR DENUNCIA</span>
            </a>
          </div>

          {/* 3. SECCIÓN DERECHA: Logo Ethika35 */}
          <div className="w-1/3 flex justify-end">
            <img src={ethikaLogoUrl} alt="Ethika35" className="h-10 md:h-12 w-auto object-contain" />
          </div>
        </div>
      </header>

      {/* CUERPO OPERATIVO */}
      <main className="flex-grow max-w-3xl mx-auto w-full px-6 py-12">
        
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
          {/* Alerta Visual Superior */}
          <div className="h-3 w-full bg-gradient-to-right from-red-600 via-yellow-500 to-red-600"></div>
          
          <div className="p-8 md:p-12">
            <h1 className="text-4xl font-black text-slate-900 mb-6 leading-tight border-b-2 border-slate-100 pb-4">
              Espacio Seguro y Confidencial
            </h1>
            
            <p className="text-xl text-slate-700 mb-8 leading-relaxed">
              En <strong className="text-black">{legal_name}</strong>, tu integridad es lo primero. Este canal <strong>NO es manejado internamente</strong>, sino por <strong className="text-red-700">BAHUMANA</strong>, un tercero independiente especializado en cumplimiento y ética.
            </p>

            <div className="bg-slate-900 text-yellow-400 p-6 rounded-xl mb-10 shadow-inner italic text-lg leading-relaxed border-l-8 border-red-600">
              "Todas las denuncias dejan evidencia legal ante el tercero para asegurar que se investiguen justamente, eliminando cualquier posibilidad de represalia o alteración de información."
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="text-red-600">●</span> OPCIONES DE REPORTE:
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
              {[
                "Acoso Laboral", "Acoso Sexual", "Sobornos / Corrupción", "Robo o Fraude", 
                "Conflicto de Intereses", "Maltrato / NOM-035", "Discriminación", "Incumplimiento de Políticas"
              ].map((item) => (
                <div key={item} className="flex items-center p-4 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-bold hover:bg-red-50 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-red-600 mr-3"></div>
                  {item}
                </div>
              ))}
            </div>

            <a 
              href={reportUrl}
              className="block w-full text-center py-6 rounded-xl text-white font-black text-2xl shadow-2xl transition-all hover:brightness-110 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #B91C1C 0%, #DC2626 100%)' }}
            >
              GENERAR REPORTE SEGURO
            </a>
          </div>
        </div>
      </main>

      {/* FOOTER FIRMA KONFIDENTE */}
      <footer className="w-full py-12 bg-white border-t border-slate-200 text-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-4">
          <img src={konfidenteLogoUrl} alt="Konfidente" className="h-4 w-auto opacity-40 grayscale" />
          <a href="https://ethika35.com" className="text-xs font-bold text-slate-400 hover:text-red-600 transition-colors tracking-widest uppercase">
            Regresar a ethika35.com
          </a>
          <p className="text-[10px] text-slate-400 mt-2">
            © 2026 Operado con absoluta confidencialidad por BAHUMANA para {legal_name}.
          </p>
        </div>
      </footer>

    </div>
  );
}
