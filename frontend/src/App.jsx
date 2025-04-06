import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TesteAPI from "./pages/TesteAPI";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TesteAPI />} />
      </Routes>
    </Router>
  );
}