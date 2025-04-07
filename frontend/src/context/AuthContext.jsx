import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [ usuario, setUsuario ] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token)
                setUsuario({ id: decoded.id, token });
            } catch {
                localStorage.removeItem("token");
            }
        }
    }, [])

    const login = async (email, senha) => {
        const res = await api.post("/usuarios/login", { email, senha });
        const { token, nome } = res.data;

        localStorage.setItem("token", token);
        const decoded = jwtDecode(token);
        setUsuario({ id: decoded.id, token, nome });
        navigate("/chamados");
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUsuario(null);
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);