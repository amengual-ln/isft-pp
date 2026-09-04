import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { getHealth } from "./api";

type View = "inicio" | "mesas" | "trayectoria";
type SubjectTone = "approved" | "regular" | "current" | "pending";

type ExamTable = {
  id: string;
  subject: string;
  code: string;
  date: string;
  weekday: string;
  time: string;
  room: string;
  board: string;
  closes: string;
};

const fakeStudent = {
  firstName: "Sofía",
  fullName: "Sofía Martínez",
  initials: "SM",
  studentId: "24.187",
  degree: "Tecnicatura Superior en Desarrollo de Software",
  plan: "Plan 2024",
};

const navigation: Array<{ id: View; label: string; shortLabel: string }> = [
  { id: "inicio", label: "Inicio", shortLabel: "Inicio" },
  { id: "mesas", label: "Mesas de examen", shortLabel: "Mesas" },
  { id: "trayectoria", label: "Mi trayectoria", shortLabel: "Trayectoria" },
];

const examTables: ExamTable[] = [
  {
    id: "programacion-2",
    subject: "Programación II",
    code: "PP2 · 2° año",
    date: "12 SEP",
    weekday: "Sábado 12 de septiembre",
    time: "09:00",
    room: "Laboratorio 2",
    board: "Prof. Federico Paz",
    closes: "Cierra el 9 de septiembre",
  },
  {
    id: "bases-de-datos",
    subject: "Bases de Datos",
    code: "BDD · 2° año",
    date: "18 SEP",
    weekday: "Viernes 18 de septiembre",
    time: "18:30",
    room: "Aula 6",
    board: "Prof. Julieta Molina",
    closes: "Inscripción confirmada",
  },
  {
    id: "ingles-tecnico",
    subject: "Inglés Técnico",
    code: "ING · 1° año",
    date: "21 SEP",
    weekday: "Lunes 21 de septiembre",
    time: "19:00",
    room: "Aula 3",
    board: "Prof. Mariana Costa",
    closes: "Cierra el 17 de septiembre",
  },
  {
    id: "sistemas-operativos",
    subject: "Sistemas Operativos",
    code: "SSO · 2° año",
    date: "25 SEP",
    weekday: "Viernes 25 de septiembre",
    time: "17:30",
    room: "Laboratorio 1",
    board: "Prof. Darío Luna",
    closes: "Cierra el 22 de septiembre",
  },
];

const subjects: Array<{
  name: string;
  year: string;
  status: string;
  tone: SubjectTone;
  grade: string;
}> = [
  { name: "Programación I", year: "1° año", status: "Aprobada", tone: "approved", grade: "9" },
  { name: "Matemática I", year: "1° año", status: "Aprobada", tone: "approved", grade: "8" },
  {
    name: "Arquitectura de Computadoras",
    year: "1° año",
    status: "Aprobada",
    tone: "approved",
    grade: "7",
  },
  { name: "Inglés Técnico", year: "1° año", status: "Regular", tone: "regular", grade: "—" },
  { name: "Bases de Datos", year: "2° año", status: "Regular", tone: "regular", grade: "—" },
  { name: "Programación II", year: "2° año", status: "En curso", tone: "current", grade: "—" },
  {
    name: "Sistemas Operativos",
    year: "2° año",
    status: "En curso",
    tone: "current",
    grade: "—",
  },
  { name: "Práctica Profesional", year: "3° año", status: "Pendiente", tone: "pending", grade: "—" },
];

function PageHeader({ title, eyebrow, description }: { title: string; eyebrow: string; description: string }) {
  return (
    <header className="page-header">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-description">{description}</p>
      </div>
      <div className="term-pill">2° cuatrimestre · 2026</div>
    </header>
  );
}

