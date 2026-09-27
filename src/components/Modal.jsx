import "../styles/Modal.css";
import { getTargetWord } from "../utils/getTargetWord";

export const Modal = ({ children, isOpen, setIsOpen, setGuesses, setGameOver, setGameWon, setTargetWord }) => {
    return (
        <>
            <div id="modal-background" style={{ visibility: isOpen ? "visible" : "hidden" }}></div>

            <div id="modal" style={{ visibility: isOpen ? "visible" : "hidden", height: isOpen ? "40%" : "0", width: isOpen ? "30%" : "0" }}>
                <p style={{ visibility: isOpen ? "visible" : "hidden" }}>{children}</p>
                <button
                    style={{ visibility: isOpen ? "visible" : "hidden" }}
                    onClick={() => {
                        setIsOpen(false);
                        setGuesses([]);
                        setGameOver(false);
                        setGameWon(false);
                        setTargetWord(getTargetWord());
                    }}
                >
                    Play Again
                </button>
            </div>
        </>
    );
};
