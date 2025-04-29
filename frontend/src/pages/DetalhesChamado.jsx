import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import Header from "../components/Header";
import {
    FileText,
    User,
    UserCheck,
    BadgeCheck,
    Clock3
} from "lucide-react";

export default function DetalhesChamado() {
    const { id } = useParams();
    const { usuario } = useAuth();
    const navigate = useNavigate();

    const [chamado, setChamado] = useState(null);
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");

    useEffect(() => {
        const buscarChamado = async () => {
            try {
                const res = await api.get(`/chamados/${id}`);
                setChamado(res.data);
            } catch (err) {
                setErro("Erro ao buscar chamado.");
            }
        };

        buscarChamado();
    }, [id]);

    const resolverChamado = async () => {
        try {
            await api.put(`/chamados/${id}/resolver`);
            setSucesso("Chamado resolvido com sucesso, retornando ao menu de chamados...");
            setTimeout(() => navigate("/chamados"), 1500);
        } catch (err) {
            setErro('Erro ao atualizar o chamado.', err);
        }
    };

    const formatarDataCompleta = (data) => {
        if (!data) return null;
        const d = new Date(data);
        return `${d.toLocaleDateString('pt-BR')} ás ${d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit'})}h`;
    }

    if (!chamado) {
        return (
            <>
                <Header />
                <main className="p-6 text-center text-gray-600">
                    {erro || "Carregando chamado..."}
                </main>
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="max-w-3x1 mx-auto p-6 bg-white shadow rounded-x1">
                <h2 className="text-2x1 font-bold text-blue-600 mb-6 flex items-center gap-2">
                    <FileText className="w-6 h-6"/> {chamado.titulo}
                </h2>

                <div className="space-y-4 text-sm text-gray-700">
                    <p className="flex items-center grap-2">
                        <Clock3 className="w-5 h-5 text-gray-500" />
                        Criado em: {new Date(chamado.createdAt).toLocaleString("pt-BR")}
                    </p>

                    <p className="flex items-center gap-2">
                        <Clock3 className="w-5 h-5 text-gray-500" />
                        Assumido em: {chamado.dataAssumido ? formatarDataCompleta(chamado.dataAssumido) : "Não assumido ainda" }
                    </p>

                    {chamado.dataResolvido && (
                        <p className="flex items-center gap-2">
                            <Clock3 className="w-5 h-5 text-gray-500" />
                            Resolvido em: {formatarDataCompleta(chamado.dataResolvido)}
                        </p>
                    )}

                    <p className="flex items-start gap-2">
                        <BadgeCheck className="w-5 h-5 text-blue-500 mt-1" />
                        <span><strong>Status:</strong> {chamado.status}</span>
                    </p>

                    <p className="flex items-start gap-2">
                        <User className="w-5 h-5 text-green-600 mt-1" />
                        <span><strong>Cliente:</strong> {chamado.cliente?.nome}</span>
                    </p>

                    {chamado.atendente && (
                        <p className="flex items-start gap-2">
                            <UserCheck className="w-5 h-5 text-purple-600 mt-1" />
                            <span><strong>Atendente:</strong> {chamado.atendente?.nome}</span>
                        </p>
                    )}

                    <div className="flex items-start gap-2">
                        <FileText className="w-5 h-5 text-gray-600 mt-1" />
                        <div>
                            <p className="font-semibold">Descrição:</p>
                            <p className="text-gray-800">{chamado.descricao}</p>
                        </div>
                    </div>
                </div>

                {sucesso && (
                    <div className="mb-4 text-green-600 text-sm font-medium">
                        {sucesso}
                    </div>
                )}

                {usuario.role === "atendente" &&
                    chamado.status !== "resolvido" &&
                    chamado.atendente?._id === usuario.id && (
                        <div className="mt-6 text-right">
                            <button
                                onClick={resolverChamado}
                                className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
                            >
                                Marcar como Resolvido
                            </button>
                        </div>
                    )
                }
            </main>
        </>
    );
}