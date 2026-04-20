// app/[client_slug]/page.tsx
// CRÍTICO: SSR puro. Sin prefijo NEXT_PUBLIC_ — esta URL NUNCA debe exponerse al cliente.
export const dynamic = 'force-dynamic';

import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface TenantConfig {
  legal_name: string;
  primary_color?: string;   // Hex sin #, ej: "1A2B6D"
  secondary_color?: string;
  modules?: {
    ethika35_enabled?: boolean;
  };
}

// ─── DATA LAYER ───────────────────────────────────────────────────────────────

async function getTenantConfig(slug: string): Promise<TenantConfig | null> {
  const lambdaUrl = process.env.TENANT_API_URL || process.env.NEXT_PUBLIC_TENANT_API_URL;
  if (!lambdaUrl) return null;

  // 1. Limpieza total de la URL: Quitamos cualquier diagonal al final
  const base = lambdaUrl.trim().replace(/\/+$/, "");
  
  // 2. Construcción limpia: SIN diagonal antes del ?, para que API Gateway no se confunda
  const searchSlug = "TENANT#" + slug.toLowerCase();
  const endpoint = `${base}?slug=${encodeURIComponent(searchSlug)}`;

  console.log(`[Ethika35] Buscando en BD: ${searchSlug}`);

  try {
    const res = await fetch(endpoint, { 
      cache: 'no-store',
      headers: { 'Accept': 'application/json' }
    });

    if (!res.ok) {
      console.error(`[Ethika35] Error HTTP ${res.status} para ${slug}`);
      return null;
    }

    const data = await res.json();
    
    // 3. Extracción Directa: Tu Lambda ya hace result.Items[0], así que data ES el registro.
    // Pero por seguridad, si viene envuelto en Item, lo sacamos.
    const item = data.Item || data;

    if (!item || !item.branding) {
      console.error("[Ethika35] El registro existe pero no tiene configuración de branding.");
      return null;
    }

    return item as TenantConfig;
  } catch (err) {
    console.error("[Ethika35] Error de conexión:", err);
    return null;
  }
}


  
// ─── REPORT CATEGORIES ────────────────────────────────────────────────────────

const REPORT_CATEGORIES = [
  { label: 'Acoso Laboral', icon: '⚠' },
  { label: 'Acoso Sexual', icon: '🛑' },
  { label: 'Sobornos / Corrupción', icon: '⚖' },
  { label: 'Robo o Fraude', icon: '🔒' },
  { label: 'Conflicto de Intereses', icon: '⚡' },
  { label: 'Maltrato / NOM-035', icon: '📋' },
  { label: 'Discriminación', icon: '🤝' },
  { label: 'Incumplimiento de Políticas', icon: '📌' },
] as const;

// ─── PAGE COMPONENT ───────────────────────────────────────────────────────────

