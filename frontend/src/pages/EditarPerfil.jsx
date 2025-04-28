import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import api from "../api/axios";

export default function EditarPerfil() {
    const { usuario } = useAuth();
    const navigate = useNavigate();
    const [ form, setForm ] = useState({
        nome: "",
        email: "",
        senha: "",
    });
    const [ erro, setErro ] = useState("");
    const [ sucesso, setSucesso ] = useState("");

    useEffect(() => {
        if (usuario) {
            setForm({
                nome: usuario.nome,
                email: usuario.email,
                senha: "",
            });
        }
    }, [usuario]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro("");
        setSucesso("");

        try {
            await api.put("/usuarios/perfil", form);
            setSucesso("Perfil atualizado com sucesso!");

            usuario.role === "atendente" ? setTimeout(() => navigate("/inicio"), 1500)
            : setTimeout(() => navigate("/novo"), 1500)
        } catch (err) {
            setErro("Erro ao atualizar perfil: ", err)
        }
    };

    return (
        <>
            <Header />
            <main className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
                <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
                    <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
                        Editar Perfil
                    </h2>

                    {erro && <p className="text-red-500 text-sm mb-4 text-center">{erro}</p>}
                    {sucesso && <p className="text-green-600 text-sm mb-4 text-center">{sucesso}</p>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nome</label>
                            <input 
                                type="text"
                                name="nome"
                                value={form.nome}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-500"
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
                                className="mt-1 w-full border rounded px-3 py-2 text-sm focus:outline-noe focus:ring focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nova Senha (opcional)</label>
                            <input 
                                type="password"
                                name="senha"
                                value={form.senha}
                                onChange={handleChange}
                                className="mt-1 w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-500"
                                placeholder="Deixe vazio para manter a senha atual"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
                        >
                            Atualizar Perfil
                        </button>
                    </form>
                </div>
            </main>
        </>
    );
}