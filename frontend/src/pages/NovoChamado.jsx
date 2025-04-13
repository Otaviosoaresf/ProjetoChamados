import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from "../api/axios";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";

export default function NovoChamado() {
    const { usuario } = useAuth();
    const navigate = useNavigate();
    const [ titulo, setTitulo ] = useState("");
    const [ descricao, setDescricao ] = useState("");
    const [ erro, setErro ] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro("");

        try {
            await api.post("/chamados", { titulo, descricao });
            navigate("/chamados");
        } catch (err) {
            console.error(err);
            setErro(err.response?.data?.msg || "Erro ao criar chamado");
        }
    };

    if (usuario.role !== "cliente") {
        return <p className="p-6 text-red-500">Acesso restrito a clientes.</p>
      }

    return (
        <>
            <Header />
            <main className="max-w-md mx-auto p-6">
                <h2 className="text-2x1 font-bold text-gray-800 mb-6">Novo Chamado</h2>

                {erro && <p className="text-red-500 text-sm mb-4">{erro}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Titulo</label>
                        <input
                            type="text"
                            valeu={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            required
                            className="mt-1 w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Descrição</label>
                        <textarea
                            valeu={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            required
                            rows="4"
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Criar Chamado
                    </button>
                </form>
            </main>
        </>
    )
}