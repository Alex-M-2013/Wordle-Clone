import validWordsRaw from "../assets/valid-wordle-words.txt?raw";

const validWords = validWordsRaw.split(/\r?\n/).map((word) => word.trim().toUpperCase());

export const isValidGuess = (guess) => validWords.includes(guess);
