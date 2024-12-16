document.addEventListener('DOMContentLoaded', function () {

    // Declared Variables
    var pop = new Audio('assets/balloon-pop-48030.mp3');
    const resetButton = document.getElementById('reset-button');
    const hintButton = document.getElementById('hint-button');
    const submitButton = document.getElementById('submit-button');
    const textEntry = document.getElementById('text-entry');
    const hintDisplay = document.getElementById('hint-display');
    let selectedLevel = 'easy'; // Default to 'easy'
    let wordList = {
        easy: [{
                word: 'book',
                hint: 'You read it.'
            },
            {
                word: 'cake',
                hint: 'A sweet baked dessert.'
            },
            {
                word: 'fish',
                hint: 'Lives in water.'
            },
            {
                word: 'game',
                hint: 'Played for fun.'
            },
            {
                word: 'hand',
                hint: 'Part of your body.'
            },
            {
                word: 'jump',
                hint: 'To leap into the air.'
            },
            {
                word: 'kite',
                hint: 'Flies in the sky.'
            },
            {
                word: 'lamp',
                hint: 'Provides light.'
            },
            {
                word: 'moon',
                hint: 'Earth\'s natural satellite.'
            },
            {
                word: 'nest',
                hint: 'Birds live in it.'
            },
            {
                word: 'apple',
                hint: 'A fruit.'
            },
            {
                word: 'bread',
                hint: 'Baked food made from flour.'
            },
            {
                word: 'chair',
                hint: 'You sit on it.'
            },
            {
                word: 'dance',
                hint: 'Move rhythmically to music.'
            },
            {
                word: 'eagle',
                hint: 'A large bird of prey.'
            },
            {
                word: 'flame',
                hint: 'A hot glowing body of ignited gas.'
            },
            {
                word: 'grape',
                hint: 'A small, round fruit.'
            },
            {
                word: 'house',
                hint: 'A place where people live.'
            },
            {
                word: 'juice',
                hint: 'A drink made from fruit.'
            },
            {
                word: 'knife',
                hint: 'A tool used for cutting.'
            }
        ],
        medium: [{
                word: 'animal',
                hint: 'A living organism.'
            },
            {
                word: 'bottle',
                hint: 'A container for liquids.'
            },
            {
                word: 'camera',
                hint: 'Used to take photos.'
            },
            {
                word: 'danger',
                hint: 'A threat of harm.'
            },
            {
                word: 'effort',
                hint: 'A vigorous attempt.'
            },
            {
                word: 'forest',
                hint: 'A large area covered with trees.'
            },
            {
                word: 'garden',
                hint: 'A plot of land for growing plants.'
            },
            {
                word: 'honest',
                hint: 'Truthful and sincere.'
            },
            {
                word: 'island',
                hint: 'Land surrounded by water.'
            },
            {
                word: 'jungle',
                hint: 'A dense forest.'
            },
            {
                word: 'balloon',
                hint: 'A flexible bag filled with air.'
            },
            {
                word: 'capture',
                hint: 'To take into possession.'
            },
            {
                word: 'diamond',
                hint: 'A precious stone.'
            },
            {
                word: 'freedom',
                hint: 'The power to act as one wants.'
            },
            {
                word: 'giraffe',
                hint: 'A tall animal with a long neck.'
            },
            {
                word: 'holiday',
                hint: 'A day of celebration.'
            },
            {
                word: 'journey',
                hint: 'Travel from one place to another.'
            },
            {
                word: 'kitchen',
                hint: 'A room for cooking.'
            },
            {
                word: 'library',
                hint: 'A place with a collection of books.'
            },
            {
                word: 'monster',
                hint: 'A large, frightening creature.'
            }
        ],
        hard: [{
                word: 'adjacent',
                hint: 'Next to or adjoining something else.'
            },
            {
                word: 'backpack',
                hint: 'A bag carried on the back.'
            },
            {
                word: 'czarina',
                hint: 'A female Russian ruler.'
            },
            {
                word: 'dizzying',
                hint: 'Causing dizziness.'
            },
            {
                word: 'exorcism',
                hint: 'The act of expelling evil spirits.'
            },
            {
                word: 'fauxhawk',
                hint: 'A hairstyle resembling a mohawk.'
            },
            {
                word: 'gazebo',
                hint: 'A freestanding open-sided structure.'
            },
            {
                word: 'haphazard',
                hint: 'Lacking any obvious principle of organization.'
            },
            {
                word: 'jujube',
                hint: 'A small, sweet fruit.'
            },
            {
                word: 'knapsack',
                hint: 'A bag carried on the back.'
            },
            {
                word: 'abjection',
                hint: 'A state of misery.'
            },
            {
                word: 'blizzard',
                hint: 'A severe snowstorm.'
            },
            {
                word: 'cognizant',
                hint: 'Having knowledge or awareness.'
            },
            {
                word: 'dynamized',
                hint: 'Made dynamic.'
            },
            {
                word: 'exorcized',
                hint: 'Expelled evil spirits.'
            },
            {
                word: 'frizzled',
                hint: 'Fried until crisp.'
            },
            {
                word: 'gazillion',
                hint: 'A very large number.'
            },
            {
                word: 'juxtapose',
                hint: 'Place side by side for contrast.'
            },
            {
                word: 'knockdown',
                hint: 'A forceful blow.'
            }
        ]
    };
    let attempts;
    let word;
    let currentHint;
    let guessedLetters = [];
    let wrongGuesses = [];
    let wins = 0;
    let losses = 0;
    let consecutiveWrong = 0;


    // Event Listeners
    resetButton.addEventListener('click', startGame);
    submitButton.addEventListener('click', handleGuessText);
    hintButton.addEventListener('click', toggleHint);

    document.querySelectorAll('.difficulty-button').forEach(button => {
        button.addEventListener('click', () => {
            selectedLevel = button.dataset.level;
            setDifficulty(selectedLevel);
            updateCatImage(attempts); // Update cat image
        });
    });

    document.querySelectorAll('.difficulty-button').forEach(button => {
        button.addEventListener('click', startGame);
    });

    function setDifficulty(level) {
        if (level === 'easy') {
            attempts = 10;
        } else if (level === 'medium') {
            attempts = 8;
        } else {
            attempts = 6;
        }
        document.getElementById('attempts').textContent = `Attempts: ${attempts}`;
    }

    /*
     * Starts the game
     */
    function startGame() {
        setDifficulty(selectedLevel);
        guessedLetters = [];
        wrongGuesses = [];
        const wordObject = getRandomWord(selectedLevel);
        word = wordObject.word.toLowerCase();
        currentHint = wordObject.hint; // Store the hint
        hintDisplay.textContent = `Hint: ${currentHint}`; // Set the hint text
        displayWord();
        displayKeyboard();
        document.getElementById('wrong-guesses').textContent = `Wrong guesses: ${wrongGuesses.join(', ')}`;
        resetButton.classList.remove('hidden');
        hintButton.classList.remove('hidden');
        textEntry.classList.remove('hidden');
        hintDisplay.classList.add('hidden'); // Hide the hint initially
        const balloons = document.getElementById('balloons');
        balloons.classList.remove("fall");
        balloons.classList.add("float");
    }

    /**
     * Returns a random word from the word list
     */
    function getRandomWord(level) {
        const words = wordList[level];
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex];
    }

    /**
     * Displays the word on the screen
     */
    function displayWord() {
        const wordDisplay = document.getElementById('word-display');
        wordDisplay.innerHTML = ''; // Clear the word display
        word.split('').forEach(letter => {
            const span = document.createElement('span');
            span.textContent = guessedLetters.includes(letter) ? letter : '_';
            wordDisplay.appendChild(span);
        });
        checkGameStatus();
    }

    /**
     * Displays the keyboard on the screen
     */
    function displayKeyboard() {
        const keyboard = document.getElementById('keyboard');
        keyboard.innerHTML = ''; // Clear the keyboard
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
        alphabet.forEach(letter => {
            const button = document.createElement('button');
            button.textContent = letter.toLocaleUpperCase();
            button.classList.add('letter-button');
            button.addEventListener('click', () => handleGuess(letter));
            keyboard.appendChild(button);
        });
    }

    /**
     * Disables the keyboard
     */
    function disabledDisplayKeyboard() {
        const keyboard = document.getElementById("keyboard");
        keyboard.innerHTML = ""; // Clear the keyboard
        const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
        alphabet.forEach((letter) => {
            const button = document.createElement("button");
            button.textContent = letter.toLocaleUpperCase();
            button.classList.add("letter-button");
            button.disabled = true;
            keyboard.appendChild(button);
        });
    }

    /**
     * Handles the player's guess from keyboard
     */
    function handleGuess(letter) {
        if (guessedLetters.includes(letter) || wrongGuesses.includes(letter)) return;
        guessedLetters.push(letter);
        if (word.includes(letter)) {
            displayWord();
        } else {
            wrongGuesses.push(letter);
            attempts--;
            consecutiveWrong++;
            document.getElementById('attempts').textContent = `Attempts: ${attempts}`;
            document.getElementById('wrong-guesses').textContent = `Wrong guesses: ${wrongGuesses.join(', ')}`;
            updateCatImage(attempts); // Update cat image
            displayWord();
            pop.play();
            if (consecutiveWrong >= 2) {
                showHintButton(); // Show the hint button after 3 consecutive wrong guesses
            }
        }
    }


    /**
     * Handles the player's guess from text box
     */
    function handleGuessText() {
        const letter = document.getElementById('text-entry-guess').value.toLowerCase();
        if (guessedLetters.includes(letter) || wrongGuesses.includes(letter)) return;
        guessedLetters.push(letter);
        if (word.includes(letter)) {
            displayWord();
        } else {
            wrongGuesses.push(letter);
            attempts--;
            consecutiveWrong++;
            document.getElementById('attempts').textContent = `Attempts: ${attempts}`;
            document.getElementById('wrong-guesses').textContent = `Wrong guesses: ${wrongGuesses.join(', ')}`;
            updateCatImage(attempts); // Update cat image
            displayWord();
            pop.play();
        }
        if (consecutiveWrong >= 2) {
            showHintButton(); // Show the hint button after 3 consecutive wrong guesses
        }
    }

    /**
     * Checks the game status
     */
    function checkGameStatus() {
        if (word.split('').every(letter => guessedLetters.includes(letter))) {
            handleWin();
        } else if (attempts <= 0) {
            const balloons = document.getElementById('balloons');
            balloons.classList.remove("float");
            balloons.classList.add("fall");
            handleLoss();
        }
    }

    /**
     * Updates the cat image
     */
    function updateCatImage(attempts) {
        const catImage = document.getElementById('cat');
        catImage.src = `assets/images/balloonsGraphic${attempts}.png`;
        catImage.alt = `A cat holding balloons. You have ${attempts} guesses left.`;
    }


    /**
     * Toggles the hint display
     */
    function toggleHint() {
        hintDisplay.classList.toggle('hidden');
    }

    /**
     * Handles the win function
     */
    function handleWin() {
        wins++;
        document.getElementById("win-count").textContent = `Wins: ${wins}`;
        const popup = document.getElementById("win-popup");
        popup.classList.remove("hidden");
        popup.classList.add("show");

        setTimeout(() => {
            popup.classList.remove("show");
            popup.classList.add("hidden");
        }, 3000); // Hide the popup after 3 seconds
        disabledDisplayKeyboard();
    }

    /**
     * Handles the loss function
     */
    function handleLoss() {
        losses++;
        document.getElementById("loss-count").textContent = `Looses: ${losses}`;
        const popup = document.getElementById("lost-popup");
        popup.classList.remove("hidden");
        popup.classList.add("show");
        popup.style.backgroundColor = "red";

        setTimeout(() => {
            popup.classList.remove("show");
            popup.classList.add("hidden");
        }, 3000); // Hide the popup after 3 seconds
        disabledDisplayKeyboard();
    }

    /**
     * Gives the player a free letter hint
     */
    function showHintButton() {
        getHintButton = document.getElementById("get-hint");
        getHintButton.style.display = "inline";
        getHintButton.addEventListener("click", getHint);
    }

  function getHint() {
      getHintButton = document.getElementById("get-hint");
      const displayWords = document.querySelectorAll("#word-display span");
      const hiddenLetters = word
          .split("")
          .filter((letter) => !guessedLetters.includes(letter));
      for (let displayWord of displayWords) {
          if (displayWord.textContent === "_") {
              displayWord.textContent = hiddenLetters[0];
              guessedLetters.push(hiddenLetters[0]);
              hiddenLetters.shift();
              consecutiveWrong = 0;
              getHintButton.style.display = "none";
              if (hiddenLetters.length === 0) {
                  consecutiveWrong = 0;
                  handleWin();
              }
              break;
          }
      }
  }
