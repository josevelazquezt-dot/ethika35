// app/[client_slug]/page.tsx
// DATA LAYER: Idéntico al de Pulso35 que ya funciona — NO modificar.
// FRONTEND: Rediseñado para portal de denuncias Ethika35.
export const dynamic = 'force-dynamic';
import React from 'react';

const LAMBDA_URL = process.env.NEXT_PUBLIC_TENANT_API_URL;
const STATIC_PICTURES_PATH = '/pictures';

async function getTenantConfig(slug: string) {
  if (slug.includes('.')) return null;

  if (!LAMBDA_URL || LAMBDA_URL.includes('NEXT_PUBLIC_')) {
    console.error("Error crítico: La URL de la API (LAMBDA_URL) no está configurada.");
    return { debug_error: "Falta la configuración de la variable NEXT_PUBLIC_TENANT_API_URL." };
  }

  try {
    const cleanUrl = LAMBDA_URL.trim().replace(/\/$/, "");
    const fullIdentifier = `TENANT#${slug.toLowerCase()}`;
    const res = await fetch(`${cleanUrl}/?slug=${encodeURIComponent(fullIdentifier)}`, {
      cache: 'no-store'
    });

    if (!res.ok) {
      return { debug_error: `La Lambda respondió con error ${res.status}.` };
    }

    const data = await res.json();

    // Lambda Function URL envuelve en { body: "string" } — unwrap transparente
    if (data?.body && typeof data.body === 'string') return JSON.parse(data.body);
    if (data?.body && typeof data.body === 'object') return data.body;

    return data;
  } catch (error: any) {
    return { debug_error: `No se pudo conectar con la Lambda: ${error.message}` };
  }
}

// ─── CATEGORÍAS ───────────────────────────────────────────────────────────────

