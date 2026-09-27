import "./App.css";
import { useState, useEffect } from "react";
import { Nav } from "./components/Nav";
import { Wordle } from "./components/Wordle";
import { GitHubLink } from "./components/GitHubLink";

export const App = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isMobile = screenWidth <= 600;

    return (
        <>
            <Nav />

            <Wordle isMobile={isMobile} />

            <GitHubLink />
        </>
    );
};
