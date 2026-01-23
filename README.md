# Feedback Backend

Este repositorio contiene el backend de la aplicación Feedback.

## Requisitos

- Node.js 20+
- PNPM (recomendado)
- Docker (opcional, para desarrollo local con base de datos)

## Configuración

1. Copia el archivo `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```
2. Completa las variables de entorno en el archivo `.env`.

## Desarrollo

Para iniciar el servidor en modo desarrollo:

```bash
pnpm install
pnpm dev
```

Si necesitas la base de datos localmente:

```bash
docker-compose up -d db
```

## Despliegue

### Comandos de Prisma

- Generar el cliente: `pnpm postinstall`
- Ejecutar migraciones en producción: `pnpm prisma:migrate:deploy`
- Sembrar (seed) la base de datos: `pnpm prisma:seed`

### Build y Start

```bash
pnpm build
pnpm start
```

### Docker

Para construir e iniciar todo el stack con Docker:

```bash
docker-compose up --build
```

o solo el backend:

```bash
docker build -t feedback-backend .
```
