export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl rounded-3xl border border-white/10 bg-[linear-gradient(150deg,#0f1a2f,#0a1222)] p-2 lg:grid lg:grid-cols-2">
        <div className="hidden rounded-2xl bg-[radial-gradient(circle_at_top_left,#2d5f91_0%,#10203a_55%,#0a1324_95%)] p-8 lg:block">
          <p className="mb-4 text-sm text-cyan-200">ViralTok AI</p>
          <h1 className="text-3xl font-semibold leading-tight">Crie videos diarios para TikTok com roteiro, hook e CTA em minutos.</h1>
          <p className="mt-4 text-sm text-[var(--muted)]">MVP com ideias virais, preview 9:16, calendario e billing mockado.</p>
        </div>
        <div className="rounded-2xl bg-[#0c1528] p-6 lg:p-10">{children}</div>
      </div>
    </div>
  );
}
