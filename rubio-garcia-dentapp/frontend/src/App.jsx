import React, { useState } from 'react';
import Sidebar from './components/common/Sidebar';
import Dashboard from './pages/Dashboard';
import Agenda from './pages/Agenda';
import Mensajeria from './pages/Mensajeria';
import Pacientes from './pages/Pacientes';
import Automatizaciones from './pages/Automatizaciones';
import IA from './pages/IA';
import Reportes from './pages/Reportes';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'agenda':
        return <Agenda />;
      case 'mensajeria':
        return <Mensajeria />;
      case 'pacientes':
        return <Pacientes />;
      case 'automatizaciones':
        return <Automatizaciones />;
      case 'ia':
        return <IA />;
      case 'reportes':
        return <Reportes />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="flex-1 overflow-y-auto">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
