/***************
 * Arcade 1
 * - Three games rewritten as functions:
 *   1) Declaration: playBNH()
 *   2) Expression : magicEightBall
 *   3) Arrow      : numberGuess
 * - Prompts/Alerts only for gameplay results.
 * - Exact follow-up prompts:
 *     "Would you like to keep playing this game? y/n"
 *     "Would you like to pick another game to play?  y/n"
 * - Ternary operator used to exit loops.
 * - Farewell section shown when Playing session ends.
 ***************/

// ---- Global state & helpers (instantiate variables at the top) ----
let isPlaying = true;            // Playing loop flag (across games)
let farewellShown = false;       // Ensure farewell renders once
const farewellEl = document.getElementById("farewell");
const buttonsEl  = document.getElementById("buttons");

// Normalize a yes/no prompt string to 'y' | 'n' | 'cancel'
const yn = (s) => {
  if (s === null) return "cancel";
  const v = String(s).trim().toLowerCase();
  return v === "y" || v === "yes" ? "y" : v === "n" || v === "no" ? "n" : "invalid";
};

// Ask to continue the same Single Game (exact text)
const askKeepPlayingThisGame = () =>
  prompt('Would you like to keep playing this game? y/n');

// Ask to pick another game (exact text incl. two spaces before y/n)
const askPickAnotherGame = () =>
  prompt('Would you like to pick another game to play?  y/n');

// End the Playing session: show farewell UI and reload button
function endPlayingSession() {
  if (farewellShown) return;
  farewellShown = true;
  isPlaying = false;

  farewellEl.innerHTML = `
    <h2 class="headline">Thanks for playing the Museum Arcade!</h2>
    <p>Your session has ended. Feel like another round later?</p>
    <button class="reload" onclick="location.reload()">Reload Arcade</button>
  `;
  farewellEl.style.display = "block";
}

// --------- GAME 1: Bear • Ninja • Hunter (Declaration) ---------
function playBNH() {
  if (!isPlaying) return;

  // Single Game loop
  let keepGoing = true;
  while (keepGoing) {
    // prompt player
    let player = prompt("Choose one: bear, ninja, or hunter").trim().toLowerCase();
    if (player === null || player === "") {
      alert("Canceled or empty input. Please try again.");
    } else if (!["bear", "ninja", "hunter"].includes(player)) {
      alert("Invalid entry. Please type bear, ninja, or hunter.");
    } else {
      // CPU pick
      const options = ["bear", "ninja", "hunter"];
      const cpu = options[Math.floor(Math.random() * options.length)];

      // Decide winner
      let result = "";
      if (player === cpu) {
        result = `Tie! You both chose ${player}.`;
      } else if (
        (player === "bear"   && cpu === "ninja") ||
        (player === "ninja"  && cpu === "hunter") ||
        (player === "hunter" && cpu === "bear")
      ) {
        result = `You win! ${player} beats ${cpu}.`;
      } else {
        result = `You lose! ${cpu} beats ${player}.`;
      }
      alert(result);
    }

    // Ask to keep playing this Single Game (use ternary to break)
    const again = yn(askKeepPlayingThisGame());
    keepGoing = (again === "y") ? true
               : (again === "n") ? false
               : (alert("Please answer y or n."), true);
  }

  // Ask if they want to pick another game (use ternary to end Playing)
  const another = yn(askPickAnotherGame());
  another === "y" ? true
                  : another === "n" ? endPlayingSession()
                  : (alert("Please answer y or n."), true);
}

// --------- GAME 2: Consult the Oracle (Expression) -------------
const magicEightBall = function () {
  if (!isPlaying) return;

  const answers = [
    "It is certain.", "Signs point to yes.", "Reply hazy, try again.",
    "Ask again later.", "Don’t count on it.", "My sources say no.",
    "Outlook good.", "Concentrate and ask again."
  ];

  let keepGoing = true;
  while (keepGoing) {
    const q = prompt("Ask the Oracle a yes/no question:");
    if (q === null || String(q).trim() === "") {
      alert("Canceled or empty question. Try again.");
    } else {
      const reply = answers[Math.floor(Math.random() * answers.length)];
      alert(`You asked: "${q}"\nOracle: ${reply}`);
    }

    // Single Game continue? (ternary)
    const again = yn(askKeepPlayingThisGame());
    keepGoing = (again === "y") ? true
               : (again === "n") ? false
               : (alert("Please answer y or n."), true);
  }

  // Pick another game? (ternary)
  const another = yn(askPickAnotherGame());
  another === "y" ? true
                  : another === "n" ? endPlayingSession()
                  : (alert("Please answer y or n."), true);
};

// --------- GAME 3: Number Guess (Arrow) ------------------------
const numberGuess = () => {
  if (!isPlaying) return;

  let keepGoing = true;
  while (keepGoing) {
    const secret = Math.floor(Math.random() * 10) + 1; // 1..10
    const attempt = prompt("Guess a number between 1 and 10:");

    if (attempt === null || String(attempt).trim() === "") {
      alert("Canceled or empty input. Please try again.");
    } else if (isNaN(attempt)) {
      alert("Invalid entry. Please enter a number 1–10.");
    } else {
      const n = Number(attempt);
      if (n < 1 || n > 10) {
        alert("Out of range. Please enter 1–10.");
      } else {
        const msg = (n === secret)
          ? `Correct! The number was ${secret}.`
          : `Not quite. You guessed ${n}. The number was ${secret}.`;
        alert(msg);
      }
    }

    // Single Game continue? (ternary)
    const again = yn(askKeepPlayingThisGame());
    keepGoing = (again === "y") ? true
               : (again === "n") ? false
               : (alert("Please answer y or n."), true);
  }

  // Pick another game? (ternary)
  const another = yn(askPickAnotherGame());
  another === "y" ? true
                  : another === "n" ? endPlayingSession()
                  : (alert("Please answer y or n."), true);
};
