import MainParticipantInfo from '../MainParticipantInfo/MainParticipantInfo';
import ParticipantTracks from '../ParticipantTracks/ParticipantTracks';
import React from 'react';
import useMainParticipant from '../VideoApp/hooks/useMainParticipant/useMainParticipant';
import useSelectedParticipant from '../VideoApp/VideoProvider/useSelectedParticipant/useSelectedParticipant';
import useScreenShareParticipant from '../VideoApp/hooks/useScreenShareParticipant/useScreenShareParticipant';
import useVideoContext from '../VideoApp/hooks/useVideoContext/useVideoContext';

export default function MainParticipant() {
  const mainParticipant = useMainParticipant();
  const { room } = useVideoContext();
  const localParticipant = room!.localParticipant;
  const [selectedParticipant] = useSelectedParticipant();
  const screenShareParticipant = useScreenShareParticipant();

  const videoPriority =
    (mainParticipant === selectedParticipant || mainParticipant === screenShareParticipant) &&
    mainParticipant !== localParticipant
      ? 'high'
      : null;

  return (
    /* audio is disabled for this participant component because this participant's audio 
       is already being rendered in the <ParticipantStrip /> component.  */
    <MainParticipantInfo participant={mainParticipant}>
      <ParticipantTracks
        participant={mainParticipant}
        videoOnly
        enableScreenShare={mainParticipant !== localParticipant}
        videoPriority={videoPriority}
        isLocalParticipant={mainParticipant === localParticipant}
      />
    </MainParticipantInfo>
  );
}
