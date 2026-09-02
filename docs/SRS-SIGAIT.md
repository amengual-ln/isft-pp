# SRS-SPECS: SIGA-IT — Sistema Integral de Gestión Académica para Instituto Terciario

> **Documento:** `srs-spec-monorepo-fullstack.md`
> **Versión:** `1.1.0`
> **Estado:** `Borrador en revisión`
> **Fecha:** `02/09/2026`
> **Autor(es):** `Lautaro Amengual`
> **Institución:** `ISFT 199`
> **Repositorio / Módulo:** `amengual-ln/isft-pp`

---

## 1. Contexto Estratégico y Propuesta de Valor

### 1.1. Foco Estratégico y Alcance

* **Mercado objetivo:** Institutos de educación superior y terciaria que necesitan digitalizar la gestión de mesas de examen, calificaciones e historial académico.
* **Buyer persona (decisor / cliente ideal):** Director, rector, representante legal o secretario académico del instituto, responsable de mejorar los procesos administrativos y garantizar la trazabilidad de la información académica.
* **User persona (operador / usuario final):**
  * **Alumno:** consulta mesas disponibles, se inscribe o cancela una inscripción y revisa sus notas y situación académica.
  * **Docente:** consulta las mesas asignadas y registra o rectifica calificaciones dentro del período autorizado.
  * **Personal de Secretaría Académica:** administra carreras, materias, comisiones, mesas, actas, correlatividades e inscripciones excepcionales.
  * **Administrador del sistema:** administra usuarios, roles, parámetros, respaldos y auditoría.
* **Alcance geográfico y modalidad:** Aplicación web responsiva para una institución educativa, desplegable en la nube o en infraestructura propia. Accesible mediante navegador desde computadoras y dispositivos móviles.
* **Alcance de la primera versión (MVP):**
  * Autenticación y autorización por roles.
  * Administración básica de alumnos, docentes, carreras, planes de estudio y materias.
  * Creación y publicación de llamados y mesas de examen.
  * Inscripción y cancelación de alumnos en mesas.
  * Validación de períodos, regularidad, correlatividades y duplicados.
  * Registro, publicación y consulta de calificaciones.
  * Consulta del historial y la situación académica por materia.
  * Auditoría de operaciones académicas sensibles.
* **Fuera de alcance:** Cobro de cuotas, contabilidad, gestión de biblioteca, asistencia diaria, aula virtual, contenidos pedagógicos, inscripción inicial a carreras, emisión de títulos oficiales, firma digital de actas, aplicación móvil nativa e integración automática con organismos externos. Estos módulos podrán evaluarse en versiones posteriores.

### 1.2. Problema a Resolver

En muchos institutos, las inscripciones a exámenes y el registro de notas se gestionan mediante formularios, planillas o comunicaciones separadas. Esto puede generar datos duplicados, errores de transcripción, inscripciones fuera de término, falta de trazabilidad y demoras para conocer la situación académica de un alumno.

SIGA-IT centraliza el proceso y aplica las reglas académicas de forma uniforme. La solución brinda a cada actor acceso únicamente a la información y las acciones que le corresponden.

### 1.3. Pilares de Valor de la Solución

| Pilar | Enfoque | Implementación en este sistema |
| :--- | :--- | :--- |
| **1. Activos y entorno operativo** | Infraestructura, dispositivos y fuentes de datos base. | Navegadores web, servidor de aplicación, base de datos institucional y servicio de correo. Para la puesta en marcha podrán importarse alumnos, materias y planes desde archivos CSV validados. |
| **2. Software y lógica de negocio** | Captura, procesamiento, persistencia y APIs. | API REST que centraliza usuarios, oferta académica, mesas, inscripciones, actas y calificaciones. Las reglas de correlatividad, regularidad y períodos se validan antes de confirmar cada operación. |
| **3. Impacto y eficiencia operativa** | Reducción de costos, errores y tiempos administrativos. | Disminuye la carga manual y la duplicación de datos, evita inscripciones inválidas, acelera la publicación de notas y permite obtener reportes académicos sin consolidar planillas separadas. |

### 1.4. Coordinación Operativa, Roles y Seguridad

* **Liderazgo técnico / responsable:** `[Completar: responsable técnico o líder del equipo]`.
* **Responsable funcional:** Secretaría Académica de la institución.
* **Horario operativo esperado:** Acceso para alumnos las 24 horas. Gestión administrativa y soporte en horario institucional.
* **Ventanas de mantenimiento:** Preferentemente fuera del horario administrativo y nunca durante el cierre de una inscripción o la carga final de actas, salvo una emergencia informada.
* **Seguridad y privacidad:** Acceso autenticado, contraseñas almacenadas mediante hash seguro, comunicaciones cifradas, permisos por rol, registro de auditoría y tratamiento de datos personales conforme a la normativa vigente aplicable a la institución.
* **Principio de mínimo privilegio:** Cada usuario accede solamente a las funciones y datos necesarios para su rol. Un alumno solo puede consultar su propia información; un docente solo puede operar sobre mesas asignadas; Secretaría y Administración poseen permisos ampliados y auditados.

---

## 2. Modelo de Negocio Canvas y Gobernanza

### 2.1. Matriz del Business Model Canvas

