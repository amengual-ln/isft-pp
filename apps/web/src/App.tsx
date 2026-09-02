import { useQuery } from "@tanstack/react-query";

import { getHealth } from "./api";

export function App() {
  const health = useQuery({
    queryKey: ["health"],
    queryFn: getHealth,
    retry: 1,
  });

  return (
    <main className="shell">
      <section className="hero" aria-labelledby="page-title">
        <p className="eyebrow">ISFT 199 · Proyecto integrador</p>
        <h1 id="page-title">SIGA-IT</h1>
        <p className="lead">
          Sistema Integral de Gestión Académica para inscripciones, calificaciones y trayectoria
          estudiantil.
        </p>

        <div className="status" aria-live="polite">
          <span
            className={`status-dot ${health.isSuccess ? "online" : health.isError ? "offline" : ""}`}
            aria-hidden="true"
          />
          <div>
            <strong>
              {health.isPending
                ? "Conectando con la API…"
                : health.isError
                  ? "API no disponible"
                  : "API conectada"}
            </strong>
            {health.data && (
              <small>
                {health.data.name} · v{health.data.version}
              </small>
            )}
          </div>
        </div>
      </section>

      <section className="next" aria-labelledby="next-title">
        <p className="step">Próximo incremento</p>
        <h2 id="next-title">Autenticación y roles</h2>
        <p>Alumno, docente, Secretaría Académica y administración sobre una misma base.</p>
      </section>
    </main>
  );
}
