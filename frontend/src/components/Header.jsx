import { useAuth } from "../context/AuthContext";

export default function Header() {
    const { usuario, logout } = useAuth();

    return (
        <header className="bg-white shadow p-4 flex justify-between items-center">
            <h1 className="text-lg font-bold text-blue-600">Sistema de Chamados</h1>

            {usuario && (
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-700">Bem-vindo, <strong>{usuario.nome}</strong></span>
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