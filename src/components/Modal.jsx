import "../styles/Modal.css";
import { getTargetWord } from "../utils/getTargetWord";

export const Modal = ({ children, isOpen, setIsOpen, isMobile, setGuesses, setGameOver, setGameWon, setTargetWord }) => {
    const openHeight = !isMobile ? "40%" : "400px";
    const openWidth = !isMobile ? "30%" : "90%";
    
    return (
        <>
            <div id="modal-background" style={{ visibility: isOpen ? "visible" : "hidden" }}></div>

            <div id="modal" style={{ visibility: isOpen ? "visible" : "hidden", height: isOpen ? openHeight : "0", width: isOpen ? openWidth : "0" }}>
                {children}
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
