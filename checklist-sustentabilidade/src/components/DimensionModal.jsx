const dimensionsData = {
  individual: {
    icon: "IconUser",
    title: "Individual",
    subtitle: "Impacto na vida das pessoas",
    what: "Analisa como a solução afeta diretamente o bem-estar, a autonomia e a qualidade de vida dos usuários — pacientes, profissionais de saúde ou cuidadores.",
    why: "Uma solução tecnológica em saúde só é sustentável se gerar valor real para quem a usa. Soluções que ignoram o impacto individual tendem a ser abandonadas ou a causar danos silenciosos.",
    tags: [
      "Usabilidade",
      "Acessibilidade",
      "Autonomia",
      "Privacidade",
      "Segurança do paciente",
    ],
  },
  social: {
    icon: "IconUsers",
    title: "Social",
    subtitle: "Efeitos na comunidade e no sistema",
    what: "Avalia o impacto coletivo da solução — como ela influencia a equidade no acesso à saúde, a inclusão digital e o fortalecimento das políticas públicas.",
    why: "Tecnologias em saúde podem ampliar ou aprofundar desigualdades. Considerar a dimensão social garante que a solução contribua para um sistema de saúde mais justo e acessível.",
    tags: [
      "Equidade",
      "Inclusão digital",
      "Acesso",
      "Políticas públicas",
      "Impacto comunitário",
    ],
  },
  economica: {
    icon: "IconCoin",
    title: "Econômica",
    subtitle: "Uso eficiente de recursos",
    what: "Examina a viabilidade financeira da solução a longo prazo — custo de desenvolvimento, operação, manutenção e o retorno gerado para o sistema de saúde.",
    why: "Soluções com alto custo e baixo retorno drenam recursos públicos escassos. A sustentabilidade econômica assegura que o investimento gere valor duradouro.",
    tags: [
      "Custo-efetividade",
      "ROI",
      "Viabilidade",
      "Redução de desperdício",
      "Escalabilidade",
    ],
  },
  tecnica: {
    icon: "IconSettings",
    title: "Técnica",
    subtitle: "Qualidade, manutenção e evolução",
    what: "Avalia a qualidade do software — arquitetura, manutenibilidade, segurança, interoperabilidade e capacidade de evoluir com as necessidades do sistema de saúde.",
    why: "Soluções tecnicamente frágeis acumulam débito técnico, falham em momentos críticos e se tornam inviáveis de manter. A robustez técnica é base para a continuidade do serviço.",
    tags: [
      "Manutenibilidade",
      "Segurança",
      "Interoperabilidade",
      "Escalabilidade",
      "Testabilidade",
    ],
  },
  ambiental: {
    icon: "IconLeaf",
    title: "Ambiental",
    subtitle: "Responsabilidade com o meio ambiente",
    what: "Considera o impacto ambiental do ciclo de vida da solução — consumo de energia, infraestrutura de servidores, geração de resíduos eletrônicos e pegada de carbono.",
    why: "O setor de tecnologia é responsável por crescente consumo energético global. Soluções em saúde têm a responsabilidade de minimizar sua pegada ambiental.",
    tags: [
      "Eficiência energética",
      "Pegada de carbono",
      "E-waste",
      "Infraestrutura verde",
      "Longevidade",
    ],
  },
};

import {
  IconUser,
  IconUsers,
  IconCoin,
  IconSettings,
  IconLeaf,
  IconX,
} from "@tabler/icons-react";

const iconMap = { IconUser, IconUsers, IconCoin, IconSettings, IconLeaf };

function DimensionModal({ dimensionKey, onClose }) {
  const d = dimensionsData[dimensionKey];
  if (!d) return null;

  const Icon = iconMap[d.icon];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-md rounded-2xl bg-white p-7 shadow-lg">
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200"
        >
          <IconX size={14} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1C75BC]/10">
            <Icon size={20} className="text-[#1C75BC]" strokeWidth={1.75} />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#004E78]">{d.title}</h3>
            <p className="text-xs text-slate-500">{d.subtitle}</p>
          </div>
        </div>

        {/* O que é */}
        <div className="mb-4">
          <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            O que é
          </p>
          <p className="text-sm leading-7 text-slate-600">{d.what}</p>
        </div>

        {/* Por que importa */}
        <div className="mb-4">
          <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            Por que importa
          </p>
          <p className="text-sm leading-7 text-slate-600">{d.why}</p>
        </div>

        {/* Tags */}
        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            O que avalia
          </p>
          <div className="flex flex-wrap gap-2">
            {d.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DimensionModal;
