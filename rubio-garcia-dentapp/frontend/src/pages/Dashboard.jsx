import React, { useEffect, useState } from 'react';
import { Calendar, MessageSquare, Users, TrendingUp } from 'lucide-react';
import { appointmentsAPI, conversationsAPI } from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    today: 0,
    scheduled: 0,
    completed: 0,
    messages: 0
  });
  const [appointments, setAppointments] = useState([]);
  const [urgentConversations, setUrgentConversations] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsRes, appointmentsRes, conversationsRes] = await Promise.all([
        appointmentsAPI.stats(),
        appointmentsAPI.list({ limit: 5 }),
        conversationsAPI.list({ status: 'yellow', limit: 5 })
      ]);
      
      setStats(statsRes.data);
      setAppointments(appointmentsRes.data);
      setUrgentConversations(conversationsRes.data);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  return (
    <div className="p-12">
      <header className="mb-8">
        <h1 className="text-3xl font-display font-bold text-neutral-900 mb-2">Dashboard</h1>
        <p className="text-neutral-600">Vision general de tu clinica dental</p>
      </header>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="card-metric">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-base bg-primary-50 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary-500" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-xs uppercase tracking-wide text-neutral-600 font-medium mb-1">Citas Hoy</p>
          <p className="text-4xl font-mono font-bold text-neutral-900">{stats.today}</p>
        </div>

        <div className="card-metric">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-base bg-primary-50 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary-500" />
            </div>
          </div>
          <p className="text-xs uppercase tracking-wide text-neutral-600 font-medium mb-1">Programadas</p>
          <p className="text-4xl font-mono font-bold text-neutral-900">{stats.scheduled}</p>
        </div>

        <div className="card-metric">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-base bg-green-50 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-xs uppercase tracking-wide text-neutral-600 font-medium mb-1">Completadas</p>
          <p className="text-4xl font-mono font-bold text-neutral-900">{stats.completed}</p>
        </div>

        <div className="card-metric">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-base bg-accent-50 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-accent-600" />
            </div>
          </div>
          <p className="text-xs uppercase tracking-wide text-neutral-600 font-medium mb-1">Mensajes</p>
          <p className="text-4xl font-mono font-bold text-neutral-900">{urgentConversations.length}</p>
        </div>
      </div>

      {/* Citas de hoy */}
      <div className="grid grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Citas de Hoy</h2>
          <div className="space-y-3">
            {appointments.length > 0 ? (
              appointments.map((apt) => (
                <div key={apt._id} className="flex items-center gap-3 p-3 rounded-base bg-neutral-50 hover:bg-neutral-100 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary-700" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-neutral-900">{apt.title}</p>
                    <p className="text-sm text-neutral-600">{apt.hora} - Dr. {apt.doctor}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    apt.status === 'scheduled' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {apt.status === 'scheduled' ? 'Programada' : 'Completada'}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-neutral-600 text-center py-8">No hay citas para hoy</p>
            )}
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Conversaciones Urgentes</h2>
          <div className="space-y-3">
            {urgentConversations.length > 0 ? (
              urgentConversations.map((conv) => (
                <div key={conv._id} className="flex items-center gap-3 p-3 rounded-base border-l-4 border-yellow-400 bg-yellow-50">
                  <MessageSquare className="w-5 h-5 text-yellow-600" />
                  <div className="flex-1">
                    <p className="font-medium text-neutral-900">{conv.whatsapp_number}</p>
                    <p className="text-sm text-neutral-600">Requiere atencion inmediata</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-neutral-600 text-center py-8">No hay conversaciones urgentes</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
