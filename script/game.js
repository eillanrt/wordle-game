import { getAdjacent, occurenceOf, delay } from "./helpers.js";
import confetti from "./confetti.js";

$(document).ready(() => {
  let currentRow = 1;
  let currentItem = 1;
  let playerWon = false;
  let gameActive = false;
  let wordInput = "";
  let word = "";
  let wordsList = null;
  const green = "rgb(90,230,118)";
  const yellow = "rgb(254,254,51)";
  const gray = "rgb(172,172,172)";

  getRandomWord();
  showMessage("Guess the first word", 1000);

  function getRandomWord() {
    gameActive = false;

    $.ajax("https://raw.githubusercontent.com/eillanrt/wordle-game/main/assets/answers.txt").done((answers) => {
      const lines = answers.split("\n").map((line) => line.trim());
      word = rando(lines).value;
    });

    if (wordsList === null) {
      $.ajax("https://raw.githubusercontent.com/eillanrt/wordle-game/main/assets/words.txt").done((words) => {
        wordsList = words.split("\n").map((line) => line.trim());
      });
    }

    gameActive = true;
  }

  function writeLetter(letter) {
    letter = letter.toUpperCase();

    if (currentItem === 5 && $(`#row${currentRow} .item`).last().text() !== "")
      return;

    if (currentItem !== 5) currentItem++;

    wordInput += letter;

    $(`#row${currentRow}`)
      .children()
      .each((i, el) => {
        $(el).text(wordInput[i]);
      });
  }

  function backspace() {
    if (currentItem === 1 && $(`#row${currentRow} .item`).first().text() === "")
      return;

    if (currentItem !== 1) currentItem--;

    wordInput = wordInput.slice(0, -1);

    const lastLetter = wordInput.length;
    $($(`#row${currentRow}`).children()[lastLetter]).empty();
  }

  async function enter() {
    if (wordInput.length !== 5) {
      showMessage("Too Short");
      return;
    }

    if (!wordsList.includes(wordInput)) {
      showMessage("Word not Found");
      return;
    }

    const adjacents = getAdjacent(word, wordInput);

    gameActive = false;
    for (let i = 0; i < 5; i++) {
      await delay(300);
      const current = $(`#row${currentRow} div:nth-child(${i + 1})`);

      if (occurenceOf(wordInput[i], word) > 1) {
        current.append(`<sup>${occurenceOf(wordInput[i], word)}</sup>`);
      }

      const letterKey = $(`#${wordInput[i].toLowerCase()}`);

      if (adjacents.includes(i)) {
        letterKey.css("background-color", green);
        current.css("background-color", green);
      } else if (word.includes(wordInput[i])) {
        letterKey.css("background-color", yellow);
        current.css("background-color", yellow);
      } else {
        letterKey.css("background-color", gray);
        current.css("background-color", gray);
      }
    }

    if (adjacents.length === 5) {
      playerWon = true;
      showWord();

      return;
    }
    gameActive = true;
    wordInput = "";
    currentItem = 1;
    if (currentRow !== 6) {
      currentRow++;
      return;
    }
    showWord();
  }

  function playAgain() {
    getRandomWord();
    $(".item").empty();
    $(".item").css("background-color", "transparent");
    $(".letter").css("background-color", "lightgray");
    $("#modalwin h1").empty();
    currentItem = 1;
    currentRow = 1;
    playerWon = false;
    wordInput = "";
  }

  async function confettiEffect() {
    await delay(200);
    confetti.start();
    await delay(1500);
    confetti.stop();
  }

  async function showMessage(message, duration = 700) {
    gameActive = false;
    $("#message h1").text(message);
    $("#message").css("display", "block");

    await delay(duration);

    $("#message").css("display", "none");
    $("#message h1").empty();
    gameActive = true;
  }

  function showWord() {
    gameActive = false;
    $("#modalwin").css("display", "block");
    $("#modalwin h1").text(word);
    $("#modalwin span").on("click", () => {
      $("#modalwin").css("display", "none");
      playAgain();
    });

    if (playerWon) confettiEffect();
  }

  $(window).on("keydown", handleKeyDown);
  $(".key").on("click", handleKeyClick);

  // event handlers
  function handleKeyClick(event) {
    if (!gameActive || word === "") return;
    const { id } = event.target;

    if (id === "enter") enter();
    else if (id === "backspace") backspace();
    else writeLetter(id);
  }

  function handleKeyDown(event) {
    if (!gameActive || word === "") return;
    
    if (event.code === "Enter") enter();
    else if (event.code === "Backspace") backspace();
    else if (event.code.startsWith("Key")) writeLetter(event.key);
  }
});
