import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');

        try {
            await login(email, senha); 
        } catch (err) {
            setErro(err.response?.data?.msg || `Erro ao fazer login, ${err}`);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2x1 font-bold mb-6 text-center text-blue-600">Login</h2>

                {erro && <p className="text-red-500 text-sm mb-4">{erro}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">E-mail</label>
                        <input
                           type="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-500"
                           required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Senha</label>
                        <input 
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                    Entrar
                    </button>
                </form>
            </div>
        </div>
    )
}