| Bloque Canvas | Definición estratégica | Componentes clave en el software |
| :--- | :--- | :--- |
| **1. Socios clave (KP)** | Autoridades, Secretaría Académica, docentes, área técnica y proveedor de infraestructura. | Servicio de correo, hosting, sistema de identidad institucional y herramientas de respaldo, si se integran. |
| **2. Actividades clave (KA)** | Mantener la oferta académica, publicar mesas, validar inscripciones, registrar notas y conservar trazabilidad. | Casos de uso de mesas, inscripciones, actas, calificaciones, historial y auditoría. |
| **3. Recursos clave (KR)** | Planes de estudio, legajos, reglas académicas, personal capacitado, base de datos y servidores. | Modelo de dominio, PostgreSQL, API FastAPI, documentación, pruebas y respaldos. |
| **4. Propuesta de valor (VP)** | Información académica única, confiable y accesible, con menos trabajo manual y errores. | Portal de autogestión, paneles por rol, validaciones automáticas, historial académico y reportes. |
| **5. Relación con usuarios (CR)** | Autoservicio para alumnos, operación guiada para docentes y soporte institucional. | Notificaciones, mensajes claros de validación, recuperación de acceso y canal de soporte. |
| **6. Canales (CH)** | Aplicación web institucional y correo electrónico. | Interfaz web responsiva, API REST documentada y notificaciones por SMTP. |
| **7. Segmentos de usuarios (CS)** | Alumnos, docentes, Secretaría Académica, autoridades y administradores. | Roles RBAC, permisos por recurso y vistas específicas para cada perfil. |
| **8. Estructura de costos** | Desarrollo, hosting, dominio, correo, soporte, capacitación, seguridad y mantenimiento. | Uso eficiente de consultas, software de código abierto, automatización de pruebas y monitoreo. |
| **9. Fuentes de financiamiento / retorno** | Presupuesto institucional. No se contempla venta ni suscripción en el MVP. | El retorno se mide en ahorro de horas administrativas, reducción de errores y mejor calidad del servicio al alumno. |

### 2.2. Gobernanza del Proyecto

* **Responsable funcional:** Define reglas académicas, criterios de aceptación y prioridades.
* **Responsable técnico:** Define arquitectura, estándares, seguridad y estrategia de despliegue.
* **Equipo de desarrollo:** Implementa frontend, backend, persistencia e integraciones.
* **Responsable de datos:** Valida la migración inicial y la calidad de legajos, planes y correlatividades.
* **QA / usuarios referentes:** Ejecutan pruebas funcionales y de aceptación antes de cada publicación.

Si se utilizan agentes de IA para asistir al desarrollo, todo cambio deberá revisarse mediante las mismas pruebas, controles de seguridad y criterios de aceptación exigidos al código producido manualmente. La responsabilidad final seguirá siendo humana.

### 2.3. Escalera de Valor / Evolución del Producto

* **Etapa 1 — MVP:** Gestión de mesas, inscripciones, notas e historial académico.
* **Etapa 2 — Consolidación:** Notificaciones avanzadas, reportes, importaciones masivas y paneles de indicadores.
* **Etapa 3 — Integración institucional:** Asistencia, equivalencias, constancias, firma digital, pagos u otros sistemas, sujetos a un nuevo análisis de alcance.

---

## 3. Especificación de Requisitos de Software (SRS)

### 3.1. Actores del Sistema

| Actor | Responsabilidades principales |
| :--- | :--- |
| **Alumno** | Gestionar sus inscripciones y consultar mesas, notas e historial propio. |
| **Docente** | Consultar mesas asignadas, nóminas y registrar calificaciones. |
| **Secretaría Académica** | Administrar datos académicos, períodos, mesas, actas, excepciones y rectificaciones. |
| **Administrador** | Gestionar cuentas, roles, configuración, auditoría y operación técnica. |
| **Autoridad / Consulta** | Consultar reportes consolidados sin modificar información académica. |

### 3.2. Requisitos Funcionales (FR)

