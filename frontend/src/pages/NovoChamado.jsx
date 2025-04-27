import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from "../api/axios";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { useChamadosCliente } from "../context/ChamadosClienteContext";

export default function NovoChamado() {
    const { usuario } = useAuth();
    const navigate = useNavigate();
    const [ titulo, setTitulo ] = useState("");
    const [ descricao, setDescricao ] = useState("");
    const [ erro, setErro ] = useState("");
    const [ sucesso, setSucesso ] = useState("");
    const { carregarChamadosAbertos } = useChamadosCliente();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro("");
        setSucesso("");

        try {
            await api.post("/chamados", { titulo, descricao });
            setSucesso("Chamado criado com sucesso!")
            carregarChamadosAbertos();
            setTitulo("");
            setDescricao("");
        } catch (err) {
            setErro(err.response?.data?.msg || "Erro ao criar chamado: ", err);
        }
    };

    if (usuario.role !== "cliente") {
        return (
            <>
                <Header />
                <main className="p-6 text-center text-red-500">
                    Acesso restrito a clientes.
                </main>
            </>
        );
      }

    return (
        <>
            <Header />
            <main className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
                <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
                    <h2 className="text-2x1 font-bold mb-6 text-center text-blue-600">
                        Novo Chamado
                    </h2>

                    {erro && <p className="text-red-500 text-sm mb-4 text-center">{erro}</p>}
                    {sucesso && <p className="text-green-600 text-sm mb-4 text-center">{sucesso}</p>}

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
                                className="mt-1 w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:br-green-700 text-white py-2 rounded transition"
                        >
                            Criar Chamado
                        </button>
                    </form>
                </div>
            </main>
        </>
    )
}