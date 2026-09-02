from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from sigait_api.config import get_settings

settings = get_settings()

app = FastAPI(title=settings.project_name, version=settings.version)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class HealthResponse(BaseModel):
    name: str
    version: str
    status: str


@app.get(f"{settings.api_v1_prefix}/health", response_model=HealthResponse, tags=["system"])
async def health() -> HealthResponse:
    return HealthResponse(name=settings.project_name, version=settings.version, status="ok")
