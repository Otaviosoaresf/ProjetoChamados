import { useEffect, useState } from "react";
import Header from "../components/Header";
import api from "../api/axios";
import { BarChart2, Loader, CheckCircle, ClipboardList } from "lucide-react";

export default function PainelEstatisticas() {
    const [ dados, setDados ] = useState(null);
    const [ erro, setErro ] = useState("");

    useEffect(() => {
        const carregarEstatisticas = async () => {
            try {
                const res = await api.get("/chamados/estatisticas");
                console.log("dados1: ", res.data)
                setDados(res.data);
            } catch (err) {
                console.error(err)
                setErro("Erro ao carregar estatísticas: ", err);
            }
        };

        carregarEstatisticas();
        console.log("Dados2: ", dados);
    }, []);

    const Card = ({ icon: Icon, titulo, valor, cor }) => (
        <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <Icon className={`w-10 h-10 mb-4 ${cor}`} />
            <p className="text-sm text-gray-500">{titulo}</p>
            <p className="text-2xl font-bold text-gray-700">{valor}</p>
        </div>
    );

    console.log("Dados3: ", dados);

    return (
        <>
            <Header />
            <main className="p-6 max-w-6x1 mx-auto">
                <h2 className="text-2x1 font-bold text-gray-800 mb-8 text-center">
                    Painel de Estatísticas
                </h2>

                {erro && <p className="text-red-500 text-center">{erro}</p>}

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
            </main>
        </>
    );
}