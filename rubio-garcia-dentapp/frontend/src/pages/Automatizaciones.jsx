import React, { useEffect, useState } from 'react';
import { Plus, MessageSquare, FileText } from 'lucide-react';
import { templatesAPI } from '../services/api';

export default function Automatizaciones() {
  const [activeTab, setActiveTab] = useState('messages');
  const [messageTemplates, setMessageTemplates] = useState([]);
  const [consentTemplates, setConsentTemplates] = useState([]);

  useEffect(() => {
    loadTemplates();
  }, [activeTab]);

  const loadTemplates = async () => {
    try {
      if (activeTab === 'messages') {
        const response = await templatesAPI.listMessages();
        setMessageTemplates(response.data);
      } else {
        const response = await templatesAPI.listConsents();
        setConsentTemplates(response.data);
      }
    } catch (error) {
      console.error('Error loading templates:', error);
    }
  };

  return (
    <div className="p-12">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-neutral-900 mb-2">Automatizaciones</h1>
          <p className="text-neutral-600">Plantillas y flujos automatizados</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Nueva Plantilla
        </button>
      </header>

      {/* Tabs */}
      <div className="mb-6 flex gap-2 border-b border-neutral-200">
        <button
          onClick={() => setActiveTab('messages')}
          className={`px-6 py-3 font-medium transition-all ${
            activeTab === 'messages'
              ? 'border-b-2 border-primary-500 text-primary-700'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          Plantillas WhatsApp
        </button>
        <button
          onClick={() => setActiveTab('consents')}
          className={`px-6 py-3 font-medium transition-all ${
            activeTab === 'consents'
              ? 'border-b-2 border-primary-500 text-primary-700'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          Consentimientos
        </button>
      </div>

      {/* Contenido */}
      {activeTab === 'messages' ? (
        <div className="grid grid-cols-3 gap-6">
          {messageTemplates.length > 0 ? (
            messageTemplates.map((template) => (
              <div key={template._id} className="card hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-base bg-accent-50 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-accent-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-neutral-900">{template.name}</h3>
                    <p className="text-sm text-neutral-600 mt-1 line-clamp-2">{template.content}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 py-12 text-center text-neutral-600">
              No hay plantillas de mensajes
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {consentTemplates.length > 0 ? (
            consentTemplates.map((template) => (
              <div key={template._id} className="card hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-base bg-primary-50 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-neutral-900">{template.treatment_type}</h3>
                    <p className="text-sm text-neutral-600 mt-1 line-clamp-3">{template.content}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 py-12 text-center text-neutral-600">
              No hay consentimientos registrados
            </div>
          )}
        </div>
      )}
    </div>
  );
}
