from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    project_name: str = "SIGA-IT"
    version: str = "0.1.0"
    api_v1_prefix: str = "/api/v1"
    database_url: str = "postgresql+asyncpg://sigait:sigait@localhost:5432/sigait"
    frontend_url: str = "http://localhost:5173"
    frontend_urls: str = ""

    @property
    def allowed_origins(self) -> list[str]:
        configured_urls = self.frontend_urls or self.frontend_url
        return [url.strip().rstrip("/") for url in configured_urls.split(",") if url.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