* **FR-01 — Autenticación:** El sistema debe permitir el inicio y cierre de sesión mediante credenciales institucionales y emitir tokens JWT con vencimiento configurable.
* **FR-02 — Autorización por roles:** El sistema debe restringir recursos y operaciones mediante RBAC para los roles `ALUMNO`, `DOCENTE`, `SECRETARIA`, `ADMINISTRADOR` y `CONSULTA`.
* **FR-03 — Gestión de usuarios:** Administración debe poder crear, activar, desactivar y asignar roles a usuarios. La desactivación no debe borrar su historial.
* **FR-04 — Gestión de alumnos y docentes:** Secretaría debe poder registrar y actualizar los datos mínimos de alumnos y docentes, conservando identificadores institucionales únicos.
* **FR-05 — Gestión de oferta académica:** Secretaría debe poder administrar carreras, planes de estudio, materias, años académicos y correlatividades.
* **FR-06 — Gestión de condición académica:** El sistema debe mantener, para cada alumno y materia, una condición como `NO_CURSADA`, `CURSANDO`, `REGULAR`, `LIBRE`, `APROBADA` o `EQUIVALENCIA`, junto con las fechas y antecedentes que la justifican.
* **FR-07 — Gestión de llamados y mesas:** Secretaría debe poder crear llamados y mesas indicando materia, fecha, hora, modalidad, sede, tribunal docente, cupo, período de inscripción y estado.
* **FR-08 — Publicación de mesas:** Solo las mesas en estado `PUBLICADA` deben ser visibles e inscribibles por los alumnos.
* **FR-09 — Consulta de mesas disponibles:** El alumno debe poder consultar las mesas publicadas correspondientes a su carrera y plan de estudio, con filtros por llamado, fecha y materia.
* **FR-10 — Validación de inscripción:** Antes de confirmar una inscripción, el sistema debe verificar que el alumno esté activo, que la mesa esté publicada, que el período se encuentre abierto, que exista cupo si corresponde, que no haya una inscripción duplicada y que se cumplan la condición académica y las correlatividades configuradas.
* **FR-11 — Inscripción a examen:** Si las validaciones son satisfactorias, el alumno debe poder inscribirse y recibir un comprobante con identificador único, fecha, materia, mesa y estado.
* **FR-12 — Rechazo explicable:** Si una inscripción no es válida, el sistema debe rechazarla sin generar registros parciales e informar una causa comprensible.
* **FR-13 — Cancelación de inscripción:** El alumno debe poder cancelar su inscripción hasta la fecha límite definida. Secretaría podrá realizar una cancelación excepcional indicando el motivo.
* **FR-14 — Inscripción administrativa:** Secretaría debe poder inscribir excepcionalmente a un alumno, siempre que informe el motivo y la acción quede auditada. Las reglas que pueden omitirse deberán estar explícitamente configuradas.
* **FR-15 — Nómina de mesa:** Los docentes asignados y Secretaría deben poder consultar y exportar la nómina de alumnos inscriptos.
* **FR-16 — Registro de calificaciones:** Un docente asignado debe poder registrar la calificación y el resultado (`APROBADO`, `DESAPROBADO`, `AUSENTE` o `ANULADO`) de cada alumno durante el período habilitado.
* **FR-17 — Validación de calificaciones:** La escala de notas, la nota mínima de aprobación y los resultados admitidos deben ser parámetros institucionales. Una nota numérica debe pertenecer a la escala configurada.
* **FR-18 — Cierre y publicación de acta:** Secretaría o el docente autorizado debe poder cerrar un acta completa. El cierre debe impedir modificaciones ordinarias y la publicación debe hacer visibles los resultados a los alumnos.
* **FR-19 — Rectificación de calificación:** Una nota publicada solo podrá rectificarse por un usuario autorizado, registrando valor anterior, valor nuevo, motivo, fecha y responsable.
* **FR-20 — Consulta de resultados:** El alumno debe poder consultar únicamente sus propias calificaciones publicadas, con materia, fecha, llamado, nota, resultado y número de acta cuando corresponda.
* **FR-21 — Historial académico:** El alumno y Secretaría deben poder consultar el historial cronológico de cursadas, regularidades, equivalencias y exámenes del legajo correspondiente.
* **FR-22 — Situación por materia:** El sistema debe mostrar la situación actual de cada materia del plan y los antecedentes utilizados para calcularla.
* **FR-23 — Progreso académico:** El sistema debe informar materias aprobadas, pendientes y bloqueadas por correlatividades. Los porcentajes de avance deben calcularse sobre el plan de estudio vigente del alumno.
* **FR-24 — Notificaciones:** El sistema debe enviar notificaciones por correo ante confirmación o cancelación de inscripción, cambio relevante de una mesa y publicación o rectificación de una nota. Una falla del correo no debe revertir la operación académica confirmada.
* **FR-25 — Auditoría:** El sistema debe registrar actor, fecha, operación, recurso afectado y cambios relevantes para inscripciones administrativas, cierre de actas, publicación y rectificación de notas, y cambios de roles.
* **FR-26 — Reportes:** Secretaría debe poder obtener reportes de mesas, inscriptos, ausentes, aprobados y desaprobados, filtrados por carrera, materia, llamado y período.
* **FR-27 — Importación y exportación:** Secretaría debe poder importar catálogos iniciales desde CSV y exportar reportes a CSV. Las filas inválidas deben informarse sin incorporarse silenciosamente.
* **FR-28 — Recuperación de acceso:** Los usuarios deben poder solicitar el restablecimiento de contraseña mediante un mecanismo de un solo uso y vencimiento limitado.
* **FR-29 — Interfaz según rol:** El frontend debe presentar navegación, panel inicial y acciones acordes con el rol autenticado. Ocultar una acción en la interfaz no reemplaza la autorización obligatoria del backend.
* **FR-30 — Estados de interfaz:** Toda consulta o modificación iniciada desde el frontend debe mostrar estados de carga, resultado vacío, éxito y error, evitando envíos duplicados mientras una operación se encuentra en curso.
* **FR-31 — Consistencia de contratos:** El frontend debe consumir la API mediante un cliente centralizado y tipos derivados del contrato OpenAPI, para detectar incompatibilidades entre ambos componentes durante el desarrollo y la integración continua.

### 3.3. Reglas de Negocio (BR)

* **BR-01:** Un alumno no puede tener más de una inscripción activa para la misma materia dentro del mismo llamado.
* **BR-02:** Solo se aceptan inscripciones entre el inicio y el cierre del período configurado para la mesa.
* **BR-03:** La fecha límite de cancelación puede ser anterior al cierre de inscripción y debe definirse por llamado o mesa.
* **BR-04:** El alumno debe cumplir la condición requerida para rendir la materia y las correlatividades vigentes a la fecha del examen.
* **BR-05:** La aprobación de una materia actualiza la situación académica del alumno de forma transaccional y no elimina antecedentes previos.
* **BR-06:** Una calificación no es visible para el alumno hasta que el acta o resultado se encuentre publicado.
* **BR-07:** Un docente solo puede cargar notas en las mesas donde integra el tribunal y mientras la carga se encuentre habilitada.
* **BR-08:** El cierre de un acta requiere que todos los inscriptos tengan un resultado o una justificación pendiente explícita.
* **BR-09:** Toda rectificación posterior al cierre debe conservar el dato anterior y el motivo; no se permite sobrescribir el historial.
* **BR-10:** Las excepciones administrativas nunca deben omitir la auditoría ni los controles de autorización.
* **BR-11:** Los parámetros académicos —escala, nota mínima, vigencia de regularidad y reglas de correlatividad— deben configurarse y versionarse, no quedar codificados de forma fija.
* **BR-12:** En caso de cambio de plan, el historial original debe preservarse y las equivalencias aplicadas deben quedar identificadas.

### 3.4. Requisitos No Funcionales (NFR)

