import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { ClipboardList, UserPlus, Users } from "lucide-react";

export default function Inicio() {
    const { usuario } = useAuth();

    if (usuario.role !== "atendente") {
        return <p className="p-6 text-red-500">Acesso restrito a atendentes.</p>
    }

    return (
        <>
            <Header />
            <main className="p-6 max-w-2x1 mx-auto text-center">
                <h2 className="text-2x1 font-bold mb-2">Bem-vindo, {usuario.role}</h2>
                <p className="text-gray-600 mb-8">Escolha uma ação para continuar:</p>

                <div className="grid gap-6 md:grid-cols-2">
                    <Link
                        to="/chamados"
                        className="flex flex-col items-center bg-white shadow-md p-6 rounded-x1 hover:shadow-lg transition"
                    >
                        <ClipboardList className="w-10 h-10 text-blue-600 mb-3" />
                        <span className="text-lg font-medium text-blue-700">Consultar Chamados</span>
                    </Link>

                    <Link
                        to="/usuarios/novo"
                        className="flex flex-col items-center bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition"
                    >
                        <UserPlus className="w-10 h-10 text-green-600 mb-3" />
                        <span className="text-lg font-medium text-green-700">Cadastrar Novo Usuário</span>
                    </Link>

                    <Link
                        to="/usuarios"
                        className="flex flex-col items-center bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition "
                    >
                        <Users className="w-10 h-10 text-indigo-600 mb-3" />
                        <span className="text-lg font-medium text-indigo-700">Listar Usuários</span>
                    </Link>
                </div>
            </main>
        </>
    )
}