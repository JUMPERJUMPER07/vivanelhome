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
    <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <AdminLoginForm />
    </section>
  );
}
