import "../styles/Wordle.css";
import { useState, useRef } from "react";
import { toast, Slide, ToastContainer } from "react-toastify";
import { getTargetWord } from "../utils/getTargetWord";
import { isValidGuess } from "../utils/verifyGuess";
import { Row } from "./Row";
import { Modal } from "./Modal";
import { Divider } from "./Divider";

const errorToastOptions = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    transition: Slide,
    style: {
        color: "white",
        background: "linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)",
        borderRadius: "8px",
        border: "none",
        boxShadow: "none",
    },
};

const showErrorToast = (message, id) => toast(message, {...errorToastOptions, toastId: id});

export const Wordle = () => {
    const targetWord = getTargetWord()
    const maxAttempts = 6;

    const [guesses, setGuesses] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const inputRef = useRef("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleGuess = (guess) => {
        if (gameOver || gameWon) return;
        else if (guess.length !== 5) {
            showErrorToast("Guess must be 5 letters", "guess-length-error");
            inputRef.current.value = "";
            return;
        } else if (!isValidGuess(guess)) {
            showErrorToast("Unrecognised word", "unrecognised-word");
            inputRef.current.value = "";
            return;
        }

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
            <ToastContainer />
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

            <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} setGuesses={setGuesses} setGameOver={setGameOver} setGameWon={setGameWon}>
                {gameOver && (
                    <>
                        <h1>😔 Game Over</h1>
                        <Divider isOpen={isModalOpen} />
                        <p>{`Game Over! The word was: ${targetWord}.`}</p>
                        <p>Play again?</p>
                    </>
                )}
                {gameWon && (
                    <>
                        <h1>🥳 Congratulations!</h1>
                        <Divider isOpen={isModalOpen} />
                        <p>You win! Play again?</p>
                    </>
                )}
            </Modal>
        </div>
    );
};
