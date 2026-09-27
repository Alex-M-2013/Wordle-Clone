import "../styles/Wordle.css";
import { useState, useRef } from "react";
// import { getTargetWord } from "../utils/getTargetWord";
import { isValidGuess } from "../utils/verifyGuess";
import { Row } from "./Row";
import { Modal } from "./Modal";
import { Divider } from "./Divider";

export const Wordle = () => {
    // const targetWord = getTargetWord()
    const targetWord = "REACT";
    const maxAttempts = 6;

    const [guesses, setGuesses] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const inputRef = useRef("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleGuess = (guess) => {
        if (gameOver || gameWon) return;
        else if (guess.length !== 5) {
            setErrorMessage("Guess must be 5 letters");
            inputRef.current.value = "";
            return;
        } else if (!isValidGuess(guess)) {
            setErrorMessage("Unrecognised word");
            inputRef.current.value = "";
            return;
        }

        setErrorMessage("");

        const updatedGuesses = [...guesses, guess];
        setGuesses(updatedGuesses);

        if (guess === targetWord) {
            setGameWon(true);
            setIsModalOpen(true);
        }
        if (updatedGuesses.length >= maxAttempts) {
            setGameOver(true);
            setIsModalOpen(true);
        }

        inputRef.current.value = "";
    };

    return (
        <div id="wordle-container">
            <h1>Wordle</h1>
            {guesses.map((guess, i) => (
                <Row key={i} guess={guess} targetWord={targetWord} />
            ))}
            {!gameOver && (
                <>
                    <input type="text" placeholder="Enter guess..." aria-label="Enter guess" maxLength={targetWord.length} ref={inputRef} onKeyDown={(event) => event.key === "Enter" && handleGuess(inputRef.current.value.toUpperCase())} />
                    <button id="guess-button" onClick={() => handleGuess(inputRef.current.value.toUpperCase())}>
                        Guess
                    </button>
                </>
            )}

            <Error message={errorMessage} />
            <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} setGuesses={setGuesses} setGameOver={setGameOver} setGameWon={setGameWon}>
                {gameOver && (
                    <p>
                        <h1>😔 Game Over</h1>
                        <Divider isOpen={isModalOpen} />
                        <p>{`Game Over! The word was: ${targetWord}.`}</p>
                        <p>Play again?</p>
                    </p>
                )}
                {gameWon && (
                    <p>
                        <h1>🥳 Congratulations!</h1>
                        <Divider isOpen={isModalOpen} />
                        <p>You win! Play again?</p>
                    </p>
                )}
            </Modal>
        </div>
    );
};

const Error = ({ message }) => (
    <p className="error" style={{ display: message !== "" ? "" : "none" }}>
        {message}
    </p>
);
