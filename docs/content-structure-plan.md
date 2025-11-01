# Plan de Estructura de Contenido - Rubio Garcia Dentapp

## 1. Inventario de Materiales

**Archivos de Contenido:**
- `docs/plan_desarrollo_rubio_garcia_dentapp.md` (423 líneas, secciones: arquitectura, base de datos, diseño, integración WhatsApp, IA)

**Activos Visuales:**
- `user_input_files/` (8 archivos):
  - `AAC48DF6-BEFA-4C1D-8DF8-F2973CE70645.jpeg` - Logo Rubio García Dental (azul/gris)
  - `B938D892-C1E0-4E3E-A9F7-CA44E05672E1.png` - Icono implante dental (azul oscuro)
  - `51303A10-85A7-48B4-A61F-4690EC360EB1.png` - Icono implante monocromático
  - `Captura de pantalla 2025-10-31 a las 5.18.20.png` - Referencia UI macOS Finder
  - Imágenes adicionales de referencia

**Archivos de Datos:**
- Base de conocimientos: Precios (30+ tratamientos), horarios, personal (3 dentistas)
- Número WhatsApp: 664 218 253

**Documentación Técnica:**
- 7 colecciones MongoDB definidas
- Stack: React 19 + FastAPI + MongoDB + Baileys
- APIs: 8 grupos de endpoints

## 2. Estructura de la Aplicación

**Tipo:** Aplicación Web Administrativa (Dashboard Multi-Módulo)

**Razonamiento:** 
- Sistema de gestión complejo con 7 módulos funcionales distintos
- Múltiples tipos de usuarios (coordinadora, dentistas, admin)
- Flujos de trabajo diferenciados (agenda, chat, pacientes, reportes)
- Integración en tiempo real (WhatsApp, notificaciones)
- Requiere navegación persistente y acceso rápido entre módulos

## 3. Desglose de Módulos/Vistas

### Módulo 1: Dashboard Principal (`/`)
**Propósito:** Visión general de métricas críticas y acceso rápido a acciones urgentes

**Mapeo de Contenido:**

| Sección | Patrón de Componente | Archivo de Datos | Contenido a Extraer | Activo Visual (Solo Contenido) |
|---------|---------------------|------------------|---------------------|-------------------------------|
| Header Global | Barra de Navegación Principal | - | Logo + nombre clínica + nav icons | `AAC48DF6-BEFA-4C1D-8DF8-F2973CE70645.jpeg` |
| Métricas Resumen | 4 Cards de Estadística | `ai_config` collection | Citas del día, pacientes activos, mensajes pendientes, ingresos mes | - |
| Citas de Hoy | Timeline Vertical | `appointments` collection | Campos: patient_id, hora, doctor, treatment_type, status | - |
| Conversaciones Prioritarias | Lista con Clasificación Color | `conversations` collection | Filtro: status='yellow' OR 'blue', campos: patient_id, last_message, whatsapp_number | - |
| Accesos Rápidos | Grid de Action Cards | - | Botones: Nueva Cita, Enviar Mensaje, Buscar Paciente, Ver Reportes | - |

### Módulo 2: Agenda/Calendario (`/agenda`)
**Propósito:** Gestión visual de citas por dentista y horario

**Mapeo de Contenido:**

| Sección | Patrón de Componente | Archivo de Datos | Contenido a Extraer | Activo Visual (Solo Contenido) |
|---------|---------------------|------------------|---------------------|-------------------------------|
| Filtros Dentista | Tabs Horizontales | `dentists` collection (plan L66-77) | Campos: name, specialty, schedule | - |
| Vista Semanal | Calendario Grid | `appointments` collection | Campos: date, hora, patient_id, doctor, duration_minutes, status | - |
| Panel Crear Cita | Modal/Sidebar Form | `patients`, `treatments` collections | Paciente (autocomplete), tratamiento (dropdown), dentista, fecha/hora | - |
| Horarios Personalizados | Config por Dentista | `dentists.schedule` (plan L71-76) | Días disponibles + franjas horarias por dentista | - |

