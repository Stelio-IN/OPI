import React, { useState, useEffect } from 'react';

interface Employee {
  id_funcionario: number;
  id_instituicao: number;
  tipo_funcionario: 'Motorista' | 'Cobrador' | 'Fiscal' | 'Funcionario';
  tipo_contrato: 'Parcial' | 'Inteiro';
  nome: string;
  apelido: string | null;
  email: string | null;
  celular: string | null;
  morada: string | null;
  bi: string | null;
  nuit: string | null;
  status: 'Activo' | 'Inactivo';
}

const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    id_instituicao: '',
    tipo_funcionario: 'Motorista' as 'Motorista' | 'Cobrador' | 'Fiscal' | 'Funcionario',
    tipo_contrato: 'Parcial' as 'Parcial' | 'Inteiro',
    nome: '',
    apelido: '',
    email: '',
    celular: '',
    morada: '',
    bi: '',
    nuit: '',
    status: 'Activo' as 'Activo' | 'Inactivo',
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    // Filter employees based on search query
    const filtered = employees.filter(
      (emp) =>
        emp.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (emp.email && emp.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredEmployees(filtered);
  }, [searchQuery, employees]);

  const fetchEmployees = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3005/api/funcionario');
      if (!response.ok) throw new Error('Erro ao buscar funcionários');
      const data = await response.json();
      setEmployees(data);
      setFilteredEmployees(data);
    } catch (error: any) {
      setError(error.message || 'Erro ao carregar dados');
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (employee: Employee | null = null) => {
    if (employee) {
      setCurrentEmployee(employee);
      setFormData({
        id_instituicao: employee.id_instituicao.toString(),
        tipo_funcionario: employee.tipo_funcionario,
        tipo_contrato: employee.tipo_contrato,
        nome: employee.nome,
        apelido: employee.apelido || '',
        email: employee.email || '',
        celular: employee.celular || '',
        morada: employee.morada || '',
        bi: employee.bi || '',
        nuit: employee.nuit || '',
        status: employee.status,
      });
      setIsEditing(true);
    } else {
      setFormData({
        id_instituicao: '',
        tipo_funcionario: 'Motorista',
        tipo_contrato: 'Parcial',
        nome: '',
        apelido: '',
        email: '',
        celular: '',
        morada: '',
        bi: '',
        nuit: '',
        status: 'Activo',
      });
      setIsEditing(false);
    }
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const url = isEditing
      ? `http://localhost:3005/api/funcionario/${currentEmployee?.id_funcionario}`
      : 'http://localhost:3005/api/funcionario';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_instituicao: parseInt(formData.id_instituicao),
          tipo_funcionario: formData.tipo_funcionario,
          tipo_contrato: formData.tipo_contrato,
          nome: formData.nome,
          apelido: formData.apelido || null,
          email: formData.email || null,
          celular: formData.celular || null,
          morada: formData.morada || null,
          bi: formData.bi || null,
          nuit: formData.nuit || null,
          status: formData.status,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao salvar funcionário');
      }

      setShowModal(false);
      fetchEmployees();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Deseja excluir este funcionário?')) {
      try {
        const response = await fetch(`http://localhost:3005/api/funcionario/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Erro ao deletar funcionário');
        fetchEmployees();
      } catch (error: any) {
        setError(error.message);
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h2 className="text-lg font-bold text-gray-800 mb-4">
        Gerenciamento de Funcionários
      </h2>

      {error && (
        <div className="bg-red-100 text-red-800 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Pesquisar por nome ou email"
          value={searchQuery}
          onChange={handleSearch}
          className="w-1/3 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Novo Funcionário
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-6 text-gray-500">Carregando funcionários...</div>
      ) : filteredEmployees.length === 0 ? (
        <div className="text-center py-6 text-gray-500">Nenhum funcionário encontrado.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase font-semibold text-gray-600">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Tipo Funcionário</th>
                <th className="px-4 py-3">Tipo Contrato</th>
                <th className="px-4 py-3">Celular</th>
                <th className="px-4 py-3">Morada</th>
               {/* <th className="px-4 py-3">BI</th>
                <th className="px-4 py-3">NUIT</th> */}
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id_funcionario} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{employee.id_funcionario}</td>
                  <td className="px-4 py-2">{employee.nome}</td>
                  <td className="px-4 py-2">{employee.email || 'N/A'}</td>
                  <td className="px-4 py-2">{employee.tipo_funcionario}</td>
                  <td className="px-4 py-2">{employee.tipo_contrato}</td>
                  <td className="px-4 py-2">{employee.celular || 'N/A'}</td>
                  <td className="px-4 py-2">{employee.morada || 'N/A'}</td>
                  {/* <td className="px-4 py-2">{employee.bi || 'N/A'}</td>
                  <td className="px-4 py-2">{employee.nuit || 'N/A'}</td> */}
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        employee.status === 'Activo'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => openModal(employee)}
                      className="text-blue-600 hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(employee.id_funcionario)}
                      className="text-red-600 hover:underline"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              {isEditing ? 'Editar Funcionário' : 'Novo Funcionário'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">ID Instituição</label>
                  <input
                    type="number"
                    name="id_instituicao"
                    value={formData.id_instituicao}
                    onChange={handleInputChange}
                    required
                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Tipo Funcionário</label>
                  <select
                    name="tipo_funcionario"
                    value={formData.tipo_funcionario}
                    onChange={handleInputChange}
                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Motorista">Motorista</option>
                    <option value="Cobrador">Cobrador</option>
                    <option value="Fiscal">Fiscal</option>
                    <option value="Funcionario">Funcionário</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Tipo Contrato</label>
                  <select
                    name="tipo_contrato"
                    value={formData.tipo_contrato}
                    onChange={handleInputChange}
                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Parcial">Parcial</option>
                    <option value="Inteiro">Inteiro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Nome</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Apelido</label>
                  <input
                    type="text"
                    name="apelido"
                    value={formData.apelido}
                    onChange={handleInputChange}
                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Celular</label>
                  <input
                    type="text"
                    name="celular"
                    value={formData.celular}
                    onChange={handleInputChange}
                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Morada</label>
                  <input
                    type="text"
                    name="morada"
                    value={formData.morada}
                    onChange={handleInputChange}
                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">BI</label>
                  <input
                    type="text"
                    name="bi"
                    value={formData.bi}
                    onChange={handleInputChange}
                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">NUIT</label>
                  <input
                    type="text"
                    name="nuit"
                    value={formData.nuit}
                    onChange={handleInputChange}
                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {isEditing ? 'Atualizar' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;