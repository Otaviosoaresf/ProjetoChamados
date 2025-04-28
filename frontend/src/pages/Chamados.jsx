import { useEffect, useState } from "react";
import api from "../api/axios";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Chamados() {
    const { usuario } = useAuth();
    const [chamados, setChamados] = useState([]);
    const [erro, setErro] = useState("");
    const [filtroStatus, setFiltroStatus] = useState("");
    const [buscaTitulo, setBuscaTitulo] = useState("");
    const [buscaDebounce, setBuscaDebounce] = useState("");
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [totalChamados, setTotalChamados] = useState(0);

    const chamadosPorPagina = 10;

    const carregarChamados = async () => {
        try {
            const res = await api.get("/chamados", {
                params: {
                    page: paginaAtual,
                    limit: chamadosPorPagina,
                    ...(filtroStatus && { status: filtroStatus }),
                    ...(buscaTitulo && { titulo: buscaTitulo }),
                },
            });
            setChamados(res.data.dados || res.data);
            setTotalChamados(res.data.totla || 0);
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

    const filtrarMeusChamados = async () => {
        try {
            const res = await api.get("/chamados", {
                params: { atendente: usuario.id },
            });
            setChamados(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        carregarChamados();
        setErro("");
    }, [filtroStatus, buscaDebounce, paginaAtual]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setBuscaDebounce(buscaTitulo);
            setPaginaAtual(1);
        }, 500);

        return () => clearTimeout(timeout);
    }, [buscaTitulo]);

    const statusClasses = (status) =>
        `px-4 py-2 rounded-full text-sm font-semibold ${filtroStatus === status
            ? "bg-blue-600 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`;

    const totalPaginas = Math.ceil(totalChamados / chamadosPorPagina);

    return (
        <>
            <Header />
            <main className="p-6 max-w-4xl mx-auto">
                <h2 className="text-2x1 font-bold mb-4">Chamados</h2>

                {/* Campo de Busca */}

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                    <input
                        type="text"
                        placeholder="Buscar por título..."
                        value={buscaTitulo}
                        onChange={(e) => setBuscaTitulo(e.target.value)}
                        className="border rounded px-4 py-2 text-sm w-full sm:w-80 focus:outline-none focus:ring focus:border-blue-500"
                    />


                    {/* Filtros */}
                    <div className="text-gray-700 text-sm px-4 py-2 rounded">
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

                    <div className="border-l-2 border-gray-300 pl-4 ml-4">
                        <button
                            onClick={filtrarMeusChamados}
                            className="bg-gray-200 hover:bg-gray-300 text-sm px-4 py-2 rounded shadow-md"
                        >
                            Meus Chamados
                        </button>
                    </div>
                </div>

                {/* Lista */}
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

                                {c.status === "aberto" && !c.atendente && (
                                    <button
                                        onClick={() => assumirChamado(c._id)}
                                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                                    >
                                        Assumir
                                    </button>
                                )}

                                <Link
                                    to={`/chamados/${c._id}`}
                                    className="inline-block mt-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded shadow transition"
                                >
                                    Ver detalhes
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* Paginação */}

                <div className="flex items-center justify-center gap-4 mt-8">
                    <button
                        onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))}
                        disabled={paginaAtual === 1}
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                    >
                        Anterior
                    </button>

                    <span className="text-sm text-gray-700">
                        Página {paginaAtual} de {totalPaginas || 1}
                    </span>

                    <button
                        onClick={() => setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas))}
                        disabled={paginaAtual === totalPaginas}
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                    >
                        Próxima
                    </button>
                </div>
            </main>
        </>
    );
}