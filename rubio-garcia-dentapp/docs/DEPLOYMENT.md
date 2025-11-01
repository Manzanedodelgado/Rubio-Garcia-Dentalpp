# Guia de Deployment - Rubio Garcia Dentapp

## Deployment Rapido con Docker

### Paso 1: Preparar el Entorno

```bash
# Clonar repositorio
git clone <repository-url>
cd rubio-garcia-dentapp

# Crear archivos de configuracion
cp backend/.env.example backend/.env
cp whatsapp-service/.env.example whatsapp-service/.env

# Editar archivos .env con valores de produccion
```

### Paso 2: Configurar Variables de Entorno

**backend/.env**:
```env
MONGODB_URL=mongodb://mongodb:27017
MONGODB_DB=rubio_garcia_dentapp
WHATSAPP_SERVICE_URL=http://whatsapp-service:3001
FRONTEND_URL=https://tu-dominio.com
SECRET_KEY=CAMBIAR-ESTO-POR-CLAVE-SEGURA
DEBUG=False
```

**whatsapp-service/.env**:
```env
PORT=3001
BACKEND_API_URL=http://backend:8000
SESSION_PATH=./whatsapp_session
```

### Paso 3: Iniciar Servicios

```bash
# Construir e iniciar todos los servicios
docker-compose up -d --build

# Verificar que todos los servicios estan corriendo
docker-compose ps

# Ver logs
docker-compose logs -f
```

### Paso 4: Configurar WhatsApp

1. Acceder a http://tu-servidor:3001/qr
2. Escanear QR con WhatsApp Business (numero 664 218 253)
3. Esperar confirmacion de conexion

### Paso 5: Verificar Instalacion

```bash
# Backend API
curl http://localhost:8000/health

# Frontend
curl http://localhost:3000

# WhatsApp Service
curl http://localhost:3001/status
```

## Deployment en Servidores Cloud

### AWS EC2

1. Lanzar instancia EC2 (Ubuntu 22.04 LTS)
2. Instalar Docker y Docker Compose
```bash
sudo apt update
sudo apt install docker.io docker-compose -y
sudo systemctl start docker
sudo systemctl enable docker
```

3. Clonar repositorio y seguir pasos anteriores

### DigitalOcean Droplet

Similar a AWS EC2, crear droplet con Docker pre-instalado.

### Google Cloud Run

Para deployment serverless, usar imagenes Docker individuales.

## Deployment en MongoDB Atlas

1. Crear cluster en MongoDB Atlas
2. Obtener connection string
3. Actualizar MONGODB_URL en backend/.env:
```env
MONGODB_URL=mongodb+srv://usuario:password@cluster.mongodb.net/rubio_garcia_dentapp?retryWrites=true&w=majority
```

## Configuracion de Dominio y SSL

### Con Nginx

1. Instalar Nginx:
```bash
sudo apt install nginx certbot python3-certbot-nginx -y
```

2. Configurar reverse proxy (`/etc/nginx/sites-available/dentapp`):
```nginx
server {
    listen 80;
    server_name tu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

3. Habilitar SSL con Let's Encrypt:
```bash
sudo certbot --nginx -d tu-dominio.com
```

## Backup y Recuperacion

### Backup MongoDB

```bash
# Backup automatico diario
docker exec rubio-garcia-mongo mongodump --out /backup/$(date +%Y%m%d)

# Restaurar backup
docker exec -i rubio-garcia-mongo mongorestore /backup/20251031
```

### Backup WhatsApp Session

```bash
# La sesion de WhatsApp se guarda en volume Docker
docker cp rubio-garcia-whatsapp:/app/whatsapp_session ./backup/whatsapp_session
```

## Monitoreo y Logs

### Ver logs en tiempo real

```bash
# Todos los servicios
docker-compose logs -f

# Solo backend
docker-compose logs -f backend

# Solo WhatsApp
docker-compose logs -f whatsapp-service
```

### Configurar alertas

Usar herramientas como:
- Sentry para errores
- Prometheus + Grafana para metricas
- UptimeRobot para monitoring

## Escalamiento

### Horizontal Scaling

Para mayor capacidad, usar:
- Load balancer (Nginx/HAProxy)
- Multiple instancias de backend
- Redis para sesiones compartidas
- MongoDB replica set

### Vertical Scaling

Ajustar recursos en docker-compose.yml:
```yaml
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 4G
```

## Seguridad

### Checklist Pre-Produccion

- [ ] Cambiar SECRET_KEY a valor seguro
- [ ] Configurar firewall (solo puertos necesarios)
- [ ] Habilitar SSL/HTTPS
- [ ] Configurar rate limiting en API
- [ ] Actualizar dependencias
- [ ] Configurar backups automaticos
- [ ] Revisar logs de seguridad
- [ ] Configurar autenticacion robusta
- [ ] Limitar acceso a MongoDB
- [ ] Configurar CORS correctamente

## Troubleshooting

### Backend no inicia

```bash
# Verificar logs
docker-compose logs backend

# Verificar conexion MongoDB
docker-compose exec backend python -c "from app.database.mongodb import connect_to_mongo; import asyncio; asyncio.run(connect_to_mongo())"
```

### WhatsApp no conecta

```bash
# Borrar sesion y reiniciar
docker-compose down
docker volume rm rubio-garcia-dentapp_whatsapp_session
docker-compose up -d whatsapp-service
```

### Frontend no carga

```bash
# Verificar build
docker-compose logs frontend

# Reconstruir
docker-compose up -d --build frontend
```

## Contacto Soporte

Para asistencia tecnica:
- Email: soporte@rubiogarciadental.com
- Telefono: 664 218 253
