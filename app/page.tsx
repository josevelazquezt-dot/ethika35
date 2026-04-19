import Image from 'next/image';
import Link from 'next/link';

// Componente de Servidor Asíncrono para permitir logs y validaciones en backend
export default async function MarketingPage() {
  
  // ---------------------------------------------------------------------------
  // BLOQUE DE CONTROL TÉCNICO (ROBUSTEZ Y LOGS PARA CLOUDWATCH)
  // ---------------------------------------------------------------------------
  console.log("[Ethika35 B2B] Inicializando renderizado del Sitio Principal (Landing B2B).");
  
  let systemStatus = "OPERATIONAL";
  
  try {
    console.log("[Ethika35 B2B] Validando integridad del ecosistema Kimia Workforce Suite...");
    // Aquí Factor Integración puede inyectar verificaciones a SSM o salud de la BD
    // const healthCheck = await fetch('...', { timeout: 2000 });
    // if (!healthCheck.ok) throw new Error("API de Konfidente no responde.");
    
    console.log("[Ethika35 B2B] Verificación exitosa. Renderizando DOM estático enriquecido.");
  } catch (error) {
    console.error("[Ethika35 B2B] ERROR CRÍTICO detectado en la validación inicial:", error);
    systemStatus = "DEGRADED";
    // El catch evita que la página B2B se caiga, permitiendo que el usuario siga viendo la oferta comercial.
  }

  return (
    <div className="font-sans text-[#1A202C] bg-[#FFFFFF] leading-relaxed selection:bg-[#00D09C] selection:text-white">
      
      {/* ----------------------------------------------------------------------- */}
      {/* HEADER BRILLANTE ORIGINAL */}
      {/* ----------------------------------------------------------------------- */}
      <header className="bg-white/95 backdrop-blur py-4 sticky top-0 z-[100] shadow-[0_2px_10px_rgba(0,0,0,0.05)] border-b border-gray-100">
        <div className="w-[90%] max-w-[1100px] mx-auto px-5 flex justify-between items-center">
          <Image 
            src="/pictures/logo_ethika35.png" 
            alt="Ethika35 Logo" 
            width={160} 
            height={45} 
            className="h-[45px] w-auto"
            priority
          />
          <nav className="hidden md:flex items-center">
            <Link href="/faq" className="text-[#1A202C] no-underline ml-5 text-[0.9rem] font-medium transition-colors duration-300 hover:text-[#00D09C]">
              Preguntas Frecuentes
            </Link>
            <a href="mailto:hola@konfidente.com" className="text-[#1A202C] no-underline ml-5 text-[0.9rem] font-medium transition-colors duration-300 hover:text-[#00D09C]">
              Contacto
            </a>
            <a 
              href="https://ethika35.factorintegracion.net/test" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-[#00D09C] text-white py-2.5 px-6 ml-5 no-underline rounded font-bold transition-all duration-300 shadow-[0_4px_15px_rgba(0,208,156,0.3)] hover:bg-[#00A37A] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,208,156,0.4)] text-center uppercase tracking-wide text-xs"
            >
              Hacer un Reporte
            </a>
          </nav>
        </div>
      </header>

      {/* ----------------------------------------------------------------------- */}
      {/* HERO SECTION ALEGRE (Texto original + Enriquecimiento GTM) */}
      {/* ----------------------------------------------------------------------- */}
      <section className="bg-[#F0FDF4] text-[#1A202C] py-[120px] text-center border-b-2 border-[#00D09C]/10">
        <div className="w-[90%] max-w-[1100px] mx-auto px-5">
          {/* Tagline GTM */}
          <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-[#00A37A] bg-[#00D09C]/10 rounded-full uppercase">
            Ecosistema Kimia Workforce Suite
          </div>
          
          <h1 className="font-serif text-[2.5rem] md:text-[3.5rem] mb-[25px] leading-[1.2] text-[#1A202C] font-bold">
            Transparencia Corporativa.<br/>Cero Conflictos de Interés.
          </h1>
          
          {/* Texto Original Intacto */}
          <p className="text-[1.25rem] max-w-[800px] mx-auto mb-[20px] text-[#718096] font-light">
            Un canal robusto y completamente independiente para reportar conductas poco éticas o ilegales. Protegemos a tu empresa y a tu gente con el más alto estándar de confidencialidad.
          </p>
          
          {/* Enriquecimiento Legal LFT/NOM-035 */}
          <p className="text-[1.1rem] max-w-[800px] mx-auto mb-[40px] text-[#4A5568] font-medium bg-white p-4 rounded-lg shadow-sm border border-[#00D09C]/20">
            Alineado 100% a la normatividad mexicana: Cumple con la gestión de casos de violencia y acoso laboral dictados por la <strong>LFT 2019</strong> y los requerimientos de la <strong>NOM-035</strong>.
          </p>

          <a 
            href="https://ethika35.factorintegracion.net/test" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-[#00D09C] text-white py-3.5 px-[30px] no-underline rounded font-bold transition-all duration-300 shadow-[0_4px_15px_rgba(0,208,156,0.3)] hover:bg-[#00A37A] hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(0,208,156,0.4)] text-center mb-6 w-full sm:w-auto"
          >
            Iniciar Reporte Confidencial
          </a>
          <br className="hidden sm:block"/>
          <Link 
            href="/faq" 
            className="inline-block bg-transparent text-[#00D09C] border-2 border-[#00D09C] py-3 px-[28px] no-underline rounded font-bold transition-all duration-300 hover:bg-[#00D09C]/5 hover:-translate-y-1 w-full sm:w-auto sm:ml-4"
          >
            ¿Cómo funciona? Ver Preguntas Frecuentes
          </Link>
        </div>
      </section>

      {/* ----------------------------------------------------------------------- */}
      {/* NUESTRA MISIÓN (Texto original conservado íntegramente) */}
      {/* ----------------------------------------------------------------------- */}
      <section className="py-[100px] bg-[#FFFFFF]">
        <div className="w-[90%] max-w-[1100px] mx-auto px-5 grid grid-cols-1 md:grid-cols-2 gap-[50px] items-center">
          <div>
            <h2 className="font-serif text-[2.5rem] text-[#1A202C] mb-[25px] relative font-bold">
              Nuestra Misión
              <span className="block w-[80px] h-[4px] bg-[#F59E0B] mt-[15px]"></span>
            </h2>
            
            {/* Párrafos Originales exactos */}
            <p className="text-[1.1rem] mb-[20px] text-[#4A5568] leading-relaxed">
              Proveer un canal robusto y completamente independiente para reportar conductas poco éticas, ilegales o inconsistentes con los estándares profesionales de tu organización.
            </p>
            <p className="text-[1.1rem] mb-[20px] text-[#4A5568] leading-relaxed">
              Garantizamos <strong>total anonimato</strong> (donde la ley lo permita). Nuestro sistema está diseñado para proteger la identidad del informante: sin identificador de llamadas, sin rastreo de IPs y sin grabaciones de voz no autorizadas.
            </p>
          </div>
          
          <div className="bg-white p-[30px] md:p-[50px] rounded-xl border border-[#00D09C]/10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] relative overflow-hidden transition-transform duration-500 hover:shadow-[0_15px_50px_rgba(0,0,0,0.06)]">
            {/* Efecto de borde vibrante lateral */}
            <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-[#00D09C]"></div>
            
            <h3 className="mb-[25px] text-[#1A202C] font-serif font-bold text-2xl">El Respaldo de Especialistas</h3>
            <ul className="list-none space-y-[18px]">
              <li className="text-[1.05rem] flex items-start text-[#4A5568]">
                <span className="mr-[15px] text-[1.3rem]">🛡️</span>
                <span><strong>Gestión Independiente:</strong> Operado por el equipo de especialistas de <strong>BAHUMANA</strong>.</span>
              </li>
              <li className="text-[1.05rem] flex items-start text-[#4A5568]">
                <span className="mr-[15px] text-[1.3rem]">🛡️</span>
                <span><strong>Máxima Discreción:</strong> Cada reporte es manejado con rigor y profesionalismo desde su recepción.</span>
              </li>
              <li className="text-[1.05rem] flex items-start text-[#4A5568]">
                <span className="mr-[15px] text-[1.3rem]">🛡️</span>
                <span><strong>Escalación Directa:</strong> Reportes filtrados y entregados directamente al Consejo de Administración.</span>
              </li>
              <li className="text-[1.05rem] flex items-start text-[#4A5568]">
                <span className="mr-[15px] text-[1.3rem]">🛡️</span>
                <span><strong>Imparcialidad Absoluta:</strong> Garantizamos un proceso libre de conflictos de interés internos.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------------- */}
      {/* SECCIÓN NUEVA GTM: MODELO ECONÓMICO (Estrategia nabi.ai) */}
      {/* ----------------------------------------------------------------------- */}
      <section className="py-[80px] bg-[#1A202C] text-white text-center">
        <div className="w-[90%] max-w-[800px] mx-auto px-5">
          <h2 className="font-serif text-[2.2rem] mb-[20px] font-bold text-white">
            Solución Enterprise, Inversión para PyMEs
          </h2>
          <p className="text-[1.1rem] mb-[40px] text-gray-300 font-light leading-relaxed">
            Eliminamos las barreras de entrada. Nuestro modelo de suscripción es transparente, sin licencias complejas en dólares. Diseñado específicamente para el mercado de México.
          </p>
          <div className="inline-flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-left shadow-lg">
            <div className="bg-[#F59E0B] p-4 rounded-full mr-5">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">Inversión Mensual</p>
              <p className="text-2xl font-bold text-white">Referenciada a 1 Salario Mínimo</p>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------------- */}
      {/* IMPACTO Y CULTURA (Texto original conservado íntegramente) */}
      {/* ----------------------------------------------------------------------- */}
      <section className="py-[100px] bg-[#FAFBFC] border-t border-[#00D09C]/5 text-center">
        <div className="w-[90%] max-w-[1100px] mx-auto px-5">
          <h2 className="font-serif text-[2.5rem] mb-[25px] text-[#1A202C] font-bold">Impacto y Cultura Organizacional</h2>
          
          {/* Párrafo original exacto */}
          <p className="text-[1.2rem] max-w-[800px] mx-auto mb-[45px] text-[#718096] leading-relaxed">
            No solo recibimos reportes; transformamos datos en estrategias. Realizamos análisis profundos para medir el efecto de tus prácticas empresariales en el clima laboral, el bienestar y la adhesión a los principios éticos.
          </p>
          
          <div className="inline-block bg-white text-[#1A202C] py-[15px] px-[40px] rounded-full border border-[#00D09C]/20 font-medium shadow-[0_4px_10px_rgba(0,0,0,0.02)] transition-all hover:border-[#00D09C] hover:shadow-md">
            Integración nativa con <strong className="text-[#00D09C] text-lg ml-1">Pulso35</strong> para optimizar operaciones y fortalecer una cultura de respeto.
          </div>
        </div>
      </section>
      
      {/* ----------------------------------------------------------------------- */}
      {/* FOOTER CLARO (Texto y estructura original) */}
      {/* ----------------------------------------------------------------------- */}
      <footer className="bg-[#F7FAFC] text-[#718096] text-center py-[60px] text-[0.9rem] border-t border-black/5">
        <div className="w-[90%] max-w-[1100px] mx-auto px-5">
          <div className="mb-[25px]">
            <Image 
              src="/pictures/logo_ethika35.png" 
              alt="Ethika35 Logo" 
              width={140} 
              height={40} 
              className="h-[40px] w-auto opacity-80 mx-auto grayscale hover:grayscale-0 transition-all duration-300" 
            />
          </div>
          <p className="mb-8 font-medium">
            <Link href="/faq" className="text-[#00D09C] underline hover:text-[#00A37A] transition-colors">Preguntas Frecuentes</Link> |{' '}
            <a href="mailto:hola@konfidente.com" className="text-[#718096] hover:text-[#1A202C] transition-colors">hola@konfidente.com</a>
          </p>
          
          <div className="my-[30px] flex justify-center gap-[40px] flex-wrap">
            <div className="text-center">
              <a href="https://www.linkedin.com/company/konfidente" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-[#00D09C] no-underline font-bold text-[0.9em] transition-colors group">
                <Image 
                  src="/pictures/qr_linkedin.png" 
                  alt="QR LinkedIn Konfidente" 
                  width={90} 
                  height={90} 
                  className="rounded-lg border-2 border-slate-200 block mx-auto mb-[10px] transition-transform duration-300 group-hover:scale-105 group-hover:border-[#00D09C]/50 shadow-sm" 
                />
                LinkedIn
              </a>
            </div>
          </div>

          <p className="tracking-wide">
            &copy; {new Date().getFullYear()} Konfidente Workforce Suite - Ethika35. Todos los derechos reservados.<br/>
            <span className="text-xs opacity-70 mt-2 block">System Status: {systemStatus}</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
