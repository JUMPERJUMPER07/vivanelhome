import Link from "next/link";
import { Input } from "@/components/ui/field";
import { LinkButton } from "@/components/ui/button";

export default function SignUpPage() {
  return (
    <main className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold">Criar conta</h2>
        <p className="text-sm text-[var(--muted)]">Comece seu fluxo IA de conteudo viral em menos de 1 minuto.</p>
      </div>
      <form className="space-y-3">
        <Input placeholder="Nome completo" defaultValue="Creator Pro" />
        <Input type="email" placeholder="Email" defaultValue="creator@viraltok.ai" />
        <Input type="password" placeholder="Senha" defaultValue="123456" />
        <LinkButton href="/onboarding" className="w-full">
          Criar conta e iniciar
        </LinkButton>
      </form>
      <p className="text-sm text-[var(--muted)]">
        Ja possui conta?{" "}
        <Link href="/sign-in" className="text-cyan-200">
          Fazer login
        </Link>
      </p>
    </main>
  );
}
