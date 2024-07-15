export function App() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-3xl px-6">
        <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        <div></div>
        <p className="text-zinc-500 text-sm">
          Ao planejar sua viagem pela plann.er voê automaticamento concorda com nossos{' '}
          <a href="#" className="text-zinc-300 underline">
            termos de uso
          </a>{' '}
          e{' '}
          <a href="#" className="text-zinc-300 underline">
            políticas de privacidade.
          </a>
        </p>
      </div>
    </div>
  );
}
