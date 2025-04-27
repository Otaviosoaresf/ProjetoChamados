import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import Header from "../components/Header";

export default function MeusChamados() {
    const { usuario } = useAuth();
    const [chamados, setChamados] = useState([]);
    const [filtroStatus, setFiltroStatus] = useState("");

    const carregarMeusChamados = async () => {
        try {
            const res = await api.get("/chamados/meus", {
                params: filtroStatus ? { status: filtroStatus } : {},
            });
            setChamados(res.data);
        } catch (err) {
            console.error("Erro ao carregar chamados do cliente", err);
        }
    };

    useEffect(() => {
        carregarMeusChamados();
    }, [filtroStatus]);

    const statusClasses = (status) =>
        `px-4 py-2 rounded-full text-sm font-semibold ${
            filtroStatus === status
            ? "bg-blue-600 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`;

    return (
        <>
            <Header />
            <main className="p-6 max-w-6x1 mx-auto">
                <h2 className="text-2x1 font-bold text-gray-800 mb-6 text-center">
                    Meus Chamados
                </h2>

                {/* Filtros de Status */}
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                    <button onClick={() => setFiltroStatus("")} className={statusClasses("")}>
                        Todos
                    </button>
                    <button onClick={() => setFiltroStatus("aberto")} className={statusClasses("aberto")}>
                        Abertos
                    </button>
                    <button onClick={() => setFiltroStatus("em andamento")} className={statusClasses("em andamento")}>
                        Em Andamento
                    </button>
                    <button onClick={() => setFiltroStatus("resolvido")} className={statusClasses("resolvido")}>
                        Resolvidos
                    </button>
                </div>

                {/* Lista de Chamados */}
                <ul className="space-y-4">
                    {chamados.length === 0 ? (
                        <p className="text-center text-gray-600">Nenhum chamado encontrado</p>
                    ) : (
                        chamados.map((chamado) => (
                            <li key={chamado._id} className="bg-white p-5 rounded-xl shadow">
                                <p className="text-lg font-semibold">{chamado.titulo}</p>
                                <p className="text-sm text-gray-500">{chamado.descricao}</p>
                                <p className="text-sm mt-2">
                                    <strong>Status</strong>{" "}
                                    <span className={
                                        chamado.status === "aberto" ? "text-orange-500" :
                                        chamado.status === "em andamento" ? "text-blue-500" :
                                        "text-green-600"
                                    }>
                                        {chamado.status}
                                    </span>
                                </p>
                                {chamado.atendente && (
                                    <p className="text-sm text-gray-600">
                                        Atendente: {chamado.atendente?.nome}
                                    </p>
                                )}
                            </li>
                        ))
                    )}
                </ul>
            </main>
        </>
    );
}
