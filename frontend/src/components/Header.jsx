import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useChamadosCliente } from "../context/ChamadosClienteContext";
import { Settings } from "lucide-react";

export default function Header() {
    const { usuario, logout } = useAuth();
    const { chamadosAbertos } = useChamadosCliente();
    const location = useLocation();
    
    return (
        <header className="bg-white shadow p-4 flex flex-wrap justify-between items-center">
            <h1 className="text-lg font-bold text-blue-600">Sistema de Chamados</h1>

            {usuario && (
                <div className="flex items-center gap-4 mt-2 sm:mt-0">
                    <span className="text-sm text-gray-700 hidden sm:inline">
                        Bem-vindo, <strong>{usuario.nome || usuario.id.slice(0, 6)}</strong>
                    </span>

                    {/* Botão de início - só para atendentes */}
                    {usuario.role === "atendente" && location.pathname !== "/inicio" && (
                        <Link
                            to="/inicio"
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
                        >
                            Início
                        </Link>
                    )}

                    {/* Botão meus chamados - só para clientes */}
                    {usuario.role === "cliente" && location.pathname !== "/meus-chamados" && (
                        <Link
                            to="/meus-chamados"
                            className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-3 py-1 rounded"
                        >
                            Meus Chamados

                            {chamadosAbertos > 0 && (
                                <span className="absolute top-1 center bg-red-500 text-white text-x5 w-5 h-5 flex items-center justify-center rounded-full">
                                    {chamadosAbertos}
                                </span>
                            )}
                        </Link>
                    )}

                    {/* Botão Novo Chamado - Só para cliente */}
                    {usuario.role === "cliente" && location.pathname !== "/novo" && (
                        <Link
                            to="/novo"
                            className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded"
                        >
                            + Novo Chamado
                        </Link>
                    )}

                    {/* Botão Editar Meu perfil */}
                    {location.pathname !== "/perfil" && (
                        <Link
                            to="/perfil"
                            className="flex items-center gap-1 bg-gray-600 hover:bg-gray-700 text-white text-sm px-3 py-1 rounded"
                        >
                            <Settings className="w-4 h-4" />
                            Meu Perfil
                        </Link>
                    )}
                        

                    <button
                        onClick={logout}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                    Sair
                    </button>
                </div>
            )}
        </header>
    );
}