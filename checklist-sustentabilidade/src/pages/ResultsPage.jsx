import { useRef, useEffect } from "react";
import { IconArrowLeft } from "@tabler/icons-react";
import Header from "../components/Header";

const dimColors = {
  individual: "#89CFC2",
  social: "#1C75BC",
  economic: "#FFD95A",
  technical: "#00A084",
  environmental: "#F58A1F",
};

function getWorstQuestions(questions, answers, count = 3) {
  return [...questions]
    .filter((q) => answers[q.id] !== undefined)
    .sort((a, b) => (answers[a.id] ?? 5) - (answers[b.id] ?? 5))
    .slice(0, count);
}

function getDimensionScore(questions, answers) {
  const answered = questions.filter((q) => answers[q.id] !== undefined);
  if (answered.length === 0) return 0;
  const sum = answered.reduce((acc, q) => acc + answers[q.id], 0);
  return sum / answered.length;
}

function getGlobalScore(dimensions, groupedQuestions, answers) {
  const allScores = dimensions.map((d) =>
    getDimensionScore(groupedQuestions[d.id] || [], answers),
  );
  const valid = allScores.filter((s) => s > 0);
  if (!valid.length) return 0;
  return valid.reduce((a, b) => a + b, 0) / valid.length;
}

export default function ResultsPage({
  dimensions,
  groupedQuestions,
  answers,
  onRestart,
  onBack,
}) {
  const forestRef = useRef(null);
  const barRef = useRef(null);
  const forestInstance = useRef(null);
  const barInstance = useRef(null);

  const scores = dimensions.map((d) =>
    getDimensionScore(groupedQuestions[d.id] || [], answers),
  );
  const globalScore = getGlobalScore(dimensions, groupedQuestions, answers);
  const totalAnswered = Object.keys(answers).length;
  const totalQuestions = dimensions.reduce(
    (acc, d) => acc + (groupedQuestions[d.id]?.length || 0),
    0,
  );
  const dimLabels = dimensions.map((d) => d.name);
  const colors = dimensions.map((d) => dimColors[d.id] || "#1C75BC");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js";
    script.onload = () => buildCharts();
    document.head.appendChild(script);
    return () => {
      forestInstance.current?.destroy();
      barInstance.current?.destroy();
    };
  }, []);

  function buildCharts() {
    if (!forestRef.current || !barRef.current) return;
    forestInstance.current?.destroy();
    barInstance.current?.destroy();

    forestInstance.current = new window.Chart(forestRef.current, {
      type: "bar",
      data: {
        labels: dimLabels,
        datasets: [
          {
            label: "Intervalo (1–5)",
            data: dimLabels.map(() => [1, 5]),
            backgroundColor: "#f1f5f9",
            borderColor: "#cbd5e1",
            borderWidth: 0.5,
            borderRadius: 6,
            barPercentage: 0.25,
          },
          {
            label: "Score obtido",
            data: scores.map((s) => [s - 0.06, s + 0.06]),
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 0,
            borderRadius: 4,
            barPercentage: 0.25,
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: {
          x: {
            min: 0.5,
            max: 5.5,
            grid: { color: "#f1f5f9" },
            ticks: {
              stepSize: 1,
              font: { size: 11 },
              color: "#94a3b8",
              callback: (v) => (Number.isInteger(v) ? v : ""),
            },
            border: { display: false },
          },
          y: {
            grid: { display: false },
            ticks: { font: { size: 12 }, color: "#475569" },
            border: { display: false },
          },
        },
      },
      plugins: [
        {
          afterDraw(chart) {
            const ctx = chart.ctx;
            scores.forEach((s, i) => {
              const meta = chart.getDatasetMeta(1);
              if (!meta.data[i]) return;
              const bar = meta.data[i];
              ctx.save();
              ctx.font = "600 12px Inter, system-ui, sans-serif";
              ctx.fillStyle = "#004E78";
              ctx.textAlign = "left";
              ctx.fillText(s.toFixed(1), bar.x + 10, bar.y + 4);
              ctx.restore();
            });
          },
        },
      ],
    });

    const tooltipEl = document.getElementById("bar-tooltip");

    barInstance.current = new window.Chart(barRef.current, {
      type: "bar",
      data: {
        labels: dimLabels,
        datasets: [
          {
            label: "Score obtido",
            data: scores,
            backgroundColor: "#1C75BC",
            borderRadius: 8,
            borderSkipped: false,
            barPercentage: 0.4,
            categoryPercentage: 0.7,
          },
          {
            label: "Média esperada",
            data: dimLabels.map(() => 3.5),
            backgroundColor: "#89CFC2",
            borderRadius: 8,
            borderSkipped: false,
            barPercentage: 0.4,
            categoryPercentage: 0.7,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: {
          y: {
            min: 0,
            max: 5,
            grid: { color: "#f1f5f9" },
            ticks: { stepSize: 1, font: { size: 11 }, color: "#94a3b8" },
            border: { display: false },
          },
          x: {
            grid: { display: false },
            ticks: { font: { size: 12 }, color: "#475569" },
            border: { display: false },
          },
        },
        onHover(e, elements) {
          if (!elements.length || elements[0].datasetIndex !== 0) {
            tooltipEl.style.display = "none";
            return;
          }
          const idx = elements[0].index;
          const dim = dimensions[idx];
          const qs = getWorstQuestions(groupedQuestions[dim.id] || [], answers);
          tooltipEl.innerHTML = `
            <p style="font-size:13px;font-weight:700;color:#004E78;margin-bottom:8px">${dim.name} — 3 piores scores</p>
            ${qs
              .map(
                (q) => `
              <div style="display:flex;gap:8px;margin-bottom:5px;font-size:12px;color:#475569;line-height:1.5">
                <span style="font-weight:700;color:#1C75BC;flex-shrink:0">${answers[q.id]}</span>
                <span>${q.text}</span>
              </div>
            `,
              )
              .join("")}
          `;
          const wrapRect = tooltipEl.parentElement.getBoundingClientRect();
          let left = e.native.clientX - wrapRect.left + 12;
          if (left + 260 > wrapRect.width)
            left = e.native.clientX - wrapRect.left - 268;
          tooltipEl.style.left = left + "px";
          tooltipEl.style.top = e.native.clientY - wrapRect.top - 20 + "px";
          tooltipEl.style.display = "block";
        },
      },
    });

    barRef.current.addEventListener("mouseleave", () => {
      tooltipEl.style.display = "none";
    });
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto w-full max-w-7xl px-6 py-10">
        <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                Avaliação concluída
              </p>
              <h1 className="mt-1 text-2xl font-bold text-[#004E78]">
                Resultado da avaliação
              </h1>
              <p className="mt-1 text-sm leading-7 text-slate-500">
                Confira o desempenho da solução em cada dimensão avaliada.
              </p>
            </div>
            <div className="rounded-2xl bg-[#89CFC2]/20 px-5 py-3 text-center">
              <p className="text-xs font-bold uppercase tracking-wide text-[#006E7C]">
                Score global
              </p>
              <p className="mt-1 text-3xl font-bold text-[#004E78]">
                {globalScore.toFixed(1)}
              </p>
              <p className="text-xs text-slate-400">escala 1–5</p>
            </div>
          </div>
        </div>

        {/* Métricas */}
        <div className="mb-4 grid grid-cols-3 gap-3">
          {[
            {
              label: "Score global",
              value: globalScore.toFixed(1),
              sub: "escala de 1 a 5",
            },
            {
              label: "Dimensões avaliadas",
              value: dimensions.length,
              sub: "de 5 possíveis",
            },
            {
              label: "Perguntas respondidas",
              value: totalAnswered,
              sub: `de ${totalQuestions} no perfil`,
            },
          ].map((m) => (
            <div key={m.label} className="rounded-2xl bg-slate-50 p-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400">
                {m.label}
              </p>
              <p className="mt-1 text-2xl font-bold text-[#004E78]">
                {m.value}
              </p>
              <p className="text-xs text-slate-400">{m.sub}</p>
            </div>
          ))}
        </div>

        {/* Forest Plot */}
        <div className="mb-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold text-[#004E78]">
            Posicionamento por dimensão
          </p>
          <p className="mt-1 text-xs text-slate-400 mb-4">
            Forest plot — score obtido em cada dimensão (escala 1–5)
          </p>
          <div className="mb-3 flex flex-wrap gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[#1C75BC]" />
              Score obtido
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-slate-200 border border-slate-300" />
              Intervalo possível (1–5)
            </span>
          </div>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: `${dimensions.length * 56 + 60}px`,
            }}
          >
            <canvas ref={forestRef} />
          </div>
        </div>

        {/* Bar Chart */}
        <div
          className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          style={{ position: "relative" }}
        >
          <p className="text-sm font-bold text-[#004E78]">Score por dimensão</p>
          <p className="mt-1 text-xs text-slate-400 mb-4">
            Passe o cursor sobre uma barra para ver as perguntas com pior score
          </p>
          <div className="mb-3 flex flex-wrap gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[#1C75BC]" />
              Score obtido
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[#89CFC2]" />
              Média esperada (3.5)
            </span>
          </div>
          <div style={{ position: "relative", width: "100%", height: "280px" }}>
            <canvas ref={barRef} />
          </div>
          <div
            id="bar-tooltip"
            style={{
              display: "none",
              position: "absolute",
              background: "#fff",
              border: "0.5px solid #e2e8f0",
              borderRadius: "12px",
              padding: "0.85rem 1rem",
              zIndex: 10,
              minWidth: "240px",
              maxWidth: "300px",
              pointerEvents: "none",
            }}
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <IconArrowLeft size={16} strokeWidth={2} />
            Voltar para configuração
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="rounded-2xl bg-[#1C75BC] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1560a0]"
          >
            Nova avaliação →
          </button>
        </div>
      </main>
    </div>
  );
}
