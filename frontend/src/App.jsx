import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Chamados from "./pages/Chamados";
import PrivateRoute from "./context/PrivateRoute";
import NovoChamado from "./pages/NovoChamado";
import Inicio from "./pages/Inicio";

export default function App() {
  return ( 
    <Routes>
      <Route path="/" element={<Login />} />

      <Route 
        path="/inicio" 
        element={
        <PrivateRoute>
          <Inicio />
        </PrivateRoute>
        } 
      />

      <Route 
        path="/chamados" 
        element={
        <PrivateRoute>
          <Chamados />
        </PrivateRoute>
        } 
      />

      <Route 
        path="/novo"
        element={
          <PrivateRoute>
            <NovoChamado />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}