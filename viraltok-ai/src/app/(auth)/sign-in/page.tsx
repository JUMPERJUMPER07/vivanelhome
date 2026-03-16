import Link from "next/link";
import { Input } from "@/components/ui/field";
import { LinkButton } from "@/components/ui/button";

export default function SignInPage() {
  return (
    <main className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold">Entrar</h2>
        <p className="text-sm text-[var(--muted)]">Acesse sua conta para gerar videos virais diarios.</p>
      </div>
      <form className="space-y-3">
        <Input type="email" placeholder="Email" defaultValue="creator@viraltok.ai" />
        <Input type="password" placeholder="Senha" defaultValue="123456" />
        <LinkButton href="/onboarding" className="w-full">
          Entrar e continuar
        </LinkButton>
      </form>
      <p className="text-sm text-[var(--muted)]">
        Nao tem conta?{" "}
        <Link href="/sign-up" className="text-cyan-200">
          Criar agora
        </Link>
      </p>
    </main>
  );
}
