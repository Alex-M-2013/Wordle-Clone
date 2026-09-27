import "../styles/Row.css";

export const Row = ({ guess, targetWord }) => {
    const getLetterStatus = (letter, index) => {
        if (letter === targetWord[index]) {
            return "correct";
        } else if (targetWord.includes(letter)) {
            return "present";
        } else {
            return "absent";
        }
    };

    return (
        <div className="word-row">
            {guess.split("").map((letter, i) => (
                <span key={i} className={`letter ${getLetterStatus(letter, i)}`}>
                    {letter}
                </span>
            ))}
        </div>
    );
};
