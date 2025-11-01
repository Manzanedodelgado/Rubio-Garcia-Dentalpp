import React, { useEffect, useState } from 'react';
import { Brain, MessageSquare } from 'lucide-react';
import { aiAPI } from '../services/api';

export default function IA() {
  const [knowledge, setKnowledge] = useState(null);
  const [config, setConfig] = useState(null);
  const [testMessage, setTestMessage] = useState('');
  const [testResponse, setTestResponse] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [knowledgeRes, configRes] = await Promise.all([
        aiAPI.knowledge(),
        aiAPI.config()
      ]);
      setKnowledge(knowledgeRes.data);
      setConfig(configRes.data);
    } catch (error) {
      console.error('Error loading AI data:', error);
    }
  };

  const testAI = async () => {
    if (!testMessage.trim()) return;
    
    try {
      const response = await aiAPI.respond({ message: testMessage });
      setTestResponse(response.data);
    } catch (error) {
      console.error('Error testing AI:', error);
    }
  };

  return (
    <div className="p-12">
      <header className="mb-8">
        <h1 className="text-3xl font-display font-bold text-neutral-900 mb-2">Agente IA</h1>
        <p className="text-neutral-600">Configuracion y monitoreo del agente especializado</p>
      </header>

      <div className="grid grid-cols-2 gap-6">
        {/* Base de conocimientos */}
        <div className="card">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary-500" />
            Base de Conocimientos
          </h2>
          {knowledge ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-neutral-700 uppercase tracking-wide mb-2">Precios</h3>
                <div className="space-y-2">
                  {Object.entries(knowledge.precios || {}).slice(0, 5).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-neutral-700">{value.descripcion}</span>
                      <span className="font-mono font-semibold text-primary-700">{value.precio}€</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-neutral-700 uppercase tracking-wide mb-2">Horarios</h3>
                <div className="space-y-1 text-sm text-neutral-700">
                  <p>Lunes-Jueves: {knowledge.horarios?.lunes_jueves}</p>
                  <p>Viernes: {knowledge.horarios?.viernes}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-neutral-600">Cargando...</p>
          )}
        </div>

        {/* Prueba del agente */}
        <div className="card">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-accent-600" />
            Probar Agente IA
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Mensaje de prueba
              </label>
              <textarea
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                placeholder="Escribe un mensaje para probar el agente..."
                className="input-base w-full h-24 resize-none"
              />
            </div>
            <button onClick={testAI} className="btn-primary w-full">
              Probar Respuesta
            </button>
            {testResponse && (
              <div className="p-4 rounded-base bg-accent-50 border border-accent-200">
                <p className="text-sm font-semibold text-neutral-900 mb-2">Respuesta del IA:</p>
                <p className="text-sm text-neutral-700 mb-2">{testResponse.text}</p>
                <div className="flex items-center justify-between text-xs text-neutral-600">
                  <span>Confianza: {(testResponse.confidence * 100).toFixed(0)}%</span>
                  {testResponse.suggested_classification && (
                    <span className={`px-2 py-1 rounded-full ${
                      testResponse.suggested_classification === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                      testResponse.suggested_classification === 'blue' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {testResponse.suggested_classification}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Configuración */}
      <div className="card mt-6">
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">Configuracion</h2>
        {config && (
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-neutral-700">Respuestas automaticas</label>
            <button
              className={`relative w-12 h-6 rounded-full transition-colors ${
                config.auto_responses ? 'bg-primary-500' : 'bg-neutral-300'
              }`}
            >
              <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                config.auto_responses ? 'translate-x-6' : ''
              }`} />
            </button>
            <span className="text-sm text-neutral-600">
              {config.auto_responses ? 'Activadas' : 'Desactivadas'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
