import { CalendarPost } from "@/types/domain";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function CalendarBoard({ posts }: { posts: CalendarPost[] }) {
  return (
    <Card className="space-y-3">
      <h3 className="text-lg font-semibold">Agenda da semana</h3>
      <div className="space-y-2">
        {posts.map((post) => (
          <div key={post.id} className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/5 p-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-medium">{post.title}</p>
              <p className="text-sm text-[var(--muted)]">
                {post.date} • {post.channel}
              </p>
            </div>
            <Badge
              className={
                post.status === "Publicado"
                  ? "bg-emerald-400/20 text-emerald-100"
                  : post.status === "Pronto"
                    ? "bg-blue-400/20 text-blue-100"
                    : "bg-white/10 text-white"
              }
            >
              {post.status}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}