**Datos Específicos de Dentistas:**
- Mario Gomez: Lunes, Miércoles, Viernes | Implantología, Cirugía, Botox, Bichectomía
- Dra Rodriguez: Martes, Jueves | Endodoncia, Reconstrucciones, Prótesis
- Dra Gil: Martes, Jueves, Viernes | (Similar a Rodriguez)

### Módulo 3: Mensajería WhatsApp (`/mensajeria`)
**Propósito:** Gestión de conversaciones WhatsApp con clasificación y respuestas

**Mapeo de Contenido:**

| Sección | Patrón de Componente | Archivo de Datos | Contenido a Extraer | Activo Visual (Solo Contenido) |
|---------|---------------------|------------------|---------------------|-------------------------------|
| Panel Lista Conversaciones | Lista con Badges Estado | `conversations` collection | Campos: patient_id, whatsapp_number, status (color), last_message_at | - |
| Panel Chat Activo | Área Mensajes + Input | `messages` collection | Filtro: conversation_id, campos: type, content, sender, sent_at | - |
| Panel Info Paciente | Sidebar Derecho | `patients`, `appointments` collections | Paciente: name, phone, email, notes + historial citas | - |
| Plantillas Rápidas | Dropdown con Preview | `message_templates` collection | Campos: name, content, flow_steps, button_actions | - |
| Clasificación Manual | Selector Color (Amarillo/Azul/Verde) | `conversations.status` | Estados: yellow (urgente), blue (atención), green (resuelto) | - |

**Número WhatsApp de la Clínica:** 664 218 253 (coordinadora Maria Jose)

### Módulo 4: Pacientes (`/pacientes`)
**Propósito:** Gestión completa de base de datos de pacientes

**Mapeo de Contenido:**

| Sección | Patrón de Componente | Archivo de Datos | Contenido a Extraer | Activo Visual (Solo Contenido) |
|---------|---------------------|------------------|---------------------|-------------------------------|
| Barra Búsqueda | Input con Filtros | `patients` collection | Búsqueda por: name, phone, email | - |
| Tabla Pacientes | Data Table con Acciones | `patients` collection | Campos: name, phone, email, created_at, whatsapp_registered | - |
| Detalle Paciente | Modal/Vista Expandida | `patients` + `appointments` | Info completa + historial de citas ordenado por fecha | - |
| Formulario CRUD | Form con Validación | `patients` schema | Campos: name, phone, email, notes + botón WhatsApp check | - |
| Historial de Citas | Timeline por Paciente | `appointments` collection | Filtro: patient_id, muestra: date, treatment, dentist, status | - |

### Módulo 5: Automatizaciones (`/automatizaciones`)
**Propósito:** Gestión de plantillas WhatsApp, flujos y consentimientos

**Mapeo de Contenido:**

| Sección | Patrón de Componente | Archivo de Datos | Contenido a Extraer | Activo Visual (Solo Contenido) |
|---------|---------------------|------------------|---------------------|-------------------------------|
| Tabs Categorías | Navegación Secundaria | - | Tabs: Plantillas WhatsApp, Consentimientos Médicos, Recordatorios | - |
| Lista Plantillas | Cards con Preview | `message_templates` collection | Campos: name, category, steps (array), button_actions, active | - |
| Editor Plantillas | Form con Builder Flujos | `message_templates.steps` | Estructura: content (texto con {{variables}}), buttons | - |
| Lista Consentimientos | Cards por Tratamiento | `consent_templates` collection | Campos: treatment_type, content, digital_signature, created_at | - |
| Config Recordatorios | Toggle + Timing Config | `appointments.reminder_enabled` | Opciones: 24h antes, 2h antes, ambos | - |

**Flujos Típicos:**
- Consulta Precios → Envío info tratamiento → Botón "Agendar Cita"
- Confirmación Cita → Recordatorio 24h → Recordatorio 2h
- Primera Visita → Info "Primera visita GRATIS" + horarios disponibles

### Módulo 6: Agente IA (`/ia`)
**Propósito:** Configuración y monitoreo del agente de IA especializado

**Mapeo de Contenido:**

