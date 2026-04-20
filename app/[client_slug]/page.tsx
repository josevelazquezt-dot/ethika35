// 1. SSR PURO: Crítico para la arquitectura Multi-Tenant
export const dynamic = 'force-dynamic';

import React from 'react';

// ─── DATA LAYER ORIGINAL — NO MODIFICADO ─────────────────────────────────────
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
// ─────────────────────────────────────────────────────────────────────────────

const REPORT_CATEGORIES = [
  "Acoso Laboral",
  "Acoso Sexual",
  "Sobornos / Corrupción",
  "Robo o Fraude",
  "Conflicto de Intereses",
  "Maltrato / NOM-035",
  "Discriminación",
  "Incumplimiento de Políticas",
];

export default async function EthikaCustomerPortal({ params }: { params: Promise<{ client_slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.client_slug;
  const tenant = await getTenantConfig(slug);

  if (!tenant || tenant.modules?.ethika35_enabled === false) {
    return <div className="p-20 text-center font-sans text-slate-400">Portal no disponible para {slug}</div>;
  }

  const { legal_name } = tenant;
  const clientLogoUrl   = `${STATIC_PICTURES_PATH}/${slug}_logo.png`;
  const ethikaLogoUrl   = `${STATIC_PICTURES_PATH}/Logo_Ethika35.png`;
  const konfidenteLogoUrl = `${STATIC_PICTURES_PATH}/Logo_Konfidente.png`;
  const reportUrl       = `https://ethika35.factorintegracion.net/test?slug=${slug}`;

  // ─── SOLO FRONTEND ABAJO ───────────────────────────────────────────────────
  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', background:'#F8F7F4', fontFamily:"'DM Sans','Segoe UI',system-ui,sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=DM+Serif+Display&display=swap');

        @keyframes pulse-glow {
          0%,100% { box-shadow: 0 0 0 0 rgba(220,38,38,.5); }
          50%      { box-shadow: 0 0 0 12px rgba(220,38,38,0); }
        }
        .btn-alert { animation: pulse-glow 2.4s ease-in-out infinite; }

        @keyframes fade-up {
          from { opacity:0; transform:translateY(18px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fu    { animation: fade-up .6s ease-out forwards; }
        .fu.d1 { animation-delay:.12s; opacity:0; }
        .fu.d2 { animation-delay:.26s; opacity:0; }
        .fu.d3 { animation-delay:.42s; opacity:0; }

        .grain::before {
          content:''; position:absolute; inset:0; pointer-events:none; z-index:1;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E");
        }
        .grain > * { position:relative; z-index:2; }

        .cat-row { text-decoration:none; display:flex; align-items:center; gap:14px; padding:14px 18px; border-radius:12px; background:white; border:1px solid #E2E8F0; transition:transform .15s, box-shadow .15s, border-color .15s; }
        .cat-row:hover { transform:translateY(-2px); box-shadow:0 6px 24px rgba(0,0,0,.07); border-color:#FCA5A5; }
        .cat-dot { width:8px; height:8px; border-radius:50%; background:#DC2626; flex-shrink:0; transition:transform .15s; }
        .cat-row:hover .cat-dot { transform:scale(1.7); }
      `}</style>

      {/* ══ HEADER ══════════════════════════════════════════════════════════════ */}
      <header style={{
        position:'sticky', top:0, zIndex:50, background:'white',
        borderBottom:'1.5px solid #E2E8F0',
        boxShadow:'0 2px 20px rgba(0,0,0,.06)',
      }}>
        <div style={{
          maxWidth:1200, margin:'0 auto', height:72, padding:'0 28px',
          display:'grid', gridTemplateColumns:'1fr auto 1fr', alignItems:'center',
        }}>
          {/* Logo cliente */}
          <div style={{ display:'flex', justifyContent:'flex-start' }}>
            <img src={clientLogoUrl} alt={legal_name}
              style={{ height:36, maxWidth:140, objectFit:'contain', opacity:.9 }} />
          </div>

          {/* CTA central */}
          <div style={{ display:'flex', justifyContent:'center' }}>
            <a href={reportUrl} className="btn-alert" style={{
              display:'inline-flex', alignItems:'center', gap:8,
              padding:'10px 24px', borderRadius:10,
              fontWeight:800, fontSize:'0.78rem', letterSpacing:'0.1em',
              textTransform:'uppercase', color:'white', textDecoration:'none',
              background:'linear-gradient(135deg,#F59E0B 0%,#DC2626 100%)',
              whiteSpace:'nowrap',
            }}>
              ⚑ INICIAR DENUNCIA
            </a>
          </div>

          {/* Logo Ethika35 */}
          <div style={{ display:'flex', justifyContent:'flex-end' }}>
            <img src={ethikaLogoUrl} alt="Ethika35"
              style={{ height:36, maxWidth:130, objectFit:'contain', opacity:.9 }} />
          </div>
        </div>
      </header>

      {/* ══ HERO ════════════════════════════════════════════════════════════════ */}
      <section className="grain" style={{
        position:'relative',
        padding:'76px 24px 80px',
        background:'linear-gradient(155deg,#1A1A2E 0%,#16213E 55%,#0F3460 100%)',
      }}>
        <div style={{ maxWidth:680, margin:'0 auto', textAlign:'center' }}>

          {/* Badge */}
          <div className="fu" style={{
            display:'inline-flex', alignItems:'center', gap:8, marginBottom:28,
            padding:'6px 16px', borderRadius:999,
            background:'rgba(220,38,38,.15)', border:'1px solid rgba(248,113,113,.25)',
            color:'#FCA5A5', fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase',
          }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'#FCA5A5', display:'inline-block',
              animation:'pulse-glow 1.8s ease-in-out infinite' }}/>
            Canal Oficial · {legal_name}
          </div>

          {/* H1 */}
          <h1 className="fu d1" style={{
            fontFamily:"'DM Serif Display',Georgia,serif",
            fontSize:'clamp(2rem,5vw,3.4rem)',
            color:'#F8FAFC', lineHeight:1.13, marginBottom:20,
          }}>
            Tu voz está protegida.<br/>
            <span style={{ color:'#FCD34D' }}>Siempre.</span>
          </h1>

          {/* Body */}
          <p className="fu d2" style={{
            color:'#94A3B8', fontSize:'1.05rem', lineHeight:1.82,
            maxWidth:540, margin:'0 auto 36px',
          }}>
            Este canal <strong style={{ color:'#F1F5F9' }}>no lo opera {legal_name}</strong>.
            Lo administra exclusivamente <strong style={{ color:'#FCD34D' }}>BAHUMANA</strong>,
            un tercero independiente. Ningún directivo puede ver, modificar o eliminar tu reporte.
          </p>

          {/* CTA hero */}
          <a href={reportUrl} className="fu d3 btn-alert" style={{
            display:'inline-flex', alignItems:'center', gap:12,
            padding:'17px 38px', borderRadius:16,
            fontWeight:800, fontSize:'0.98rem', color:'white', textDecoration:'none',
            background:'linear-gradient(135deg,#991B1B 0%,#DC2626 55%,#EF4444 100%)',
            boxShadow:'0 8px 32px rgba(220,38,38,.38)',
          }}>
            🔒 GENERAR REPORTE SEGURO Y CONFIDENCIAL
          </a>
        </div>
      </section>

      {/* ══ TRES PILARES ════════════════════════════════════════════════════════ */}
      <section style={{ padding:'52px 24px', background:'white', borderBottom:'1px solid #E2E8F0' }}>
        <div style={{
          maxWidth:840, margin:'0 auto',
          display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:20,
        }}>
          {[
            { icon:'🛡', title:'Evidencia Legal Blindada',
              desc:'Registro con timestamp resguardado por BAHUMANA. Imposible de alterar o eliminar por la empresa.' },
            { icon:'👤', title:'Anonimato Total',
              desc:'Reporta sin identificarte. Tu identidad nunca será revelada sin tu consentimiento explícito.' },
            { icon:'⚖', title:'Cero Represalias',
              desc:'La LFT y NOM-035 te protegen. BAHUMANA da seguimiento hasta la resolución del caso.' },
          ].map(p => (
            <div key={p.title} style={{ padding:22, borderRadius:16, background:'#F8F7F4', border:'1px solid #E2E8F0' }}>
              <div style={{ fontSize:'1.8rem', marginBottom:10 }}>{p.icon}</div>
              <h3 style={{ fontWeight:700, color:'#0F172A', fontSize:'0.9rem', marginBottom:6 }}>{p.title}</h3>
              <p style={{ fontSize:'0.82rem', color:'#64748B', lineHeight:1.7, margin:0 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ CATEGORÍAS ══════════════════════════════════════════════════════════ */}
      <main style={{ flexGrow:1, padding:'60px 24px', background:'#F8F7F4' }}>
        <div style={{ maxWidth:840, margin:'0 auto' }}>

          {/* Título sección */}
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24 }}>
            <div style={{
              width:4, height:30, borderRadius:4, flexShrink:0,
              background:'linear-gradient(to bottom,#F59E0B,#DC2626)',
            }}/>
            <h2 style={{ fontWeight:700, color:'#0F172A', fontSize:'1.1rem', margin:0 }}>
              ¿Qué deseas reportar?
            </h2>
          </div>

          {/* Grid categorías */}
          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',
            gap:10, marginBottom:52,
          }}>
            {REPORT_CATEGORIES.map(label => (
              <a
                key={label}
                href={`${reportUrl}&category=${encodeURIComponent(label)}`}
                className="cat-row"
              >
                <div className="cat-dot"/>
                <span style={{ fontSize:'0.86rem', fontWeight:600, color:'#1E293B' }}>{label}</span>
                <span style={{ marginLeft:'auto', color:'#CBD5E1', fontSize:'0.72rem' }}>→</span>
              </a>
            ))}
          </div>

          {/* Blockquote de autoridad */}
          <blockquote style={{
            margin:0, padding:30, borderRadius:16, overflow:'hidden', position:'relative',
            background:'#1E293B', borderLeft:'4px solid #F59E0B',
          }}>
            <div style={{
              position:'absolute', top:0, right:0, width:100, height:100,
              borderRadius:'50%', background:'#F59E0B', opacity:.06,
              transform:'translate(30%,-30%)',
            }}/>
            <p style={{
              fontFamily:"'DM Serif Display',serif",
              color:'#F1F5F9', fontSize:'0.98rem', lineHeight:1.78,
              fontStyle:'italic', marginBottom:14,
            }}>
              "Todas las denuncias generan evidencia legal ante BAHUMANA, garantizando
              investigación justa y eliminando cualquier posibilidad de represalia o
              alteración de información."
            </p>
            <cite style={{
              color:'#FCD34D', fontSize:'0.66rem', fontWeight:700,
              letterSpacing:'0.13em', textTransform:'uppercase', fontStyle:'normal',
            }}>
              — Operación Independiente BAHUMANA para {legal_name}
            </cite>
          </blockquote>

        </div>
      </main>

      {/* ══ FOOTER ══════════════════════════════════════════════════════════════ */}
      <footer style={{ padding:'36px 24px', background:'white', borderTop:'1px solid #E2E8F0', textAlign:'center' }}>
        <div style={{ maxWidth:640, margin:'0 auto', display:'flex', flexDirection:'column', alignItems:'center', gap:10 }}>
          <p style={{ fontWeight:700, color:'#475569', fontSize:'0.82rem', margin:0 }}>
            Privacidad y Confidencialidad Garantizada
          </p>
          <p style={{ fontSize:'0.73rem', color:'#94A3B8', lineHeight:1.7, margin:0, maxWidth:400 }}>
            Operado con absoluta confidencialidad por <strong style={{ color:'#475569' }}>BAHUMANA</strong> para{' '}
            <strong style={{ color:'#475569' }}>{legal_name}</strong>.
          </p>
          <div style={{ display:'flex', gap:14, alignItems:'center', marginTop:2 }}>
            <a href="https://ethika35.com" style={{ fontSize:'0.66rem', fontWeight:700, color:'#94A3B8', letterSpacing:'0.12em', textTransform:'uppercase', textDecoration:'none' }}>
              ethika35.com
            </a>
            <span style={{ color:'#E2E8F0' }}>·</span>
            <a href="https://konfidente.com" style={{ fontSize:'0.66rem', fontWeight:700, color:'#94A3B8', letterSpacing:'0.12em', textTransform:'uppercase', textDecoration:'none' }}>
              konfidente.com
            </a>
          </div>
          <img src={konfidenteLogoUrl} alt="Konfidente"
            style={{ height:13, width:'auto', opacity:.25, filter:'grayscale(1)', marginTop:6 }} />
          <p style={{ fontSize:'0.6rem', color:'#CBD5E1', margin:0, lineHeight:1.7 }}>
            © 2026 · NOM-035-STPS-2018 · Ley Federal del Trabajo
          </p>
        </div>
      </footer>

    </div>
  );
}
