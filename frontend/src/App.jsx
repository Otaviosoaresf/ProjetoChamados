import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import TesteAPI from "./pages/TesteAPI";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chamados" element={<TesteAPI />} />
      </Routes>
    </Router>
  );
}