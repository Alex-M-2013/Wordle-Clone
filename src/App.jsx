import "./App.css";
import { Nav } from "./components/Nav";
import { Wordle } from "./components/Wordle";
import { GitHubLink } from "./components/GitHubLink";

export const App = () => {
    return (
        <>
            <Nav />

            <Wordle />

            <GitHubLink />
        </>
    );
};
