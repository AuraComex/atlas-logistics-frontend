export default function Navbar() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Atlas Logistics</h1>
          <p className="text-sm text-blue-100">Gestão de Operações</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-semibold">{user.nome || 'Usuário'}</p>
            <p className="text-sm text-blue-100">{user.tipo || 'cliente'}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
          >
            Sair
          </button>
        </div>
      </div>

      <div className="bg-blue-700 px-4 py-2">
        <div className="max-w-6xl mx-auto flex gap-6">
          <a href="/dashboard" className="text-blue-100 hover:text-white transition">Dashboard</a>
          <a href="/operacoes" className="text-blue-100 hover:text-white transition">Operações</a>
          <a href="/clientes" className="text-blue-100 hover:text-white transition">Clientes</a>
        </div>
      </div>
    </nav>
  );
}
