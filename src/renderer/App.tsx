import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import TitleBar from "./components/TitleBar";
import Home from "./pages/Home";
import "./App.css";

export default function App() {
  return (
    <Router>
      <TitleBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
