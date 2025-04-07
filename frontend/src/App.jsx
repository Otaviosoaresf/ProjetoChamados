import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import TesteAPI from "./pages/TesteAPI";
import Chamados from "./pages/Chamados";
import PrivateRoute from "./context/PrivateRoute";

export default function App() {
  return ( 
    <Routes>
      <Route path="/" element={<Login />} />
      <Route 
        path="/chamados" 
        element={
        <PrivateRoute>
          <Chamados />
        </PrivateRoute>
        } 
      />
    </Routes>
  );
}