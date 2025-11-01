import React, { useEffect, useState } from 'react';
import { Plus, Calendar as CalendarIcon } from 'lucide-react';
import { appointmentsAPI } from '../services/api';

export default function Agenda() {
  const [appointments, setAppointments] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('all');

  useEffect(() => {
    loadAppointments();
  }, [selectedDoctor]);

  const loadAppointments = async () => {
    try {
      const params = selectedDoctor !== 'all' ? { doctor: selectedDoctor } : {};
      const response = await appointmentsAPI.list(params);
      setAppointments(response.data);
    } catch (error) {
      console.error('Error loading appointments:', error);
    }
  };

  const doctors = [
    { id: 'all', name: 'Todos' },
    { id: 'mario', name: 'Dr. Mario' },
    { id: 'rodriguez', name: 'Dra. Rodriguez' },
    { id: 'gil', name: 'Dra. Gil' }
  ];

  return (
    <div className="p-12">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-neutral-900 mb-2">Agenda</h1>
          <p className="text-neutral-600">Gestion de citas por dentista</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Nueva Cita
        </button>
      </header>

      {/* Filtro por dentista */}
      <div className="mb-6 flex gap-2">
        {doctors.map((doctor) => (
          <button
            key={doctor.id}
            onClick={() => setSelectedDoctor(doctor.id)}
            className={`px-4 py-2 rounded-base font-medium transition-all ${
              selectedDoctor === doctor.id
                ? 'bg-primary-500 text-white'
                : 'bg-white text-neutral-700 hover:bg-neutral-50 border border-neutral-200'
            }`}
          >
            {doctor.name}
          </button>
        ))}
      </div>

      {/* Lista de citas */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-100">
                <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wide">Fecha</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wide">Hora</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wide">Paciente</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wide">Doctor</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wide">Tratamiento</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wide">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {appointments.length > 0 ? (
                appointments.map((apt, index) => (
                  <tr key={apt._id} className={`hover:bg-primary-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}`}>
                    <td className="px-4 py-4 text-sm text-neutral-800">{new Date(apt.date).toLocaleDateString('es-ES')}</td>
                    <td className="px-4 py-4 text-sm font-mono text-neutral-800">{apt.hora}</td>
                    <td className="px-4 py-4 text-sm font-medium text-neutral-900">{apt.title}</td>
                    <td className="px-4 py-4 text-sm text-neutral-700 capitalize">{apt.doctor}</td>
                    <td className="px-4 py-4 text-sm text-neutral-700">{apt.treatment_type || '-'}</td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        apt.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                        apt.status === 'completed' ? 'bg-green-100 text-green-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {apt.status === 'scheduled' ? 'Programada' : apt.status === 'completed' ? 'Completada' : 'Cancelada'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 py-12 text-center text-neutral-600">
                    No hay citas registradas
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
