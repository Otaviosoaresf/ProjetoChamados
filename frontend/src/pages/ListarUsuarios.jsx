import {  useEffect, useState } from "react";
import api from "../api/axios";
import Header from "../components/Header";
import { UserCircle, ShieldCheck } from "lucide-react";

export default function ListarUsuarios() {
    const [ usuarios, setUsuarios ] = useState([]);
    const [ erro, setErro ] = useState("");

    useEffect(() => {
        const carregarUsuarios = async () => {
            try {
                const res = await api.get("/usuarios");
                setUsuarios(res.data);
            } catch (err) {
                console.error(err);
                setErro("Erro ao carregar usuário: ", err)
            }
        }

        carregarUsuarios();
    }, []);

    const CardUsuario = ({ usuario }) => (
        <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            {usuario.role === "atendente" ? (
                <ShieldCheck className="w-10 h-10 text-blue-600 mb-3" />
            ) : (
                <UserCircle className="w-10 h-10 text-green-600 mb-3" />
            )}
            <p className="text-lg font-semibold text-gray-700">{usuario.role}</p>
            <p className="text-sm text-gray-500">{usuario.email}</p>
            <span
                className={`mt-2 text-xs font-semibold ${
                    usuario.role === "atendente" ? "text-blue-600" : "text-green-600"
                }`}
            >
                {usuario.role.charAt(0).toUpperCase() + usuario.role.slice(1)}
            </span>
        </div>
    );

    return (
        <>
            <Header />
            <main className="max-w-6xl mx-auto p-6">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Usuários Cadastrados</h2>

                {erro && <p className="text-red-500 text-center">{erro}</p>}

                {usuarios.length === 0 ? (
                    <p className="text-gray-500 text-center">Nenhum usuário encontrado.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {usuarios.map((usuario) => (
                            <CardUsuario key={usuario._id} usuario={usuario} />
                        ))}
                    </div>
                )}
            </main>
        </>
    );
}