* **NFR-01 — Rendimiento:** La latencia p95 de las consultas comunes debe ser inferior a 500 ms y la de operaciones de escritura inferior a 1 segundo, medidas en condiciones normales y sin contar la entrega de correo.
* **NFR-02 — Capacidad:** El MVP debe soportar al menos 100 sesiones concurrentes y 20 solicitudes por segundo sin errores atribuibles a saturación, considerando la escala esperada de una institución.
* **NFR-03 — Disponibilidad:** Disponibilidad objetivo mensual del 99,5 %, excluyendo mantenimientos programados y comunicados.
* **NFR-04 — Integridad:** Las operaciones de inscripción, cierre de acta y publicación de notas deben ser transaccionales. Una falla no debe dejar datos académicos parciales.
* **NFR-05 — Seguridad:** Comunicaciones mediante HTTPS/TLS, contraseñas con hash robusto, tokens con vencimiento, protección frente a fuerza bruta, validación de entradas y mitigación de riesgos OWASP relevantes.
* **NFR-06 — Privacidad:** Los listados y reportes deben exponer solo los datos necesarios. Los logs no deben contener contraseñas, tokens ni datos personales innecesarios.
* **NFR-07 — Respaldo y recuperación:** Debe realizarse un respaldo diario cifrado de la base de datos, conservarse según la política institucional y probarse periódicamente la restauración. Objetivos iniciales: RPO de 24 horas y RTO de 4 horas.
* **NFR-08 — Accesibilidad y usabilidad:** La interfaz debe ser responsiva, navegable con teclado, poseer contraste suficiente y presentar mensajes de error comprensibles en español.
* **NFR-09 — Compatibilidad:** La aplicación web debe funcionar en las dos versiones estables más recientes de Chrome, Firefox y Edge.
* **NFR-10 — Mantenibilidad:** Backend y frontend deben respetar tipado estático, separación de responsabilidades, pruebas automatizadas y contratos documentados mediante OpenAPI.
* **NFR-11 — Observabilidad:** El backend debe generar logs estructurados con identificador de correlación y métricas básicas de errores, latencia y disponibilidad. El frontend debe registrar errores técnicos sin incluir datos personales ni credenciales.
* **NFR-12 — Trazabilidad:** Las operaciones académicas sensibles deben ser auditables y los registros de auditoría no podrán modificarse mediante operaciones ordinarias de la aplicación.
* **NFR-13 — Construcción reproducible:** El monorepo debe poder instalar dependencias, ejecutar controles de calidad y generar las imágenes de backend y frontend mediante comandos documentados y repetibles en desarrollo y CI.

### 3.5. Criterios de Aceptación del MVP

1. Un alumno habilitado puede iniciar sesión, ver una mesa publicada e inscribirse si cumple todas las reglas.
2. Una inscripción duplicada, fuera de término o sin correlatividades se rechaza con un motivo claro y no altera la base de datos.
3. El alumno puede cancelar dentro del plazo y la vacante vuelve a estar disponible.
4. El docente asignado puede ver la nómina y cargar resultados válidos; otro docente no puede hacerlo.
5. Al cerrar y publicar el acta, cada alumno puede ver solo su propio resultado.
6. Una materia aprobada se refleja en el historial, la situación por materia y el cálculo de avance.
7. Una rectificación conserva la nota anterior, el motivo y el usuario responsable.
8. Secretaría puede obtener un reporte de la mesa y consultar el historial completo de un alumno.
9. Las acciones sensibles quedan registradas en auditoría.
10. La aplicación permite completar desde React los flujos principales de autenticación, inscripción, carga de notas y consulta académica sin utilizar directamente la documentación de la API.
11. Las pruebas unitarias, de integración, de componentes, de API, end-to-end y de arquitectura finalizan satisfactoriamente.

---

## 4. Stack Tecnológico, Arquitectura Full-Stack y Convenciones del Monorepo

### 4.1. Stack Tecnológico Base

* **Organización:** Monorepo con backend, frontend, cliente API compartido, documentación e infraestructura en un único repositorio Git.
* **Backend:** Python 3.12 y FastAPI asíncrono.
* **Validación y contratos:** Pydantic v2.
* **Configuración:** `pydantic-settings`.
* **ORM:** SQLAlchemy 2.0 asíncrono.
* **Base de datos:** PostgreSQL 16 en producción y PostgreSQL mediante contenedor para desarrollo y pruebas de integración.
* **Migraciones:** Alembic.
* **Frontend:** React con TypeScript y Vite.
* **Navegación:** React Router, con rutas públicas y rutas protegidas según sesión y rol.
* **Acceso a datos:** Cliente HTTP centralizado y TanStack Query para caché, sincronización y estados de las consultas remotas.
* **Formularios:** React Hook Form integrado con schemas de validación del frontend. El backend vuelve a validar todos los datos recibidos.
* **Estilos:** CSS Modules y variables CSS compartidas para mantener una interfaz consistente sin acoplarla a una biblioteca visual específica.
* **Autenticación:** OAuth2 con tokens JWT. El token de acceso será de corta duración y el mecanismo de renovación utilizará una cookie `HttpOnly`, `Secure` y con política `SameSite` apropiada. El frontend no almacenará tokens persistentes en `localStorage`.
* **Notificaciones:** SMTP ejecutado mediante tareas en segundo plano. Si el volumen crece, se evaluará Redis o RabbitMQ; no forma parte de la infraestructura inicial obligatoria.
* **Testing backend:** Pytest, `pytest-asyncio` y HTTPX.
* **Testing frontend:** Vitest, React Testing Library y Playwright para los recorridos end-to-end críticos.
* **Calidad backend:** Ruff y Pyright.
* **Calidad frontend:** ESLint, Prettier y el compilador de TypeScript en modo estricto.
* **Gestión JavaScript:** `pnpm` y un workspace para `apps/web` y los paquetes TypeScript compartidos.
* **Despliegue:** Imágenes Docker separadas para API y web, PostgreSQL, proxy HTTPS y pipeline de integración continua desde el mismo repositorio.

