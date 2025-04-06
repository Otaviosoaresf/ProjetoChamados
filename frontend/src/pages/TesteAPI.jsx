import { useEffect, useState } from "react";
import api from "../api/axios";

export default function TesteAPI() {
    const [chamados, setChamados] = useState([]);

    useEffect(() => {
        api.get("/chamados")
            .then((res) => setChamados(res.data.dados || res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="p-6">
          <h1 className="text-xl font-semibold text-gray-800 mb-4">Chamados:</h1>
          <ul className="space-y-2">
            {chamados.map((chamado) => (
              <li key={chamado._id} className="bg-white shadow p-4 rounded">
                <p className="font-bold">{chamado.titulo}</p>
                <p className="text-sm text-gray-500">{chamado.status}</p>
              </li>
            ))}
          </ul>
        </div>
      );
}