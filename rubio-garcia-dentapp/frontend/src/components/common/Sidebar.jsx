import React from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  MessageSquare, 
  Users, 
  Zap, 
  Brain, 
  BarChart3 
} from 'lucide-react';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'agenda', label: 'Agenda', icon: Calendar },
  { id: 'mensajeria', label: 'Mensajeria', icon: MessageSquare },
  { id: 'pacientes', label: 'Pacientes', icon: Users },
  { id: 'automatizaciones', label: 'Automatizaciones', icon: Zap },
  { id: 'ia', label: 'Agente IA', icon: Brain },
  { id: 'reportes', label: 'Reportes', icon: BarChart3 },
];

export default function Sidebar({ currentPage, onPageChange }) {
  return (
    <aside className="w-60 bg-white border-r border-neutral-100 flex flex-col">
      {/* Logo y nombre */}
      <div className="h-16 flex items-center px-4 border-b border-neutral-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-primary-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">RG</span>
          </div>
          <div>
            <h1 className="text-base font-display font-bold text-neutral-900">Rubio Garcia</h1>
            <p className="text-xs text-neutral-600">Dentapp</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-base text-sm font-medium
                transition-all duration-fast
                ${isActive 
                  ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-500' 
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-800 border-l-4 border-transparent'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User info */}
      <div className="p-4 border-t border-neutral-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent-400 flex items-center justify-center">
            <span className="text-neutral-900 font-semibold text-sm">MJ</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-neutral-900">Maria Jose</p>
            <p className="text-xs text-neutral-600">Coordinadora</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