### 4.2. Arquitectura General del Monorepo

El repositorio contendrá dos aplicaciones desplegables de forma independiente:

* **`apps/api`:** API FastAPI, lógica de negocio, persistencia, autenticación, auditoría y envío de notificaciones.
* **`apps/web`:** SPA React responsable de la experiencia de usuario, navegación por rol, formularios y presentación de la información.

Ambas aplicaciones se comunicarán exclusivamente mediante HTTP/JSON sobre la API versionada. PostgreSQL no será accesible desde el frontend. El documento OpenAPI producido por FastAPI será la fuente del cliente TypeScript ubicado en `packages/api-client`.

```text
Navegador
   │
   ▼
React SPA ──HTTP/JSON──► FastAPI ──► Casos de uso ──► Dominio
                           │                             │
                           ├──────────────► PostgreSQL ◄─┘
                           └──────────────► SMTP
```

El monorepo facilita que un cambio en un endpoint, sus tipos y la pantalla consumidora se revise en una misma rama y CI. Esto no implica desplegar ambos componentes como una sola unidad: cada aplicación conservará su propio artefacto y ciclo de despliegue.

### 4.3. Contextos de Dominio

* **Identidad y acceso:** usuarios, credenciales, roles y permisos.
* **Oferta académica:** carreras, planes, materias y correlatividades.
* **Personas académicas:** alumnos, docentes y legajos.
* **Evaluaciones:** llamados, mesas, tribunales, inscripciones, actas y calificaciones.
* **Trayectoria académica:** condiciones por materia, historial, equivalencias y progreso.
* **Auditoría y notificaciones:** trazabilidad y comunicaciones derivadas de eventos.

### 4.4. Entidades Principales

| Entidad | Datos principales |
| :--- | :--- |
| `Usuario` | id, nombre, email, hash de contraseña, estado y roles. |
| `Alumno` | id, legajo, usuario, carrera, plan, cohorte y estado. |
| `Docente` | id, usuario, identificador institucional y estado. |
| `Carrera` | id, nombre, título, duración y estado. |
| `PlanEstudio` | id, carrera, versión, vigencia y materias. |
| `Materia` | id, código, nombre, año, régimen y carga horaria. |
| `Correlatividad` | materia destino, materia requisito y condición exigida. |
| `LlamadoExamen` | id, nombre, año, fechas y estado. |
| `MesaExamen` | id, llamado, materia, fecha, sede, cupo, período, tribunal y estado. |
| `InscripcionExamen` | id, alumno, mesa, fecha, estado, origen y comprobante. |
| `ActaExamen` | id, mesa, número, estado, cierre y publicación. |
| `Calificacion` | id, acta, alumno, nota, resultado, observación y versión. |
| `SituacionMateria` | alumno, materia, condición, vigencia y origen. |
| `EventoAuditoria` | actor, acción, fecha, recurso, valores anteriores y nuevos. |

### 4.5. Estados Relevantes

* **Mesa:** `BORRADOR`, `PUBLICADA`, `INSCRIPCION_CERRADA`, `EN_EVALUACION`, `FINALIZADA`, `CANCELADA`.
* **Inscripción:** `CONFIRMADA`, `CANCELADA`, `AUSENTE`, `EVALUADA`, `ANULADA`.
* **Acta:** `ABIERTA`, `CERRADA`, `PUBLICADA`, `RECTIFICADA`.
* **Situación de materia:** `NO_CURSADA`, `CURSANDO`, `REGULAR`, `LIBRE`, `APROBADA`, `EQUIVALENCIA`.

Las transiciones de estado deben realizarse mediante casos de uso explícitos; no se permitirá cambiar estados arbitrariamente desde un endpoint genérico.

### 4.6. Estructura Canónica del Monorepo

```text
.
├── .gitignore
├── README.md
├── compose.yaml
├── Makefile
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── apps/
│   ├── api/
│   │   ├── .env.example
│   │   ├── pyproject.toml
│   │   ├── alembic.ini
│   │   ├── src/
│   │   │   ├── domain/
│   │   │   │   ├── identity/
│   │   │   │   ├── academic_offering/
│   │   │   │   ├── examinations/
│   │   │   │   └── academic_record/
│   │   │   ├── application/
│   │   │   ├── adapters/
│   │   │   ├── infrastructure/
│   │   │   │   ├── fastapi/
│   │   │   │   ├── sqlalchemy/
│   │   │   │   ├── notifications/
│   │   │   │   └── settings/
│   │   │   └── main.py
│   │   └── tests/
│   │       ├── test_architecture.py
│   │       ├── unit/
│   │       ├── integration/
│   │       └── e2e/
│   └── web/
│       ├── .env.example
│       ├── package.json
│       ├── vite.config.ts
│       ├── tsconfig.json
│       ├── public/
│       └── src/
│           ├── app/
│           │   ├── providers/
│           │   └── router/
│           ├── features/
│           │   ├── auth/
│           │   ├── exam-tables/
│           │   ├── enrollments/
│           │   ├── grades/
│           │   └── academic-record/
│           ├── pages/
│           ├── shared/
│           │   ├── api/
│           │   ├── components/
│           │   ├── hooks/
│           │   └── styles/
│           └── test/
├── packages/
│   └── api-client/               # Tipos y cliente generados desde OpenAPI
├── docs/
│   ├── srs/
│   └── api/
└── infra/
    ├── docker/
    └── proxy/
```

