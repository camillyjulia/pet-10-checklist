function IntroSection({ onStart }) {
  return (
    <section className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1.2fr_0.8fr] lg:py-14">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:p-10">
        <span className="inline-flex rounded-full bg-[#89CFC2]/25 px-4 py-1 text-sm font-semibold text-[#006E7C]">
          Ferramenta de apoio à avaliação
        </span>

        <h2 className="mt-6 text-4xl font-bold leading-tight text-[#004E78]">
          Avalie a sustentabilidade de soluções de software de forma simples e
          organizada
        </h2>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          Este checklist foi desenvolvido para apoiar a análise de
          sustentabilidade em software sob diferentes perspectivas,
          considerando dimensões individuais, sociais, econômicas, técnicas e
          ambientais.
        </p>

        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          A avaliação pode ser realizada a partir da visão de{' '}
          <span className="font-semibold text-slate-800">desenvolvedor</span> ou{' '}
          <span className="font-semibold text-slate-800">usuário</span>,
          permitindo uma leitura mais ampla sobre impactos, qualidade,
          responsabilidade e sustentabilidade da solução.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={onStart}
            className="rounded-2xl bg-[#1C75BC] px-6 py-3 text-base font-semibold text-white transition hover:opacity-90"
          >
            Iniciar avaliação
          </button>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm text-slate-600">
            Recomendado: avaliar todas as dimensões
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-[#004E78]">Como funciona</h3>

          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
            <li>
              1. Escolha o perfil de avaliação: desenvolvedor ou usuário.
            </li>
            <li>2. Selecione as dimensões que deseja incluir na análise.</li>
            <li>3. Responda às perguntas organizadas por dimensão.</li>
            <li>4. Visualize um resumo final da avaliação.</li>
          </ul>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-[#004E78]">
            Dimensões avaliadas
          </h3>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
              Individual
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
              Social
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
              Econômica
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
              Técnica
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
              Ambiental
            </span>
          </div>

          <p className="mt-4 text-sm leading-7 text-slate-600">
            O objetivo é oferecer uma visão ampla e estruturada sobre a
            sustentabilidade de produtos e processos de software.
          </p>
        </div>
      </div>
    </section>
  )
}

export default IntroSection