export function App() {
  const [view, setView] = useState<View>("inicio");
  const [search, setSearch] = useState("");
  const [enrollments, setEnrollments] = useState<Set<string>>(
    () => new Set(["bases-de-datos"]),
  );
  const [notice, setNotice] = useState("");

  const health = useQuery({
    queryKey: ["health"],
    queryFn: getHealth,
    retry: 1,
  });

  const filteredExamTables = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("es");
    if (!normalizedSearch) return examTables;
    return examTables.filter((exam) =>
      `${exam.subject} ${exam.code}`.toLocaleLowerCase("es").includes(normalizedSearch),
    );
  }, [search]);

  function enroll(exam: ExamTable) {
    if (enrollments.has(exam.id)) return;
    setEnrollments((current) => new Set(current).add(exam.id));
    setNotice(`Te inscribiste a ${exam.subject}.`);
  }

  function navigate(nextView: View) {
    setView(nextView);
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <button className="brand" type="button" onClick={() => navigate("inicio")}>
          <span className="brand-mark">S</span>
          <span>
            <strong>SIGA</strong>
            <small>ISFT 199</small>
          </span>
        </button>

        <nav className="primary-nav" aria-label="Navegación principal">
          <p className="nav-caption">Mi espacio</p>
          {navigation.map((item, index) => (
            <button
              key={item.id}
              className={view === item.id ? "nav-item active" : "nav-item"}
              type="button"
              aria-label={item.label}
              aria-current={view === item.id ? "page" : undefined}
              onClick={() => navigate(item.id)}
            >
              <span className="nav-index">0{index + 1}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="student-card">
          <span className="avatar" aria-hidden="true">
            {fakeStudent.initials}
          </span>
          <div>
            <strong>{fakeStudent.fullName}</strong>
            <small>Legajo {fakeStudent.studentId}</small>
          </div>
        </div>

        <div className="service-status" aria-live="polite">
          <span className={health.isSuccess ? "service-dot online" : "service-dot"} />
          {health.isPending
            ? "Verificando servicios"
            : health.isSuccess
              ? "Servicios activos"
              : "Modo de demostración"}
        </div>
      </aside>

      <main className="main-content">
        {view === "inicio" && (
          <div className="view view-home">
            <PageHeader
              eyebrow="Tu panel académico"
              title={`Hola, ${fakeStudent.firstName}`}
              description="Acá tenés lo importante para continuar tu carrera, sin vueltas."
            />

            <section className="dashboard-grid" aria-label="Resumen académico">
              <article className="progress-card">
                <div className="card-heading">
                  <div>
                    <p className="card-kicker">Avance de carrera</p>
                    <h2>Vas por un buen camino.</h2>
                  </div>
                  <span className="plan-tag">{fakeStudent.plan}</span>
                </div>

                <div className="progress-content">
                  <div className="progress-ring" role="img" aria-label="71 por ciento de avance">
                    <strong>71%</strong>
                    <small>completo</small>
                  </div>
                  <div className="progress-copy">
                    <p>{fakeStudent.degree}</p>
                    <dl className="mini-stats">
                      <div>
                        <dt>Aprobadas</dt>
                        <dd>17</dd>
                      </div>
                      <div>
                        <dt>Regulares</dt>
                        <dd>3</dd>
                      </div>
                      <div>
                        <dt>Promedio</dt>
                        <dd>8,3</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </article>

              <article className="attention-card">
                <p className="card-kicker">Período abierto</p>
                <h2>Inscripción a finales</h2>
                <p>Tenés tres mesas disponibles. La primera cierra el 9 de septiembre.</p>
                <button className="text-link" type="button" onClick={() => navigate("mesas")}>
                  Ver mesas disponibles <span aria-hidden="true">→</span>
                </button>
              </article>
            </section>

            <section className="section-block">
              <div className="section-heading">
                <div>
                  <p className="card-kicker">Próximamente</p>
                  <h2>Tu agenda académica</h2>
                </div>
                <button className="quiet-button" type="button" onClick={() => navigate("mesas")}>
                  Ver todas
                </button>
              </div>

              <div className="agenda-list">
                <article className="agenda-item">
                  <time dateTime="2026-09-18">
                    <strong>18</strong>
                    <span>SEP</span>
                  </time>
                  <div className="agenda-copy">
                    <span className="agenda-type">Examen final</span>
                    <h3>Bases de Datos</h3>
                    <p>18:30 · Aula 6</p>
                  </div>
                  <span className="status-label confirmed">Inscripta</span>
                </article>
                <article className="agenda-item">
                  <time dateTime="2026-09-25">
                    <strong>25</strong>
                    <span>SEP</span>
                  </time>
                  <div className="agenda-copy">
                    <span className="agenda-type">Entrega</span>
                    <h3>Trabajo práctico integrador</h3>
                    <p>Programación II · 23:59</p>
                  </div>
                  <span className="status-label neutral">Pendiente</span>
                </article>
              </div>
            </section>
          </div>
        )}

        {view === "mesas" && (
          <div className="view">
            <PageHeader
              eyebrow="Exámenes finales"
              title="Mesas disponibles"
              description="Consultá fechas, condiciones e inscribite desde un solo lugar."
            />

            <div className="toolbar">
              <label className="search-field">
                <span>Buscar materia</span>
                <input
                  type="search"
                  placeholder="Ej. Programación"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </label>
              <div className="enrollment-summary">
                <strong>{enrollments.size}</strong>
                <span>{enrollments.size === 1 ? "inscripción activa" : "inscripciones activas"}</span>
              </div>
            </div>

            {notice && (
              <div className="toast" role="status">
                <span aria-hidden="true">✓</span>
                <p>
                  <strong>Inscripción confirmada</strong>
                  {notice}
                </p>
                <button type="button" aria-label="Cerrar mensaje" onClick={() => setNotice("")}>
                  ×
                </button>
              </div>
            )}

            <section className="exam-list" aria-label="Mesas de examen">
              {filteredExamTables.map((exam) => {
                const isEnrolled = enrollments.has(exam.id);
                return (
                  <article className={isEnrolled ? "exam-card enrolled" : "exam-card"} key={exam.id}>
                    <time className="date-block">
                      <strong>{exam.date.split(" ")[0]}</strong>
                      <span>{exam.date.split(" ")[1]}</span>
                    </time>
                    <div className="exam-main">
                      <p className="subject-code">{exam.code}</p>
                      <h2>{exam.subject}</h2>
                      <p>{exam.weekday}</p>
                      <dl className="exam-details">
                        <div>
                          <dt>Horario</dt>
                          <dd>{exam.time}</dd>
                        </div>
                        <div>
                          <dt>Ubicación</dt>
                          <dd>{exam.room}</dd>
                        </div>
                        <div>
                          <dt>Tribunal</dt>
                          <dd>{exam.board}</dd>
                        </div>
                      </dl>
                    </div>
                    <div className="exam-action">
                      <small>{exam.closes}</small>
                      <button
                        className={isEnrolled ? "primary-button completed" : "primary-button"}
                        type="button"
                        disabled={isEnrolled}
                        onClick={() => enroll(exam)}
                        aria-label={
                          isEnrolled
                            ? `Ya estás inscripta a ${exam.subject}`
                            : `Inscribirme a ${exam.subject}`
                        }
                      >
                        {isEnrolled ? "✓ Inscripta" : "Inscribirme"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </section>

            {filteredExamTables.length === 0 && (
              <div className="empty-state">
                <span aria-hidden="true">Aa</span>
                <h2>No encontramos esa materia</h2>
                <p>Probá con otro nombre o limpiá la búsqueda.</p>
                <button className="quiet-button" type="button" onClick={() => setSearch("")}>
                  Limpiar búsqueda
                </button>
              </div>
            )}
          </div>
        )}

        {view === "trayectoria" && (
          <div className="view">
            <PageHeader
              eyebrow="Historia académica"
              title="Mi trayectoria"
              description="El estado de cada materia y tus resultados, siempre a mano."
            />

            <section className="record-summary" aria-label="Resumen de trayectoria">
              <div>
                <span>Materias del plan</span>
                <strong>24</strong>
              </div>
              <div>
                <span>Aprobadas</span>
                <strong>17</strong>
              </div>
              <div>
                <span>Promedio general</span>
                <strong>8,3</strong>
              </div>
              <div>
                <span>Última actualización</span>
                <strong className="date-value">28 ago 2026</strong>
              </div>
            </section>

            <section className="subjects-section">
              <div className="section-heading">
                <div>
                  <p className="card-kicker">{fakeStudent.plan}</p>
                  <h2>Estado por materia</h2>
                </div>
              </div>

              <div className="subject-table" role="table" aria-label="Estado de materias">
                <div className="subject-row subject-header" role="row">
                  <span role="columnheader">Materia</span>
                  <span role="columnheader">Año</span>
                  <span role="columnheader">Condición</span>
                  <span role="columnheader">Nota</span>
                </div>
                {subjects.map((subject) => (
                  <div className="subject-row" role="row" key={subject.name}>
                    <strong role="cell">{subject.name}</strong>
                    <span role="cell" data-label="Año">
                      {subject.year}
                    </span>
                    <span role="cell" data-label="Condición">
                      <span className={`subject-status ${subject.tone}`}>{subject.status}</span>
                    </span>
                    <span className="grade" role="cell" data-label="Nota">
                      {subject.grade}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      <nav className="mobile-nav" aria-label="Navegación móvil">
        {navigation.map((item, index) => (
          <button
            key={item.id}
            className={view === item.id ? "active" : ""}
            type="button"
            aria-label={item.shortLabel}
            aria-current={view === item.id ? "page" : undefined}
            onClick={() => navigate(item.id)}
          >
            <span>0{index + 1}</span>
            {item.shortLabel}
          </button>
        ))}
      </nav>
    </div>
  );
}
