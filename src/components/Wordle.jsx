import "../styles/Wordle.css";
import { useState, useRef } from "react";
import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getTargetWord } from "../utils/getTargetWord";
import { isValidGuess } from "../utils/verifyGuess";
import { Row } from "./Row";
import { Keyboard } from "./Keyboard";
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

const showErrorToast = (message, id) => toast(message, { ...errorToastOptions, toastId: id });

export const Wordle = ({ isMobile }) => {
    const [targetWord, setTargetWord] = useState(getTargetWord());
    const maxAttempts = 6;

    const [guesses, setGuesses] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const inputValue = useRef("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleGuess = (guess) => {
        if (gameOver || gameWon) return;
        else if (guess.length !== 5) {
            showErrorToast("Guess must be 5 letters", "guess-length-error");
            inputValue.current = "";
            return;
        } else if (!isValidGuess(guess)) {
            showErrorToast("Unrecognised word", "unrecognised-word");
            inputValue.current = "";
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

        inputValue.current = "";
    };

    return (
        <div id="wordle-container">
            <ToastContainer />
            <h1>Wordle</h1>
            {guesses.map((guess, i) => (
                <Row key={i} guess={guess} targetWord={targetWord} />
            ))}
            <>
                <Keyboard inputValue={inputValue} />
                <button id="guess-button" onClick={() => handleGuess(inputValue.current.toUpperCase())}>
                    Guess
                </button>
            </>

            <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} isMobile={isMobile} setGuesses={setGuesses} setGameOver={setGameOver} setGameWon={setGameWon} setTargetWord={setTargetWord}>
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
