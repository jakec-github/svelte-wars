const BATTLE_OF_CRAIT_DATE = 34;

export const getRandomPositiveInt = max => Math.ceil(Math.random() * max);

export const getCharacterData = async (result, id) => {
  const { name, films, birth_year: birthYear, height } = await result.json();
  return {
    name,
    films,
    birthYear,
    height,
    src: `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`,
  };
};

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

export const getCraitAge = age => {
  if (age === 'unknown') {
    return 0;
  }

  const digits = Number(age.match(/\d+/)[0]);
  const letters = age.slice(-3);
  const number = letters === 'BBY' ? -digits : digits;
  return BATTLE_OF_CRAIT_DATE - number;
};
