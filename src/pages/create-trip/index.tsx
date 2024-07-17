import { ArrowRight, Calendar, MapPin, Settings2, UserRoundPlus } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InviteGuestsModal } from './invite-guests-modal';
import { ConfirmTripModal } from './confirm-trip-modal';

export const CreateTripPage = () => {
  const navigate = useNavigate();

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestesModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState(['josehenriquebrito55@gmail.com']);

  const openGuestsInput = () => {
    setIsGuestsInputOpen(true);
  };

  const closeGuestsInput = () => {
    setIsGuestsInputOpen(false);
  };

  const openGuestsModal = () => {
    setIsGuestsModalOpen(true);
  };

  const closeGuestsModal = () => {
    setIsGuestsModalOpen(false);
  };

  const openConfirmTripModal = () => {
    setIsConfirmTripModalOpen(true);
  };

  const closeConfirmTripModal = () => {
    setIsConfirmTripModalOpen(false);
  };

  const addEmailToInvite = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email')?.toString();

    if (email) {
      if (!emailsToInvite.includes(email)) {
        setEmailsToInvite([...emailsToInvite, email]);
        event.currentTarget.reset();
      }
    }
  };

  const removeEmailFromInvite = (email: string) => {
    setEmailsToInvite(emailsToInvite.filter((emailToInvite) => emailToInvite != email));
  };

  const createTrip = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/trips/123');
  };

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/public/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className="space-y-4">
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className="flex items-center justify-center gap-2 flex-1">
              <MapPin className="size-5 text-zinc-400" />
              <input
                disabled={isGuestsInputOpen}
                type="text"
                placeholder="Para onde você vai?"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              />
            </div>
            <div className="flex items-center justify-center gap-2">
              <Calendar className="size-5 text-zinc-400" />
              <input
                disabled={isGuestsInputOpen}
                type="text"
                placeholder="Quando?"
                className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none"
              />
            </div>
            <div className="w-px h-6 bg-zinc-800"></div>
            {isGuestsInputOpen ? (
              <button
                onClick={closeGuestsInput}
                className="bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700"
              >
                Alterar local/data <Settings2 className="size-5 text-zinc-200" />
              </button>
            ) : (
              <button
                onClick={openGuestsInput}
                className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
              >
                Continuar <ArrowRight className="size-5 text-lime-950" />
              </button>
            )}
          </div>

          {isGuestsInputOpen && (
            <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
              <button type="button" onClick={openGuestsModal} className="flex items-center justify-center gap-2 flex-1 text-left">
                <UserRoundPlus className="size-5 text-zinc-400" />
                {emailsToInvite.length > 0 ? (
                  <span className="text-zinc-100 flex-1">{emailsToInvite.length} pessoa(s) convidada(s)</span>
                ) : (
                  <span className="text-zinc-400 text-lg flex-1">Quem estará na viagem?</span>
                )}
              </button>
              <div className="w-px h-6 bg-zinc-800"></div>
              <button
                onClick={openConfirmTripModal}
                className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
              >
                Confirmar viagem <ArrowRight className="size-5 text-lime-950" />
              </button>
            </div>
          )}
        </div>

        <p className="text-zinc-500 text-sm">
          Ao planejar sua viagem pela plann.er voê automaticamento concorda <br />
          com nossos{' '}
          <a href="#" className="text-zinc-300 underline">
            termos de uso
          </a>
          e
          <a href="#" className="text-zinc-300 underline">
            políticas de privacidade.
          </a>
        </p>
      </div>

      {isConfirmTripModalOpen && <ConfirmTripModal closeConfirmTripModal={closeConfirmTripModal} createTrip={createTrip} />}

      {isGuestesModalOpen && (
        <InviteGuestsModal
          closeGuestsModal={closeGuestsModal}
          emailsToInvite={emailsToInvite}
          addEmailToInvite={addEmailToInvite}
          removeEmailFromInvite={removeEmailFromInvite}
        />
      )}
    </div>
  );
};
