function ProfileSelector({ selectedProfile, onSelectProfile }) {
  const profiles = [
    {
      id: 'developer',
      label: 'Desenvolvedor',
      description:
        'Avalie o software a partir da perspectiva de quem projeta, implementa ou mantém a solução.',
    },
    {
      id: 'user',
      label: 'Usuário',
      description:
        'Avalie o software a partir da perspectiva de quem utiliza a solução no seu contexto de uso.',
    },
  ]

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          Etapa 1
        </p>
        <h2 className="mt-2 text-2xl font-bold text-[#004E78]">
          Selecione o perfil de avaliação
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Escolha a perspectiva a partir da qual o checklist será respondido.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {profiles.map((profile) => {
          const isSelected = selectedProfile === profile.id

          return (
            <button
              key={profile.id}
              type="button"
              onClick={() => onSelectProfile(profile.id)}
              className={`rounded-2xl border p-5 text-left transition ${
                isSelected
                  ? 'border-[#00A084] bg-[#89CFC2]/20 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-[#1C75BC] hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">
                    {profile.label}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {profile.description}
                  </p>
                </div>

                <div
                  className={`mt-1 h-5 w-5 rounded-full border-2 ${
                    isSelected
                      ? 'border-[#00A084] bg-[#00A084]'
                      : 'border-slate-300 bg-white'
                  }`}
                />
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default ProfileSelector