const REPORT_CATEGORIES = [
  'Acoso Laboral',
  'Acoso Sexual',
  'Sobornos / Corrupción',
  'Robo o Fraude',
  'Conflicto de Intereses',
  'Maltrato / NOM-035',
  'Discriminación',
  'Incumplimiento de Políticas',
] as const;

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default async function EthikaCustomerPortal({
  params,
}: {
  params: Promise<{ client_slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.client_slug;

  if (!slug) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <p className="text-red-700 font-bold">Error: No se detectó slug en la URL.</p>
      </div>
    );
  }

  const tenant = await getTenantConfig(slug);

  // Error de arquitectura — igual que Pulso35
  if (tenant && tenant.debug_error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-red-50 text-red-800">
        <h1 className="text-3xl font-bold mb-4">Error de Arquitectura</h1>
        <div className="text-lg bg-white p-6 border border-red-200 rounded-xl shadow-lg max-w-2xl">
          <code className="block bg-slate-800 text-white p-4 rounded">{tenant.debug_error}</code>
        </div>
      </div>
    );
  }

  // Tenant no encontrado — mismo check que Pulso35 usa (!tenant.branding)
  if (!tenant || !tenant.branding) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="text-center">
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
          <h1 className="text-2xl font-semibold text-slate-400 mb-2">Portal no disponible</h1>
          <p className="text-slate-500">
            El identificador <span className="font-bold">"{slug}"</span> no tiene un portal configurado.
          </p>
          <a href="https://ethika35.com"
            className="inline-block mt-6 text-xs font-bold text-red-600 tracking-widest uppercase">
            Regresar a ethika35.com
          </a>
        </div>
      </div>
    );
  }

  // Check módulo — si ethika35_enabled existe y es false explícitamente, bloquear
  if (tenant.modules?.ethika35_enabled === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-slate-400 mb-2">Módulo no activo</h1>
          <p className="text-slate-500">El portal Ethika35 no está habilitado para esta empresa.</p>
        </div>
      </div>
    );
  }

  const { branding, legal_name, slogan } = tenant;
  const primaryColor   = branding.primary_color   || '#DC2626';
  const secondaryColor = branding.secondary_color || '#F59E0B';

  const slugLower         = slug.toLowerCase();
  const clientLogoUrl     = `${STATIC_PICTURES_PATH}/${slugLower}_logo.png`;
  const ethikaLogoUrl     = `${STATIC_PICTURES_PATH}/Logo_Ethika35.png`;
  const konfidenteLogoUrl = `${STATIC_PICTURES_PATH}/Logo_Konfidente.png`;
  const reportUrl         = `https://ethika35.factorintegracion.net/test?slug=${encodeURIComponent(slugLower)}`;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        '--color-primary':   primaryColor,
        '--color-secondary': secondaryColor,
        fontFamily: "'DM Sans','Segoe UI',system-ui,sans-serif",
        background: '#F8F7F4',
      } as React.CSSProperties}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=DM+Serif+Display&display=swap');

        .grain::before {
          content:''; position:absolute; inset:0;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events:none; z-index:1;
        }
        .grain > * { position:relative; z-index:2; }

        @keyframes pulse-ring {
          0%,100% { box-shadow:0 0 0 0 rgba(220,38,38,.45); }
          50%      { box-shadow:0 0 0 14px rgba(220,38,38,0); }
        }
        .btn-pulse { animation: pulse-ring 2.5s ease-in-out infinite; }

        @keyframes slide-up {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .su    { animation: slide-up .55s ease-out forwards; }
        .su.d1 { animation-delay:.10s; opacity:0; }
        .su.d2 { animation-delay:.22s; opacity:0; }
        .su.d3 { animation-delay:.36s; opacity:0; }

        .cat-card { text-decoration:none; transition:transform .15s,box-shadow .15s; }
        .cat-card:hover { transform:translateY(-2px); box-shadow:0 6px 20px rgba(0,0,0,.08); }
        .cat-card:hover .cat-dot { transform:scale(1.6); background:var(--color-primary); }
        .cat-dot { transition:transform .15s,background .15s; }
      `}</style>

      {/* ── HEADER ── */}
      <header
        className="w-full sticky top-0 z-50 bg-white"
        style={{ borderBottom:'1.5px solid #E8E4DF', boxShadow:'0 2px 16px rgba(0,0,0,.05)' }}
      >
        <div
          className="w-full h-16 md:h-20 px-3 md:px-10"
          style={{
            maxWidth:1280, margin:'0 auto',
            display:'grid', gridTemplateColumns:'1fr auto 1fr', alignItems:'center',
          }}
        >
          {/* Logo cliente */}
          <div style={{ display:'flex', justifyContent:'flex-start' }}>
            <img
              src={clientLogoUrl}
              alt={`Logotipo de ${legal_name}`}
              className="h-5 md:h-8 w-auto object-contain"
              style={{ maxWidth:140, opacity:.9 }}
            />
          </div>

          {/* CTA Central — mayor peso visual */}
          <div style={{ display:'flex', justifyContent:'center' }}>
            <a
              href={reportUrl}
              className="btn-pulse inline-flex items-center gap-2 font-bold uppercase text-white rounded-xl"
              style={{
                padding:'9px 20px',
                fontSize:'0.78rem',
                letterSpacing:'0.09em',
                whiteSpace:'nowrap',
                textDecoration:'none',
                background:'linear-gradient(135deg, var(--color-secondary) 0%, var(--color-primary) 100%)',
              }}
            >
              ⚑ INICIAR DENUNCIA
            </a>
          </div>

          {/* Logo Ethika35 */}
          <div style={{ display:'flex', justifyContent:'flex-end' }}>
            <img
              src={ethikaLogoUrl}
              alt="Ethika35"
              className="h-5 md:h-8 w-auto object-contain"
              style={{ maxWidth:130, opacity:.9 }}
            />
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section
        className="grain relative"
        style={{
          padding:'80px 24px',
          background:'linear-gradient(160deg,#1A1A2E 0%,#16213E 60%,#0F3460 100%)',
        }}
      >
        <div style={{ maxWidth:720, margin:'0 auto', textAlign:'center' }}>

          {/* Badge */}
          <div className="su" style={{
            display:'inline-flex', alignItems:'center', gap:8,
            marginBottom:28, padding:'7px 16px', borderRadius:999,
            background:'rgba(220,38,38,.15)', color:'#F87171',
            border:'1px solid rgba(248,113,113,.25)',
            fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase',
          }}>
            <span style={{
              width:7, height:7, borderRadius:'50%', background:'#F87171', display:'inline-block',
              animation:'pulse-ring 1.6s ease-in-out infinite',
            }}/>
            Canal Oficial de Reportes — {legal_name}
          </div>

          {/* H1 */}
          <h1 className="su d1" style={{
            fontFamily:"'DM Serif Display',Georgia,serif",
            fontSize:'clamp(2rem,5vw,3.5rem)',
            color:'#FAFAF8', lineHeight:1.12, marginBottom:20,
          }}>
            Tu voz está protegida.<br/>
            <span style={{ color:'#FBBF24' }}>Siempre.</span>
          </h1>

          {/* Subhead */}
          <p className="su d2" style={{
            color:'#94A3B8', fontSize:'1.05rem', lineHeight:1.8,
            maxWidth:560, margin:'0 auto 36px',
          }}>
            {slogan
              ? slogan
              : <>Este canal <strong style={{ color:'#F1F5F9' }}>no lo opera {legal_name}</strong>.
                Lo administra exclusivamente <strong style={{ color:'#FBBF24' }}>BAHUMANA</strong>,
                un tercero independiente. Ningún directivo puede ver, modificar o eliminar tu reporte.</>
            }
          </p>

          {/* CTA */}
          <a
            href={reportUrl}
            className="su d3 btn-pulse inline-flex items-center gap-3 font-bold text-white rounded-2xl"
            style={{
              padding:'18px 40px',
              fontSize:'1rem',
              textDecoration:'none',
              background:'linear-gradient(135deg,#B91C1C 0%,#DC2626 50%,#EF4444 100%)',
              boxShadow:'0 8px 32px rgba(220,38,38,.4)',
            }}
          >
            🔒 GENERAR REPORTE SEGURO Y CONFIDENCIAL
          </a>
        </div>
      </section>

      {/* ── PILARES ── */}
      <section style={{ padding:'56px 24px', background:'white', borderBottom:'1px solid #E8E4DF' }}>
        <div style={{
          maxWidth:840, margin:'0 auto',
          display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(210px,1fr))', gap:24,
        }}>
          {[
            { icon:'🛡', title:'Evidencia Legal Blindada',
              desc:'Cada reporte genera un registro con timestamp que BAHUMANA resguarda. Imposible de alterar o eliminar.' },
            { icon:'👤', title:'Anonimato Garantizado',
              desc:'Puedes reportar sin identificarte. Tu identidad nunca será revelada sin tu consentimiento explícito.' },
            { icon:'⚖', title:'Cero Represalias',
              desc:'La LFT y la NOM-035 te protegen. BAHUMANA monitorea el caso hasta su resolución.' },
          ].map((p) => (
            <div key={p.title} style={{
              padding:24, borderRadius:18, background:'#F8F7F4', border:'1px solid #E8E4DF',
            }}>
              <div style={{ fontSize:'2rem', marginBottom:12 }}>{p.icon}</div>
              <h3 style={{ fontWeight:700, color:'#0F172A', fontSize:'0.92rem', marginBottom:8 }}>{p.title}</h3>
              <p style={{ fontSize:'0.83rem', color:'#64748B', lineHeight:1.7, margin:0 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORÍAS ── */}
      <main style={{ flexGrow:1, padding:'64px 24px', background:'#F8F7F4' }}>
        <div style={{ maxWidth:840, margin:'0 auto' }}>

          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:28 }}>
            <div style={{
              width:4, height:32, borderRadius:4, flexShrink:0,
              background:'linear-gradient(to bottom, var(--color-secondary), var(--color-primary))',
            }}/>
            <h2 style={{ fontWeight:700, color:'#0F172A', fontSize:'1.15rem', margin:0 }}>
              ¿Qué deseas reportar?
            </h2>
          </div>

          <div style={{
            display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',
            gap:12, marginBottom:56,
          }}>
            {REPORT_CATEGORIES.map((label) => (
              <a
                key={label}
                href={`${reportUrl}&category=${encodeURIComponent(label)}`}
                className="cat-card"
                style={{
                  display:'flex', alignItems:'center', gap:12,
                  padding:'14px 16px', borderRadius:14,
                  background:'white', border:'1px solid #E8E4DF',
                }}
              >
                <div className="cat-dot" style={{
                  width:8, height:8, borderRadius:'50%',
                  background:'var(--color-primary)', flexShrink:0,
                }}/>
                <span style={{ fontSize:'0.87rem', fontWeight:600, color:'#334155' }}>{label}</span>
                <span style={{ marginLeft:'auto', color:'#CBD5E1', fontSize:'0.75rem' }}>→</span>
              </a>
            ))}
          </div>

          {/* Blockquote */}
          <blockquote style={{
            margin:0, padding:32, borderRadius:18, position:'relative', overflow:'hidden',
            background:'#1A1A2E', borderLeft:'4px solid #F59E0B',
          }}>
            <div style={{
              position:'absolute', top:0, right:0, width:120, height:120,
              borderRadius:'50%', background:'#F59E0B', opacity:.05,
              transform:'translate(30%,-30%)',
            }}/>
            <p style={{
              fontFamily:"'DM Serif Display',serif",
              color:'white', fontSize:'1rem', lineHeight:1.75,
              fontStyle:'italic', marginBottom:16,
            }}>
              "Todas las denuncias generan evidencia legal ante BAHUMANA, garantizando
              investigación justa y eliminando cualquier posibilidad de represalia o
              alteración de información."
            </p>
            <cite style={{
              color:'#FBBF24', fontSize:'0.68rem', fontWeight:700,
              letterSpacing:'0.13em', textTransform:'uppercase', fontStyle:'normal',
            }}>
              — Operación Independiente BAHUMANA para {legal_name}
            </cite>
          </blockquote>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer style={{
        padding:'40px 24px', background:'white',
        borderTop:'1px solid #E8E4DF', textAlign:'center',
      }}>
        <div style={{ maxWidth:720, margin:'0 auto', display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
          <p style={{ fontWeight:700, color:'#475569', fontSize:'0.85rem' }}>
            Privacidad y Confidencialidad Garantizada
          </p>
          <p style={{ fontSize:'0.75rem', color:'#94A3B8', lineHeight:1.7, maxWidth:440 }}>
            Operado con absoluta confidencialidad por <strong style={{ color:'#475569' }}>BAHUMANA</strong> para{' '}
            <strong style={{ color:'#475569' }}>{legal_name}</strong>.
          </p>
          <div style={{ display:'flex', gap:16, alignItems:'center', marginTop:4 }}>
            {([['ethika35.com','https://ethika35.com'],['konfidente.com','https://konfidente.com']] as const).map(([label,href]) => (
              <a key={label} href={href} style={{
                fontSize:'0.68rem', fontWeight:700, color:'#94A3B8',
                letterSpacing:'0.12em', textTransform:'uppercase', textDecoration:'none',
              }}>{label}</a>
            ))}
          </div>
          <a href="https://konfidente.com" target="_blank" rel="noopener noreferrer"
            style={{ marginTop:8, opacity:.3, transition:'opacity .2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '.3')}
          >
            <img src={konfidenteLogoUrl} alt="Konfidente"
              style={{ height:14, width:'auto', filter:'grayscale(1)' }} />
          </a>
          <p style={{ fontSize:'0.62rem', color:'#CBD5E1', marginTop:4, lineHeight:1.7 }}>
            © 2026 · Cumplimiento NOM-035-STPS-2018 · Ley Federal del Trabajo.
          </p>
        </div>
      </footer>
    </div>
  );
}
