import { notFound } from 'next/navigation';
import Image from 'next/image';

// 1. FORZADO SSR: Obligatorio para la arquitectura Multi-Tenant de Konfidente
export const dynamic = 'force-dynamic';

// 2. FETCH AL BACKEND (LAMBDA -> DYNAMODB)
async function getTenantConfig(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_TENANT_API_URL}?slug=${encodeURIComponent(slug)}`, {
      cache: 'no-store', // Garantiza que los cambios de marca sean en tiempo real
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error fetching tenant config:", error);
    return null;
  }
}

export default async function EthikaPage({ params }: { params: { client_slug: string } }) {
  const { client_slug } = params;
  const config = await getTenantConfig(client_slug);

  // 3. VALIDACIÓN DE NEGOCIO (ESCUDO COMERCIAL)
  // Si el cliente no existe o no tiene contratado el módulo de Ética, mostramos error 404
  if (!config || !config.modules?.ethika35_enabled) {
    return notFound();
  }

  // 4. EXTRACCIÓN DE BRANDING
  const primaryColor = config.branding?.primary_color || '#00D09C';
  const secondaryColor = config.branding?.secondary_color || '#F59E0B'; // Dorado institucional
  const legalName = config.legal_name || 'Nuestra Organización';
  const logoUrl = config.branding?.logo_key 
    ? `https://konfidentecustomers.s3.amazonaws.com/${config.branding.logo_key}`
    : '/pictures/logo_ethika35.png'; // Fallback a logo de Ethika

  // 5. URL DEL CANAL DE DENUNCIA (ENRUTAMIENTO DINÁMICO AL FORMULARIO)
  const reportUrl = `https://ethika35.factorintegracion.net/test?tenant=${client_slug}`;

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      
      {/* HEADER DINÁMICO */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur shadow-sm py-4">
        <div className="container mx-auto px-6 w-full max-w-6xl flex justify-between items-center">
          <div className="w-1/3">
            {/* Logo del Cliente o de Ethika35 si es White-label puro */}
            <Image 
              src={logoUrl} 
              alt={`Logo de ${legalName}`} 
              width={180} 
              height={45} 
              className="max-h-12 w-auto object-contain"
            />
          </div>
          
          <nav className="hidden md:flex items-center justify-end w-2/3 space-x-6">
            <a href="/faq" className="text-sm font-medium hover:text-slate-500 transition-colors">
              Preguntas Frecuentes
            </a>
            <a href="mailto:hola@konfidente.com" className="text-sm font-medium hover:text-slate-500 transition-colors">
              Contacto
            </a>
            <a 
              href={reportUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 py-2 text-white text-sm font-bold rounded shadow-md transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: primaryColor }}
            >
              Hacer un Reporte
            </a>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="bg-slate-50 py-24 text-center border-b border-slate-100 px-6">
        <div className="container mx-auto max-w-4xl">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-slate-900 leading-tight">
            Transparencia Corporativa en <br className="hidden md:block"/> {legalName}.
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-light mb-10 max-w-2xl mx-auto">
            Un canal robusto y completamente independiente para reportar conductas poco éticas, acoso (LFT) o riesgos psicosociales (NOM-035). Protegemos a tu empresa y a tu gente con el más alto estándar de confidencialidad.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a 
              href={reportUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-3 text-white font-bold rounded shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl w-full sm:w-auto"
              style={{ backgroundColor: primaryColor }}
            >
              Iniciar Reporte Confidencial
            </a>
            <a 
              href="/faq" 
              className="px-8 py-3 font-bold rounded border-2 transition-all hover:-translate-y-1 w-full sm:w-auto bg-transparent"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              ¿Cómo funciona?
            </a>
          </div>
        </div>
      </section>

      {/* MISIÓN & ESCUDO */}
      <section className="py-24 bg-white px-6">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-6 relative">
              Nuestra Misión
              <span 
                className="block w-20 h-1 mt-4 rounded" 
                style={{ backgroundColor: secondaryColor }}
              ></span>
            </h2>
            <p className="text-slate-600 text-lg mb-6 leading-relaxed">
              Proveer a <strong>{legalName}</strong> de un canal robusto y completamente independiente para reportar conductas poco éticas, ilegales o inconsistentes con los estándares profesionales.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed">
              Garantizamos <strong>total anonimato</strong>. Nuestro sistema está diseñado para proteger la identidad del informante: sin identificador de llamadas, sin rastreo de IPs y sin grabaciones de voz no autorizadas, cumpliendo estrictamente con la normatividad mexicana.
            </p>
          </div>
          
          <div className="bg-white p-8 md:p-10 rounded-xl border border-slate-100 shadow-2xl relative overflow-hidden">
            {/* Barra lateral de color dinámico */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: primaryColor }}></div>
            
            <h3 className="text-2xl font-bold text-slate-900 mb-6">El Respaldo de Especialistas</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="mr-3 text-xl">🛡️</span>
                <span className="text-slate-700"><strong>Gestión Independiente:</strong> Operado por el equipo de especialistas de <strong>BAHUMANA</strong>.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-xl">🛡️</span>
                <span className="text-slate-700"><strong>Máxima Discreción:</strong> Cada reporte es manejado con rigor y profesionalismo.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-xl">🛡️</span>
                <span className="text-slate-700"><strong>Escalación Directa:</strong> Reportes filtrados y entregados al Comité de Ética.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-xl">🛡️</span>
                <span className="text-slate-700"><strong>Imparcialidad Absoluta:</strong> Garantizamos un proceso libre de conflictos de interés.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* IMPACTO Y CULTURA */}
      <section className="py-24 bg-slate-50 border-t border-slate-100 text-center px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Impacto y Cultura Organizacional
          </h2>
          <p className="text-lg text-slate-500 mb-10 max-w-3xl mx-auto">
            No solo recibimos reportes; transformamos datos en estrategias. Realizamos análisis profundos para medir el efecto de tus prácticas empresariales en el clima laboral, el bienestar y la adhesión a los principios éticos.
          </p>
          
          <div className="inline-block bg-white text-slate-800 px-8 py-4 rounded-full border border-slate-200 shadow-sm font-medium">
            Integración nativa con <strong style={{ color: primaryColor }}>Pulso35</strong> para optimizar operaciones y fortalecer una cultura de respeto.
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-100 text-slate-500 text-center py-12 border-t border-slate-200 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="flex justify-center mb-6 opacity-60 grayscale hover:grayscale-0 transition-all">
            <Image 
              src="/pictures/logo_ethika35.png" 
              alt="Ethika35 Logo" 
              width={120} 
              height={30} 
              className="h-8 w-auto"
            />
          </div>
          
          <div className="mb-8 space-x-4">
            <a href="/faq" className="hover:underline transition-colors" style={{ color: primaryColor }}>Preguntas Frecuentes</a>
            <span>|</span>
            <a href="mailto:hola@konfidente.com" className="hover:text-slate-800 transition-colors">hola@konfidente.com</a>
          </div>

          <p className="text-sm">
            &copy; {new Date().getFullYear()} Konfidente Workforce Suite - Ethika35. Operando para <strong>{legalName}</strong>. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
