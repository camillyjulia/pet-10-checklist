import { IconCode, IconStethoscope } from "@tabler/icons-react";

const profiles = [
  {
    id: "developer",
    label: "Desenvolvedor",
    description:
      "Avalie as iniciativas de inovação a partir da perspectiva de quem projeta, implementa ou mantém a solução.",
    icon: IconCode,
    tags: ["Arquitetura", "Qualidade", "Manutenção", "Segurança"],
    iconClass: "text-[#1C75BC]",
    iconBg: "bg-[#1C75BC]/10",
  },
  {
    id: "user",
    label: "Avaliador",
    description:
      "Avalie as iniciativas de inovação a partir da perspectiva de quem utiliza a solução no seu contexto de uso.",
    icon: IconStethoscope,
    tags: ["Usabilidade", "Experiência", "Acesso", "Impacto"],
    iconClass: "text-[#00A084]",
    iconBg: "bg-[#00A084]/10",
  },
];

function ProfileSelector({ selectedProfile, onSelectProfile }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
        Etapa 1
      </p>
      <h2 className="mt-1 text-xl font-bold text-[#004E78]">
        Selecione o perfil de avaliação
      </h2>
      <p className="mt-1 text-sm leading-7 text-slate-500">
        Escolha a perspectiva a partir da qual o checklist será respondido.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {profiles.map(
          ({ id, label, description, icon: Icon, tags, iconClass, iconBg }) => {
            const isSelected = selectedProfile === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onSelectProfile(id)}
                className={`rounded-2xl border p-5 text-left transition ${
                  isSelected
                    ? "border-[#00A084] bg-[#89CFC2]/20"
                    : "border-slate-200 bg-white hover:border-[#1C75BC] hover:bg-[#EFF6FF]"
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
                  >
                    <Icon size={20} className={iconClass} strokeWidth={1.75} />
                  </div>
                  <div
                    className={`mt-1 h-[18px] w-[18px] rounded-full border-2 transition ${
                      isSelected
                        ? "border-[#00A084] bg-[#00A084]"
                        : "border-slate-300 bg-white"
                    }`}
                  />
                </div>

                <p className="text-base font-bold text-slate-800">{label}</p>
                <p className="mt-1 text-sm leading-7 text-slate-500">
                  {description}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                        isSelected
                          ? "bg-[#89CFC2]/40 text-[#006E7C]"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
            );
          },
        )}
      </div>
    </section>
  );
}

export default ProfileSelector;
