from fastapi.testclient import TestClient

from sigait_api.main import app


def test_health() -> None:
    response = TestClient(app).get("/api/v1/health")

    assert response.status_code == 200
    assert response.json() == {"name": "SIGA-IT", "version": "0.1.0", "status": "ok"}
