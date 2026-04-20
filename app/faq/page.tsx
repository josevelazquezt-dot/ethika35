"use client";

export default function FAQPage() {
  return (
    <>
      {/* Carga de las fuentes de Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;700&family=Noto+Serif:wght@400;700&display=swap" rel="stylesheet" />
      
      {/* Estilos CSS Nativos exactos de tu HTML original */}
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
            --ethika-primary: #FFFFFF;
            --ethika-green-bright: #00D09C;
            --ethika-green-hover: #00A37A;
            --ethika-text-main: #1A202C;
            --ethika-text-gray: #718096;
            --ethika-light-bg: #F0FDF4;
            --ethika-gold: #F59E0B;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: 'Montserrat', sans-serif;
            color: var(--ethika-text-main);
            background-color: #FAFBFC;
            line-height: 1.7;
        }

        h1, h2, h3 { font-family: 'Noto Serif', serif; }
        
        .container {
            width: 90%;
            max-width: 1000px;
            margin: 0 auto;
            padding: 0 20px;
        }

        .btn-primary {
            display: inline-block;
            background-color: var(--ethika-green-bright);
            color: #FFFFFF;
            padding: 12px 25px;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 700;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 208, 156, 0.3);
        }

        .btn-primary:hover {
            background-color: var(--ethika-green-hover);
            transform: translateY(-2px);
        }

        header {
            background-color: rgba(255, 255, 255, 0.98);
            padding: 15px 0;
            position: sticky;
            top: 0;
            z-index: 100;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo-img { height: 45px; }

        .nav-links a {
            color: var(--ethika-text-main);
            text-decoration: none;
            margin-left: 20px;
            font-size: 0.9rem;
            font-weight: 500;
            transition: color 0.3s;
        }

        .nav-links a:hover { color: var(--ethika-green-bright); }

        .hero-faq {
            background-color: var(--ethika-light-bg);
            color: var(--ethika-text-main);
            padding: 70px 0;
            text-align: center;
            border-bottom: 2px solid rgba(0, 208, 156, 0.1);
        }

        .hero-faq h1 {
            font-size: 2.5rem;
            margin-bottom: 15px;
            color: var(--ethika-text-main);
        }

        .hero-faq p {
            font-size: 1.15rem;
            color: var(--ethika-text-gray);
            max-width: 600px;
            margin: 0 auto;
        }

        .faq-section {
            padding: 70px 0;
        }

        .faq-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 40px;
        }

        .faq-card {
            display: flex;
            background-color: #FFFFFF;
            border-radius: 12px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.02);
            overflow: hidden;
            border-left: 5px solid var(--ethika-green-bright);
            transition: all 0.3s ease;
            border: 1px solid rgba(0, 208, 156, 0.05);
        }

        .faq-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0, 208, 156, 0.1);
        }

        .faq-image-container {
            width: 250px;
            flex-shrink: 0;
            background-color: #FAFBFC;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }

        .faq-image-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .faq-content {
            padding: 35px;
            flex-grow: 1;
        }

        .faq-content h3 {
            color: var(--ethika-text-main);
            font-size: 1.5rem;
            margin-bottom: 18px;
        }

        .faq-content p {
            color: #4A5568;
            margin-bottom: 15px;
            font-size: 1.05rem;
        }

        .faq-content p:last-child { margin-bottom: 0; }
        .faq-content strong { color: var(--ethika-text-main); }

        footer {
            background-color: #FFFFFF;
            color: var(--ethika-text-gray);
            text-align: center;
            padding: 40px 0;
            font-size: 0.9rem;
            margin-top: 50px;
            border-top: 1px solid rgba(0,0,0,0.03);
        }

        @media (max-width: 768px) {
            .faq-card { flex-direction: column; }
            .faq-image-container { width: 100%; height: 200px; }
            .faq-content { padding: 25px; }
            .hero-faq h1 { font-size: 2.1rem; }
            .nav-links { display: none; }
        }
      `}} />

      {/* HTML Estructurado convertido a JSX */}
      <header>
          <div className="container header-content">
              <a href="/">
                  <img src="/pictures/Logo_Ethika35.png" alt="Ethika35 Logo" className="logo-img" />
              </a>
              <div className="nav-links">
                  <a href="/">Inicio</a>
                  <a href="mailto:hola@konfidente.com">Contacto</a>
                  <a href="https://wa.me/523328080083" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '9px 22px', marginLeft: '20px' }}>Hacer un Reporte</a>
              </div>
          </div>
      </header>

      <section className="hero-faq">
          <div className="container">
              <h1>Preguntas Frecuentes</h1>
              <p>Conoce cómo funciona nuestro canal ético y por qué es la forma más segura de reportar incidencias en tu organización.</p>
          </div>
      </section>

      <section className="faq-section">
          <div className="container faq-grid">

              <div className="faq-card">
                  <div className="faq-image-container">
                      <img src="/pictures/faq-1-proposito.png" alt="Propósito de Ethika35" onError={(e) => e.currentTarget.style.display = 'none'} />
                  </div>
                  <div className="faq-content">
                      <h3>¿Por qué existe una línea ética Ethika35.com?</h3>
                      <p>Estamos firmemente comprometidos a garantizar que existan canales efectivos para reportar cualquier preocupación relacionada con conductas que puedan ser poco éticas, ilegales, contrarias a los estándares profesionales o a nuestras normativas internas y Código de Conducta Global.</p>
                      <p>Fomentamos que las personas expresen estas inquietudes sin temor a represalias.</p>
                  </div>
              </div>

              <div className="faq-card">
                  <div className="faq-image-container">
                      <img src="/pictures/faq-2-operador.png" alt="Operador independiente" onError={(e) => e.currentTarget.style.display = 'none'} />
                  </div>
                  <div className="faq-content">
                      <h3>¿Quién opera la línea ética?</h3>
                      <p>Ethika35 es gestionado por una <strong>organización externa e independiente</strong>. Esta entidad nos proporciona soluciones de denuncia confidenciales y, si lo deseas, anónimas.</p>
                      <p>Ethika35 recopila la información del denunciante y luego transmite el reporte directamente al Consejo de Administración de la empresa cliente para su seguimiento e investigación.</p>
                  </div>
              </div>

              <div className="faq-card">
                  <div className="faq-image-container">
                      <img src="/pictures/faq-3-confidencialidad.png" alt="Acuerdos de confidencialidad" onError={(e) => e.currentTarget.style.display = 'none'} />
                  </div>
                  <div className="faq-content">
                      <h3>¿El personal firma acuerdos de confidencialidad?</h3>
                      <p>Sí. Todos los empleados de nuestro aliado de investigaciones — <strong>BAHUMANA</strong> — están obligados a firmar un acuerdo de confidencialidad al unirse a la empresa.</p>
                      <p>Además, el personal del centro de contacto debe reconfirmar este acuerdo mensualmente, asegurando la máxima discreción en el manejo de tu información.</p>
                  </div>
              </div>

              <div className="faq-card">
                  <div className="faq-image-container">
                      <img src="/pictures/faq-4-horario.png" alt="Disponibilidad 24/7" onError={(e) => e.currentTarget.style.display = 'none'} />
                  </div>
                  <div className="faq-content">
                      <h3>¿Cuándo puedo contactar la línea ética?</h3>
                      <p>Puedes contactar ethika35.com en cualquier momento. Nuestro sitio web está disponible <strong>24 horas al día, 7 días a la semana, los 365 días del año</strong> y puede ser accesado desde cualquier computadora, tableta o teléfono celular.</p>
                  </div>
              </div>

              <div className="faq-card">
                  <div className="faq-image-container">
                      <img src="/pictures/faq-5-audiencia.png" alt="Quién puede usarlo" onError={(e) => e.currentTarget.style.display = 'none'} />
                  </div>
                  <div className="faq-content">
                      <h3>¿Quién puede contactar la línea ética?</h3>
                      <p>Cualquier persona, ya sea interna o externa a <strong>Konfidente</strong> o a sus clientes, puede enviar un reporte, esto incluye:</p>
                      <ul>
                          <li style={{ marginLeft: '25px', color: '#4A5568' }}>Empleados</li>
                          <li style={{ marginLeft: '25px', color: '#4A5568' }}>Clientes</li>
                          <li style={{ marginLeft: '25px', color: '#4A5568' }}>Proveedores</li>
                      </ul>
                  </div>
              </div>

              <div className="faq-card">
                  <div className="faq-image-container">
                      <img src="/pictures/faq-6-cuando-usar.png" alt="Cuándo utilizar la línea" onError={(e) => e.currentTarget.style.display = 'none'} />
                  </div>
                  <div className="faq-content">
                      <h3>¿Debo usar la línea ética siempre que tenga una preocupación?</h3>
                      <p>Si tienes una preocupación o sospechas razonablemente de una conducta que podría ser poco ética, ilegal, contraria a los estándares profesionales o inconsistente con las regulaciones mexicanas o las mejores prácticas del Código de Conducta Global, te animamos a notificarlo inmediatamente.</p>
                      <p>Cuando el reporte directo no sea posible o apropiado, <strong>Ethika35.com</strong> te ofrece una alternativa segura para realizar un reporte confidencial.</p>
                  </div>
              </div>

          </div>
      </section>

      <footer>
          <div className="container">
              <p>&copy; {new Date().getFullYear()} Konfidente Workforce Suite - Ethika35. Todos los derechos reservados.</p>
          </div>
      </footer>
    </>
  );
}
