import Image from 'next/image';
import Link from 'next/link';

/**
 * COMPONENTE: Ethika35 Marketing Page (Fase 1)
 * OBJETIVO: Posicionamiento B2B, cumplimiento LFT/NOM-035 y conversión.
 * DESARROLLADO POR: Konfidente Workforce Suite
 */

export default async function MarketingPage() {
  // --- LOGS DE CONTROL TÉCNICO ---
  console.log("[Ethika35-Log] Iniciando renderizado de la página principal B2B.");
  
  try {
    const environment = process.env.NODE_ENV;
    console.log(`[Ethika35-Log] Entorno detectado: ${environment}`);
    
    // Simulación de validación de activos en /pictures
    // Factor Integración: Asegurar que los archivos existan en public/pictures/
  } catch (error) {
    console.error("[Ethika35-Error] Fallo en la inicialización del Server Component:", error);
  }

  return (
    <div className="bg-white min-h-screen text-[#1A202C] font-sans antialiased selection:bg-[#00D09C] selection:text-white">
      
      {/* --- HEADER: ARQUITECTURA DE MARCA --- */}
      <header className="bg-white/98 backdrop-blur sticky top-0 z-[100] border-b border-gray-100 shadow-sm py-4">
        <div className="w-[90%] max-w-[1200px] mx-auto flex justify-between items-center px-4">
          <div className="flex items-center">
            <Image 
              src="/pictures/logo_ethika35.png" 
              alt="Ethika35 Logo" 
              width={180} 
              height={50} 
              className="h-12 w-auto object-contain"
              priority
            />
          </div>
          
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/faq.html" className="text-[0.9rem] font-semibold text-[#1A202C] hover:text-[#00D09C] transition-colors">
              FAQ
            </Link>
            <Link href="/expedientes.html" className="text-[0.9rem] font-semibold text-[#1A202C] hover:text-[#00D09C] transition-colors">
              Gestión de Expedientes
            </Link>
            <a href="mailto:hola@konfidente.com" className="text-[0.9rem] font-semibold text-[#1A202C] hover:text-[#00D09C] transition-colors">
              Contacto
            </a>
            <a 
              href="https://ethika35.factorintegracion.net/test" 
              className="bg-[#00D09C] text-white px-6 py-2.5 rounded shadow-lg hover:bg-[#00A37A] hover:-translate-y-0.5 transition-all font-bold text-xs uppercase tracking-widest"
            >
              Hacer un Reporte
            </a>
          </nav>
        </div>
      </header>

      {/* --- HERO: PROPUESTA DE VALOR BLINDADA --- */}
      <section className="bg-[#F0FDF4] py-24 md:py-32 border-b border-[#00D09C]/10 text-center">
        <div className="w-[90%] max-w-[1000px] mx-auto px-4">
          <span className="inline-block bg-[#00D09C]/10 text-[#00A37A] text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-8">
            Cumplimiento LFT & NOM-035
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-8 leading-tight text-[#1A202C]">
            Transparencia Corporativa.<br/>
            <span className="text-[#00D09C]">Cero Conflictos de Interés.</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#718096] font-light max-w-3xl mx-auto mb-12">
            Un canal robusto y completamente independiente para reportar conductas poco éticas o ilegales. Protegemos a tu empresa y a tu gente con el más alto estándar de confidencialidad.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a 
              href="https://ethika35.factorintegracion.net/test" 
              className="w-full sm:w-auto bg-[#00D09C] text-white px-10 py-4 rounded font-bold shadow-xl hover:bg-[#00A37A] hover:scale-105 transition-all text-lg"
            >
              Iniciar Reporte Confidencial
            </a>
            <Link 
              href="/faq.html" 
              className="w-full sm:w-auto bg-white text-[#00D09C] border-2 border-[#00D09C] px-10 py-4 rounded font-bold hover:bg-[#F0FDF4] transition-all text-lg"
            >
              ¿Cómo funciona?
            </Link>
          </div>
        </div>
      </section>

      {/* --- MISIÓN & RESPALDO ESPECIALIZADO --- */}
      <section className="py-24 bg-white">
        <div className="w-[90%] max-w-[1100px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="font-serif text-4xl font-bold text-[#1A202C] relative">
              Nuestra Misión
              <div className="w-20 h-1.5 bg-[#F59E0B] mt-4 rounded-full"></div>
            </h2>
            <p className="text-lg text-[#4A5568] leading-relaxed">
              Proveer un canal robusto y completamente independiente para reportar conductas poco éticas, ilegales o inconsistentes con los estándares profesionales de tu organización.
            </p>
            <p className="text-lg text-[#4A5568] leading-relaxed">
              Garantizamos <strong>total anonimato</strong> (donde la ley lo permita). Nuestro sistema está diseñado para proteger la identidad del informante: sin identificador de llamadas, sin rastreo de IPs y sin grabaciones de voz no autorizadas.
            </p>
          </div>
          
          <div className="bg-white p-8 md:p-12 rounded-2xl border border-gray-100 shadow-2xl relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#00D09C] transition-all group-hover:w-3"></div>
            <h3 className="font-serif text-2xl font-bold mb-8">El Respaldo de Especialistas</h3>
            <ul className="space-y-6">
              <li className="flex items-start">
                <span className="text-2xl mr-4">🛡️</span>
                <div>
                  <h4 className="font-bold">Gestión Independiente</h4>
                  <p className="text-sm text-[#718096]">Operado por el equipo de especialistas de <strong>BAHUMANA</strong>.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-4">🛡️</span>
                <div>
                  <h4 className="font-bold">Máxima Discreción</h4>
                  <p className="text-sm text-[#718096]">Cada reporte es manejado con rigor y profesionalismo desde su recepción.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-4">🛡️</span>
                <div>
                  <h4 className="font-bold">Escalación Directa</h4>
                  <p className="text-sm text-[#718096]">Reportes filtrados y entregados directamente al Consejo de Administración.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-4">🛡️</span>
                <div>
                  <h4 className="font-bold">Imparcialidad Absoluta</h4>
                  <p className="text-sm text-[#718096]">Garantizamos un proceso libre de conflictos de interés internos.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* --- IMPACTO & CULTURA: ECOSISTEMA KIMIA --- */}
      <section className="py-24 bg-[#FAFBFC] border-t border-gray-100 text-center">
        <div className="w-[90%] max-w-[900px] mx-auto px-4">
          <h2 className="font-serif text-4xl font-bold mb-8">Impacto y Cultura Organizacional</h2>
          <p className="text-xl text-[#718096] mb-12">
            No solo recibimos reportes; transformamos datos en estrategias. Realizamos análisis profundos para medir el efecto de tus prácticas empresariales en el clima laboral, el bienestar y la adhesión a los principios éticos.
          </p>
          <div className="inline-flex flex-col md:flex-row items-center bg-white p-6 rounded-2xl shadow-lg border border-[#00D09C]/20 gap-4">
            <span className="bg-[#00D09C] text-white px-4 py-1 rounded text-[10px] font-black uppercase">Plus</span>
            <p className="font-medium">Integración nativa con <strong>Pulso35</strong> para fortalecer una cultura de respeto.</p>
          </div>
        </div>
      </section>

      {/* --- FOOTER: SELLO CORPORATIVO --- */}
      <footer className="bg-[#F7FAFC] border-t border-gray-200 py-16 text-center">
        <div className="w-[90%] max-w-[1100px] mx-auto px-4">
          <div className="mb-12">
            <Image 
              src="/pictures/logo_ethika35.png" 
              alt="Ethika35 Logo" 
              width={140} 
              height={40} 
              className="mx-auto grayscale hover:grayscale-0 transition-all opacity-70"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-sm text-[#718096] mb-16">
            <div className="space-y-4">
              <h5 className="font-bold text-[#1A202C]">Recursos</h5>
              <ul className="space-y-2">
                <li><Link href="/faq.html" className="hover:text-[#00D09C]">Preguntas Frecuentes</Link></li>
                <li><Link href="/expedientes.html" className="hover:text-[#00D09C]">Portal de Expedientes</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="font-bold text-[#1A202C]">Legal</h5>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#00D09C]">Aviso de Privacidad</a></li>
                <li><a href="#" className="hover:text-[#00D09C]">Términos y Condiciones</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="font-bold text-[#1A202C]">Comunidad</h5>
              <a 
                href="https://www.linkedin.com/company/konfidente" 
                target="_blank" 
                className="group inline-block"
              >
                <Image 
                  src="/pictures/qr_linkedin.png" 
                  alt="QR LinkedIn" 
                  width={80} 
                  height={80} 
                  className="rounded-lg border-2 border-slate-200 group-hover:border-[#00D09C] transition-all mb-2"
                />
                <p className="font-bold group-hover:text-[#00D09C]">LinkedIn</p>
              </a>
            </div>
          </div>

          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Konfidente Workforce Suite - Ethika35. Todos los derechos reservados.
          </p>
        </div>
      </footer>

    </div>
  );
}
