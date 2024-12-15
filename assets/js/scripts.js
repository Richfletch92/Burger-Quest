document.addEventListener('DOMContentLoaded', function() {

    //Declared Variables
    var pop = new Audio('assets/balloon-pop-48030.mp3');
    const resetButton = document.getElementById('reset-button');
    const submitButton = document.getElementById('submit-button');
    const textEntry = document.getElementById('text-entry');
    let selectedLevel = 'easy'; // Default to 'easy'
    let wordList = {
        easy: [
            'book', 'cake', 'fish', 'game', 'hand', 'jump', 'kite', 'lamp', 'moon', 'nest', // Four-letter words
            'apple', 'bread', 'chair', 'dance', 'eagle', 'flame', 'grape', 'house', 'juice', 'knife' // Five-letter words
        ],
        medium: [
            'animal', 'bottle', 'camera', 'danger', 'effort', 'forest', 'garden', 'honest', 'island', 'jungle', // Six-letter words
            'balloon', 'capture', 'diamond', 'freedom', 'giraffe', 'holiday', 'journey', 'kitchen', 'library', 'monster' // Seven-letter words
        ],
        hard: [
            'adjacent', 'backpack', 'czarina', 'dizzying', 'exorcism', 'fauxhawk', 'gazebo', 'haphazard', 'jujube', 'knapsack', // Eight-letter words
            'abjection', 'blizzard', 'cognizant', 'dynamized', 'exorcized', 'frizzled', 'gazillion', 'haphazard', 'juxtapose', 'knockdown' // Nine-letter words
        ]
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
            updateCatImage(attempts); // Update cat image
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
            attempts = 10;
        } else if (level === 'medium') {
            attempts = 8;
            pop.play();
        } else {
            attempts = 6;
            pop.play();
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
        document.getElementById('balloons');
        balloons.classList.remove("fall");
        balloons.classList.add("float");

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
            updateCatImage(attempts); // Update cat image
            displayWord();
            pop.play();
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
            updateCatImage(attempts); // Update cat image
            displayWord();
            pop.play();
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
            document.getElementById('balloons');
            balloons.classList.remove("float");
            balloons.classList.add("fall");
        }
    }

    function updateCatImage(attempts) {
        const catImage = document.getElementById('cat');
        catImage.src = `assets/images/balloonsGraphic${attempts}.png`;
        catImage.alt = `A cat holding balloons. You have ${attempts} guesses left.`;
    }
});