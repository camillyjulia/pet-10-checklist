import { useState } from "react";
import {
  IconUser,
  IconUsers,
  IconCoin,
  IconSettings,
  IconLeaf,
} from "@tabler/icons-react";
import DimensionModal from "./DimensionModal";

const dimensions = [
  {
    key: "individual",
    label: "Individual",
    desc: "Impacto nas pessoas",
    icon: IconUser,
  },
  {
    key: "social",
    label: "Social",
    desc: "Comunidade e sistema",
    icon: IconUsers,
  },
  {
    key: "economica",
    label: "Econômica",
    desc: "Uso de recursos",
    icon: IconCoin,
  },
  {
    key: "tecnica",
    label: "Técnica",
    desc: "Qualidade e evolução",
    icon: IconSettings,
  },
  {
    key: "ambiental",
    label: "Ambiental",
    desc: "Responsabilidade",
    icon: IconLeaf,
  },
];

const steps = [
  "Escolha o perfil de avaliação: desenvolvedor ou avaliador.",
  "Selecione as dimensões que deseja incluir na análise.",
  "Responda às perguntas organizadas por dimensão.",
  "Visualize um resumo final da avaliação.",
];

function IntroSection({ onStart }) {
  const [activeDimension, setActiveDimension] = useState(null);

  return (
    <>
      <section className="mx-auto grid w-full max-w-7xl gap-4 px-6 py-10 lg:grid-cols-[1.4fr_0.6fr] lg:py-14">
        {/* Card principal */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:p-10">
          <span className="inline-flex rounded-full bg-[#89CFC2]/25 px-4 py-1 text-sm font-semibold text-[#006E7C]">
            Ferramenta de apoio à avaliação
          </span>

          <h2 className="mt-6 text-3xl font-bold leading-tight text-[#004E78]">
            Você sabe qual é a sustentabilidade das suas ações em saúde?
          </h2>

          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
            Toda decisão em saúde gera impacto.{" "}
            <span className="font-semibold text-slate-800">
              Saúde não tem preço — mas tem um custo para o sistema e para o
              nosso futuro.
            </span>
          </p>

          <p className="mt-2 max-w-3xl text-base leading-8 text-slate-600">
            Mas você já parou para refletir sobre quais impactos suas ações de
            desenvolvimento estão produzindo — hoje e no futuro?
          </p>

          <p className="mt-2 max-w-3xl text-base leading-8 text-slate-600">
            Soluções em saúde não se sustentam apenas pela sua funcionalidade.
            Elas precisam ser{" "}
            <span className="font-semibold text-slate-800">
              efetivas, viáveis, responsáveis e duradouras.
            </span>
          </p>

          <hr className="my-5 border-slate-200" />

          <p className="max-w-3xl text-base leading-8 text-slate-600">
            Pensando nisso, desenvolvemos uma ferramenta simples e estruturada
            que apoia você a analisar suas iniciativas sob múltiplas dimensões:
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {dimensions.map(({ key, label, desc, icon: Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveDimension(key)}
                className="flex flex-col gap-2 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 text-left transition hover:border-[#1C75BC] hover:bg-[#EFF6FF]"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#1C75BC]/10">
                  <Icon
                    size={16}
                    className="text-[#1C75BC]"
                    strokeWidth={1.75}
                  />
                </div>
                <span className="text-sm font-semibold text-slate-800">
                  {label}
                </span>
                <span className="text-xs leading-5 text-slate-500">{desc}</span>
                <span className="text-[10px] text-slate-400">
                  Clique para saber mais
                </span>
              </button>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={onStart}
              className="rounded-2xl bg-[#1C75BC] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#1560a0]"
            >
              Iniciar avaliação →
            </button>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm text-slate-500">
              Recomendado: avaliar todas as dimensões
            </div>
          </div>
        </div>

        {/* Card lateral */}
        <div className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-[#004E78]">Como funciona</h3>

          <ol className="mt-5 flex flex-col">
            {steps.map((step, i) => (
              <li
                key={i}
                className="flex items-start gap-3 border-b border-slate-100 py-3 last:border-none"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1C75BC]/10 text-xs font-bold text-[#1C75BC]">
                  {i + 1}
                </span>
                <span className="text-sm leading-6 text-slate-600">{step}</span>
              </li>
            ))}
          </ol>

          <div className="mt-auto border-t border-slate-100 pt-5">
            <p className="text-sm leading-7 text-slate-500">
              Avalie sua solução de forma simples, guiada e organizada. Amplie
              sua visão e tome decisões mais conscientes.
            </p>
          </div>
        </div>
      </section>

      {activeDimension && (
        <DimensionModal
          dimensionKey={activeDimension}
          onClose={() => setActiveDimension(null)}
        />
      )}
    </>
  );
}

export default IntroSection;
