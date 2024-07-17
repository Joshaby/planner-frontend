import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InviteGuestsModal } from './invite-guests-modal';
import { ConfirmTripModal } from './confirm-trip-modal';
import { DestinationAndDateStep } from './steps/destination-and-date-step';
import { InviteGuestsStep } from './steps/invite-guests-step';

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
          <DestinationAndDateStep isGuestsInputOpen={isGuestsInputOpen} closeGuestsInput={closeGuestsInput} openGuestsInput={openGuestsInput} />

          {isGuestsInputOpen && (
            <InviteGuestsStep openGuestsModal={openGuestsModal} emailsToInvite={emailsToInvite} openConfirmTripModal={openConfirmTripModal} />
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
