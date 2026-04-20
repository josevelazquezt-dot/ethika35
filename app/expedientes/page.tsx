"use client";

import React from 'react';

export default function ExpedientesPage() {
  return (
    <>
      {/* Carga de fuentes institucionales */}
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&family=Noto+Serif:ital,wght@0,700;1,400&display=swap" rel="stylesheet" />
      
      {/* Estilos de Auditoría (Soberbios y de Riesgo) */}
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
            --audit-red: #C53030;
            --audit-dark: #1A202C;
            --audit-gray: #4A5568;
            --audit-bg: #F7FAFC;
            --audit-green: #00D09C;
            --white: #FFFFFF;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Montserrat', sans-serif; color: var(--audit-dark); background-color: var(--audit-bg); line-height: 1.6; }
        h1, h2, h3 { font-family: 'Noto Serif', serif; }
        .container { width: 90%; max-width: 1000px; margin: 0 auto; }

        /* --- Header --- */
        .header-audit { background: var(--audit-dark); color: var(--white); padding: 60px 20px; text-align: center; border-bottom: 5px solid var(--audit-red); }
        .header-audit h1 { font-size: 2.2rem; margin-bottom: 20px; line-height: 1.2; }
        .header-audit p { font-size: 1.1rem; color: #CBD5E0; font-style: italic; }

        /* --- Hero Image --- */
        .hero-img-container { padding: 40px 0; text-align: center; background: var(--white); }
        .hero-img-container img { width: 100%; max-width: 800px; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .caption { display: block; margin-top: 10px; font-size: 0.8rem; color: var(--audit-gray); font-weight: bold; }

        /* --- Expedientes Grid --- */
        .expediente-card { background: var(--white); margin: 40px 0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #E2E8F0; }
        .card-header { background: #EDF2F7; padding: 20px 30px; border-bottom: 2px solid var(--audit-red); display: flex; justify-content: space-between; align-items: center; }
        .card-header h2 { font-size: 1.5rem; color: var(--audit-red); }
        .jurisdiccion { font-size: 0.8rem; font-weight: 700; color: var(--audit-gray); text-transform: uppercase; }

        .card-body { padding: 30px; display: grid; grid-template-columns: 1fr 300px; gap: 30px; }
        .info-legal { font-size: 0.95rem; }
        .info-legal strong { color: var(--audit-dark); }
        
        .image-placeholder { background: #E2E8F0; width: 100%; height: 200px; border-radius: 8px; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative; }
        .image-placeholder img { width: 100%; height: 100%; object-fit: cover; }

        .highlight-box { background: #FFF5F5; border-left: 4px solid var(--audit-red); padding: 20px; margin: 20px 0; }
        .highlight-box h4 { color: var(--audit-red); margin-bottom: 10px; font-size: 0.9rem; text-transform: uppercase; }

        .tag { display: inline-block; background: var(--audit-dark); color: white; padding: 4px 10px; border-radius: 4px; font-size: 0.75rem; margin-bottom: 10px; }

        /* --- Footer CTA --- */
        .audit-footer { background: var(--audit-dark); color: white; padding: 60px 20px; text-align: center; }
        .btn-action { display: inline-block; background: var(--audit-green); color: white; padding: 18px 40px; border-radius: 50px; text-decoration: none; font-weight: 700; margin-top: 30px; transition: 0.3s; }
        .btn-action:hover { transform: scale(1.05); background: #00A37A; }

        @media (max-width: 768px) {
            .card-body { grid-template-columns: 1fr; }
            .header-audit h1 { font-size: 1.6rem; }
        }
      `}} />

      <header className="header-audit">
        <div className="container">
          <h1>"Hemos recopilado y auditado 10 expedientes recientes de tribunales mexicanos.<br />No son historias de terror, son asientos legales públicos."</h1>
          <p>Análisis de cumplimiento y riesgos psicosociales (NOM-035) y responsabilidad patronal.</p>
        </div>
      </header>

      <section className="hero-img-container">
        <div className="container">
          <img 
            src="/pictures/iceberg.png" 
            alt="El iceberg de la ignorancia corporativa" 
            onError={(e) => { (e.target as HTMLImageElement).src='https://via.placeholder.com/800x400?text=Barco+a+punto+de+chocar+(iceberg.png)' }}
          />
          <span className="caption">iceberg.png</span>
        </div>
      </section>

      <div className="container">

        <article className="expediente-card">
          <div className="card-header">
            <h2>AD-45/2023</h2>
            <span className="jurisdiccion">Guanajuato | Sector Automotriz</span>
          </div>
          <div className="card-body">
            <div className="info-legal">
              <span className="tag">Amparo Directo Laboral</span>
              <p><strong>Hecho:</strong> Riesgo de Trabajo (Suicidio por Estrés).</p>
              <p><strong>Criterio del Tribunal:</strong> Aplicó el principio de "Presunción de Profesionalidad". Si el patrón no demuestra documentalmente (NOM-035) un entorno favorable, se presume el estrés como causa del daño.</p>
              <div className="highlight-box">
                <h4>Consecuencia Operativa</h4>
                <p>Paro de línea por 72 horas para peritajes. Multas contractuales por retraso en envíos Just-in-Time.</p>
              </div>
            </div>
            <div className="image-placeholder">
              <img src="/pictures/caso1.jpg" alt="Caso AD-45/2023" onError={(e) => { (e.target as HTMLImageElement).style.display='none' }} />
              <span style={{ color: '#A0AEC0', position: 'absolute' }}>Espacio Imagen Caso 1</span>
            </div>
          </div>
        </article>

        <article className="expediente-card">
          <div className="card-header">
            <h2>TPS/CDMX/992</h2>
            <span className="jurisdiccion">CDMX | Retail Moda</span>
          </div>
          <div className="card-body">
            <div className="info-legal">
              <span className="tag">Hostigamiento y Acoso</span>
              <p><strong>Dictamen Pericial:</strong> Omisión de Canal Seguro. Las víctimas intentaron denunciar pero el Director era amigo del acosador.</p>
              <p><strong>Multas STPS:</strong> Sanción por falta de protocolo de violencia obligatorio desde 2020.</p>
              <div className="highlight-box">
                <h4>Fallo</h4>
                <p>Condena Civil por no probar evidencia de prevención previa.</p>
              </div>
            </div>
            <div className="image-placeholder">
              <img src="/pictures/caso2.jpg" alt="Caso TPS/CDMX/992" onError={(e) => { (e.target as HTMLImageElement).style.display='none' }} />
              <span style={{ color: '#A0AEC0', position: 'absolute' }}>Espacio Imagen Caso 2</span>
            </div>
          </div>
        </article>

        <article className="expediente-card">
          <div className="card-header">
            <h2>EXP-REF-778</h2>
            <span className="jurisdiccion">Zapopan, Jal | Call Center</span>
          </div>
          <div className="card-body">
            <div className="info-legal">
              <span className="tag">Demanda Colectiva</span>
              <p><strong>Hallazgo:</strong> "La Cámara de los Gritos". Audios filtrados de supervisores usando insultos y amenazas.</p>
              <p><strong>Cruce IMSS:</strong> 40% de plantilla con incapacidades por "Disfonía psicógena" y gastritis erosiva.</p>
              <div className="highlight-box">
                <h4>NOM-035</h4>
                <p>Política de prevención firmada pero sin acreditación de difusión real. 90% de empleados confirmaron maltrato.</p>
              </div>
            </div>
            <div className="image-placeholder">
              <img src="/pictures/caso3.jpg" alt="Caso EXP-REF-778" onError={(e) => { (e.target as HTMLImageElement).style.display='none' }} />
              <span style={{ color: '#A0AEC0', position: 'absolute' }}>Espacio Imagen Caso 3</span>
            </div>
          </div>
        </article>

        <article className="expediente-card">
          <div className="card-header">
            <h2>TLAJ/102/2024</h2>
            <span className="jurisdiccion">Tlajomulco, Jal | Logística</span>
          </div>
          <div className="card-body">
            <div className="info-legal">
              <span className="tag">Despido Injustificado / Burnout</span>
              <p><strong>Causa:</strong> Gerente de operaciones nocturnas demanda por condiciones inhumanas.</p>
              <div className="highlight-box">
                <h4>Costo Reputacional</h4>
                <p>Pérdida de Cliente "A" (E-commerce) por activación de cláusula de Ética de Proveedores.</p>
              </div>
            </div>
            <div className="image-placeholder">
              <img src="/pictures/caso4.jpg" alt="Caso TLAJ/102/2024" onError={(e) => { (e.target as HTMLImageElement).style.display='none' }} />
              <span style={{ color: '#A0AEC0', position: 'absolute' }}>Espacio Imagen Caso 4</span>
            </div>
          </div>
        </article>

        <article className="expediente-card">
          <div className="card-header">
            <h2>INSP/NL/005-23</h2>
            <span className="jurisdiccion">Nuevo León | Consultoría IT</span>
          </div>
          <div className="card-body">
            <div className="info-legal">
              <span className="tag">Simulación de Cumplimiento</span>
              <p><strong>Falta:</strong> Falsedad en informes de NOM-035. Simulación de encuestas.</p>
              <div className="highlight-box">
                <h4>Impacto Directo</h4>
                <p>Un cliente bancario migró su cuenta tras auditar "Data Integrity". Fuga masiva de talento por pérdida de confianza.</p>
              </div>
            </div>
            <div className="image-placeholder">
              <img src="/pictures/caso5.jpg" alt="Caso INSP/NL/005-23" onError={(e) => { (e.target as HTMLImageElement).style.display='none' }} />
              <span style={{ color: '#A0AEC0', position: 'absolute' }}>Espacio Imagen Caso 5</span>
            </div>
          </div>
        </article>

        <article className="expediente-card">
          <div className="card-header">
            <h2>AMP-DIR-88/22</h2>
            <span className="jurisdiccion">CDMX | Fintech / Banca</span>
          </div>
          <div className="card-body">
            <div className="info-legal">
              <span className="tag">Violencia de Género</span>
              <p><strong>Hecho:</strong> Táctica del "Congelador" post-maternidad. Retiro de cartera de clientes y aislamiento.</p>
              <p><strong>Impacto:</strong> Desarrollo de Mastitis severa por negativa de permisos de lactancia (Art. 170 LFT).</p>
              <div className="highlight-box">
                <h4>Costo Financiero</h4>
                <p>Pérdida de inversión de $2 MDD (Fondo ESG) y pérdida de distintivo NMX-R-025.</p>
              </div>
            </div>
            <div className="image-placeholder">
              <img src="/pictures/caso6.jpg" alt="Caso AMP-DIR-88/22" onError={(e) => { (e.target as HTMLImageElement).style.display='none' }} />
              <span style={{ color: '#A0AEC0', position: 'absolute' }}>Espacio Imagen Caso 6</span>
            </div>
          </div>
        </article>

        <article className="expediente-card">
          <div className="card-header">
            <h2>STPS/QRO/21</h2>
            <span className="jurisdiccion">Querétaro | Auto Tier 2</span>
          </div>
          <div className="card-body">
            <div className="info-legal">
              <span className="tag">Desacato a la Autoridad</span>
              <p><strong>Evento:</strong> Negativa de acceso a inspectores. Regreso con Guardia Nacional 48h después.</p>
              <div className="highlight-box">
                <h4>Hallazgo Crítico</h4>
                <p>Ocultamiento de Riesgos: Trabajadores con lesiones en enfermería interna para no elevar prima IMSS.</p>
              </div>
            </div>
            <div className="image-placeholder">
              <img src="/pictures/caso7.jpg" alt="Caso STPS/QRO/21" onError={(e) => { (e.target as HTMLImageElement).style.display='none' }} />
              <span style={{ color: '#A0AEC0', position: 'absolute' }}>Espacio Imagen Caso 7</span>
            </div>
          </div>
        </article>

        <article className="expediente-card">
          <div className="card-header">
            <h2>JURIS-CIV-24</h2>
            <span className="jurisdiccion">CDMX | Sector Educativo</span>
          </div>
          <div className="card-body">
            <div className="info-legal">
              <span className="tag">Daño Moral e Infarto Cerebral</span>
              <p><strong>Causa:</strong> EVC en oficina derivado de burnout extremo. Registros de 75 horas semanales de trabajo.</p>
              <div className="highlight-box">
                <h4>Sentencia (Feb 2024)</h4>
                <p>Embargo de cuentas de la Universidad para garantizar pago por responsabilidad civil negligente.</p>
              </div>
            </div>
            <div className="image-placeholder">
              <img src="/pictures/caso8.jpg" alt="Caso JURIS-CIV-24" onError={(e) => { (e.target as HTMLImageElement).style.display='none' }} />
              <span style={{ color: '#A0AEC0', position: 'absolute' }}>Espacio Imagen Caso 8</span>
            </div>
          </div>
        </article>

        <article className="expediente-card">
          <div className="card-header">
            <h2>EXP-HOSP-23</h2>
            <span className="jurisdiccion">Quintana Roo | Hotelería</span>
          </div>
          <div className="card-body">
            <div className="info-legal">
              <span className="tag">Acoso Sistémico</span>
              <p><strong>Modus Operandi:</strong> Gerente asignaba áreas aisladas a camaristas que rechazaban insinuaciones.</p>
              <p><strong>Falla de Control:</strong> Buzón de quejas físico dentro de la oficina del agresor.</p>
              <div className="highlight-box">
                <h4>Consecuencia</h4>
                <p>Clausura parcial por Protección Civil y denuncias penales abiertas.</p>
              </div>
            </div>
            <div className="image-placeholder">
              <img src="/pictures/caso9.jpg" alt="Caso EXP-HOSP-23" onError={(e) => { (e.target as HTMLImageElement).style.display='none' }} />
              <span style={{ color: '#A0AEC0', position: 'absolute' }}>Espacio Imagen Caso 9</span>
            </div>
          </div>
        </article>

      </div>

      <section className="audit-footer">
        <div className="container">
          <h2>No sea el expediente número 11.</h2>
          <p>Proteja su empresa, su inversión y a su gente con un canal independiente y profesional.</p>
          <a href="https://wa.me/523328080083" target="_blank" rel="noopener noreferrer" className="btn-action">Auditar mi cumplimiento hoy</a>
        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '20px', color: 'var(--audit-gray)', fontSize: '0.8rem' }}>
        &copy; {new Date().getFullYear()} Ethika35. Todos los derechos reservados.
      </footer>
    </>
  );
}
