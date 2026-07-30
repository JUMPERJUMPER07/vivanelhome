import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/store/admin-login-form";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { ADMIN_PRODUCTS_PATH } from "@/lib/admin-routes";

export const metadata: Metadata = {
  title: "Login do painel",
  description: "Acesso ao painel administrativo da VivanelHOME.",
};

export default async function AdminLoginPage() {
  const authenticated = await isAdminAuthenticated();

  if (authenticated) {
    redirect(ADMIN_PRODUCTS_PATH);
  }

  return (
    <div className="relative min-h-screen bg-[#07070a] flex items-center justify-center overflow-hidden px-4 py-12">
      {/* Glow de fundo roxo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[700px] bg-purple-700/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-96 w-96 bg-indigo-700/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Grade decorativa */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(109,40,217,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(109,40,217,0.03)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <section className="relative w-full max-w-md">
        {/* Logo no topo */}
        <div className="mb-8 flex items-center justify-center gap-2 text-white text-2xl font-black tracking-tight">
          <span className="text-white drop-shadow-md">Vivanel</span>
          <div className="flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 px-3 py-1 shadow-[0_0_20px_rgba(109,40,217,0.4)] ring-1 ring-white/20">
            <span className="text-[0.75em] font-black text-white tracking-[0.2em] uppercase">HOME</span>
          </div>
        </div>

        <AdminLoginForm />

        <p className="mt-6 text-center text-xs text-white/30 uppercase tracking-widest">
          Painel administrativo seguro — VivanelHOME
        </p>
      </section>
    </div>
  );
}
