// app/[client_slug]/page.tsx
export const dynamic = 'force-dynamic';

import React from 'react';
import { notFound } from 'next/navigation';

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface TenantConfig {
  legal_name: string;
  primary_color?: string;
  secondary_color?: string;
  modules?: { ethika35_enabled?: boolean };
}

// ─── DATA LAYER ───────────────────────────────────────────────────────────────

async function getTenantConfig(slug: string): Promise<TenantConfig | null> {
  if (!slug || slug.includes('.') || slug.length > 64) {
    console.log(`[Ethika35] BLOCKED slug="${slug}"`);
    return null;
  }

  const lambdaUrl =
    process.env.TENANT_API_URL ||
    process.env.NEXT_PUBLIC_TENANT_API_URL;

  if (!lambdaUrl) {
    console.error('[Ethika35] FATAL: No env TENANT_API_URL ni NEXT_PUBLIC_TENANT_API_URL');
    return null;
  }

  const endpoint = `${lambdaUrl.trim().replace(/\/$/, '')}/?slug=${encodeURIComponent(`TENANT#${slug.toLowerCase()}`)}`;
  console.log(`[Ethika35] FETCH → ${endpoint}`);

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(endpoint, { cache: 'no-store', signal: controller.signal });
    clearTimeout(timer);

    console.log(`[Ethika35] HTTP ${res.status}`);
    if (!res.ok) return null;

    // Leer como texto primero — permite loguear el raw body antes de parsear
    const raw = await res.text();
    console.log(`[Ethika35] RAW[0:400]: ${raw.substring(0, 400)}`);

    let data: any;
    try { data = JSON.parse(raw); }
    catch (e) { console.error('[Ethika35] JSON parse error:', e); return null; }

    // Unwrap patrones comunes de Lambda/API Gateway
    if (typeof data?.body === 'string')  { data = JSON.parse(data.body); }
    if (typeof data?.body === 'object')  { data = data.body; }
    if (data?.Item)                       { data = data.Item; }
    if (data?.data)                       { data = data.data; }

    console.log(`[Ethika35] KEYS: ${JSON.stringify(Object.keys(data ?? {}))}`);
    console.log(`[Ethika35] legal_name="${data?.legal_name}" ethika35_enabled=${data?.modules?.ethika35_enabled}`);

    return data as TenantConfig;
  } catch (err) {
    console.error('[Ethika35] CATCH:', err);
    return null;
  }
}

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

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
  const { client_slug: slug } = await params;
  const tenant = await getTenantConfig(slug);

  if (!tenant) {
    console.error(`[Ethika35] notFound() — null para "${slug}"`);
    notFound();
  }
  if (tenant.modules?.ethika35_enabled === false) {
    console.warn(`[Ethika35] notFound() — ethika35_enabled=false para "${slug}"`);
    notFound();
  }

  const { legal_name, primary_color = '1A1A2E', secondary_color = 'C41E3A' } = tenant;
  const slugLower = slug.toLowerCase();
  const reportUrl = `https://ethika35.factorintegracion.net/test?slug=${encodeURIComponent(slugLower)}`;

  const cssVars = {
    '--color-brand': `#${primary_color}`,
    '--color-accent': `#${secondary_color}`,
  } as React.CSSProperties;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ ...cssVars, fontFamily: "'DM Sans','Segoe UI',system-ui,sans-serif", background: '#F8F7F4' }}
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
          0%,100% { box-shadow: 0 0 0 0 rgba(196,30,58,.45); }
          50%      { box-shadow: 0 0 0 14px rgba(196,30,58,0); }
        }
        .btn-pulse { animation: pulse-ring 2.5s ease-in-out infinite; }

        @keyframes slide-up {
          from { opacity:0; transform:translateY(22px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .su   { animation: slide-up .55s ease-out forwards; }
        .su.d1{ animation-delay:.10s; opacity:0; }
        .su.d2{ animation-delay:.22s; opacity:0; }
        .su.d3{ animation-delay:.36s; opacity:0; }

        .cat-card { text-decoration:none; transition: transform .15s, box-shadow .15s; }
        .cat-card:hover { transform:translateY(-2px); box-shadow:0 6px 20px rgba(0,0,0,.08); }
        .cat-card:hover .cat-dot { transform:scale(1.6); background:var(--color-accent,#C41E3A); }
        .cat-dot { transition: transform .15s, background .15s; }
      `}</style>

      {/* ── HEADER ── */}
      <header
        className="w-full sticky top-0 z-50 bg-white"
        style={{ borderBottom:'1.5px solid #E8E4DF', boxShadow:'0 2px 16px rgba(0,0,0,.05)' }}
      >
        <div
          style={{
            maxWidth:1280, margin:'0 auto', height:72, padding:'0 24px',
            display:'grid', gridTemplateColumns:'1fr auto 1fr', alignItems:'center',
          }}
        >
          <div style={{ display:'flex', justifyContent:'flex-start' }}>
            <img src={`/pictures/${slugLower}_logo.png`} alt={legal_name}
              style={{ height:36, maxWidth:140, objectFit:'contain' }} />
          </div>
          <div style={{ display:'flex', justifyContent:'center' }}>
            <a href={reportUrl} className="btn-pulse"
              style={{
                display:'inline-flex', alignItems:'center', gap:8,
                padding:'10px 26px', borderRadius:12,
                fontWeight:700, fontSize:'0.82rem', letterSpacing:'0.09em',
                textTransform:'uppercase', color:'white', textDecoration:'none',
                background:'linear-gradient(135deg,#F59E0B 0%,#DC2626 100%)',
                whiteSpace:'nowrap',
              }}
            >
              ⚑ INICIAR DENUNCIA
            </a>
          </div>
          <div style={{ display:'flex', justifyContent:'flex-end' }}>
            <img src="/pictures/Logo_Ethika35.png" alt="Ethika35"
              style={{ height:36, maxWidth:130, objectFit:'contain' }} />
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
            marginBottom:32, padding:'7px 16px', borderRadius:999,
            background:'rgba(196,30,58,.15)', color:'#F87171',
            border:'1px solid rgba(248,113,113,.25)',
            fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase',
          }}>
            <span style={{
              width:7, height:7, borderRadius:'50%', background:'#F87171',
              display:'inline-block', animation:'pulse-ring 1.6s ease-in-out infinite',
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
            color:'#94A3B8', fontSize:'1.08rem', lineHeight:1.8,
            maxWidth:560, margin:'0 auto 36px',
          }}>
            Este canal{' '}
            <strong style={{ color:'#F1F5F9' }}>no lo opera {legal_name}</strong>.
            Lo administra exclusivamente{' '}
            <strong style={{ color:'#FBBF24' }}>BAHUMANA</strong>, un tercero independiente.
            Ningún directivo puede ver, modificar o eliminar tu reporte.
          </p>

          {/* CTA */}
          <a href={reportUrl} className="su d3 btn-pulse" style={{
            display:'inline-flex', alignItems:'center', gap:12,
            padding:'18px 40px', borderRadius:18,
            fontWeight:700, fontSize:'1.05rem', color:'white', textDecoration:'none',
            background:'linear-gradient(135deg,#B91C1C 0%,#DC2626 50%,#EF4444 100%)',
            boxShadow:'0 8px 32px rgba(220,38,38,.4)',
          }}>
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
              desc:'Cada reporte genera un registro legal con timestamp que BAHUMANA resguarda. Imposible de alterar o eliminar.' },
            { icon:'👤', title:'Anonimato Garantizado',
              desc:'Puedes reportar sin identificarte. Tu identidad nunca será revelada sin tu consentimiento explícito.' },
            { icon:'⚖', title:'Cero Represalias',
              desc:'La LFT y la NOM-035 te protegen. BAHUMANA monitorea el caso hasta su resolución.' },
          ].map((p) => (
            <div key={p.title} style={{ padding:24, borderRadius:18, background:'#F8F7F4', border:'1px solid #E8E4DF' }}>
              <div style={{ fontSize:'2rem', marginBottom:12 }}>{p.icon}</div>
              <h3 style={{ fontWeight:700, color:'#0F172A', fontSize:'0.92rem', marginBottom:8 }}>{p.title}</h3>
              <p  style={{ fontSize:'0.83rem', color:'#64748B', lineHeight:1.7, margin:0 }}>{p.desc}</p>
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
              background:'linear-gradient(to bottom,#F59E0B,#DC2626)',
            }}/>
            <h2 style={{ fontWeight:700, color:'#0F172A', fontSize:'1.15rem', margin:0 }}>
              ¿Qué deseas reportar?
            </h2>
          </div>

          <div style={{
            display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:12, marginBottom:56,
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
                  width:8, height:8, borderRadius:'50%', background:'#DC2626', flexShrink:0,
                }}/>
                <span style={{ fontSize:'0.87rem', fontWeight:600, color:'#334155' }}>{label}</span>
                <span style={{ marginLeft:'auto', color:'#CBD5E1', fontSize:'0.75rem' }}>→</span>
              </a>
            ))}
          </div>

          {/* Blockquote legal */}
          <blockquote style={{
            margin:0, padding:32, borderRadius:18, overflow:'hidden', position:'relative',
            background:'#1A1A2E', borderLeft:'4px solid #F59E0B',
          }}>
            <div style={{
              position:'absolute', top:0, right:0, width:120, height:120,
              borderRadius:'50%', background:'#F59E0B', opacity:.05,
              transform:'translate(30%,-30%)',
            }}/>
            <p style={{
              fontFamily:"'DM Serif Display',serif",
              color:'white', fontSize:'1.02rem', lineHeight:1.75,
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
      <footer style={{ padding:'40px 24px', background:'white', borderTop:'1px solid #E8E4DF', textAlign:'center' }}>
        <div style={{ maxWidth:720, margin:'0 auto', display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
          <img src="/pictures/Logo_Konfidente.png" alt="Konfidente"
            style={{ height:18, width:'auto', opacity:.3, filter:'grayscale(1)' }} />
          <div style={{ display:'flex', gap:16, alignItems:'center' }}>
            {[['ethika35.com','https://ethika35.com'],['konfidente.com','https://konfidente.com']].map(([label,href]) => (
              <a key={label} href={href} style={{
                fontSize:'0.68rem', fontWeight:700, color:'#94A3B8',
                letterSpacing:'0.12em', textTransform:'uppercase', textDecoration:'none',
              }}>{label}</a>
            ))}
          </div>
          <p style={{ fontSize:'0.66rem', color:'#CBD5E1', lineHeight:1.7, margin:0 }}>
            © 2026 Operado con absoluta confidencialidad por BAHUMANA para {legal_name}.<br/>
            Cumplimiento NOM-035-STPS-2018 · Ley Federal del Trabajo.
          </p>
        </div>
      </footer>
    </div>
  );
}
