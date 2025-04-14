import {  useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import Header from "../components/Header";

export default function ListarUsuarios() {
    const { usuario } = useAuth();
    const [ usuarios, setUsuarios ] = useState([]);
    const [ erro, setErro ] = useState("");

    useEffect(() => {
        if (usuario.role !== "atendente") return;

        const fetchUsuarios = async () => {
            try {
                const res = await api.get("/usuarios");
                setUsuarios(res.data);
            } catch (err) {
                setErro(err.response?.data?.msg || "Erro ao carregar usuários", err)
            }
        };

        fetchUsuarios();
    }, [usuario]);

    if (usuario.role !== "atendente") {
        return <p className="p-6 text-red-500">Acesso restrito a atendente.</p>;
    }

    return (
        <>
            <Header />
            <main className="max-w-4x1 mx-auto p-6">
                <h2 className="text-2x1 font-bold mb-6">Usuários Cadastrados</h2>

                {erro && <p className="text-red-500 mb-4">{erro}</p>}

                <table className="w-full border text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">Nome</th>
                            <th className="p-2 border">E-mail</th>
                            <th className="p-2 border">Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((u) => (
                            <tr key={u._id} className="text-center">
                                <td className="p-2 border">{u.nome}</td>
                                <td className="p-2 border">{u.email}</td>
                                <td className="p-2 border">{u.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </>
    );
}