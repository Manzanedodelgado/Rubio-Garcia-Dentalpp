import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';

export default function Reportes() {
  return (
    <div className="p-12">
      <header className="mb-8">
        <h1 className="text-3xl font-display font-bold text-neutral-900 mb-2">Reportes</h1>
        <p className="text-neutral-600">Estadisticas y metricas de rendimiento</p>
      </header>

      <div className="card">
        <div className="flex items-center justify-center py-24 text-neutral-600">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 mx-auto mb-4 text-neutral-400" />
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Reportes en desarrollo</h3>
            <p>Las estadisticas y graficos estaran disponibles proximamente</p>
          </div>
        </div>
      </div>
    </div>
  );
}
