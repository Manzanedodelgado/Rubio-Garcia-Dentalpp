# Rubio Garcia Dentapp - Sistema de Gestion Dental Completo

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

Sistema completo de gestion dental con integracion WhatsApp, agente IA especializado y dashboard profesional.

## Caracteristicas Principales

- **Dashboard Interactivo**: Metricas en tiempo real, citas del dia, conversaciones prioritarias
- **Gestion de Agenda**: Calendario por dentista con sistema de citas completo
- **WhatsApp Integrado**: Chat con clasificacion automatica (urgente/normal/resuelta)
- **Agente IA Dental**: Respuestas automaticas con base de conocimientos completa
- **Gestion de Pacientes**: CRUD completo con historial de citas
- **Automatizaciones**: Plantillas WhatsApp y consentimientos digitales
- **Reportes**: Estadisticas y metricas de rendimiento

## Stack Tecnologico

### Backend
- **FastAPI** 0.109.0 - API REST
- **MongoDB** - Base de datos NoSQL
- **Motor** - Driver async para MongoDB
- **Pydantic** - Validacion de datos

### WhatsApp Service
- **Baileys** 6.5.0 - Integracion WhatsApp
- **Express** 4.18.2 - Servidor HTTP
- **Socket.io** - WebSockets para real-time

### Frontend
- **React** 19.0.0 - UI Framework
- **Vite** 5.0.8 - Build tool
- **Tailwind CSS** 3.4.0 - Estilos
- **Radix UI** - Componentes accesibles
- **Lucide React** - Iconos
- **Axios** - HTTP client
- **Zustand** - State management

## Estructura del Proyecto

```
rubio-garcia-dentapp/
├── backend/                # FastAPI API
│   ├── app/
│   │   ├── api/routes/    # Endpoints
│   │   ├── models/        # Pydantic models
│   │   ├── database/      # MongoDB connection
│   │   └── core/          # Configuracion
│   ├── requirements.txt
│   └── Dockerfile
├── whatsapp-service/      # Baileys WhatsApp
│   ├── src/
│   │   └── index.js      # Servidor WhatsApp
│   ├── package.json
│   └── Dockerfile
├── frontend/              # React App
│   ├── src/
│   │   ├── components/   # Componentes UI
│   │   ├── pages/        # 7 paginas principales
│   │   ├── services/     # API calls
│   │   └── styles/       # CSS global
│   ├── package.json
│   └── Dockerfile
└── docker-compose.yml     # Orquestacion
```

## Instalacion y Configuracion

### Requisitos Previos

- Node.js 20+
- Python 3.11+
- MongoDB 7.0+
- Docker y Docker Compose (opcional)

### Opcion 1: Docker (Recomendado)

1. Clonar el repositorio:
```bash
git clone <repository-url>
cd rubio-garcia-dentapp
```

2. Crear archivos `.env` basados en `.env.example`:
```bash
# Backend
cp backend/.env.example backend/.env

# WhatsApp Service
cp whatsapp-service/.env.example whatsapp-service/.env
```

3. Iniciar todos los servicios:
```bash
docker-compose up -d
```

4. Acceder a la aplicacion:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs
- WhatsApp Service: http://localhost:3001

### Opcion 2: Instalacion Manual

#### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Editar .env con tu configuracion
uvicorn app.main:app --reload --port 8000
```

#### WhatsApp Service

```bash
cd whatsapp-service
npm install
cp .env.example .env
# Editar .env con tu configuracion
npm start
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Configuracion de WhatsApp

1. Iniciar el servicio WhatsApp
2. Acceder a http://localhost:3001/qr
3. Escanear el codigo QR con WhatsApp Business
4. El servicio se conectara automaticamente

## Base de Datos

### Colecciones MongoDB

1. **patients** - Pacientes
2. **appointments** - Citas
3. **conversations** - Conversaciones WhatsApp
4. **messages** - Mensajes
5. **message_templates** - Plantillas
6. **consent_templates** - Consentimientos
7. **ai_config** - Configuracion IA

## API Endpoints

### Pacientes
- `GET /api/patients` - Listar pacientes
- `POST /api/patients` - Crear paciente
- `PUT /api/patients/{id}` - Actualizar paciente
- `DELETE /api/patients/{id}` - Eliminar paciente
- `GET /api/patients/{id}/history` - Historial

### Citas
- `GET /api/appointments` - Listar citas
- `POST /api/appointments` - Crear cita
- `PUT /api/appointments/{id}` - Actualizar cita
- `DELETE /api/appointments/{id}` - Eliminar cita
- `GET /api/appointments/stats` - Estadisticas

### WhatsApp
- `GET /api/whatsapp/status` - Estado conexion
- `GET /api/whatsapp/qr` - Codigo QR
- `POST /api/whatsapp/send-message` - Enviar mensaje

### IA
- `GET /api/ai/knowledge` - Base conocimientos
- `POST /api/ai/classify` - Clasificar conversacion
- `POST /api/ai/respond` - Generar respuesta
- `GET /api/ai/config` - Configuracion IA

## Agente IA

El agente IA incluye conocimientos completos sobre:

### Precios (30+ tratamientos)
- Primera visita: 0€ (GRATIS)
- Limpieza: 45€
- Implante: 700€
- Ortodoncia fija: 70€/mes
- Blanqueamiento: 250-300€
- Botox: 300€
- Y mas...

### Horarios
- Lunes-Jueves: 10:00-14:00 y 16:00-20:00
- Viernes: 10:00-14:00

### Dentistas
- **Dr. Mario**: Lunes, Miercoles, Viernes (Implantologia)
- **Dra. Rodriguez**: Martes, Jueves (Endodoncia)
- **Dra. Gil**: Martes, Jueves, Viernes (Endodoncia)

## Desarrollo

### Estructura de Desarrollo

```bash
# Backend tests
cd backend
pytest

# Frontend dev
cd frontend
npm run dev

# Linting
npm run lint
```

## Deployment en Produccion

1. Configurar variables de entorno de produccion
2. Actualizar SECRET_KEY en backend/.env
3. Configurar dominio y SSL
4. Usar servicios de base de datos gestionados (MongoDB Atlas)
5. Deploy con Docker Compose o servicios cloud (AWS, DigitalOcean)

## Soporte y Contacto

Para soporte tecnico o consultas:
- Email: soporte@rubiogarciadental.com
- Telefono: 664 218 253

## Licencia

MIT License - Ver LICENSE para mas detalles

## Creditos

Desarrollado por MiniMax Agent
Octubre 2025
