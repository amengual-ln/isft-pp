# SIGA-IT

Monorepo inicial del Sistema Integral de Gestión Académica del ISFT 199.

## Aplicaciones

- `apps/api`: FastAPI y Python 3.12.
- `apps/web`: React, TypeScript y Vite.
- `packages/api-client`: cliente tipado generado desde OpenAPI.
- `docs/SRS-SIGAIT.md`: especificación funcional y técnica.

## Inicio rápido

Requisito: Docker con Compose.

```bash
docker compose up --build
```

Servicios:

- Frontend: http://localhost:5173
- API: http://localhost:8000
- Swagger: http://localhost:8000/docs
- PostgreSQL: `localhost:5432`

El frontend consulta `GET /api/v1/health` y muestra si la API está disponible.

En Vercel, la API debe recibir el origen exacto del frontend, sin rutas. Para aceptar más de
un dominio se pueden separar por comas:

```env
FRONTEND_URLS=https://web.example.com,https://web-preview.example.com
```

## Verificación

```bash
make test
```

Para regenerar el contrato TypeScript luego de cambiar un endpoint:

```bash
make api-client
```

## Desarrollo sin contenedores

Backend, con Python 3.12:

```bash
cd apps/api
python -m venv .venv
source .venv/bin/activate
pip install -e '.[dev]'
uvicorn sigait_api.main:app --reload
```

Frontend, desde la raíz:

```bash
pnpm install
pnpm --filter web dev
```
