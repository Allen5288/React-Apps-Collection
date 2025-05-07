import { Link } from "react-router-dom";
import AuthInputs from "./components/AuthInputs.jsx";
import Header from "./components/Header.jsx";
import "./StyleAuthInput.css";

export default function StyleAuthInput() {
  return (
    <div id="style-auth-input">
      <Header />
      <main>
        <AuthInputs />
      </main>
    </div>
  );
}
