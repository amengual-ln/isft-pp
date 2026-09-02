from fastapi.testclient import TestClient

from sigait_api.config import Settings
from sigait_api.main import app, create_app


def test_health() -> None:
    response = TestClient(app).get("/api/v1/health")

    assert response.status_code == 200
    assert response.json() == {"name": "SIGA-IT", "version": "0.1.0", "status": "ok"}


def test_cors_accepts_configured_frontend() -> None:
    configured_app = create_app(Settings(frontend_urls="https://web.example.com/"))
    response = TestClient(configured_app).options(
        "/api/v1/health",
        headers={
            "Origin": "https://web.example.com",
            "Access-Control-Request-Method": "GET",
        },
    )

    assert response.status_code == 200
    assert response.headers["access-control-allow-origin"] == "https://web.example.com"
