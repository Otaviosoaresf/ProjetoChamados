import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Chamados from "./pages/Chamados";
import PrivateRoute from "./context/PrivateRoute";
import NovoChamado from "./pages/NovoChamado";
import Inicio from "./pages/Inicio";
import CadastrarUsuario from "./pages/CadastrarUsuario";
import ListarUsuarios from "./pages/ListarUsuarios";

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

      <Route 
        path="/usuarios/novo"
        element={
          <PrivateRoute>
            <CadastrarUsuario />
          </PrivateRoute>
        }
      />

      <Route 
        path="/usuarios"
        element={
          <PrivateRoute>
            <ListarUsuarios />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}