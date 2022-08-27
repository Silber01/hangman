import { getWord } from "./getWord.js";
const showGuessedLetters = function(word, guessedLetters)
{
    let hiddenWord = "";
    for (let i in word)
    {
        const letter = word[i];
        if (guessedLetters.includes(letter) || letter == "-")
            hiddenWord += letter;
        else if (letter == " ")
            hiddenWord += "&nbsp&nbsp";
        else
            hiddenWord += "_";
        hiddenWord += " ";

    }
    return hiddenWord;
}
const wordGuessed = function(word, guessedLetters)
{
    for (let i in word)
    {
        const letter = word[i];
        if (!guessedLetters.includes(letter))
            return false;
    }
    return true;
}
const addWarning = function(message)
{
    const warning = document.createElement("p")
    warning.innerHTML = message
    warning.classList.add("warningAnimation");
    warningArea.append(warning);
    warning.style.opacity = 1;
    window.getComputedStyle(warning).opacity;
    warning.style.opacity = 0;
    warning.addEventListener("webkitTransitionEnd", () => {
        console.log("Transition done");
        warningArea.removeChild(warning);
    });
}
const guessedSoFar = document.querySelector(".guessedSoFar");
const letterList = document.querySelector(".letterList");
const guessCounter =  document.querySelector(".guessCounter");
const hanger = document.querySelector(".hanger");
const restartButton = document.querySelector(".restartButton");
const warningArea = document.querySelector(".warning")
restartButton.addEventListener("click", () => {
    startGame();
});
const startGame = function()
{
    const word = getWord();
    let guessedLetters = [];
    let wrongGuesses = 0;
    let gameOver = false;
    const losingPoint = 7;
    guessedSoFar.innerHTML = showGuessedLetters(word, guessedLetters);
    guessCounter.innerHTML = "Incorrect Guesses: <b>0</b>"
    hanger.setAttribute("src", `images/0.png`);
    letterList.innerHTML = "";
    restartButton.classList.remove("restartButton");
    restartButton.classList.add("hiddenButton");
    
    document.addEventListener("keyup", function handler(event) {
        if (!gameOver)
        {
            const letter = event.key.toLowerCase();
            if (!"abcdefghijklmnopqrstuvwxyz".includes(letter))
            {
               addWarning(`"${letter}" is not a valid character.`)
            }
            else if (guessedLetters.includes(letter))
            {
                addWarning(`You have already guessed "${letter}"!`)
            }
            else 
            {
                guessedLetters.push(letter);
                const newLetter = document.createElement("p");
                
                if (!word.includes(letter))
                {
                    newLetter.classList.add("incorrect")
                    wrongGuesses += 1;
                    hanger.setAttribute("src", `images/${wrongGuesses}.png`);
                    guessCounter.innerHTML = `Incorrect Guesses: <b>${wrongGuesses}</b>`;
                    if (wrongGuesses >= losingPoint)
                    {
                        guessCounter.innerHTML = "You lose! The word was <b>" + word + "</b>!";
                        gameOver = true;
                    }
                }
                else
                {
                    newLetter.classList.add("correct")
                    guessedSoFar.innerHTML = showGuessedLetters(word, guessedLetters);
                    if (wordGuessed(word, guessedLetters))
                    {
                        guessCounter.innerHTML = "Correct! You Win!";
                        gameOver = true;
                    }
                }
                newLetter.innerHTML = letter;
                letterList.append(newLetter);
            }
        }
        if (gameOver)
        {
            restartButton.classList.remove("hiddenButton");
            restartButton.classList.add("restartButton");
            document.removeEventListener("keyup", handler);
        }
    });
}
startGame();