En el backend, cada contexto de `domain` contendrá entidades, objetos de valor, servicios, interfaces de repositorio, eventos y excepciones. `application` contendrá casos de uso y DTOs; FastAPI, SQLAlchemy y SMTP permanecerán en `infrastructure`.

El frontend se organizará por funcionalidades del negocio. Cada carpeta de `features` podrá contener componentes, hooks, schemas y pruebas propios. `shared` contendrá únicamente elementos reutilizables que no pertenezcan a una funcionalidad particular.

### 4.7. Configuración, Entornos y Logging

* Cada aplicación tendrá su propio `.env` local, que nunca se versionará, y un `.env.example` documentado.
* `Settings`, basado en `pydantic-settings`, centralizará entorno, logging, API, CORS, seguridad, base de datos, correo y parámetros operativos.
* Los parámetros académicos modificables no se codificarán en `Settings`: se almacenarán en la base de datos con vigencia y auditoría.
* El logging será legible en desarrollo y estructurado en JSON en producción.
* Cada solicitud tendrá un `correlation_id`. No se registrarán contraseñas, tokens ni cuerpos completos con información sensible.
* Las variables expuestas por Vite se considerarán públicas. `apps/web/.env` solo podrá contener configuración no sensible, como la URL base de la API.

Variables mínimas previstas:

```dotenv
ENVIRONMENT=development
DEBUG=false
LOG_LEVEL=INFO
PROJECT_NAME=SIGA-IT
VERSION=1.0.0
API_V1_PREFIX=/api/v1
DATABASE_URL=postgresql+asyncpg://user:password@db:5432/sigait
SECRET_KEY=change-me
ACCESS_TOKEN_EXPIRE_MINUTES=60
SMTP_HOST=mail.example.edu
SMTP_PORT=587
SMTP_USER=user
SMTP_PASSWORD=change-me
FRONTEND_URL=https://academica.example.edu
```

Ejemplo mínimo del frontend:

