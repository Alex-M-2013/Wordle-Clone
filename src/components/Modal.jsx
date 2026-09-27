import "../styles/Modal.css";

export const Modal = ({ children, isOpen, setIsOpen, setGuesses, setGameOver, setGameWon }) => {
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
                    }}
                >
                    Play Again
                </button>
            </div>
        </>
    );
};
