import React, { useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { parse } from 'mathjs';
import { Activity, Info, Sparkles, TrendingUp, X } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface GraphingPanelProps {
  onClose: () => void;
  language: Language;
  initialFunction?: string;
}

type RangeState = {
  min: number;
  max: number;
};

const GraphingPanel: React.FC<GraphingPanelProps> = ({ onClose, language, initialFunction = 'x^2' }) => {
  const t = translations[language];
  const [equation, setEquation] = useState(initialFunction);
  const [range, setRange] = useState<RangeState>({ min: -10, max: 10 });
  const [error, setError] = useState<string | null>(null);

  const presets = useMemo(
    () => [
      { label: t.graphPresetQuadratic, equation: 'x^2 - 4', range: { min: -6, max: 6 } },
      { label: t.graphPresetLinear, equation: '2x + 1', range: { min: -10, max: 10 } },
      { label: t.graphPresetTrig, equation: 'sin(x)', range: { min: -12, max: 12 } },
      { label: t.graphPresetRational, equation: '1/(x-2)', range: { min: -10, max: 10 } }
    ],
    [t]
  );

  const data = useMemo(() => {
    setError(null);
    const points: Array<{ x: number; y: number }> = [];

    try {
      const node = parse(equation);
      const code = node.compile();
      const steps = 180;
      const step = (range.max - range.min) / steps;

      for (let i = 0; i <= steps; i += 1) {
        const x = range.min + i * step;
        try {
          const y = code.evaluate({ x });
          if (typeof y === 'number' && Number.isFinite(y) && Math.abs(y) < 100000) {
            points.push({ x: Number(x.toFixed(2)), y: Number(y.toFixed(2)) });
          }
        } catch (innerError) {
          void innerError;
        }
      }
    } catch (graphError) {
      setError(t.graphInvalid);
    }

    return points;
  }, [equation, range, t.graphInvalid]);

  const insights = useMemo(() => {
    if (error || data.length === 0) return null;

    const yValues = data.map((point) => point.y);
    const maxPoint = data.reduce((best, point) => (point.y > best.y ? point : best), data[0]);
    const minPoint = data.reduce((best, point) => (point.y < best.y ? point : best), data[0]);
    const yIntercept = data.find((point) => Math.abs(point.x) < 0.06);
    const xIntercepts: number[] = [];

    for (let i = 0; i < data.length - 1; i += 1) {
      const current = data[i];
      const next = data[i + 1];
      if (current.y === 0) {
        xIntercepts.push(current.x);
      } else if (current.y * next.y < 0) {
        xIntercepts.push(Number((((current.x + next.x) / 2)).toFixed(2)));
      }
    }

    return {
      yIntercept: yIntercept ? Number(yIntercept.y.toFixed(2)) : null,
      xIntercepts: [...new Set(xIntercepts)].slice(0, 4),
      maxPoint,
      minPoint,
      spread: Math.max(...yValues) - Math.min(...yValues)
    };
  }, [data, error]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-md" onClick={onClose} />

      <div className="relative flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-white/15 bg-white shadow-[0_35px_120px_rgba(2,12,27,0.34)]">
        <div className="bg-slate-950 px-5 py-4 text-white sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-300/12 text-cyan-200 ring-1 ring-cyan-100/20">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-xl font-bold">Interactive Grapher</h2>
                <p className="text-xs uppercase tracking-[0.28em] text-cyan-100/65">{t.graphInsights}</p>
              </div>
            </div>
            <button onClick={onClose} className="rounded-full border border-white/10 bg-white/6 p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid min-h-0 flex-1 gap-0 lg:grid-cols-[320px_1fr]">
          <aside className="overflow-y-auto border-b border-slate-100 bg-slate-50/85 p-5 sm:p-6 lg:border-b-0 lg:border-r">
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.28em] text-slate-400">
                  Function f(x)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-sm text-slate-400">f(x) =</span>
                  <input
                    type="text"
                    value={equation}
                    onChange={(event) => setEquation(event.target.value)}
                    className={`w-full rounded-2xl border bg-white py-3 pl-16 pr-4 font-mono text-sm text-slate-700 outline-none transition-all focus:ring-2 focus:ring-cyan-500 ${
                      error ? 'border-red-300' : 'border-slate-200'
                    }`}
                    placeholder="x^2 + 2x + 1"
                  />
                </div>
                {error && <p className="mt-2 text-xs font-medium text-red-500">{error}</p>}
              </div>

              <div>
                <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-slate-400">
                  <Sparkles className="h-3.5 w-3.5" />
                  Presets
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {presets.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        setEquation(preset.equation);
                        setRange(preset.range);
                      }}
                      className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-left text-sm font-medium text-slate-700 transition-all hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-sm"
                    >
                      <div>{preset.label}</div>
                      <div className="mt-1 font-mono text-xs text-slate-400">{preset.equation}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-slate-400">
                  <Activity className="h-3.5 w-3.5" />
                  {t.graphWindow}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <label className="text-sm text-slate-500">
                    <div className="mb-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">X Min</div>
                    <input
                      type="number"
                      value={range.min}
                      onChange={(event) => setRange((prev) => ({ ...prev, min: Number(event.target.value) }))}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-700 outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </label>
                  <label className="text-sm text-slate-500">
                    <div className="mb-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">X Max</div>
                    <input
                      type="number"
                      value={range.max}
                      onChange={(event) => setRange((prev) => ({ ...prev, max: Number(event.target.value) }))}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-700 outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </label>
                </div>
              </div>

              {insights && (
                <div className="rounded-[1.6rem] border border-cyan-100 bg-white p-4 shadow-sm">
                  <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-cyan-700">
                    <Info className="h-3.5 w-3.5" />
                    {t.graphInsights}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-slate-50 px-3 py-3">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">{t.graphYIntercept}</div>
                      <div className="mt-1 font-mono text-sm font-semibold text-slate-700">
                        {insights.yIntercept !== null ? `(0, ${insights.yIntercept})` : 'None'}
                      </div>
                    </div>
                    <div className="rounded-2xl bg-slate-50 px-3 py-3">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">{t.graphXIntercepts}</div>
                      <div className="mt-1 font-mono text-sm font-semibold text-slate-700">
                        {insights.xIntercepts.length > 0 ? insights.xIntercepts.join(', ') : 'None'}
                      </div>
                    </div>
                    <div className="rounded-2xl bg-slate-50 px-3 py-3">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">{t.graphMax}</div>
                      <div className="mt-1 font-mono text-sm font-semibold text-slate-700">
                        ({insights.maxPoint.x}, {insights.maxPoint.y})
                      </div>
                    </div>
                    <div className="rounded-2xl bg-slate-50 px-3 py-3">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">{t.graphMin}</div>
                      <div className="mt-1 font-mono text-sm font-semibold text-slate-700">
                        ({insights.minPoint.x}, {insights.minPoint.y})
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="rounded-[1.6rem] border border-slate-200 bg-white px-4 py-4 text-xs leading-6 text-slate-500">
                <div className="mb-2 font-bold uppercase tracking-[0.26em] text-slate-400">{t.graphTips}</div>
                <ul className="space-y-1">
                  <li>Use `^` for powers, like `x^2`.</li>
                  <li>Try `sin(x)`, `cos(x)`, `sqrt(x)` or `exp(x)`.</li>
                  <li>Rational functions like `1/(x-2)` are great for spotting asymptotes.</li>
                </ul>
              </div>
            </div>
          </aside>

          <section className="min-h-[340px] bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.10),_transparent_28%),linear-gradient(180deg,_rgba(248,250,252,1),_rgba(241,245,249,1))] p-4 sm:p-5">
            <div className="h-full rounded-[1.8rem] border border-white bg-white/80 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 sm:px-5">
                <div>
                  <div className="text-sm font-semibold text-slate-700">{equation}</div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-slate-400">Live plot</div>
                </div>
                {insights && (
                  <div className="rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-700">
                    Range {insights.spread.toFixed(2)}
                  </div>
                )}
              </div>

              <div className="relative h-[420px] sm:h-[520px] p-3 sm:p-5">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 18, right: 8, bottom: 18, left: 0 }}>
                    <defs>
                      <linearGradient id="graphStroke" x1="0" x2="1">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#0f172a" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" />
                    <XAxis dataKey="x" type="number" domain={[range.min, range.max]} stroke="#64748b" fontSize={12} />
                    <YAxis type="number" stroke="#64748b" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: '16px',
                        border: '1px solid rgba(226, 232, 240, 0.9)',
                        boxShadow: '0 18px 50px -12px rgba(15, 23, 42, 0.18)',
                        backgroundColor: 'rgba(255,255,255,0.96)'
                      }}
                      labelStyle={{ fontWeight: 700, color: '#0f172a' }}
                    />
                    <ReferenceLine x={0} stroke="#94a3b8" strokeWidth={1.6} />
                    <ReferenceLine y={0} stroke="#94a3b8" strokeWidth={1.6} />
                    <Line type="monotone" dataKey="y" stroke="url(#graphStroke)" strokeWidth={3.2} dot={false} animationDuration={520} />
                  </LineChart>
                </ResponsiveContainer>

                {data.length === 0 && !error && (
                  <div className="absolute inset-0 flex items-center justify-center text-center text-sm italic text-slate-400">
                    {t.graphEmpty}
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default GraphingPanel;