export default async function EthikaCustomerPortal({
  params,
}: {
  params: Promise<{ client_slug: string }>;
}) {
  const { client_slug: slug } = await params;
  const tenant = await getTenantConfig(slug);

  // Módulo deshabilitado o tenant inexistente → 404 nativo de Next.js
  if (!tenant) {
    console.error(`[Ethika35] notFound — tenant null para slug="${slug}"`);
    notFound();
  }
  if (tenant.modules?.ethika35_enabled === false) {
    console.warn(`[Ethika35] notFound — ethika35_enabled=false para slug="${slug}"`);
    notFound();
  }

  const { legal_name, primary_color = '1A1A2E', secondary_color = 'C41E3A' } = tenant;

  // CSS Custom Properties inyectadas desde la DB — colores dinámicos por tenant
  const tenantStyles = {
    '--color-brand': `#${primary_color}`,
    '--color-accent': `#${secondary_color}`,
  } as React.CSSProperties;

  const slugLower = slug.toLowerCase();
  const reportUrl = `https://ethika35.factorintegracion.net/test?slug=${encodeURIComponent(slugLower)}`;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        ...tenantStyles,
        fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
        background: '#F8F7F4',
      }}
    >
      {/* ── GOOGLE FONTS INLINE (sin _document.tsx externo) ─────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=DM+Serif+Display&display=swap');

        /* Grain texture sobre el hero */
        .grain::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
        }
        .grain > * { position: relative; z-index: 2; }

        @keyframes pulse-ring {
          0%, 100% { box-shadow: 0 0 0 0 rgba(196, 30, 58, 0.4); }
          50% { box-shadow: 0 0 0 12px rgba(196, 30, 58, 0); }
        }
        .btn-alert { animation: pulse-ring 2.5s ease-in-out infinite; }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.6s ease-out forwards; }
        .delay-1 { animation-delay: 0.1s; opacity: 0; }
        .delay-2 { animation-delay: 0.2s; opacity: 0; }
        .delay-3 { animation-delay: 0.3s; opacity: 0; }

        .category-card:hover .category-dot {
          transform: scale(1.5);
          background-color: var(--color-accent);
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════════════
          HEADER — 3 columnas rígidas, sticky, sombra editorial
      ══════════════════════════════════════════════════════════════════════ */}
      <header
        className="w-full sticky top-0 z-50 bg-white"
        style={{ borderBottom: '2px solid #E8E4DF', boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}
      >
        <div
          className="w-full mx-auto grid h-[72px] px-6"
          style={{ maxWidth: '1280px', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center' }}
        >
          {/* Columna 1: Logo cliente */}
          <div className="flex items-center justify-start">
            <img
              src={`/pictures/${slugLower}_logo.png`}
              alt={legal_name}
              className="h-9 w-auto object-contain"
              style={{ maxWidth: '140px' }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>

          {/* Columna 2: CTA Central — elemento de mayor peso visual */}
          <div className="flex items-center justify-center">
            <a
              href={reportUrl}
              className="btn-alert relative inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-white text-sm tracking-wide uppercase transition-all duration-150 hover:brightness-110 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #F59E0B 0%, #DC2626 100%)',
                letterSpacing: '0.08em',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ fontSize: '16px' }}>⚑</span>
              INICIAR DENUNCIA
            </a>
          </div>

          {/* Columna 3: Logo Ethika35 */}
          <div className="flex items-center justify-end">
            <img
              src="/pictures/Logo_Ethika35.png"
              alt="Ethika35"
              className="h-9 w-auto object-contain"
              style={{ maxWidth: '130px' }}
            />
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════════════
          HERO — Declaración de seguridad, inmersiva y de alto impacto
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="grain relative py-16 px-6"
        style={{
          background: 'linear-gradient(160deg, #1A1A2E 0%, #16213E 60%, #0F3460 100%)',
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="animate-slide-up inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
            style={{ background: 'rgba(196,30,58,0.15)', color: '#F87171', border: '1px solid rgba(248,113,113,0.3)' }}
          >
            <span className="w-2 h-2 rounded-full bg-red-400 inline-block" style={{ animation: 'pulse-ring 1.5s ease-in-out infinite' }} />
            Canal Oficial de Reportes — {legal_name}
          </div>

          <h1
            className="animate-slide-up delay-1"
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: '#FAFAF8',
              lineHeight: 1.15,
              marginBottom: '1.5rem',
            }}
          >
            Tu voz está protegida.<br />
            <span style={{ color: '#FBBF24' }}>Siempre.</span>
          </h1>

          <p
            className="animate-slide-up delay-2 text-lg"
            style={{ color: '#94A3B8', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto 2.5rem' }}
          >
            Este canal <strong style={{ color: '#F1F5F9' }}>no lo opera {legal_name}</strong>. Es administrado exclusivamente por{' '}
            <strong style={{ color: '#FBBF24' }}>BAHUMANA</strong>, un tercero independiente. Ningún directivo
            puede ver, modificar o bloquear tu reporte.
          </p>

          <a
            href={reportUrl}
            className="animate-slide-up delay-3 btn-alert inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-white text-lg transition-all duration-150 hover:brightness-110 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #B91C1C 0%, #DC2626 50%, #EF4444 100%)',
              boxShadow: '0 8px 32px rgba(220,38,38,0.4)',
            }}
          >
            <span style={{ fontSize: '24px' }}>🔒</span>
            GENERAR REPORTE SEGURO Y CONFIDENCIAL
          </a>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          GARANTÍAS — Tres pilares de confianza
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-12 px-6 bg-white" style={{ borderBottom: '1px solid #E8E4DF' }}>
        <div
          className="max-w-3xl mx-auto grid gap-6"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}
        >
          {[
            {
              icon: '🛡',
              title: 'Evidencia Legal Blindada',
              desc: 'Cada reporte genera un registro legal con timestamp que BAHUMANA resguarda. Imposible de alterar o eliminar.',
            },
            {
              icon: '👤',
              title: 'Anonimato Garantizado',
              desc: 'Puedes reportar sin identificarte. Tu identidad nunca será revelada sin tu consentimiento explícito.',
            },
            {
              icon: '⚖',
              title: 'Cero Represalias',
              desc: 'La Ley Federal del Trabajo y la NOM-035 te protegen. BAHUMANA monitorea el caso hasta su resolución.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-2xl"
              style={{ background: '#F8F7F4', border: '1px solid #E8E4DF' }}
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-slate-900 mb-2" style={{ fontSize: '1rem' }}>
                {item.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CATEGORÍAS DE DENUNCIA
      ══════════════════════════════════════════════════════════════════════ */}
      <main className="flex-grow py-16 px-6" style={{ background: '#F8F7F4' }}>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-1 h-8 rounded-full"
              style={{ background: 'linear-gradient(to bottom, #F59E0B, #DC2626)' }}
            />
            <h2 className="font-bold text-slate-900 text-xl tracking-tight">
              ¿Qué deseas reportar?
            </h2>
          </div>

          <div
            className="grid gap-3 mb-12"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}
          >
            {REPORT_CATEGORIES.map(({ label, icon }) => (
              <a
                key={label}
                href={`${reportUrl}&category=${encodeURIComponent(label)}`}
                className="category-card flex items-center gap-3 p-4 rounded-xl bg-white transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group"
                style={{ border: '1px solid #E8E4DF', textDecoration: 'none' }}
              >
                <div
                  className="category-dot w-2 h-2 rounded-full flex-shrink-0 transition-all duration-200"
                  style={{ background: '#DC2626' }}
                />
                <span className="text-slate-700 font-medium text-sm group-hover:text-slate-900">
                  {label}
                </span>
                <span className="ml-auto text-slate-300 text-xs group-hover:text-slate-400">→</span>
              </a>
            ))}
          </div>

          {/* Quote de autoridad legal */}
          <blockquote
            className="relative p-8 rounded-2xl overflow-hidden"
            style={{ background: '#1A1A2E', borderLeft: '4px solid #F59E0B' }}
          >
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5"
              style={{ background: '#F59E0B', transform: 'translate(30%, -30%)' }}
            />
            <p className="text-white text-lg leading-relaxed italic mb-4" style={{ fontFamily: "'DM Serif Display', serif" }}>
              "Todas las denuncias generan evidencia legal ante BAHUMANA, garantizando investigación justa
              y eliminando cualquier posibilidad de represalia o alteración de información."
            </p>
            <cite className="text-yellow-400 text-xs font-bold tracking-widest uppercase not-italic">
              — Operación Independiente BAHUMANA para {legal_name}
            </cite>
          </blockquote>
        </div>
      </main>

      {/* ══════════════════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════════════════ */}
      <footer
        className="py-10 px-6 text-center"
        style={{ background: 'white', borderTop: '1px solid #E8E4DF' }}
      >
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-3">
          <img
            src="/pictures/Logo_Konfidente.png"
            alt="Konfidente"
            className="h-5 w-auto grayscale opacity-30"
          />
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <a
              href="https://ethika35.com"
              className="hover:text-red-600 transition-colors font-medium tracking-widest uppercase"
            >
              ethika35.com
            </a>
            <span>·</span>
            <a
              href="https://konfidente.com"
              className="hover:text-slate-600 transition-colors tracking-widest uppercase"
            >
              konfidente.com
            </a>
          </div>
          <p className="text-[11px] text-slate-300 mt-1">
            © 2026 Operado con absoluta confidencialidad por BAHUMANA para {legal_name}.
            <br />
            Cumplimiento NOM-035-STPS-2018 · Ley Federal del Trabajo.
          </p>
        </div>
      </footer>
    </div>
  );
}
