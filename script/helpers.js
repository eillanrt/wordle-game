function getAdjacent(word1, word2) {
  return [...word1].map((char, i) => {
    if (char === word2[i])
       return i
    }).filter(i => typeof i === "number")
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
