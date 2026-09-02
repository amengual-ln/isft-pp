from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from sigait_api.config import Settings, get_settings

settings = get_settings()


class HealthResponse(BaseModel):
    name: str
    version: str
    status: str


def create_app(current_settings: Settings = settings) -> FastAPI:
    application = FastAPI(
        title=current_settings.project_name,
        version=current_settings.version,
    )
    application.add_middleware(
        CORSMiddleware,
        allow_origins=current_settings.allowed_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    async def health_endpoint() -> HealthResponse:
        return HealthResponse(
            name=current_settings.project_name,
            version=current_settings.version,
            status="ok",
        )

    application.add_api_route(
        f"{current_settings.api_v1_prefix}/health",
        health_endpoint,
        methods=["GET"],
        response_model=HealthResponse,
        tags=["system"],
    )

    return application


app = create_app()