```dotenv
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

### 4.8. Reglas Innegociables de Arquitectura

1. `domain` no depende de `application`, `adapters`, `infrastructure`, FastAPI ni SQLAlchemy.
2. `application` depende de `domain` y de contratos de entrada/salida, pero no de infraestructura concreta.
3. `adapters` traduce entre los casos de uso y los formatos externos sin contener reglas académicas.
4. `infrastructure` contiene frameworks, ORM, correo, configuración y drivers.
5. Los routers son delgados: validan la entrada, resuelven dependencias, ejecutan un caso de uso y presentan la respuesta.
6. Las transacciones se controlan en el límite del caso de uso mediante una abstracción `UnitOfWork`.
7. No se permiten secretos ni reglas académicas variables codificadas en el código fuente.
8. Se utilizan imports absolutos y tipado explícito en `domain` y `application`.
9. Los archivos `__init__.py` se mantienen sin efectos secundarios; el proyecto puede exigir que tengan 0 bytes mediante una prueba de arquitectura.
10. Toda operación que cambie una inscripción, acta, calificación o permiso debe producir un registro de auditoría dentro de la misma transacción o mediante un mecanismo confiable equivalente.
11. El frontend no duplica reglas académicas como correlatividades, cupos o períodos. Puede anticipar validaciones para mejorar la experiencia, pero la decisión autoritativa siempre pertenece al backend.
12. Las llamadas HTTP del frontend se realizan mediante el cliente centralizado; los componentes visuales no contienen URLs ni lógica de transporte dispersa.
13. Las páginas coordinan funcionalidades y los componentes compartidos permanecen libres de conocimiento específico del dominio.
14. Las rutas y los controles visuales respetan el rol del usuario, pero todos los permisos vuelven a verificarse en la API.
15. Los cambios incompatibles en OpenAPI deben fallar durante CI al regenerar y validar `packages/api-client`.

### 4.9. API Inicial Propuesta

| Método y ruta | Rol principal | Propósito |
| :--- | :--- | :--- |
| `POST /api/v1/auth/login` | Todos | Autenticarse. |
| `POST /api/v1/auth/recovery` | Todos | Solicitar recuperación de acceso. |
| `GET /api/v1/me` | Todos | Consultar perfil y permisos propios. |
| `GET /api/v1/mesas` | Alumno / personal | Consultar mesas según permisos. |
| `POST /api/v1/mesas` | Secretaría | Crear una mesa. |
| `POST /api/v1/mesas/{id}/publicacion` | Secretaría | Publicar una mesa. |
| `GET /api/v1/mesas/{id}/inscriptos` | Docente / Secretaría | Consultar nómina. |
| `POST /api/v1/mesas/{id}/inscripciones` | Alumno / Secretaría | Crear una inscripción. |
| `DELETE /api/v1/inscripciones/{id}` | Alumno / Secretaría | Cancelar una inscripción. |
| `PUT /api/v1/actas/{id}/calificaciones/{alumno_id}` | Docente / Secretaría | Registrar una calificación. |
| `POST /api/v1/actas/{id}/cierre` | Docente / Secretaría | Cerrar el acta. |
| `POST /api/v1/actas/{id}/publicacion` | Secretaría | Publicar resultados. |
| `POST /api/v1/calificaciones/{id}/rectificacion` | Secretaría | Rectificar con auditoría. |
| `GET /api/v1/alumnos/me/historial` | Alumno | Consultar historial propio. |
| `GET /api/v1/alumnos/me/situacion` | Alumno | Consultar situación por materia. |
| `GET /api/v1/alumnos/{id}/historial` | Secretaría | Consultar un legajo. |
| `GET /api/v1/reportes/mesas` | Secretaría / Consulta | Obtener reportes autorizados. |

### 4.10. Pantallas y Rutas Iniciales del Frontend

| Ruta | Rol | Funcionalidad principal |
| :--- | :--- | :--- |
| `/login` | Pública | Inicio de sesión y acceso a recuperación de contraseña. |
| `/alumno` | Alumno | Resumen de próximas mesas, inscripciones y novedades académicas. |
| `/alumno/mesas` | Alumno | Búsqueda, detalle e inscripción a mesas disponibles. |
| `/alumno/inscripciones` | Alumno | Consulta y cancelación de inscripciones propias. |
| `/alumno/historial` | Alumno | Historial, situación por materia y progreso del plan. |
| `/docente` | Docente | Resumen de mesas asignadas y tareas pendientes. |
| `/docente/mesas/:mesaId` | Docente | Nómina, carga de notas y preparación del cierre de acta. |
| `/secretaria/mesas` | Secretaría | Creación, edición, publicación y seguimiento de mesas. |
| `/secretaria/actas/:actaId` | Secretaría | Revisión, cierre, publicación y rectificación autorizada. |
| `/secretaria/alumnos/:alumnoId` | Secretaría | Consulta administrativa del legajo y situación académica. |
| `/admin/usuarios` | Administrador | Gestión de cuentas, estados y roles. |

Las rutas protegidas deben conservar la página solicitada durante el inicio de sesión y redirigir a una pantalla segura si el usuario no posee permisos. Cada vista de datos incluirá estados de carga, vacío, error y reintento. Las operaciones irreversibles o sensibles mostrarán una confirmación clara antes de enviarse.

---

## 5. Gobernanza Normativa, Calidad y Matriz de Pruebas

### 5.1. Estrategia de Calidad

La calidad se verificará mediante pruebas automáticas de backend y frontend, revisión de código y pruebas de aceptación con usuarios referentes. Ningún cambio se integrará a la rama principal si incumple las reglas de arquitectura, seguridad, dominio o contrato API.

La cobertura será un indicador y no un fin aislado. Como objetivo inicial, `domain` y `application` deberán alcanzar al menos 90 % de cobertura de líneas, incluyendo todas las reglas críticas de inscripción y calificación. En el frontend se priorizará la cobertura de recorridos y comportamientos observables sobre detalles internos de implementación.

### 5.2. Baterías de Pruebas de Arquitectura

1. **Archivos de inicialización:** Verifica que los `__init__.py` no contengan lógica ni efectos secundarios y, si se adopta la restricción, que tengan 0 bytes.
2. **Dependencias entre capas:** Impide importaciones desde círculos internos hacia externos.
3. **Imports absolutos:** Evita imports relativos en `src/`.
4. **Tipado:** Exige anotaciones de parámetros y retornos en `domain` y `application`.
5. **Secretos:** Detecta tokens, contraseñas, claves o cadenas de conexión incorporadas al código.
6. **Routers delgados:** Impide acceso directo al ORM desde los endpoints.
7. **Auditoría obligatoria:** Verifica que los casos de uso sensibles invoquen el puerto de auditoría correspondiente.
8. **Límites del frontend:** Impide dependencias desde `shared` hacia `features` y llamadas HTTP fuera del cliente centralizado.
9. **Contrato API:** Regenera el cliente TypeScript y falla si existen cambios sin incorporar o incompatibilidades de tipos.

### 5.3. Matriz de Pruebas Funcionales

| Área | Casos mínimos |
| :--- | :--- |
| **Autenticación y permisos** | Inicio válido e inválido, token vencido, usuario inactivo, acceso permitido y denegado por rol. |
| **Mesas** | Alta, publicación, modificación válida, cancelación y prevención de transiciones inválidas. |
| **Inscripciones** | Inscripción válida, duplicada, fuera de término, sin cupo, sin regularidad, sin correlativas y cancelación. |
| **Concurrencia** | Dos alumnos intentan ocupar simultáneamente la última vacante sin superar el cupo. |
| **Calificaciones** | Carga válida, escala inválida, docente no asignado, cierre incompleto, publicación y visibilidad. |
| **Rectificaciones** | Autorización, conservación del valor anterior, motivo obligatorio y auditoría. |
| **Situación académica** | Aprobación, desaprobación, ausencia, equivalencia, cambio de plan y cálculo de avance. |
| **Notificaciones** | Envío exitoso, reintento y falla sin reversión de la transacción académica. |
| **Privacidad** | Un alumno no puede ver datos de otro; un docente no accede a mesas ajenas. |
| **Reportes** | Filtros, totales, permisos y exportación CSV consistente. |
| **Componentes React** | Estados de carga, vacío, error y éxito; validación de formularios; confirmaciones y accesibilidad básica. |
| **Navegación por rol** | Rutas permitidas, redirecciones, sesión vencida y ausencia de acciones no autorizadas. |
| **Contrato frontend–backend** | Generación del cliente, serialización de datos, errores normalizados y compatibilidad del OpenAPI. |
| **End-to-end** | Alumno se inscribe y consulta su nota; docente carga resultados; Secretaría publica el acta. |

### 5.4. Trazabilidad Requisitos–Pruebas

Cada historia o caso de uso deberá identificar los requisitos `FR`, reglas `BR` y requisitos no funcionales `NFR` que implementa. Los nombres o metadatos de las pruebas deberán permitir rastrear como mínimo:

```text
FR-10 + BR-01..BR-04 -> apps/api/tests/unit/examinations/test_validate_enrollment.py
FR-11 + NFR-04       -> apps/api/tests/integration/test_exam_enrollment_transaction.py
FR-16 + BR-07        -> apps/api/tests/unit/examinations/test_record_grade.py
FR-18 + BR-08        -> apps/api/tests/unit/examinations/test_close_exam_record.py
FR-19 + BR-09        -> apps/api/tests/integration/test_grade_correction_audit.py
FR-20 + NFR-06       -> apps/api/tests/e2e/test_student_grade_privacy.py
FR-23                -> apps/api/tests/unit/academic_record/test_progress.py
FR-29 + FR-30        -> apps/web/src/features/enrollments/enrollment.test.tsx
FR-31 + NFR-13       -> packages/api-client y verificación de CI
```

### 5.5. Estándares de Calidad y Trazabilidad

* Buenas prácticas de calidad de producto y seguridad de la información, tomando ISO/IEC 25010 e ISO/IEC 27001 como marcos de referencia, sin afirmar certificación.
* Commits con Conventional Commits: `feat:`, `fix:`, `refactor:`, `test:`, `docs:` y `chore:`.
* Pull requests con requisito asociado, evidencia de pruebas y revisión de al menos una persona del equipo.
* Migraciones de base de datos versionadas, reversibles cuando sea posible y probadas con datos representativos no productivos.

### 5.6. Verificación Previa a Despliegues

```bash
# Backend
cd apps/api
ruff check .
ruff format --check .
pyright src/
python3 tests/test_architecture.py
pytest --maxfail=1 --disable-warnings -v

