function getAdjacent(word1, word2) {
  if (word1.length !== word2.length) return [];

  const adjacents = [];

  for (let i = 0; i < word1.length; i++) {
    if (word1[i] === word2[i]) {
      adjacents.push(i);
    }
  }
  return adjacents;
}

function occurenceOf(letter, word) {
  return [...word].filter((char) => char === letter).length;
}

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export { getAdjacent, occurenceOf, delay };
