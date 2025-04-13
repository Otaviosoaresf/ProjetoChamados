import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import { Link } from "react-router-dom";

export default function Inicio() {
    const { usuario } = useAuth();

    if (usuario.role !== "atendente") {
        return <p className="p-6 text-red-500">Acesso restrito a atendentes.</p>
    }

    return (
        <>
            <Header />
            <main className="p-6 max-w-2x1 mx-auto">
                <h2 className="text-2x1 font-bold mb-6">Bem-vindo, {usuario.role}</h2>

                <div className="space-y-4">
                    <Link
                        to="/chamados"
                        className="block w-full bg-blue-600 text-white text-center py-3 rounded hover:bg-blue-700"
                    >
                        Consultar Chamados
                    </Link>

                    <Link
                        to="/usuarios/novo"
                        className="block w-full bg-green-600 text-white text-center py-3 rounded hover:bg-green-700"
                    >
                        Cadastrar Novo Usuário
                    </Link>
                </div>
            </main>
        </>
    )
}