const parseRealParticipant = (participantList) => {
  const numberOfOriginalParticipant = participantList?.length;
  const numberOfPendingParticipant = participantList?.filter(
    (participant) => participant.role.attr === "PENDING"
  ).length;
  const numberOfParticipant =
    numberOfOriginalParticipant - numberOfPendingParticipant;
  return numberOfParticipant;
};

export default parseRealParticipant;
