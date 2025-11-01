import React, { useEffect, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { patientsAPI } from '../services/api';

export default function Pacientes() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadPatients();
  }, [searchTerm]);

  const loadPatients = async () => {
    try {
      const params = searchTerm ? { search: searchTerm } : {};
      const response = await patientsAPI.list(params);
      setPatients(response.data);
    } catch (error) {
      console.error('Error loading patients:', error);
    }
  };

  return (
    <div className="p-12">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-neutral-900 mb-2">Pacientes</h1>
          <p className="text-neutral-600">Gestion completa de pacientes</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Nuevo Paciente
        </button>
      </header>

      {/* Barra de búsqueda */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, telefono o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-base w-full pl-12"
          />
        </div>
      </div>

      {/* Tabla de pacientes */}
      <div className="card">
        <table className="w-full">
          <thead>
            <tr className="bg-neutral-100">
              <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wide">Nombre</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wide">Telefono</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wide">Email</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wide">WhatsApp</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wide">Registro</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {patients.length > 0 ? (
              patients.map((patient, index) => (
                <tr key={patient._id} className={`hover:bg-primary-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}`}>
                  <td className="px-4 py-4 text-sm font-medium text-neutral-900">{patient.name}</td>
                  <td className="px-4 py-4 text-sm font-mono text-neutral-700">{patient.phone}</td>
                  <td className="px-4 py-4 text-sm text-neutral-700">{patient.email || '-'}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      patient.whatsapp_registered ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {patient.whatsapp_registered ? 'Registrado' : 'No registrado'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-neutral-600">{new Date(patient.created_at).toLocaleDateString('es-ES')}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-12 text-center text-neutral-600">
                  {searchTerm ? 'No se encontraron pacientes' : 'No hay pacientes registrados'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
