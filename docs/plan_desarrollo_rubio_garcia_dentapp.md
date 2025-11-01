# 🦷 Rubio Garcia Dentapp v2.0 - Plan Completo de Desarrollo

**Fecha:** 31 de octubre de 2025  
**Cliente:** Rubio Garcia Dentapp (Madrid)  
**Desarrollador:** MiniMax Agent  

---

## 📋 **RESUMEN EJECUTIVO**

### **Objetivo del Proyecto:**
Crear una aplicación web completa de gestión dental que combine:
- La funcionalidad robusta de DentApp v1.0
- El diseño profesional tipo plataforma médica de Docfav
- Integración WhatsApp con Baileys
- Agente IA especializado en servicios dentales

### **Resultado Esperado:**
Sistema completo de gestión dental con automatización de consultas por WhatsApp, gestión de agenda, pacientes y agente IA integrado.

---

## 🏗️ **ARQUITECTURA TÉCNICA**

### **Stack Tecnológico:**
- **Frontend:** React 19.0 + Vite + Tailwind CSS + Radix UI
- **Backend:** FastAPI + Python + AsyncIO
- **Base de Datos:** MongoDB (colecciones optimizadas)
- **WhatsApp:** Baileys (Node.js service)
- **IA:** OpenRouter/DeepSeek para respuestas automáticas
- **Deployment:** Docker containers + PM2

### **Estructura de Servicios:**
```
rubio-garcia-dentapp/
├── frontend/          # React app
├── backend/           # FastAPI server
├── whatsapp-service/  # Baileys Node.js
├── database/          # MongoDB schemas
└── docs/              # Documentación
```

---

## 🗄️ **BASE DE DATOS OPTIMIZADA**

### **Colecciones MongoDB:**

#### **1. treatments (Tratamientos)**
```javascript
{
  _id: ObjectId,
  name: String,           // "Limpieza Dental"
  specialty: String,      // "General"
  duration_minutes: int,  // 15
  price: float,           // 45.00
  category: String,       // "Higiene", "Cirugía", "Estética"
  description: String,
  active: boolean
}
```

#### **2. dentists (Dentistas)**
```javascript
{
  _id: ObjectId,
  name: String,           // "Mario Rubio"
  specialty: String,      // "Implantología"
  phone: String,          // "664 218 253"
  email: String,
  schedule: {
    monday: ["10:00-14:00", "16:00-20:00"],
    tuesday: [...],
    // ...
  },
  active: boolean
}
```

#### **3. patients (Pacientes)**
```javascript
{
  _id: ObjectId,
  name: String,
  phone: String,
  email: String,
  notes: String,
  created_at: DateTime,
  whatsapp_registered: boolean
}
```

#### **4. appointments (Citas)**
```javascript
{
  _id: ObjectId,
  patient_id: ObjectId,
  dentist_id: ObjectId,
  treatment_id: ObjectId,
  date: DateTime,
  duration_minutes: int,
  status: String,         // "planificada", "confirmada", "cancelada"
  notes: String,
  reminder_sent: boolean,
  created_at: DateTime
}
```

#### **5. conversations (Conversaciones WhatsApp)**
```javascript
{
  _id: ObjectId,
  patient_phone: String,
  last_message: String,
  last_message_at: DateTime,
  color_code: String,     // "AMARILLO", "AZUL", "VERDE", null
  manually_classified: boolean,
  created_at: DateTime
}
```

#### **6. message_templates (Plantillas WhatsApp)**
```javascript
{
  _id: ObjectId,
  name: String,           // "Consulta Precios"
  category: String,       // "informacion", "confirmacion", "recordatorio"
  steps: [{
    content: String,      // "Hola {{nombre}}, el precio de {{tratamiento}} es {{precio}}€"
    buttons: [{
      text: String,
      action: String      // "send_price_info", "schedule_appointment"
    }]
  }],
  active: boolean
}
```

#### **7. ai_knowledge_base (Base de Conocimientos IA)**
```javascript
{
  _id: ObjectId,
  category: String,       // "precios", "tratamientos", "horarios"
  question_patterns: [String],
  response_template: String,
  variables: [String],    // ["{{precio}}", "{{tratamiento}}"]
  priority: int
}
```

---

## 🎨 **DISEÑO UI/UX**

