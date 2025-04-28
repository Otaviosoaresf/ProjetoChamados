import {  useEffect, useState } from "react";
import api from "../api/axios";
import Header from "../components/Header";
import { UserCircle, ShieldCheck, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function ListarUsuarios() {
    const [ usuarios, setUsuarios ] = useState([]);
    const [ erro, setErro ] = useState("");
    

    useEffect(() => {
        carregarUsuarios();
    }, []);

    const carregarUsuarios = async () => {
        try {
            const res = await api.get("/usuarios");
            setUsuarios(res.data);
        } catch (err) {
            console.error(err);
            setErro("Erro ao carregar usuários: ", err)
        }
    }

    const excluirUsuario = async (id) => {
        const confirmacao = await MySwal.fire({
            title: "Tem certeza?",
            text: "Essa ação excluirá o usuário e os chamados dele que estiverem em aberto/em andamento!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Cancelar",
        });

        if (confirmacao.isConfirmed) {
            try {
                await api.delete(`/usuarios/${id}`);
                MySwal.fire("Excluído!", "Usuario excluído com sucesso", "success");
                carregarUsuarios();
            } catch (err) {
                console.error(err);
                MySwal.fire("Erro", `Erro ao excluir o usuário: ${err}`, "error");
            }
        }
    };

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

            <button
                onClick={() => excluirUsuario(usuario._id)}
                className="top-3 right-3 bg-red-500 hover:bg-red-600 text-white m-2 p-1 rounded-full"
            >
                <Trash2 className="w-4 h-4" />
            </button>
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