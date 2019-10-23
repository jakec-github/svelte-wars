export const getRandomPositiveInt = max => Math.ceil(Math.random() * max);

export const updateCharacters = (liveCharacter, characterStack, i) => {
  let newCharacterStack = [
    ...characterStack.slice(0, i),
    ...characterStack.slice(i + 1),
  ];

  if (liveCharacter) {
    newCharacterStack = [...newCharacterStack, liveCharacter];
  }

  return {
    newCharacterStack,
    newLiveCharacter: characterStack[i],
  };
};
