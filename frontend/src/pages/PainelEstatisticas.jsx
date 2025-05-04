import { useEffect, useState } from "react";
import Header from "../components/Header";
import api from "../api/axios";
import { BarChart2, Loader, CheckCircle, ClipboardList } from "lucide-react";

export default function PainelEstatisticas() {
    const [dados, setDados] = useState(null);
    const [erro, setErro] = useState("");
    const [clientes, setClientes] = useState([]);
    const [atendentes, setAtendentes] = useState([]);
    const [chamadosFiltrados, setChamadosFiltrados] = useState([]);
    const [dadosTempo, setDadosTempo] = useState(null);

    const [anoSelecionado, setAnoSelecionado] = useState(new Date().getFullYear());
    const [mesSelecionado, setMesSelecionado] = useState("");

    useEffect(() => {
        const carregarEstatisticas = async () => {
            try {
                const res = await api.get("/chamados/estatisticas");
                setDados(res.data);
            } catch (err) {
                console.error(err)
                setErro("Erro ao carregar estatísticas: ", err);
            }
        };

        carregarEstatisticas();
    }, []);

    useEffect(() => {
        const carregarUsuarios = async () => {
            try {
                const resClientes = await api.get("/usuarios?role=cliente");
                const resAtendentes = await api.get("/usuarios?role=atendente");
                setClientes(resClientes.data);
                setAtendentes(resAtendentes.data);
            } catch (err) {
                console.error(err)
                setErro("Erro ao carregar atendentes e clientes do select: ", err)
            }
        };

        carregarUsuarios();
    }, []);

    const buscarChamadosCliente = async (id) => {

        if (!id) {
            setChamadosFiltrados(null);
            return ""
        }

        try {
            const res = await api.get(`/chamados/cliente/${id}`);
            setChamadosFiltrados(res.data);
        } catch (err) {
            console.error(err);
            setErro("Erro ao buscar cliente selecionado: ", err)
        }
    };

    const buscarChamadosAtendente = async (id) => {

        if (!id) {
            setChamadosFiltrados(null);
            return ""
        }

        try {
            const res = await api.get(`/chamados/atendente/${id}`);
            setChamadosFiltrados(res.data);
        } catch (err) {
            console.error(err)
            setErro("Erro ao buscar atendente selecionado: ", err);
        }
    }

    const buscarChamadosPorTempo = async () => {
        try {
            const res = await api.get(`/chamados/por-tempo?ano=${anoSelecionado}${mesSelecionado ? `&mes=${mesSelecionado}` : ''}`);
            setDadosTempo(res.data);
        } catch (err) {
            console.error(err)
            setErro("Erro ao buscar chamados pela data selecionada: ", err)
        }
    }

    const Card = ({ icon: Icon, titulo, valor, cor }) => (
        <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <Icon className={`w-10 h-10 mb-4 ${cor}`} />
            <p className="text-sm text-gray-500">{titulo}</p>
            <p className="text-2xl font-bold text-gray-700">{valor}</p>
        </div>
    );

    return (
        <>
            <Header />
            <main className="p-6 max-w-6xl mx-auto">

                {erro && <p className="text-red-500 text-center">{erro}</p>}

                {/* ZONA 1 - Estatísticas gerais */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                        Visão Geral
                    </h2>

                    {dados && dados.total !== undefined ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Card
                                icon={ClipboardList}
                                titulo="Total de Chamados"
                                valor={dados.total}
                                cor="text-blue-600"
                            />
                            <Card
                                icon={Loader}
                                titulo="Abertos"
                                valor={dados.abertos}
                                cor="text-orange-500"
                            />
                            <Card
                                icon={BarChart2}
                                titulo="Em Andamento"
                                valor={dados.andamento}
                                cor="text-yellow-500"
                            />
                            <Card
                                icon={CheckCircle}
                                titulo="Resolvidos"
                                valor={dados.resolvidos}
                                cor="text-green-600"
                            />
                        </div>
                    ) : (
                        <p className="text-center text-red-500">Carregando...</p>
                    )}
                </section>

                {/* ZONA 2 - Por Cliente e Atendente */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-center mb-8">Filtrar Chamados</h2>

                    <div className="flex flex-wrap justify-center gap-4 mb-6">
                        <select
                            onChange={(e) => buscarChamadosCliente(e.target.value)}
                            className="border px-4 py-2 rounded"
                            defaultValue=""
                        >
                            <option value="">Selecione um Cliente</option>
                            {clientes.map(cliente => (
                                <option key={cliente._id} value={cliente._id}>
                                    {cliente.nome}
                                </option>
                            ))}
                        </select>

                        <select
                            onChange={(e) => buscarChamadosAtendente(e.target.value)}
                            className="border px-4 py-2 rounded"
                            defaultValue=""
                        >
                            <option value="">Selecione um Atendente</option>
                            {atendentes.map(atendente => (
                                <option key={atendente._id} value={atendente._id}>
                                    {atendente.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    {chamadosFiltrados && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {chamadosFiltrados.map((chamado) => (
                            <div key={chamado._id} className="bg-white p-4 rounded shadow">
                                <h3 className="font-bold">{chamado.titulo}</h3>
                                <p>Status: {chamado.status}</p>
                            </div>
                        ))}
                    </div>
                    )}
                </section>

                {/* ZONA 3 - Estatísticas por Tempo */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-center mb-8">Estatísticas por Tempo</h2>

                    <div className="flex flex-wrap justify-center gap-4 mb-6">
                        <select
                            onChange={(e) => setMesSelecionado(e.target.value)}
                            className="border px-4 py-2 rounded"
                            defaultValue=""
                        >
                            <option value="">Todos os Meses</option>
                            {[...Array(12)].map((_, i) => (
                                <option key={i} value={String(i + 1).padStart(2, "0")}>
                                    {String(i + 1).padStart(2, "0")}
                                </option>
                            ))}
                        </select>

                        <select
                            onChange={(e) => setAnoSelecionado(e.target.value)}
                            className="border px-4 py-2 rounded"
                            defaultValue={new Date().getFullYear()}
                        >
                            {[...Array(5)].map((_, i) => (
                                <option key={i} value={new Date().getFullYear() - i}>
                                    {new Date().getFullYear() - i}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={buscarChamadosPorTempo}
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Buscar
                        </button>
                    </div>

                    {dadosTempo && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white p-4 rounded shadow text-center">
                                <p className="font-bold">Total</p>
                                <p>{dadosTempo.total}</p>
                            </div>
                            <div className="bg-white p-4 rounded shadow text-center">
                                <p className="font-bold">Abertos</p>
                                <p>{dadosTempo.abertos}</p>
                            </div>
                            <div className="bg-white p-4 rounded shadow text-center">
                                <p className="font-bold">Em andamento</p>
                                <p>{dadosTempo.andamento}</p>
                            </div>
                            <div className="bg-white p-4 rounded shadow text-center">
                                <p className="font-bold">Resolvidos</p>
                                <p>{dadosTempo.resolvidos}</p>
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </>
    );
}