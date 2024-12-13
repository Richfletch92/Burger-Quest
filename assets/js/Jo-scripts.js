document.addEventListener('DOMContentLoaded', function() {

    //Declared Variables
    const resetButton = document.getElementById('reset-button');
    const submitButton = document.getElementById('submit-button');
    const textEntry = document.getElementById('text-entry');
    let selectedLevel = 'easy'; // Default to 'easy'
    let wordList = {
        easy: ['cat', 'dog', 'bat', 'fish', 'ball'],
        intermediate: ['elephant', 'giraffe', 'mountain', 'computer', 'piano'],
        genius: ['quizzaciously', 'antidisestablishmentarianism', 'floccinaucinihilipilification', 'hippopotomonstrosesquipedaliophobia']
    };
    let attempts;
    let word;
    let guessedLetters = [];
    let wrongGuesses = [];


    //Event Listeners
    resetButton.addEventListener('click', startGame);
    submitButton.addEventListener('click', handleGuessText);

    /**
     * Sets the difficulty level
     */
    document.querySelectorAll('.difficulty-button').forEach(button => {
        button.addEventListener('click', () => {
            selectedLevel = button.dataset.level;
            setDifficulty(selectedLevel);
        });
    });

    /**
     * Starts the game
     * When the player selects the difficulty level
     * the game will start
     */
    document.querySelectorAll('.difficulty-button').forEach(button => {
        button.addEventListener('click', startGame);
    });

    /**
     * Sets the difficulty level
     */
    function setDifficulty(level) {
        if (level === 'easy') {
            attempts = 6;
        } else if (level === 'intermediate') {
            attempts = 5;
        } else {
            attempts = 4;
        }
        document.getElementById('attempts').textContent = `Attempts: ${attempts}`;
    }

    /**
     * Starts the game
     */
    function startGame() {
        setDifficulty(selectedLevel);
        guessedLetters = [];
        wrongGuesses = [];
        word = getRandomWord(selectedLevel);
        displayWord();
        displayKeyboard();
        document.getElementById('wrong-guesses').textContent = `Wrong guesses: ${wrongGuesses.join(', ')}`;
        resetButton.classList.remove('hidden');
        textEntry.classList.remove('hidden');

    }

    /**
     * Gets a random word from the word list
     */
    function getRandomWord(level) {
        const words = wordList[level];
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex].toLowerCase();
    }

    /**
     * Displays the word on the screen
     * If the letter is guessed, it will display the letter
     * If the letter is not guessed, it will display an underscore
     * If the player wins, it will display a message
     * If the player loses, it will display a message
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
     * Checks the letter pressed on the keyboard against the word generated
     * and displays the word on the screen
     */
    function handleGuess(letter) {
        if (guessedLetters.includes(letter) || wrongGuesses.includes(letter)) return;
        guessedLetters.push(letter);
        if (word.includes(letter)) {
            displayWord();
        } else {
            wrongGuesses.push(letter);
            attempts--;
            document.getElementById('attempts').textContent = `Attempts: ${attempts}`;
            document.getElementById('wrong-guesses').textContent = `Wrong guesses: ${wrongGuesses.join(', ')}`;
            displayWord();
        }
    }
    
    /**
     * Checks the letter entered in the text box against the word generated
     * and displays the word on the screen
     */
    function handleGuessText () {
        letter = document.getElementById('text-entry-guess').value.toLowerCase();
        if (guessedLetters.includes(letter) || wrongGuesses.includes(letter)) return;
        guessedLetters.push(letter);
        if (word.includes(letter)) {
            displayWord();
        } else {
            wrongGuesses.push(letter);
            attempts--;
            document.getElementById('attempts').textContent = `Attempts: ${attempts}`;
            document.getElementById('wrong-guesses').textContent = `Wrong guesses: ${wrongGuesses.join(', ')}`;
            displayWord();
        }
    }

    /**
     * Checks to see whether the play has won or lost.
     */
    function checkGameStatus() {
        if (word.split('').every(letter => guessedLetters.includes(letter))) {
            alert('Congratulations! You won!');
        } else if (attempts <= 0) {
            alert('Game Over! You ran out of attempts!');
        }
    }

    let balloons = 10;
    // adds cat and balloons picture
    const cat = document.getElementById('cat');
    cat.src = `assets/images/balloonsGraphic${balloons}.png`;
    cat.alt = `you have ${balloons} balloons`;

});