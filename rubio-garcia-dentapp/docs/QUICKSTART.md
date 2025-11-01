# Inicio Rapido - Rubio Garcia Dentapp

## 5 Minutos para Empezar

### 1. Requisitos

- Docker y Docker Compose instalados
- Puertos disponibles: 3000, 8000, 3001, 27017

### 2. Instalacion

```bash
# Clonar repositorio
git clone <repository-url>
cd rubio-garcia-dentapp

# Copiar configuraciones
cp backend/.env.example backend/.env
cp whatsapp-service/.env.example whatsapp-service/.env

# Iniciar todo
docker-compose up -d
```

### 3. Acceder a la Aplicacion

- **Frontend**: http://localhost:3000
- **API Docs**: http://localhost:8000/docs
- **WhatsApp QR**: http://localhost:3001/qr

### 4. Configurar WhatsApp

1. Abrir http://localhost:3001/qr
2. Escanear QR con WhatsApp Business
3. Listo!

### 5. Usar la Aplicacion

#### Dashboard Principal
- Ver citas del dia
- Conversaciones urgentes
- Metricas en tiempo real

#### Crear Primera Cita

1. Click "Agenda" en sidebar
2. Click "Nueva Cita"
3. Completar formulario
4. Guardar

#### Enviar Mensaje WhatsApp

1. Click "Mensajeria"
2. Seleccionar conversacion
3. Escribir mensaje
4. Enviar

#### Probar Agente IA

1. Click "Agente IA"
2. Escribir consulta: "¿Cuanto cuesta una limpieza?"
3. Ver respuesta automatica

## Datos de Ejemplo

### Dentistas

- **Dr. Mario Rubio**: Lunes, Miercoles, Viernes (Implantologia)
- **Dra. Rodriguez**: Martes, Jueves (Endodoncia)
- **Dra. Gil**: Martes, Jueves, Viernes (Endodoncia)

### Precios

- Primera visita: GRATIS
- Limpieza: 45€
- Implante: 700€
- Ortodoncia: 70€/mes

### Horarios

- Lunes-Jueves: 10:00-14:00 y 16:00-20:00
- Viernes: 10:00-14:00

## Proximos Pasos

1. Crear pacientes
2. Agendar citas
3. Configurar plantillas WhatsApp
4. Entrenar agente IA con casos reales
5. Revisar estadisticas

## Ayuda

Ver documentacion completa en `/docs`
