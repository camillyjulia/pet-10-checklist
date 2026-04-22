function Header() {
  return (
    <header className="w-full bg-white border-b px-6 py-4 flex items-center justify-between">
      
      <div className="flex items-center gap-4">
        <div className="text-sm font-semibold text-[#004E78]">
          Prefeitura de Porto Alegre
        </div>

        <div className="h-5 w-px bg-gray-300" />

        <div className="text-sm font-semibold text-[#004E78]">
          UFCSPA
        </div>
      </div>

      <div className="text-sm text-gray-500">
        Checklist de Sustentabilidade
      </div>
    </header>
  );
}

export default Header;