# Frontend y contrato API
cd ../..
pnpm install --frozen-lockfile
pnpm --filter web lint
pnpm --filter web typecheck
pnpm --filter web test
pnpm --filter web build
pnpm --filter web test:e2e
pnpm api-client:check
```

Para un despliegue productivo también deberán verificarse migraciones, variables de entorno, respaldo reciente, plan de reversión y pruebas rápidas de autenticación, inscripción y consulta de historial.

### 5.7. Configuración del Editor

El repositorio incluirá `apps/api/pyrightconfig.json`, los archivos `tsconfig.json` correspondientes y `.vscode/settings.json` para mantener diagnósticos consistentes entre el editor y CI. La exclusión de pruebas del análisis estricto solo se adoptará si existe una razón técnica documentada; no se utilizará para ocultar errores evitables.

Ejemplo inicial de `pyrightconfig.json`:

```json
{
  "include": ["src"],
  "exclude": ["tests", ".venv", "**/__pycache__"],
  "venvPath": ".",
  "venv": ".venv",
  "typeCheckingMode": "strict",
  "pythonVersion": "3.12"
}
```

---

## 6. Supuestos, Restricciones y Riesgos

### 6.1. Supuestos

* La institución dispone de un padrón inicial de alumnos, docentes, carreras y materias que puede depurarse e importarse.
* Secretaría Académica definirá formalmente las escalas de notas, correlatividades, vigencias y excepciones.
* Cada usuario tendrá un correo único o un mecanismo alternativo de identificación definido antes de la puesta en producción.
* El MVP será utilizado inicialmente por una sola institución.

### 6.2. Restricciones

* El proyecto integrador tiene tiempo y equipo limitados, por lo que se prioriza el flujo completo de examen sobre módulos administrativos secundarios.
* La primera versión no reemplazará documentos oficiales externos que exijan firma, sello o formato regulado.
* Los datos reales solo podrán utilizarse en producción; desarrollo y pruebas emplearán datos ficticios o anonimizados.

### 6.3. Riesgos y Mitigaciones

| Riesgo | Impacto | Mitigación |
| :--- | :--- | :--- |
| Reglas académicas ambiguas o diferentes entre carreras. | Inscripciones o situaciones incorrectas. | Taller de relevamiento, catálogo versionado de reglas y aprobación de Secretaría. |
| Datos históricos incompletos o inconsistentes. | Cálculos de correlatividad y avance erróneos. | Proceso de limpieza, importación con reporte de errores y validación por muestreo. |
| Sobrecarga cerca del cierre de inscripción. | Lentitud o imposibilidad de inscribirse. | Pruebas de carga, índices, transacciones breves y monitoreo. |
| Acceso indebido a notas o legajos. | Incidente de privacidad. | RBAC, mínimo privilegio, pruebas de autorización y auditoría. |
| Carga accidental de una nota incorrecta. | Reclamos y pérdida de confianza. | Confirmación de cierre, vista previa del acta y proceso formal de rectificación. |
| Falla del servicio de correo. | Usuario sin aviso. | Reintentos, registro de entrega y consulta siempre disponible dentro del portal. |

---

## 7. Glosario

* **Acta de examen:** Registro consolidado de los resultados de una mesa.
* **Correlatividad:** Requisito académico que debe cumplirse antes de cursar o rendir otra materia.
* **Llamado:** Período institucional que agrupa mesas de examen.
* **Mesa de examen:** Instancia concreta de evaluación de una materia en fecha, horario y tribunal determinados.
* **Regularidad:** Condición obtenida al cumplir los requisitos de cursada y que puede tener una vigencia definida.
* **Situación académica:** Estado actual del alumno respecto de una materia y su trayectoria dentro del plan.
* **RBAC:** Control de acceso basado en roles.
* **RPO:** Máxima antigüedad tolerable de los datos que podrían perderse tras un incidente.
* **RTO:** Tiempo objetivo para recuperar el servicio luego de un incidente.

---

## 8. Pendientes para la Revisión con la Institución

Antes de aprobar la versión 1.0 deben confirmarse:

1. Nombre oficial de la institución, autores y repositorio.
2. Tipos de carrera y estructura real de los planes de estudio.
3. Escala de notas y nota mínima de aprobación.
4. Condiciones habilitantes para rendir como regular o libre.
5. Reglas de correlatividad y vigencia de las regularidades.
6. Fechas límite de inscripción y cancelación.
7. Roles reales del personal y quién puede cerrar, publicar o rectificar actas.
8. Necesidad de cupos, sedes, modalidades y múltiples tribunales.
9. Formato de reportes, comprobantes y actas requerido por la institución.
10. Política de conservación, respaldo y eventual eliminación de datos.
