import { useEffect, useState } from 'react';
import { healthAPI, operacoesAPI, clientesAPI } from '../api/client';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const [health, setHealth] = useState(null);
  const [operacoes, setOperacoes] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [healthRes, opRes, clientesRes] = await Promise.all([
          healthAPI.check(),
          operacoesAPI.list(),
          clientesAPI.list()
        ]);

        setHealth(healthRes.data);
        setOperacoes(opRes.data);
        setClientes(clientesRes.data);
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Dashboard</h1>

        {/* Status API */}
        {health && (
          <div className={`mb-8 p-4 rounded-lg ${health.status === 'ok' ? 'bg-green-100 border border-green-400' : 'bg-red-100 border border-red-400'}`}>
            <p className={`font-semibold ${health.status === 'ok' ? 'text-green-700' : 'text-red-700'}`}>
              ✓ {health.status === 'ok' ? 'Sistema Online' : 'Sistema Offline'}
            </p>
            <p className="text-sm mt-1">
              {health.database === 'connected' ? '✓ Banco de dados conectado' : '✗ Banco desconectado'}
            </p>
          </div>
        )}

        {/* Cards de Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600">Total de Clientes</p>
            <p className="text-3xl font-bold text-blue-600">{clientes.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600">Total de Operações</p>
            <p className="text-3xl font-bold text-blue-600">{operacoes.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600">Status do Sistema</p>
            <p className={`text-3xl font-bold ${health?.status === 'ok' ? 'text-green-600' : 'text-red-600'}`}>
              {health?.status === 'ok' ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>

        {/* Últimas Operações */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Últimas Operações</h2>
          {loading ? (
            <p className="text-gray-600">Carregando...</p>
          ) : operacoes.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Número</th>
                    <th className="px-4 py-2 text-left">Cliente</th>
                    <th className="px-4 py-2 text-left">Destino</th>
                    <th className="px-4 py-2 text-left">Estágio</th>
                    <th className="px-4 py-2 text-left">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {operacoes.slice(0, 5).map((op) => (
                    <tr key={op.id} className="border-t">
                      <td className="px-4 py-2">{op.numero_operacao}</td>
                      <td className="px-4 py-2">{op.nome_empresa || '-'}</td>
                      <td className="px-4 py-2">{op.destino}</td>
                      <td className="px-4 py-2">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          Etapa {op.estagio}/7
                        </span>
                      </td>
                      <td className="px-4 py-2">R$ {op.valor_estimado?.toFixed(2) || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">Nenhuma operação encontrada</p>
          )}
        </div>
      </div>
    </div>
  );
}
