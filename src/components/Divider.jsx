import "../styles/Divider.css";

export const Divider = ({ isOpen }) => <hr className="divider" style={{ visibility: isOpen ? "visible" : "hidden" }} />;
