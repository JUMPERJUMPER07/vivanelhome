"use client";

import { useState } from "react";
import { Play, Volume2 } from "lucide-react";
import { ScriptPackage } from "@/types/domain";
import { Card } from "@/components/ui/card";

export function VideoPreview({ pack }: { pack: ScriptPackage }) {
  const [playing, setPlaying] = useState(false);

  return (
    <Card className="flex justify-center">
      <div className="relative aspect-[9/16] w-full max-w-[260px] rounded-[2rem] border border-white/15 bg-[linear-gradient(180deg,#1f2a44,#10172b_45%,#121c32)] p-3">
        <div className="h-full rounded-[1.6rem] border border-white/10 bg-[radial-gradient(circle_at_top,#2d4f7a_0%,#0f1728_70%)] p-4">
          <div className="mb-3 flex justify-between text-xs text-white/70">
            <span>09:16 preview</span>
            <Volume2 size={14} />
          </div>
          <div className="mb-5 rounded-xl border border-white/10 bg-black/20 p-3 text-sm">
            <p className="font-semibold">{pack.hook}</p>
          </div>
          <p className="mb-3 text-xs text-cyan-100">{playing ? "Playback ativo" : "Playback pausado"}</p>
          <div className="space-y-2 text-xs text-white/80">
            <p>1. Hook</p>
            <p>2. Problema</p>
            <p>3. Solucao</p>
            <p>4. CTA</p>
          </div>
          <button
            type="button"
            title="Play preview"
            onClick={() => setPlaying((prev) => !prev)}
            className="absolute right-7 bottom-7 rounded-full bg-[linear-gradient(130deg,var(--brand),var(--brand-2))] p-3 text-slate-900"
          >
            <Play size={16} fill="currentColor" />
          </button>
        </div>
      </div>
    </Card>
  );
}
