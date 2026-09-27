import targetWordsRaw from "../assets/wordle-answers-alphabetical.txt?raw";

const targetWords = targetWordsRaw.split(/\r?\n/).map((word) => word.trim().toUpperCase());

export const getTargetWord = () => targetWords[Math.floor(Math.random() * targetWords.length)]