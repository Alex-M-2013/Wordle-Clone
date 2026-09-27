import "./App.css";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { Wordle } from "./components/Wordle";
import { GitHubLink } from "./components/GitHubLink";

export const App = () => {
    return (
        <>
            <ThemeSwitcher />

            <Wordle />

            <GitHubLink />
        </>
    );
};
