import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "./AuthContext";

const ChamadosClienteContext = createContext();

export function ChamadosClienteProvider({ children }) {
    const { usuario } = useAuth();
    const [ chamadosAbertos, setChamadosAbertos ] = useState(0);

    const carregarChamadosAbertos = async () => {
        if (usuario?.role === "cliente") {
            try {
                const res = await api.get("/chamados/meus", {
                    params: { status: "aberto" },
                });
                setChamadosAbertos(res.data.length || 0);
            } catch (err) {
                console.error("Erro ao buscar chamados abertos: ", err);
            }
        }
    };

    useEffect(() => {
        carregarChamadosAbertos();
    }, [usuario]);

    return (
        <ChamadosClienteContext.Provider value={{ chamadosAbertos, carregarChamadosAbertos }}>
            {children}
        </ChamadosClienteContext.Provider>
    );
}

export function useChamadosCliente() {
    return useContext(ChamadosClienteContext);
}