| Sección | Patrón de Componente | Archivo de Datos | Contenido a Extraer | Activo Visual (Solo Contenido) |
|---------|---------------------|------------------|---------------------|-------------------------------|
| Base Conocimientos | Expandable Sections | `ai_config.knowledge_base` (plan L262-289) | Categorías: Precios (30+ tratamientos), Horarios, Personal | - |
| Respuestas Automáticas | Toggle + Stats | `ai_config.auto_responses` | Estado: activo/inactivo + contador respuestas automáticas/día | - |
| Reglas Clasificación | Lista Editable | `ai_config.classification_rules` | Patrones: palabras clave → acción (amarillo/azul/verde) | - |
| Monitoreo Precisión | Gráfico + Métricas | Log mensajes IA | Estadísticas: % respuestas correctas, intervenciones humanas | - |
| Editor Personalidad | Textarea + Ejemplos | `ai_config.personality` | Texto: tono amigable, profesional, empático (especialista dental) | - |

**Precios Clave del Sistema IA:**
- Primera Visita: 0€ (GRATIS) - prioridad alta
- Limpieza: 45€ | Raspados: 60€/cuadrante | Periodontal: 90€
- Ortodoncia: Estudio 100€, Brackets 700€, Mensualidad 70€
- Implante: 700€ | Endodoncia: 175€ | Corona Zirconio: 400€
- Estética: Blanqueamiento 250€, Botox 300€, Bichectomía 700€

### Módulo 7: Reportes y Estadísticas (`/reportes`)
**Propósito:** Analytics y métricas de rendimiento clínico y operacional

**Mapeo de Contenido:**

| Sección | Patrón de Componente | Archivo de Datos | Contenido a Extraer | Activo Visual (Solo Contenido) |
|---------|---------------------|------------------|---------------------|-------------------------------|
| Filtros Temporales | Date Range Picker | - | Opciones: Hoy, Semana, Mes, Personalizado | - |
| Métricas Financieras | Cards + Gráficos Línea | `appointments` + `treatments` | Cálculo: ingresos por tratamiento, comparativa periodos | - |
| Análisis por Dentista | Tabs + Bar Charts | `appointments.doctor` | Comparativa: citas completadas, ingresos, tipos tratamiento | - |
| Tasa Conversión WhatsApp | Funnel Chart | `conversations` + `appointments` | Conversiones: mensaje → consulta → cita agendada | - |
| Eficiencia IA | Progress Bars + Stats | `messages` where sender='ai' | Métricas: % automatización, tiempo respuesta promedio | - |
| Exportar Datos | Botones Download | Todas las collections | Formatos: CSV, Excel, PDF (período seleccionado) | - |

## 4. Análisis de Contenido

**Densidad de Información:** Alta
- Sistema complejo con 7 módulos interdependientes
- 7 colecciones MongoDB con relaciones entre datos
- Flujos en tiempo real (WhatsApp, notificaciones)
- Base de conocimientos extensa (30+ tratamientos, horarios personalizados)

**Balance de Contenido:**
- Imágenes: 8 archivos (10%) - principalmente logo y referencias UI
- Datos/Tablas: 70% - colecciones MongoDB, métricas, estadísticas
- Texto: 20% - configuraciones, plantillas, mensajes
- **Tipo de Contenido:** Orientado a datos/gestión (Data-Driven Dashboard)

**Características de Diseño Requeridas:**
- Navegación persistente (sidebar o header tabs)
- Componentes reutilizables (cards, tables, forms)
- Estados en tiempo real (notificaciones, badges)
- Diseño responsive (móvil para coordinadora en movimiento)
- Accesibilidad para uso médico profesional
- Clasificación visual por color (conversaciones WhatsApp)
- Integración con servicios externos (Baileys, SocketIO)

**Complejidad del Sistema:**
- Multi-usuario (coordinadora, dentistas, admin)
- Gestión de estado compleja (citas + mensajes en tiempo real)
- Flujos automatizados con IA
- Formularios dinámicos (plantillas con variables)
- Visualización de datos históricos y en tiempo real
