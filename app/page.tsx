import Image from 'next/image';
import Link from 'next/link';

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-900 selection:text-white">
      
      {/* --- HEADER EJECUTIVO --- */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-4">
        <div className="container mx-auto px-6 max-w-6xl flex justify-between items-center">
          <div className="flex items-center">
            {/* Logo de Ethika35 */}
            <Image 
              src="/pictures/logo_ethika35.png" 
              alt="Ethika35 Logo" 
              width={160} 
              height={40} 
              className="h-9 w-auto"
              priority
            />
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#solucion" className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors">
              La Solución
            </Link>
            <Link href="#normatividad" className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors">
              Cumplimiento LFT / NOM-035
            </Link>
            <Link href="#operacion" className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors">
              Operación Bahumana
            </Link>
            <a 
              href="mailto:hola@konfidente.com" 
              className="px-6 py-2.5 bg-blue-900 text-white text-sm font-semibold rounded-md shadow-md hover:bg-blue-800 transition-all hover:-translate-y-0.5"
            >
              Agendar Demo
            </a>
          </nav>
        </div>
      </header>

      {/* --- HERO SECTION (Foco en el dolor del Director/RH) --- */}
      <section className="bg-white py-24 border-b border-slate-200">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-wide text-blue-800 bg-blue-100 rounded-full uppercase">
            Parte de Kimia Workforce Suite
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 leading-tight">
            Transparencia Corporativa.<br />
            <span className="text-blue-800">Cero Riesgos Legales.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-light mb-10 max-w-3xl mx-auto leading-relaxed">
            El motor de ética y cumplimiento diseñado para la empresa mexicana. Gestiona denuncias por acoso laboral, conflictos de interés y asegura el cumplimiento de la <strong>LFT 2019</strong> y la <strong>NOM-035</strong> con total independencia y confidencialidad.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a 
              href="mailto:hola@konfidente.com?subject=Solicitud de Demo - Ethika35" 
              className="px-8 py-3.5 bg-blue-900 text-white font-semibold rounded-md shadow-lg transition-all hover:bg-blue-800 hover:-translate-y-1 hover:shadow-xl w-full sm:w-auto"
            >
              Proteger mi empresa hoy
            </a>
            <Link 
              href="#modelo" 
              className="px-8 py-3.5 text-blue-900 font-semibold rounded-md border-2 border-blue-900 transition-all hover:bg-blue-50 hover:-translate-y-1 w-full sm:w-auto"
            >
              Ver modelo económico
            </Link>
          </div>
        </div>
      </section>

      {/* --- MISIÓN & PROPUESTA DE VALOR BLINDADA --- */}
      <section id="solucion" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-6 relative">
              Protección y Cumplimiento Integral
              <span className="block w-16 h-1.5 mt-4 bg-amber-500 rounded-full"></span>
            </h2>
            <p className="text-slate-600 text-lg mb-6 leading-relaxed">
              A diferencia de buzones internos genéricos, Ethika35 provee un canal de denuncias <strong>completamente independiente (tercerizado)</strong>, erradicando el conflicto de interés interno y garantizando la confianza de tus colaboradores.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed">
              La plataforma asegura <strong>anonimato total</strong>, cifrado de datos y trazabilidad absoluta para Dirección General y el Comité de Ética, blindando a la organización contra multas de la STPS y daño reputacional.
            </p>
          </div>
          
          {/* Tarjeta de Escudo / Características */}
          <div className="bg-white p-8 md:p-10 rounded-xl border border-slate-200 shadow-xl relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-blue-900"></div>
            
            <h3 className="text-2xl font-bold text-slate-900 mb-8">El Respaldo de Especialistas</h3>
            <ul className="space-y-5">
              <li className="flex items-start">
                <span className="mr-4 text-2xl">⚖️</span>
                <div>
                  <strong className="block text-slate-900">Gestión por BAHUMANA</strong>
                  <span className="text-slate-600 text-sm">Operación e investigación experta de casos, fuera de tu nómina.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-4 text-2xl">🔒</span>
                <div>
                  <strong className="block text-slate-900">Cumplimiento LFT y NOM-035</strong>
                  <span className="text-slate-600 text-sm">Protocolos listos para casos de violencia laboral, acoso y riesgo psicosocial.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-4 text-2xl">📊</span>
                <div>
                  <strong className="block text-slate-900">Reportes Ejecutivos</strong>
                  <span className="text-slate-600 text-sm">Datos claros, accionables y listos para presentar al Consejo de Administración.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* --- MODELO ECONÓMICO (1 SMN) --- */}
      <section id="modelo" className="py-20 bg-blue-900 text-white text-center px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            Software de Clase Mundial, Accesible para la PyME
          </h2>
          <p className="text-blue-200 text-lg mb-10 max-w-2xl mx-auto">
            Olvídate de licencias complejas en dólares. Nuestro modelo de suscripción es transparente, predecible y está referenciado a la economía mexicana.
          </p>
          
          <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-lg text-left">
            <div className="flex items-center space-x-4">
              <div className="bg-amber-500 text-white p-3 rounded-full">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div>
                <p className="text-sm text-blue-200 uppercase tracking-wide font-semibold">Inversión Mensual</p>
                <p className="text-2xl font-bold">Referenciada a 1 Salario Mínimo (Zona Centro)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- IMPACTO Y CULTURA (Cross-selling con Pulso35) --- */}
      <section className="py-24 bg-white border-t border-slate-200 text-center px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Ecosistema Kimia Workforce
          </h2>
          <p className="text-lg text-slate-600 mb-10 max-w-3xl mx-auto">
            Ethika35 no es una herramienta aislada. Se integra de forma nativa con nuestra suite de capital humano, transformando los reportes de riesgo en estrategias concretas para mejorar el clima y retener talento.
          </p>
          
          <div className="inline-block bg-slate-50 text-slate-700 px-8 py-4 rounded-full border border-slate-200 shadow-sm font-medium">
            Módulo integrado con <strong className="text-blue-700">Pulso35</strong> (People Service & Culture). Actívalo sin configuraciones adicionales.
          </div>
        </div>
      </section>

      {/* --- FOOTER CORPORATIVO --- */}
      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800 px-6">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-10">
          
          <div>
            <Image 
              src="/pictures/logo_ethika35_white.png" // Asegúrate de tener una versión blanca/clara del logo
              alt="Ethika35 Logo" 
              width={140} 
              height={35} 
              className="h-8 w-auto mb-6 opacity-80"
            />
            <p className="text-sm">
              Protegiendo la integridad corporativa y reduciendo el riesgo legal de las empresas en México.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Soluciones</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Línea de Denuncia (EthicTrust)</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Cumplimiento NOM-035</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Gestión de Casos LFT</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Pulso35 (Clima y Retención)</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm mb-6">
              <li>Email: <a href="mailto:hola@konfidente.com" className="hover:text-white transition-colors">hola@konfidente.com</a></li>
              <li>Operado por: Bahumana & nabi.ai</li>
            </ul>
            
            {/* Código QR LinkedIn (Estilo Ejecutivo) */}
            <a href="https://www.linkedin.com/company/konfidente" target="_blank" className="inline-flex items-center space-x-3 group">
              <div className="p-1 bg-white rounded border-2 border-slate-700 group-hover:border-blue-500 transition-colors">
                <Image src="/pictures/qr_linkedin.png" alt="LinkedIn QR" width={50} height={50} className="rounded-sm" />
              </div>
              <span className="font-semibold text-slate-300 group-hover:text-white transition-colors">Síguenos en LinkedIn</span>
            </a>
          </div>
        </div>

        <div className="container mx-auto max-w-6xl mt-12 pt-8 border-t border-slate-800 text-sm text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Konfidente Workforce Suite. Desarrollado por Factor Integración.</p>
          <div className="space-x-4 mt-4 md:mt-0">
            <Link href="/privacidad" className="hover:text-white transition-colors">Aviso de Privacidad</Link>
            <Link href="/terminos" className="hover:text-white transition-colors">Términos de Servicio</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