### **Paleta de Colores:**
- **Primarios:** Blancos (#FFFFFF), Grises (#F8F9FA, #6C757D), Negros (#212529)
- **Secundarios:** Azules oscuros (#1E3A8A, #1E40AF)
- **Acentos:** Melocotón (#FFB5A7, #FFCAB0)
- **Estado:** Verde (#10B981), Amarillo (#F59E0B), Rojo (#EF4444)

### **Inspiración Docfav:**
- **Layout limpio y profesional**
- **Tarjetas con bordes redondeados**
- **Iconografía médica clara**
- **Navegación intuitiva tipo dashboard**
- **Responsive design para móviles**

### **Componentes Principales:**

#### **1. Dashboard Principal**
```
┌─────────────────────────────────────────┐
│ 📊 DASHBOARD - Rubio Garcia Dentapp    │
├─────────────────────────────────────────┤
│ [📅 Citas Hoy] [💬 Mensajes] [👥 Pacientes] │
│                                         │
│ 🎯 PRÓXIMAS CITAS:                      │
│ • 10:00 - María García (Limpieza)      │
│ • 11:30 - Carlos López (Implante)      │
│                                         │
│ 💬 CONVERSACIONES PRIORITARIAS:        │
│ • 🟡 Juan Pérez - Consulta precio      │
│ • 🔵 Ana Martín - Cancelar cita        │
└─────────────────────────────────────────┘
```

#### **2. Gestión de Agenda**
```
┌─────────────────────────────────────────┐
│ 📅 AGENDA - Calendario Semanal         │
├─────────────────────────────────────────┤
│ LUNES    │ MARTES   │ MIÉRCOLES │ JUEVES │
│ Virginia │ Irene    │ Mario     │ Miriam │
├──────────┼──────────┼───────────┼────────┤
│ 10:00 ✅ │ 10:00 ✅ │ 10:00 ✅  │ 10:00 ✅│
│ 10:30 🟡 │ 10:30 ✅ │ 10:30 ✅  │ 10:30 🟡│
│ 11:00 ❌ │ 11:00 ❌ │ 11:00 ✅  │ 11:00 ❌│
└─────────────────────────────────────────┘
```

#### **3. Chat WhatsApp Integrado**
```
┌─────────────┬─────────────────────────────┬──────────────┐
│ CONVERSAC.  │ CHAT - María García (664...)│ INFO PACIENTE│
├─────────────┼─────────────────────────────┼──────────────┤
│ 🟡 Urgente  │ ← Hola, ¿cuánto cuesta...   │ 📋 María G.  │
│ 🔵 normal   │ → El precio de limpieza...  │ 📞 664 123   │
│ 🟢 resuelta │ ← Perfecto, quiero cita    │ 📅 3 citas   │
│ ⚪ nueva    │ → Te envio opciones...      │ 🏥 General   │
└─────────────┴─────────────────────────────┴──────────────┘
```

---

## 📱 **INTEGRACIÓN WHATSAPP**

### **Configuración Baileys:**
- **Número:** 664 218 253 (Mario)
- **Modo:** WhatsApp Business
- **Autenticación:** QR code automático
- **Reconexión:** Automática en caso de desconexión

### **Flujos de Conversación:**

#### **1. Consulta de Precios**
```
Paciente: "¿Cuánto cuesta una limpieza?"
IA: "¡Hola! 👋 El precio de nuestra limpieza dental es 45€. 
     ¿Te gustaría agendar una cita? Tenemos disponibilidad:
     • Lunes con Virginia (Ortodoncia)
     • Martes con Irene (Endodoncia) 
     • Miércoles con Mario (Implantología)"
```

#### **2. Agendamiento de Cita**
```
IA: "¿Qué día te viene mejor?
     📅 Lun-Jue: 10:00-14:00 y 16:00-20:00
     📅 Viernes: 10:00-14:00"
Paciente: "El miércoles a las 11"
IA: "✅ Perfecto. Cita programada:
     📅 Miércoles 15:00
     👨‍⚕️ Dr. Mario Rubio (Implantología)
     💰 45€ limpieza dental
     ¿Confirmas la cita?"
```

#### **3. Recordatorio de Cita**
```
IA: "🔔 Recordatorio: Tienes cita mañana
     📅 Miércoles 15:00
     👨‍⚕️ Dr. Mario Rubio 
     💰 Limpieza dental - 45€
     
     ¿Necesitas cambiar la hora?"
```

---

## 🤖 **AGENTE IA ESPECIALIZADO**

### **Base de Conocimientos:**
```
TRATAMIENTOS Y PRECIOS:
• Primera Visita: 0€ (GRATIS)
• Limpieza Dental: 45€
• Raspados: 60€/cuadrante
• Mantenimiento Periodontal: 90€
• Estudio Periodontal: 75€
• Estudio Ortodoncia Fija: 100€
• Estudio Alineadores: 1000€
• Colocación Brackets: 700€
• Mensualidad Ortodoncia Fija: 70€
• Implante: 700€
• Endodoncia Uniradicular: 175€
• Corona Zirconio: 400€
• Blanqueamiento Ambulatorio: 250€
• Botox: 300€
• Bichectomía: 700€

HORARIOS:
• Lunes-Jueves: 10:00-14:00 y 16:00-20:00
• Viernes: 10:00-14:00

PERSONAL:
• Lunes: Virginia (Ortodoncia, Limpieza, Revisiones)
• Martes: Irene (Endodoncia, Reconstrucciones, Prótesis)
• Miércoles: Mario (Implantología, Cirugía, Botox, Bichectomía)
• Jueves: Miriam (Igual que Irene)
```

### **Respuestas Inteligentes:**
- **"¿Cuánto cuesta?"** → Búsqueda automática en base de precios
- **"¿Cuándo están abiertos?"** → Horarios de atención
- **"Quiero cita"** → Calendario disponible por dentista
- **"Soy nuevo paciente"** → Promoción primera visita gratis
- **"Tengo dolor"** → Derivación a teléfono de urgencias

---

## 🏗️ **ESTRUCTURA DE DESARROLLO**

### **Fase 1: Setup y Base de Datos (Días 1-3)**
- [ ] Configuración entorno desarrollo
- [ ] Setup MongoDB con esquemas
- [ ] APIs básicas FastAPI
- [ ] Estructura React + Vite
- [ ] Integración Tailwind CSS + Radix UI

### **Fase 2: Módulos Core (Días 4-8)**
- [ ] Dashboard principal
- [ ] Gestión de pacientes
- [ ] Sistema de agenda/calendario
- [ ] CRUD de tratamientos y precios
- [ ] Gestión de dentistas y horarios

### **Fase 3: WhatsApp Integration (Días 9-12)**
- [ ] Setup Baileys service
- [ ] Webhook para mensajes entrantes
- [ ] Sistema de plantillas
- [ ] Clasificación automática de conversaciones
- [ ] Envío de mensajes salientes

### **Fase 4: Agente IA (Días 13-16)**
- [ ] Base de conocimientos dental
- [ ] Motor de respuestas automáticas
- [ ] Integración con OpenRouter/DeepSeek
- [ ] Entrenamiento con precios y horarios
- [ ] Testing de respuestas

### **Fase 5: Funcionalidades Avanzadas (Días 17-20)**
- [ ] Recordatorios automáticos
- [ ] Estadísticas y reportes
- [ ] Sistema de notificaciones
- [ ] Exportación de datos
- [ ] Backup y recuperación

### **Fase 6: Testing y Deploy (Días 21-24)**
- [ ] Testing integral de funcionalidades
- [ ] Optimización de rendimiento
- [ ] Configuración producción
- [ ] Documentación técnica
- [ ] Capacitación de usuario

---

## 📊 **CRONOGRAMA DETALLADO**

| Semana | Fase | Entregables |
|--------|------|-------------|
| **Semana 1** | Setup + Base de Datos | Backend funcional, DB configurada |
| **Semana 2** | Módulos Core | Frontend básico, CRUDs completos |
| **Semana 3** | WhatsApp + IA | Integración completa WhatsApp, IA básica |
| **Semana 4** | Finalización | Testing, deploy, documentación |

---

## 🎯 **ENTREGABLES FINALES**

### **Aplicación Web Completa:**
1. **Dashboard administrativo** con métricas en tiempo real
2. **Gestión de agenda** por dentista y tratamiento
3. **Sistema de pacientes** con historial completo
4. **Chat WhatsApp integrado** con clasificación automática
5. **Agente IA especializado** en servicios dentales
6. **Panel de estadísticas** y reportes

### **Documentación:**
- Manual de usuario completo
- Documentación técnica API
- Guía de configuración WhatsApp
- Procedimientos de backup

### **Capacitación:**
- Sesión de uso de la aplicación
- Configuración de WhatsApp Business
- Entrenamiento del agente IA
- Procedimientos operativos

---

## 🔧 **CONFIGURACIONES ESPECIALES**

### **Variables de Entorno:**
```env
# Base de datos
MONGODB_URL=mongodb://localhost:27017
MONGODB_DB=rubio_garcia_dentapp

# WhatsApp
WHATSAPP_PHONE=664218253
WHATSAPP_SESSION_PATH=./whatsapp_session

# IA
OPENAI_API_KEY=your_api_key
AI_PERSONALITY=especialista_dental_amigable

# Email (opcional)
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@rubiogarciadental.com
```

### **URLs de Servicio:**
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **WhatsApp Service:** http://localhost:3001
- **Documentación API:** http://localhost:8000/docs

---

## 🚀 **PRÓXIMOS PASOS**

1. **✅ Confirmación del plan** por el cliente
2. **🔧 Setup del entorno** de desarrollo
3. **🏗️ Inicio de desarrollo** Fase 1
4. **📱 Configuración WhatsApp** Business
5. **🤖 Entrenamiento del agente IA** con datos reales

---

**¡Todo listo para comenzar el desarrollo!** 🎉

Este plan combina lo mejor de tu experiencia previa con DentApp v1.0 y el diseño profesional de Docfav, creando una solución completa y optimizada para tu clínica dental.