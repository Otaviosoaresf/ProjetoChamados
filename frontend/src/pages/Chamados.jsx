import { useEffect, useState } from "react";
import api from "../api/axios";
import Header from "../components/Header";
import { Link } from "react-router-dom";

export default function Chamados() {
    const [ chamados, setChamados ] = useState([]);
    const [ erro, setErro ] = useState("");

    const carregarChamados = async () => {
        try {
            const res = await api.get("/chamados");
            setChamados(res.data.dados || res.data);
        } catch (err) {
            setErro(`Erro ao carregar chamados: ${err}`)
        }
    };

    const assumirChamado = async (id) => {
        try {
            await api.put(`/chamados/${id}`, { status: "em andamento" });
            carregarChamados();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        carregarChamados();
    }, []);

    return (
        <>
            <Header />
            <main className="p-6 max-w-4xl mx-auto">
                <h2 className="text-2x1 font-bold mb-4">Chamados</h2>
                {erro && <p className="text-red-500 mb-4">{erro}</p>}

                <ul className="space-y-4">
                    {chamados.map((c) => (
                        <li key={c._id} className="bg-white p-4 shadow rounded">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-lg">{c.titulo}</p>
                                    <p className="text-sm text-gray-500">{c.descricao}</p>
                                    <p className="text-sm mt-2">
                                        <strong>Status:</strong>{" "}
                                        <span className={
                                            c.status === "aberto"
                                            ? "text-orange-500"
                                            : c.status === "em andamento"
                                            ? "text-blue-500"
                                            : "text-green-600"
                                        }>
                                            {c.status}
                                        </span>
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Cliente: {c.cliente?.nome || "Desconhecido"}
                                    </p>
                                    {c.atendente && (
                                        <p className="text-sm text-gray-600">
                                            Atendente: {c.atendente?.nome}
                                        </p>
                                    )}
                                </div>

                                {!c.atendente && (
                                    <button
                                        onClick={() => assumirChamado(c._id)}
                                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                                    >
                                        Assumir
                                    </button>
                                )}

                                <Link
                                    to={`/chamados/${c._id}`}
                                    className="text-blue-600 text-sm underline hover:text-blue-800"
                                >
                                    Ver detalhes
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </main>
        </>
    );
}