import { audiences, languageOptions, nicheOptions, tones } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/button";
import { Select } from "@/components/ui/field";

export default function OnboardingPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <Card className="space-y-5">
        <div>
          <p className="text-xs uppercase tracking-wide text-[var(--muted)]">Passo 2 de 7</p>
          <h2 className="text-2xl font-semibold">Defina seu perfil de criacao</h2>
          <p className="text-sm text-[var(--muted)]">Escolha nicho, idioma, tom e publico para gerar ideias virais do dia.</p>
          <p className="mt-1 text-xs text-cyan-200/90">Cobertura ampla de nichos: Gospel, Carros, Cursos, Fitness, Financas, Humor e mais.</p>
        </div>
        <form action="/ideas" className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-[var(--muted)]">Nicho</label>
            <Select name="niche" defaultValue="Gospel">
              {nicheOptions.map((item) => (
                <option key={item.id} value={item.label} className="bg-slate-900">
                  {item.label} ({item.growth})
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-sm text-[var(--muted)]">Idioma</label>
            <Select name="language" defaultValue="Portuguese">
              {languageOptions.map((item) => (
                <option key={item} value={item} className="bg-slate-900">
                  {item}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-sm text-[var(--muted)]">Tom</label>
            <Select name="tone" defaultValue="Educativo">
              {tones.map((item) => (
                <option key={item} value={item} className="bg-slate-900">
                  {item}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-sm text-[var(--muted)]">Publico</label>
            <Select name="audience" defaultValue="Criadores">
              {audiences.map((item) => (
                <option key={item} value={item} className="bg-slate-900">
                  {item}
                </option>
              ))}
            </Select>
          </div>
          <div className="md:col-span-2 flex flex-wrap gap-3 pt-1">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-[linear-gradient(135deg,var(--brand),var(--brand-2))] px-4 py-2 text-sm font-semibold text-slate-950 transition hover:opacity-90"
            >
              Gerar ideias virais do dia
            </button>
            <LinkButton href="/ideas" variant="secondary">
              Ver sugestoes gerais
            </LinkButton>
          </div>
        </form>
        <div className="flex flex-wrap gap-3">
          <LinkButton href="/dashboard" variant="secondary">
            Pular para dashboard
          </LinkButton>
        </div>
      </Card>
    </div>
  );
}
