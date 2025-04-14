import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import Header from "../components/Header";

export default function CadastrarUsuario() {
    const { usuario } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nome: "",
        email: "",
        senha: "",
        role: "cliente",
    });

    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");

    if (usuario.role !== "atendente") {
        return <p className="p-6 text-red-500">Acesso restrito a atendente.</p>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro("");
        setSucesso("");

        try {
            await api.post("/usuarios/registro", form);
            setSucesso("Usuário cadastrado com sucesso!");
            setForm({ nome: "", email: "", senha: "", role: "cliente" });
        } catch (err) {
            setErro(err.response?.data?.msg || "Erro ao cadastrar usuário", err);
        }
    };

    return (
        <>
            <Header />
            <main className="max-w md mx-auto p-6">
                <h2 className="text-2x1 font-bold mb-6">Cadastrar Novo Usuário</h2>

                {erro && <p className="text-red-500 text-sm font-medium text-gray-700">{erro}</p>}
                {sucesso && <p className="text-green-600 text-sm mb-4">{sucesso}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nome</label>
                        <input 
                            type="text"
                            name="nome"
                            value={form.nome}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full border px-3 py-2 rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">E-mail</label>
                        <input 
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full border px-3 py-2 rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Senha</label>
                        <input 
                            type="password"
                            name="senha"
                            value={form.senha}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full border px-3 py-2 rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tipo de Usuário</label>
                        <select
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            className="mt-1 w-full border px-3 py-2 rounded"
                        >
                            <option value="cliente">Cliente</option>
                            <option value="atendente">Atendente</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Cadastrar
                    </button>
                </form>
            </main>
        </>
    );
}