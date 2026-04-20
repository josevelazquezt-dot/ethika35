// 1. FUERZA SSR PURO: Crítico para la arquitectura Multi-Tenant
export const dynamic = 'force-dynamic';

import React from 'react';

const LAMBDA_URL = process.env.NEXT_PUBLIC_TENANT_API_URL;
const STATIC_PICTURES_PATH = '/pictures'; 

async function getTenantConfig(slug: string) {
  if (slug.includes('.')) return null;
  
  if (!LAMBDA_URL || LAMBDA_URL.includes('NEXT_PUBLIC_')) {
    console.error("Error crítico: LAMBDA_URL no configurada.");
    return { debug_error: "Falta la configuración de NEXT_PUBLIC_TENANT_API_URL." };
  }
  
  try {
    const cleanUrl = LAMBDA_URL.trim().replace(/\/$/, "");
    const fullIdentifier = `TENANT#${slug.toLowerCase()}`;
    
    const res = await fetch(`${cleanUrl}/?slug=${encodeURIComponent(fullIdentifier)}`, { 
      cache: 'no-store' 
    });
    
    if (!res.ok) return { debug_error: `La Lambda respondió con error ${res.status}.` };
    
    return await res.json();
  } catch (error: any) {
    return { debug_error: `No se pudo conectar con la Lambda: ${error.message}` };
  }
}

export default async function EthikaCustomerPortal({ params }: { params: Promise<{ client_slug: string }> }) {
  
  const resolvedParams = await params;
  const slug = resolvedParams.client_slug;

  if (!slug) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100 p-6">
        <p className="text-red-700 font-bold">Error: No se detectó slug en la URL.</p>
      </div>
    );
  }

  const tenant = await getTenantConfig(slug);

  // Manejo de errores de arquitectura (igual que Pulso35)
  if (tenant && tenant.debug_error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-red-50 text-red-800 font-sans">
        <h1 className="text-3xl font-bold mb-4">Error de Arquitectura</h1>
        <code className="bg-slate-800 text-white p-4 rounded shadow-lg">{tenant.debug_error}</code>
      </div>
    );
  }

  // Validación de módulo activo y existencia
  if (!tenant || !tenant.branding || tenant.modules?.ethika35_enabled === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 font-sans">
         <div className="text-center">
            <h1 className="text-2xl font-semibold text-slate-400">Canal no configurado</h1>
            <p className="text-slate-500">El portal para <span className="font-bold">"{slug}"</span> no está disponible.</p>
         </div>
      </div>
    );
  }

  const { branding, legal_name } = tenant;
  const primaryColor = branding.primary_color || '#00D09C';

  // URLs de activos
  const clientLogoUrl = `${STATIC_PICTURES_PATH}/${slug}_logo.png`;
  const ethikaLogoUrl = `${STATIC_PICTURES_PATH}/logo_ethika35.png`;
  const konfidenteLogoUrl = `${STATIC_PICTURES_PATH}/logo_konfidente.png`;
  const reportUrl = `https://ethika35.factorintegracion.net/test?slug=${slug}`;

  return (
    <div 
      className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans selection:bg-[#00D09C] selection:text-white"
      style={{ '--color-primary': primaryColor } as React.CSSProperties}
    >

      {/* HEADER 3 SECCIONES: Arquitectura Rígida Pulso35 */}
      <header className="w-full h-16 md:h-20 px-4 md:px-10 bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="w-full h-full max-w-7xl mx-auto flex flex-row items-center justify-between">
          
          {/* 1. Logo Cliente */}
          <div className="w-1/3 flex items-center justify-start overflow-hidden">
            <img src={clientLogoUrl} alt={legal_name} className="h-6 md:h-9 w-auto object-contain max-w-[120px] md:max-w-full" />
          </div>

          {/* 2. Botón de Denuncia Central */}
          <div className="w-1/3 flex items-center justify-center">
            <a 
              href={reportUrl}
              className="text-[10px] md:text-xs font-black px-4 md:px-8 py-2 md:py-3 rounded shadow-lg transition-transform hover:scale-105 uppercase tracking-widest text-white"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              Iniciar Denuncia
            </a>
          </div>

          {/* 3. Logo Ethika35 */}
          <div className="w-1/3 flex items-center justify-end overflow-hidden">
            <img src={ethikaLogoUrl} alt="Ethika35" className="h-5 md:h-8 w-auto object-contain opacity-90" />
          </div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL: Foco en Seguridad y BAHUMANA */}
      <main className="flex-grow max-w-4xl mx-auto w-full px-6 py-10 md:py-16">
        
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          {/* Cintillo de Seguridad */}
          <div className="h-2 w-full" style={{ backgroundColor: 'var(--color-primary)' }}></div>
          
          <div className="p-8 md:p-12">
            <div className="text-5xl mb-6">🛡️</div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight font-serif">
              Espacio Seguro y Confidencial
            </h1>
            
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              En <strong className="text-slate-800">{legal_name}</strong>, tu seguridad es lo más importante. Este canal <strong>NO es manejado internamente por la empresa</strong>, sino por <strong className="text-slate-800">BAHUMANA</strong>, un tercero independiente especializado.
            </p>

            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-10 text-slate-700 text-sm md:text-base italic">
              "Todas las denuncias dejan evidencia legal ante el tercero para asegurar que se investiguen justamente, eliminando cualquier posibilidad de represalia o alteración de información."
            </div>

            <h2 className="text-xl font-bold text-slate-900 mb-6 uppercase tracking-wider">Opciones de Reporte:</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-sm">
              {[
                "Acoso Laboral", "Acoso Sexual", "Sobornos", "Robo o Fraude", 
                "Conflicto de Intereses", "Maltrato / NOM-035", "Discriminación", "Uso de Sustancias"
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 font-semibold text-slate-700">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }}></div>
                  {item}
                </div>
              ))}
            </div>

            <a 
              href={reportUrl}
              className="block w-full text-center py-5 rounded-2xl text-white font-bold text-xl shadow-2xl transition-all hover:-translate-y-1"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              Iniciar Denuncia Segura
            </a>
          </div>
        </div>

        {/* Detalles de Seguridad Extra */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/50 p-6 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-slate-800 mb-2">Evidencia Resguardada</h4>
            <p className="text-xs text-slate-500">Al enviar tu reporte, BAHUMANA resguarda la evidencia de forma externa para evitar que sea borrada por la organización.</p>
          </div>
          <div className="bg-white/50 p-6 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-slate-800 mb-2">Anonimato Garantizado</h4>
            <p className="text-xs text-slate-500">Nuestro sistema cumple con los más altos estándares de privacidad. Nadie dentro de la empresa sabrá quién eres.</p>
          </div>
        </div>
      </main>

      {/* FOOTER: Conexión con el Sitio Principal */}
      <footer className="w-full py-12 bg-white border-t border-slate-100 text-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-4">
          <img src={konfidenteLogoUrl} alt="Konfidente" className="h-3 md:h-4 w-auto grayscale opacity-40" />
          <a href="https://ethika35.com" className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest">
            Visitar ethika35.com
          </a>
          <p className="text-[10px] text-slate-400 mt-2">
            © 2026 Operado con absoluta confidencialidad por BAHUMANA para {legal_name}.
          </p>
        </div>
      </footer>

    </div>
  );
}
