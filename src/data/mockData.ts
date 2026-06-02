export interface CompetenciaDetalle {
  nombre: string;
  logrado: number;
  esperado: number;
  autoevaluacion: number;
  jefe: number;
  pares: number;
}

export interface Objetivo {
  descripcion: string;
  meta: number;
  logrado: number;
  unidad: string;
}

export interface Colaborador {
  id: string;
  nombre: string;
  cargo: string;
  calificacionFinal: number;
  logroObjetivos: number;
  logroCompetencias: number;
  competencias: CompetenciaDetalle[];
  objetivos: Objetivo[];
  feedback: {
    logros: string;
    fortalezas: string;
    oportunidades: string;
    comentariosEvaluador: string;
  };
}

export interface Jefatura {
  id: string;
  nombre: string;
  jefe: string;
  nColaboradores: number;
  promedio: number;
  estado: 'Completado' | 'En Progreso' | 'Pendiente';
  colaboradores: Colaborador[];
}

export interface Gerencia {
  id: string;
  nombre: string;
  promedio: number;
  promedioPrevio: number;
  competencias: { nombre: string; logrado: number; esperado: number }[];
  jefaturas: Jefatura[];
}

export interface HistorialPeriodo {
  periodo: string;
  calificacion: number;
  competencias: number;
  objetivos: number;
}

export const PERIODOS = ['Proceso 2023', 'Proceso 2024', 'Proceso 2025'];

// ─── Empresas del cliente ──────────────────────────────────────────────────

export interface EmpresaMock {
  id: string;
  nombre: string;
  periodos: string[];
  totalEvaluados: number;
  kpis: {
    calificacionFinal: number;
    calificacionFinalPrevio: number;
    cumplimientoCompetencias: number;
    cumplimientoCompetenciasPrevio: number;
    cumplimientoObjetivos: number;
    cumplimientoObjetivosPrevio: number;
  };
  historial: HistorialPeriodo[];
  nEmpresas?: number; // only used by 'all'
}

export const EMPRESAS: EmpresaMock[] = [
  {
    id: 'all',
    nombre: 'Todas las Empresas',
    periodos: ['Proceso 2023', 'Proceso 2024', 'Proceso 2025'],
    totalEvaluados: 148,
    kpis: {
      calificacionFinal: 82,
      calificacionFinalPrevio: 79,
      cumplimientoCompetencias: 78,
      cumplimientoCompetenciasPrevio: 80,
      cumplimientoObjetivos: 85,
      cumplimientoObjetivosPrevio: 80,
    },
    historial: [
      { periodo: 'Proc. 2023', calificacion: 74, competencias: 72, objetivos: 76 },
      { periodo: 'Proc. 2024', calificacion: 79, competencias: 80, objetivos: 80 },
      { periodo: 'Proc. 2025', calificacion: 82, competencias: 78, objetivos: 85 },
    ],
    nEmpresas: 5,
  },
  {
    id: 'emp1',
    nombre: 'Constructora Andina SpA',
    periodos: ['Proceso 2023', 'Proceso 2024', 'Proceso 2025'],
    totalEvaluados: 45,
    kpis: {
      calificacionFinal: 79,
      calificacionFinalPrevio: 75,
      cumplimientoCompetencias: 76,
      cumplimientoCompetenciasPrevio: 73,
      cumplimientoObjetivos: 81,
      cumplimientoObjetivosPrevio: 77,
    },
    historial: [
      { periodo: 'Proc. 2023', calificacion: 70, competencias: 68, objetivos: 72 },
      { periodo: 'Proc. 2024', calificacion: 75, competencias: 73, objetivos: 77 },
      { periodo: 'Proc. 2025', calificacion: 79, competencias: 76, objetivos: 81 },
    ],
  },
  {
    id: 'emp2',
    nombre: 'Retail Pacífico S.A.',
    periodos: ['Proceso 2023', 'Proceso 2024', 'Proceso 2025'],
    totalEvaluados: 38,
    kpis: {
      calificacionFinal: 86,
      calificacionFinalPrevio: 83,
      cumplimientoCompetencias: 84,
      cumplimientoCompetenciasPrevio: 81,
      cumplimientoObjetivos: 88,
      cumplimientoObjetivosPrevio: 85,
    },
    historial: [
      { periodo: 'Proc. 2023', calificacion: 78, competencias: 76, objetivos: 80 },
      { periodo: 'Proc. 2024', calificacion: 83, competencias: 81, objetivos: 85 },
      { periodo: 'Proc. 2025', calificacion: 86, competencias: 84, objetivos: 88 },
    ],
  },
  {
    id: 'emp3',
    nombre: 'Minera Las Vertientes Ltda.',
    periodos: ['Proceso 2024', 'Proceso 2025'],
    totalEvaluados: 22,
    kpis: {
      calificacionFinal: 74,
      calificacionFinalPrevio: 70,
      cumplimientoCompetencias: 71,
      cumplimientoCompetenciasPrevio: 68,
      cumplimientoObjetivos: 77,
      cumplimientoObjetivosPrevio: 72,
    },
    historial: [
      { periodo: 'Proc. 2024', calificacion: 70, competencias: 68, objetivos: 72 },
      { periodo: 'Proc. 2025', calificacion: 74, competencias: 71, objetivos: 77 },
    ],
  },
  {
    id: 'emp4',
    nombre: 'Clínica Santa Rosa S.A.',
    periodos: ['Proceso 2024', 'Proceso 2025'],
    totalEvaluados: 31,
    kpis: {
      calificacionFinal: 88,
      calificacionFinalPrevio: 84,
      cumplimientoCompetencias: 85,
      cumplimientoCompetenciasPrevio: 82,
      cumplimientoObjetivos: 90,
      cumplimientoObjetivosPrevio: 86,
    },
    historial: [
      { periodo: 'Proc. 2024', calificacion: 84, competencias: 82, objetivos: 86 },
      { periodo: 'Proc. 2025', calificacion: 88, competencias: 85, objetivos: 90 },
    ],
  },
  {
    id: 'emp5',
    nombre: 'Logística Sur Express',
    periodos: ['Proceso 2025'],
    totalEvaluados: 12,
    kpis: {
      calificacionFinal: 71,
      calificacionFinalPrevio: 71,
      cumplimientoCompetencias: 68,
      cumplimientoCompetenciasPrevio: 68,
      cumplimientoObjetivos: 74,
      cumplimientoObjetivosPrevio: 74,
    },
    historial: [
      { periodo: 'Proc. 2025', calificacion: 71, competencias: 68, objetivos: 74 },
    ],
  },
];

export function getEmpresaById(id: string): EmpresaMock {
  return EMPRESAS.find(e => e.id === id) ?? EMPRESAS[0];
}

// Backwards-compat aliases used by existing pages
export const EMPRESA_KPIS = EMPRESAS[0].kpis;

export const HISTORIAL_EMPRESA: HistorialPeriodo[] = EMPRESAS[0].historial;

export const COMPETENCIAS_EMPRESA = [
  { nombre: 'Liderazgo', logrado: 79, esperado: 85 },
  { nombre: 'Trabajo en Equipo', logrado: 82, esperado: 80 },
  { nombre: 'Orientación al Cliente', logrado: 75, esperado: 85 },
  { nombre: 'Innovación', logrado: 68, esperado: 80 },
  { nombre: 'Comunicación', logrado: 78, esperado: 80 },
  { nombre: 'Resolución de Problemas', logrado: 77, esperado: 85 },
  { nombre: 'Planificación', logrado: 81, esperado: 80 },
  { nombre: 'Adaptabilidad', logrado: 72, esperado: 75 },
  { nombre: 'Gestión del Cambio', logrado: 65, esperado: 80 },
  { nombre: 'Desarrollo de Otros', logrado: 70, esperado: 75 },
  { nombre: 'Orientación a Resultados', logrado: 85, esperado: 90 },
  { nombre: 'Ética Profesional', logrado: 93, esperado: 95 },
];

const COLABS_REDES: Colaborador[] = [
  {
    id: 'c1',
    nombre: 'Pedro Soto',
    cargo: 'Analista de Redes',
    calificacionFinal: 88,
    logroObjetivos: 90,
    logroCompetencias: 86,
    competencias: [
      { nombre: 'Liderazgo', logrado: 72, esperado: 85, autoevaluacion: 75, jefe: 70, pares: 71 },
      { nombre: 'Trabajo en Equipo', logrado: 90, esperado: 80, autoevaluacion: 88, jefe: 92, pares: 90 },
      { nombre: 'Orientación al Cliente', logrado: 68, esperado: 85, autoevaluacion: 70, jefe: 65, pares: 69 },
      { nombre: 'Innovación', logrado: 60, esperado: 80, autoevaluacion: 65, jefe: 58, pares: 57 },
      { nombre: 'Comunicación', logrado: 82, esperado: 80, autoevaluacion: 80, jefe: 84, pares: 82 },
      { nombre: 'Resolución de Problemas', logrado: 88, esperado: 85, autoevaluacion: 85, jefe: 90, pares: 89 },
      { nombre: 'Planificación', logrado: 85, esperado: 80, autoevaluacion: 83, jefe: 87, pares: 85 },
      { nombre: 'Adaptabilidad', logrado: 70, esperado: 75, autoevaluacion: 72, jefe: 68, pares: 70 },
      { nombre: 'Gestión del Cambio', logrado: 58, esperado: 80, autoevaluacion: 60, jefe: 55, pares: 59 },
      { nombre: 'Desarrollo de Otros', logrado: 65, esperado: 75, autoevaluacion: 68, jefe: 62, pares: 65 },
      { nombre: 'Orientación a Resultados', logrado: 91, esperado: 90, autoevaluacion: 90, jefe: 93, pares: 90 },
      { nombre: 'Ética Profesional', logrado: 95, esperado: 95, autoevaluacion: 95, jefe: 95, pares: 95 },
    ],
    objetivos: [
      { descripcion: 'Disponibilidad de red >= 99.5%', meta: 99.5, logrado: 99.8, unidad: '%' },
      { descripcion: 'Tiempo promedio resolución incidentes', meta: 4, logrado: 3.2, unidad: 'hrs' },
      { descripcion: 'Certificaciones técnicas completadas', meta: 2, logrado: 2, unidad: 'cert.' },
      { descripcion: 'Reducción tickets escalados', meta: 20, logrado: 28, unidad: '%' },
    ],
    feedback: {
      logros: 'Implementó exitosamente la migración de infraestructura crítica sin interrupciones de servicio. Redujo los incidentes de red en un 28% respecto al periodo anterior.',
      fortalezas: 'Excelente dominio técnico de redes y sistemas. Alta resolutividad ante problemas complejos. Buen colaborador con el equipo de soporte.',
      oportunidades: 'Debe desarrollar habilidades de liderazgo para asumir proyectos de mayor envergadura. Mejorar la comunicación con usuarios no técnicos. Fomentar más la innovación en procesos.',
      comentariosEvaluador: 'Pedro es un profesional sólido con alto potencial técnico. Este año se destacó en la gestión de incidentes críticos. Se recomienda incorporarlo a proyectos de transformación digital para potenciar su perfil.',
    },
  },
  {
    id: 'c2',
    nombre: 'Ana Torres',
    cargo: 'Desarrolladora Backend',
    calificacionFinal: 91,
    logroObjetivos: 94,
    logroCompetencias: 88,
    competencias: [
      { nombre: 'Liderazgo', logrado: 80, esperado: 85, autoevaluacion: 78, jefe: 82, pares: 80 },
      { nombre: 'Trabajo en Equipo', logrado: 92, esperado: 80, autoevaluacion: 90, jefe: 94, pares: 92 },
      { nombre: 'Orientación al Cliente', logrado: 80, esperado: 85, autoevaluacion: 78, jefe: 82, pares: 80 },
      { nombre: 'Innovación', logrado: 88, esperado: 80, autoevaluacion: 85, jefe: 90, pares: 89 },
      { nombre: 'Comunicación', logrado: 85, esperado: 80, autoevaluacion: 83, jefe: 87, pares: 85 },
      { nombre: 'Resolución de Problemas', logrado: 93, esperado: 85, autoevaluacion: 91, jefe: 95, pares: 93 },
      { nombre: 'Planificación', logrado: 88, esperado: 80, autoevaluacion: 86, jefe: 90, pares: 88 },
      { nombre: 'Adaptabilidad', logrado: 85, esperado: 75, autoevaluacion: 83, jefe: 87, pares: 85 },
      { nombre: 'Gestión del Cambio', logrado: 82, esperado: 80, autoevaluacion: 80, jefe: 84, pares: 82 },
      { nombre: 'Desarrollo de Otros', logrado: 78, esperado: 75, autoevaluacion: 76, jefe: 80, pares: 78 },
      { nombre: 'Orientación a Resultados', logrado: 94, esperado: 90, autoevaluacion: 92, jefe: 96, pares: 94 },
      { nombre: 'Ética Profesional', logrado: 96, esperado: 95, autoevaluacion: 96, jefe: 96, pares: 96 },
    ],
    objetivos: [
      { descripcion: 'Funcionalidades entregadas en sprint', meta: 90, logrado: 96, unidad: '%' },
      { descripcion: 'Cobertura de pruebas unitarias', meta: 80, logrado: 87, unidad: '%' },
      { descripcion: 'Incidentes producción por código propio', meta: 0, logrado: 1, unidad: 'incid.' },
      { descripcion: 'Mentorías realizadas', meta: 4, logrado: 6, unidad: 'sesiones' },
    ],
    feedback: {
      logros: 'Lideró la refactorización del módulo de autenticación mejorando rendimiento en 40%. Entregó el 96% de las funcionalidades comprometidas en tiempo y forma.',
      fortalezas: 'Excelente capacidad técnica y analítica. Proactiva en la revisión de código de sus pares. Muy comprometida con la calidad.',
      oportunidades: 'Puede potenciar sus habilidades de liderazgo formal. Desarrollar mayor visión de negocio para priorizar funcionalidades de mayor impacto.',
      comentariosEvaluador: 'Ana es una de las desarrolladoras más valiosas del equipo. Su nivel técnico y compromiso son un referente. Se recomienda para un rol de Tech Lead en el próximo periodo.',
    },
  },
  {
    id: 'c3',
    nombre: 'Carlos Méndez',
    cargo: 'Arquitecto de Software',
    calificacionFinal: 76,
    logroObjetivos: 72,
    logroCompetencias: 80,
    competencias: [
      { nombre: 'Liderazgo', logrado: 78, esperado: 85, autoevaluacion: 80, jefe: 76, pares: 78 },
      { nombre: 'Trabajo en Equipo', logrado: 70, esperado: 80, autoevaluacion: 72, jefe: 68, pares: 70 },
      { nombre: 'Orientación al Cliente', logrado: 72, esperado: 85, autoevaluacion: 74, jefe: 70, pares: 72 },
      { nombre: 'Innovación', logrado: 85, esperado: 80, autoevaluacion: 83, jefe: 87, pares: 85 },
      { nombre: 'Comunicación', logrado: 68, esperado: 80, autoevaluacion: 70, jefe: 66, pares: 68 },
      { nombre: 'Resolución de Problemas', logrado: 90, esperado: 85, autoevaluacion: 88, jefe: 92, pares: 90 },
      { nombre: 'Planificación', logrado: 80, esperado: 80, autoevaluacion: 78, jefe: 82, pares: 80 },
      { nombre: 'Adaptabilidad', logrado: 65, esperado: 75, autoevaluacion: 67, jefe: 63, pares: 65 },
      { nombre: 'Gestión del Cambio', logrado: 70, esperado: 80, autoevaluacion: 72, jefe: 68, pares: 70 },
      { nombre: 'Desarrollo de Otros', logrado: 75, esperado: 75, autoevaluacion: 73, jefe: 77, pares: 75 },
      { nombre: 'Orientación a Resultados', logrado: 80, esperado: 90, autoevaluacion: 78, jefe: 82, pares: 80 },
      { nombre: 'Ética Profesional', logrado: 90, esperado: 95, autoevaluacion: 90, jefe: 90, pares: 90 },
    ],
    objetivos: [
      { descripcion: 'Documentación arquitectura entregada', meta: 4, logrado: 2, unidad: 'doc.' },
      { descripcion: 'Revisiones arquitecturales realizadas', meta: 12, logrado: 9, unidad: 'rev.' },
      { descripcion: 'Reducción deuda técnica', meta: 30, logrado: 18, unidad: '%' },
      { descripcion: 'Talleres técnicos impartidos', meta: 3, logrado: 2, unidad: 'talleres' },
    ],
    feedback: {
      logros: 'Diseñó la arquitectura del nuevo módulo de reportería. Participó activamente en la evaluación de tecnologías para el roadmap 2026.',
      fortalezas: 'Profundo conocimiento técnico y visión de largo plazo. Capacidad para identificar riesgos arquitecturales tempranamente.',
      oportunidades: 'Mejorar comunicación con stakeholders no técnicos. Entregar documentación en los plazos comprometidos. Fortalecer trabajo colaborativo con otros equipos.',
      comentariosEvaluador: 'Carlos tiene un conocimiento técnico valioso pero debe mejorar en compromisos y comunicación. Se recomienda establecer metas más específicas y medibles para el próximo periodo.',
    },
  },
  {
    id: 'c4',
    nombre: 'Laura Vega',
    cargo: 'Ingeniera DevOps',
    calificacionFinal: 85,
    logroObjetivos: 88,
    logroCompetencias: 82,
    competencias: [
      { nombre: 'Liderazgo', logrado: 75, esperado: 85, autoevaluacion: 77, jefe: 73, pares: 75 },
      { nombre: 'Trabajo en Equipo', logrado: 87, esperado: 80, autoevaluacion: 85, jefe: 89, pares: 87 },
      { nombre: 'Orientación al Cliente', logrado: 78, esperado: 85, autoevaluacion: 76, jefe: 80, pares: 78 },
      { nombre: 'Innovación', logrado: 83, esperado: 80, autoevaluacion: 81, jefe: 85, pares: 83 },
      { nombre: 'Comunicación', logrado: 80, esperado: 80, autoevaluacion: 78, jefe: 82, pares: 80 },
      { nombre: 'Resolución de Problemas', logrado: 85, esperado: 85, autoevaluacion: 83, jefe: 87, pares: 85 },
      { nombre: 'Planificación', logrado: 88, esperado: 80, autoevaluacion: 86, jefe: 90, pares: 88 },
      { nombre: 'Adaptabilidad', logrado: 90, esperado: 75, autoevaluacion: 88, jefe: 92, pares: 90 },
      { nombre: 'Gestión del Cambio', logrado: 85, esperado: 80, autoevaluacion: 83, jefe: 87, pares: 85 },
      { nombre: 'Desarrollo de Otros', logrado: 72, esperado: 75, autoevaluacion: 70, jefe: 74, pares: 72 },
      { nombre: 'Orientación a Resultados', logrado: 88, esperado: 90, autoevaluacion: 86, jefe: 90, pares: 88 },
      { nombre: 'Ética Profesional', logrado: 94, esperado: 95, autoevaluacion: 94, jefe: 94, pares: 94 },
    ],
    objetivos: [
      { descripcion: 'Tiempo de despliegue reducido', meta: 50, logrado: 62, unidad: '%' },
      { descripcion: 'Pipelines CI/CD implementados', meta: 8, logrado: 9, unidad: 'pipelines' },
      { descripcion: 'Incidentes por despliegue', meta: 2, logrado: 1, unidad: 'incid.' },
      { descripcion: 'Uptime entornos productivos', meta: 99, logrado: 99.3, unidad: '%' },
    ],
    feedback: {
      logros: 'Automatizó el 62% de los procesos de despliegue, superando la meta. Implementó monitoreo proactivo que previno 3 incidentes mayores.',
      fortalezas: 'Gran adaptabilidad ante cambios tecnológicos. Muy proactiva en la identificación de mejoras de proceso. Excelente trabajo en equipo.',
      oportunidades: 'Desarrollar habilidades de liderazgo para guiar a otros miembros del equipo. Potenciar habilidades de presentación ante alta dirección.',
      comentariosEvaluador: 'Laura ha demostrado un crecimiento notable este periodo. Sus contribuciones en automatización han impactado positivamente toda el área. Candidata para roles de mayor responsabilidad.',
    },
  },
];

const COLABS_DATOS: Colaborador[] = [
  {
    id: 'c5',
    nombre: 'Martín Rojas',
    cargo: 'Analista de Datos Sr.',
    calificacionFinal: 93,
    logroObjetivos: 95,
    logroCompetencias: 91,
    competencias: [
      { nombre: 'Liderazgo', logrado: 85, esperado: 85, autoevaluacion: 83, jefe: 87, pares: 85 },
      { nombre: 'Trabajo en Equipo', logrado: 88, esperado: 80, autoevaluacion: 86, jefe: 90, pares: 88 },
      { nombre: 'Orientación al Cliente', logrado: 90, esperado: 85, autoevaluacion: 88, jefe: 92, pares: 90 },
      { nombre: 'Innovación', logrado: 92, esperado: 80, autoevaluacion: 90, jefe: 94, pares: 92 },
      { nombre: 'Comunicación', logrado: 87, esperado: 80, autoevaluacion: 85, jefe: 89, pares: 87 },
      { nombre: 'Resolución de Problemas', logrado: 95, esperado: 85, autoevaluacion: 93, jefe: 97, pares: 95 },
      { nombre: 'Planificación', logrado: 90, esperado: 80, autoevaluacion: 88, jefe: 92, pares: 90 },
      { nombre: 'Adaptabilidad', logrado: 88, esperado: 75, autoevaluacion: 86, jefe: 90, pares: 88 },
      { nombre: 'Gestión del Cambio', logrado: 87, esperado: 80, autoevaluacion: 85, jefe: 89, pares: 87 },
      { nombre: 'Desarrollo de Otros', logrado: 85, esperado: 75, autoevaluacion: 83, jefe: 87, pares: 85 },
      { nombre: 'Orientación a Resultados', logrado: 96, esperado: 90, autoevaluacion: 94, jefe: 98, pares: 96 },
      { nombre: 'Ética Profesional', logrado: 97, esperado: 95, autoevaluacion: 97, jefe: 97, pares: 97 },
    ],
    objetivos: [
      { descripcion: 'Modelos predictivos implementados', meta: 3, logrado: 4, unidad: 'modelos' },
      { descripcion: 'Precisión modelos producción', meta: 85, logrado: 91, unidad: '%' },
      { descripcion: 'Dashboards ejecutivos entregados', meta: 5, logrado: 6, unidad: 'dashboards' },
    ],
    feedback: {
      logros: 'Implementó 4 modelos predictivos en producción, superando la meta. Sus dashboards ejecutivos han sido adoptados por 3 gerencias.',
      fortalezas: 'Excelencia técnica en ciencia de datos. Capacidad para traducir análisis complejos en insights accionables para el negocio.',
      oportunidades: 'Documentar mejor los modelos para facilitar mantenimiento. Compartir más conocimiento con el equipo junior.',
      comentariosEvaluador: 'Martín es el mejor evaluado del equipo. Su impacto en el negocio es visible y medible. Se recomienda para liderar el área de Analytics.',
    },
  },
  {
    id: 'c6',
    nombre: 'Sofía Herrera',
    cargo: 'Analista BI',
    calificacionFinal: 79,
    logroObjetivos: 82,
    logroCompetencias: 76,
    competencias: [
      { nombre: 'Liderazgo', logrado: 65, esperado: 85, autoevaluacion: 67, jefe: 63, pares: 65 },
      { nombre: 'Trabajo en Equipo', logrado: 78, esperado: 80, autoevaluacion: 76, jefe: 80, pares: 78 },
      { nombre: 'Orientación al Cliente', logrado: 75, esperado: 85, autoevaluacion: 73, jefe: 77, pares: 75 },
      { nombre: 'Innovación', logrado: 70, esperado: 80, autoevaluacion: 68, jefe: 72, pares: 70 },
      { nombre: 'Comunicación', logrado: 72, esperado: 80, autoevaluacion: 70, jefe: 74, pares: 72 },
      { nombre: 'Resolución de Problemas', logrado: 80, esperado: 85, autoevaluacion: 78, jefe: 82, pares: 80 },
      { nombre: 'Planificación', logrado: 76, esperado: 80, autoevaluacion: 74, jefe: 78, pares: 76 },
      { nombre: 'Adaptabilidad', logrado: 74, esperado: 75, autoevaluacion: 72, jefe: 76, pares: 74 },
      { nombre: 'Gestión del Cambio', logrado: 68, esperado: 80, autoevaluacion: 66, jefe: 70, pares: 68 },
      { nombre: 'Desarrollo de Otros', logrado: 60, esperado: 75, autoevaluacion: 58, jefe: 62, pares: 60 },
      { nombre: 'Orientación a Resultados', logrado: 83, esperado: 90, autoevaluacion: 81, jefe: 85, pares: 83 },
      { nombre: 'Ética Profesional', logrado: 92, esperado: 95, autoevaluacion: 92, jefe: 92, pares: 92 },
    ],
    objetivos: [
      { descripcion: 'Reportes automatizados implementados', meta: 10, logrado: 12, unidad: 'reportes' },
      { descripcion: 'Tiempo generación reporte reducido', meta: 40, logrado: 35, unidad: '%' },
      { descripcion: 'Capacitaciones internas impartidas', meta: 2, logrado: 1, unidad: 'cap.' },
    ],
    feedback: {
      logros: 'Automatizó 12 reportes mensuales, reduciendo el trabajo manual del equipo. Contribuyó a la migración de la plataforma de BI.',
      fortalezas: 'Dominio de herramientas BI. Metódica y organizada en su trabajo. Buena disposición para aprender.',
      oportunidades: 'Desarrollar liderazgo y comunicación ejecutiva. Mejorar capacidad de priorización ante múltiples demandas. Impulsar más la innovación.',
      comentariosEvaluador: 'Sofía tiene buenas capacidades técnicas que debe complementar con habilidades blandas. Se recomienda plan de desarrollo en comunicación y liderazgo.',
    },
  },
  {
    id: 'c7',
    nombre: 'Diego Fuentes',
    cargo: 'Científico de Datos Jr.',
    calificacionFinal: 71,
    logroObjetivos: 68,
    logroCompetencias: 74,
    competencias: [
      { nombre: 'Liderazgo', logrado: 55, esperado: 85, autoevaluacion: 57, jefe: 53, pares: 55 },
      { nombre: 'Trabajo en Equipo', logrado: 75, esperado: 80, autoevaluacion: 73, jefe: 77, pares: 75 },
      { nombre: 'Orientación al Cliente', logrado: 62, esperado: 85, autoevaluacion: 60, jefe: 64, pares: 62 },
      { nombre: 'Innovación', logrado: 78, esperado: 80, autoevaluacion: 76, jefe: 80, pares: 78 },
      { nombre: 'Comunicación', logrado: 65, esperado: 80, autoevaluacion: 63, jefe: 67, pares: 65 },
      { nombre: 'Resolución de Problemas', logrado: 80, esperado: 85, autoevaluacion: 78, jefe: 82, pares: 80 },
      { nombre: 'Planificación', logrado: 68, esperado: 80, autoevaluacion: 66, jefe: 70, pares: 68 },
      { nombre: 'Adaptabilidad', logrado: 80, esperado: 75, autoevaluacion: 78, jefe: 82, pares: 80 },
      { nombre: 'Gestión del Cambio', logrado: 72, esperado: 80, autoevaluacion: 70, jefe: 74, pares: 72 },
      { nombre: 'Desarrollo de Otros', logrado: 50, esperado: 75, autoevaluacion: 48, jefe: 52, pares: 50 },
      { nombre: 'Orientación a Resultados', logrado: 72, esperado: 90, autoevaluacion: 70, jefe: 74, pares: 72 },
      { nombre: 'Ética Profesional', logrado: 88, esperado: 95, autoevaluacion: 88, jefe: 88, pares: 88 },
    ],
    objetivos: [
      { descripcion: 'Análisis exploratorios completados', meta: 8, logrado: 6, unidad: 'EDA' },
      { descripcion: 'Cursos de especialización completados', meta: 3, logrado: 2, unidad: 'cursos' },
      { descripcion: 'Modelo en producción', meta: 1, logrado: 0, unidad: 'modelos' },
    ],
    feedback: {
      logros: 'Completó 6 análisis exploratorios de calidad. Apoyó activamente al equipo senior en proyectos complejos.',
      fortalezas: 'Alta adaptabilidad y disposición al aprendizaje. Buen dominio de herramientas de análisis estadístico.',
      oportunidades: 'Debe mejorar en comunicación de resultados a stakeholders. Desarrollar mayor autonomía y liderazgo propio. Priorizar mejor las actividades comprometidas.',
      comentariosEvaluador: 'Diego es un profesional en desarrollo con buen potencial técnico. Necesita mayor acompañamiento en gestión del tiempo y comunicación. Se recomienda mentoría con Martín Rojas.',
    },
  },
];

const COLABS_VENTAS: Colaborador[] = [
  {
    id: 'c8',
    nombre: 'Valeria Castillo',
    cargo: 'Ejecutiva de Ventas Sr.',
    calificacionFinal: 94,
    logroObjetivos: 97,
    logroCompetencias: 91,
    competencias: [
      { nombre: 'Liderazgo', logrado: 88, esperado: 85, autoevaluacion: 86, jefe: 90, pares: 88 },
      { nombre: 'Trabajo en Equipo', logrado: 85, esperado: 80, autoevaluacion: 83, jefe: 87, pares: 85 },
      { nombre: 'Orientación al Cliente', logrado: 97, esperado: 85, autoevaluacion: 95, jefe: 99, pares: 97 },
      { nombre: 'Innovación', logrado: 82, esperado: 80, autoevaluacion: 80, jefe: 84, pares: 82 },
      { nombre: 'Comunicación', logrado: 95, esperado: 80, autoevaluacion: 93, jefe: 97, pares: 95 },
      { nombre: 'Resolución de Problemas', logrado: 88, esperado: 85, autoevaluacion: 86, jefe: 90, pares: 88 },
      { nombre: 'Planificación', logrado: 90, esperado: 80, autoevaluacion: 88, jefe: 92, pares: 90 },
      { nombre: 'Adaptabilidad', logrado: 87, esperado: 75, autoevaluacion: 85, jefe: 89, pares: 87 },
      { nombre: 'Gestión del Cambio', logrado: 85, esperado: 80, autoevaluacion: 83, jefe: 87, pares: 85 },
      { nombre: 'Desarrollo de Otros', logrado: 82, esperado: 75, autoevaluacion: 80, jefe: 84, pares: 82 },
      { nombre: 'Orientación a Resultados', logrado: 97, esperado: 90, autoevaluacion: 95, jefe: 99, pares: 97 },
      { nombre: 'Ética Profesional', logrado: 96, esperado: 95, autoevaluacion: 96, jefe: 96, pares: 96 },
    ],
    objetivos: [
      { descripcion: 'Meta de ventas mensual', meta: 100, logrado: 118, unidad: '%' },
      { descripcion: 'Nuevos clientes captados', meta: 10, logrado: 14, unidad: 'clientes' },
      { descripcion: 'Tasa de retención clientes', meta: 85, logrado: 92, unidad: '%' },
      { descripcion: 'NPS de cartera', meta: 70, logrado: 78, unidad: 'puntos' },
    ],
    feedback: {
      logros: 'Superó la meta de ventas en 18%. Captó 14 nuevos clientes estratégicos. Obtuvo el mayor NPS del equipo comercial.',
      fortalezas: 'Excelente orientación al cliente y capacidad de negociación. Comunicadora efectiva. Alta orientación a resultados.',
      oportunidades: 'Compartir más sus técnicas con el equipo junior. Desarrollar habilidades para gestión de cuentas de mayor complejidad.',
      comentariosEvaluador: 'Valeria es la top performer del equipo comercial. Su consistencia y resultados la posicionan como candidata natural a un rol de liderazgo en ventas.',
    },
  },
  {
    id: 'c9',
    nombre: 'Roberto Alvarado',
    cargo: 'Ejecutivo de Ventas',
    calificacionFinal: 73,
    logroObjetivos: 71,
    logroCompetencias: 75,
    competencias: [
      { nombre: 'Liderazgo', logrado: 60, esperado: 85, autoevaluacion: 62, jefe: 58, pares: 60 },
      { nombre: 'Trabajo en Equipo', logrado: 72, esperado: 80, autoevaluacion: 70, jefe: 74, pares: 72 },
      { nombre: 'Orientación al Cliente', logrado: 78, esperado: 85, autoevaluacion: 76, jefe: 80, pares: 78 },
      { nombre: 'Innovación', logrado: 65, esperado: 80, autoevaluacion: 63, jefe: 67, pares: 65 },
      { nombre: 'Comunicación', logrado: 80, esperado: 80, autoevaluacion: 78, jefe: 82, pares: 80 },
      { nombre: 'Resolución de Problemas', logrado: 75, esperado: 85, autoevaluacion: 73, jefe: 77, pares: 75 },
      { nombre: 'Planificación', logrado: 68, esperado: 80, autoevaluacion: 66, jefe: 70, pares: 68 },
      { nombre: 'Adaptabilidad', logrado: 72, esperado: 75, autoevaluacion: 70, jefe: 74, pares: 72 },
      { nombre: 'Gestión del Cambio', logrado: 65, esperado: 80, autoevaluacion: 63, jefe: 67, pares: 65 },
      { nombre: 'Desarrollo de Otros', logrado: 55, esperado: 75, autoevaluacion: 53, jefe: 57, pares: 55 },
      { nombre: 'Orientación a Resultados', logrado: 78, esperado: 90, autoevaluacion: 76, jefe: 80, pares: 78 },
      { nombre: 'Ética Profesional', logrado: 88, esperado: 95, autoevaluacion: 88, jefe: 88, pares: 88 },
    ],
    objetivos: [
      { descripcion: 'Meta de ventas mensual', meta: 100, logrado: 82, unidad: '%' },
      { descripcion: 'Nuevos clientes captados', meta: 8, logrado: 5, unidad: 'clientes' },
      { descripcion: 'Tasa de retención clientes', meta: 85, logrado: 80, unidad: '%' },
      { descripcion: 'Visitas a clientes activos', meta: 20, logrado: 16, unidad: 'visitas' },
    ],
    feedback: {
      logros: 'Mantuvo la cartera de clientes existente. Completó el programa de certificación en técnicas de venta consultiva.',
      fortalezas: 'Buena comunicación interpersonal. Conocimiento sólido del portafolio de productos. Disposición para recibir feedback.',
      oportunidades: 'Mejorar planificación de actividades comerciales. Desarrollar técnicas de prospección de nuevos clientes. Aumentar la orientación a resultados y proactividad.',
      comentariosEvaluador: 'Roberto no alcanzó sus metas este periodo. Se recomienda un plan de mejora de desempeño con seguimiento mensual y acompañamiento de Valeria Castillo.',
    },
  },
];

export const GERENCIAS: Gerencia[] = [
  {
    id: 'tec',
    nombre: 'Tecnología',
    promedio: 85,
    promedioPrevio: 81,
    competencias: [
      { nombre: 'Liderazgo', logrado: 76, esperado: 85 },
      { nombre: 'Trabajo en Equipo', logrado: 88, esperado: 80 },
      { nombre: 'Orientación al Cliente', logrado: 75, esperado: 85 },
      { nombre: 'Innovación', logrado: 82, esperado: 80 },
      { nombre: 'Comunicación', logrado: 78, esperado: 80 },
      { nombre: 'Resolución de Problemas', logrado: 89, esperado: 85 },
      { nombre: 'Planificación', logrado: 85, esperado: 80 },
      { nombre: 'Adaptabilidad', logrado: 80, esperado: 75 },
      { nombre: 'Gestión del Cambio', logrado: 74, esperado: 80 },
      { nombre: 'Desarrollo de Otros', logrado: 72, esperado: 75 },
      { nombre: 'Orientación a Resultados', logrado: 87, esperado: 90 },
      { nombre: 'Ética Profesional', logrado: 94, esperado: 95 },
    ],
    jefaturas: [
      {
        id: 'j1',
        nombre: 'Equipo Redes e Infraestructura',
        jefe: 'Rodrigo Paz',
        nColaboradores: 4,
        promedio: 85,
        estado: 'Completado',
        colaboradores: COLABS_REDES,
      },
      {
        id: 'j2',
        nombre: 'Equipo Data & Analytics',
        jefe: 'Isabel Campos',
        nColaboradores: 3,
        promedio: 81,
        estado: 'Completado',
        colaboradores: COLABS_DATOS,
      },
    ],
  },
  {
    id: 'com',
    nombre: 'Comercial',
    promedio: 88,
    promedioPrevio: 83,
    competencias: [
      { nombre: 'Liderazgo', logrado: 80, esperado: 85 },
      { nombre: 'Trabajo en Equipo', logrado: 82, esperado: 80 },
      { nombre: 'Orientación al Cliente', logrado: 93, esperado: 85 },
      { nombre: 'Innovación', logrado: 75, esperado: 80 },
      { nombre: 'Comunicación', logrado: 90, esperado: 80 },
      { nombre: 'Resolución de Problemas', logrado: 82, esperado: 85 },
      { nombre: 'Planificación', logrado: 83, esperado: 80 },
      { nombre: 'Adaptabilidad', logrado: 80, esperado: 75 },
      { nombre: 'Gestión del Cambio', logrado: 78, esperado: 80 },
      { nombre: 'Desarrollo de Otros', logrado: 72, esperado: 75 },
      { nombre: 'Orientación a Resultados', logrado: 92, esperado: 90 },
      { nombre: 'Ética Profesional', logrado: 95, esperado: 95 },
    ],
    jefaturas: [
      {
        id: 'j3',
        nombre: 'Equipo Ventas Zona Norte',
        jefe: 'Patricia Mora',
        nColaboradores: 2,
        promedio: 83,
        estado: 'Completado',
        colaboradores: COLABS_VENTAS,
      },
    ],
  },
  {
    id: 'fin',
    nombre: 'Finanzas',
    promedio: 79,
    promedioPrevio: 77,
    competencias: [
      { nombre: 'Liderazgo', logrado: 72, esperado: 85 },
      { nombre: 'Trabajo en Equipo', logrado: 78, esperado: 80 },
      { nombre: 'Orientación al Cliente', logrado: 68, esperado: 85 },
      { nombre: 'Innovación', logrado: 60, esperado: 80 },
      { nombre: 'Comunicación', logrado: 75, esperado: 80 },
      { nombre: 'Resolución de Problemas', logrado: 82, esperado: 85 },
      { nombre: 'Planificación', logrado: 88, esperado: 80 },
      { nombre: 'Adaptabilidad', logrado: 65, esperado: 75 },
      { nombre: 'Gestión del Cambio', logrado: 58, esperado: 80 },
      { nombre: 'Desarrollo de Otros', logrado: 64, esperado: 75 },
      { nombre: 'Orientación a Resultados', logrado: 85, esperado: 90 },
      { nombre: 'Ética Profesional', logrado: 96, esperado: 95 },
    ],
    jefaturas: [
      {
        id: 'j4',
        nombre: 'Equipo Contabilidad',
        jefe: 'Fernando Lagos',
        nColaboradores: 5,
        promedio: 79,
        estado: 'En Progreso',
        colaboradores: [],
      },
    ],
  },
  {
    id: 'ops',
    nombre: 'Operaciones',
    promedio: 72,
    promedioPrevio: 71,
    competencias: [
      { nombre: 'Liderazgo', logrado: 70, esperado: 85 },
      { nombre: 'Trabajo en Equipo', logrado: 75, esperado: 80 },
      { nombre: 'Orientación al Cliente', logrado: 68, esperado: 85 },
      { nombre: 'Innovación', logrado: 55, esperado: 80 },
      { nombre: 'Comunicación', logrado: 70, esperado: 80 },
      { nombre: 'Resolución de Problemas', logrado: 72, esperado: 85 },
      { nombre: 'Planificación', logrado: 75, esperado: 80 },
      { nombre: 'Adaptabilidad', logrado: 68, esperado: 75 },
      { nombre: 'Gestión del Cambio', logrado: 55, esperado: 80 },
      { nombre: 'Desarrollo de Otros', logrado: 60, esperado: 75 },
      { nombre: 'Orientación a Resultados', logrado: 78, esperado: 90 },
      { nombre: 'Ética Profesional', logrado: 90, esperado: 95 },
    ],
    jefaturas: [
      {
        id: 'j5',
        nombre: 'Equipo Logística',
        jefe: 'Claudio Bravo',
        nColaboradores: 8,
        promedio: 70,
        estado: 'En Progreso',
        colaboradores: [],
      },
      {
        id: 'j6',
        nombre: 'Equipo Procesos',
        jefe: 'Natalia Ríos',
        nColaboradores: 6,
        promedio: 74,
        estado: 'Completado',
        colaboradores: [],
      },
    ],
  },
  {
    id: 'rrhh',
    nombre: 'RRHH',
    promedio: 83,
    promedioPrevio: 80,
    competencias: [
      { nombre: 'Liderazgo', logrado: 82, esperado: 85 },
      { nombre: 'Trabajo en Equipo', logrado: 88, esperado: 80 },
      { nombre: 'Orientación al Cliente', logrado: 85, esperado: 85 },
      { nombre: 'Innovación', logrado: 72, esperado: 80 },
      { nombre: 'Comunicación', logrado: 88, esperado: 80 },
      { nombre: 'Resolución de Problemas', logrado: 80, esperado: 85 },
      { nombre: 'Planificación', logrado: 82, esperado: 80 },
      { nombre: 'Adaptabilidad', logrado: 78, esperado: 75 },
      { nombre: 'Gestión del Cambio', logrado: 75, esperado: 80 },
      { nombre: 'Desarrollo de Otros', logrado: 85, esperado: 75 },
      { nombre: 'Orientación a Resultados', logrado: 82, esperado: 90 },
      { nombre: 'Ética Profesional', logrado: 95, esperado: 95 },
    ],
    jefaturas: [
      {
        id: 'j7',
        nombre: 'Equipo Selección y Talento',
        jefe: 'Marcela Vidal',
        nColaboradores: 4,
        promedio: 83,
        estado: 'Completado',
        colaboradores: [],
      },
    ],
  },
];

export function getTop5Gaps(
  competencias: { nombre: string; logrado: number; esperado: number }[]
): string[] {
  return [...competencias]
    .sort((a, b) => (b.esperado - b.logrado) - (a.esperado - a.logrado))
    .slice(0, 5)
    .map(c => c.nombre);
}

export function getGerenciaById(id: string): Gerencia | undefined {
  return GERENCIAS.find(g => g.id === id);
}

export function getJefaturaById(id: string): { jefatura: Jefatura; gerencia: Gerencia } | undefined {
  for (const g of GERENCIAS) {
    const j = g.jefaturas.find(j => j.id === id);
    if (j) return { jefatura: j, gerencia: g };
  }
  return undefined;
}

export function getColaboradorById(id: string): Colaborador | undefined {
  for (const g of GERENCIAS) {
    for (const j of g.jefaturas) {
      const c = j.colaboradores.find(c => c.id === id);
      if (c) return c;
    }
  }
  return undefined;
}

// ─── Tipos para nuevas vistas de ámbitos ──────────────────────────────────

export interface AmbitoData {
  label: string;
  logrado: number;
  esperado: number;
  peso: number; // ponderación %
}

export interface DireccionData {
  direccion: string;
  competencias: number;
  objetivos: number;
}

// ─── Nivel empresa ────────────────────────────────────────────────────────

export const OBJETIVOS_EMPRESA: { nombre: string; logrado: number; esperado: number }[] = [
  { nombre: 'Facturación vs. Presupuesto', logrado: 87, esperado: 100 },
  { nombre: 'NPS Clientes', logrado: 74, esperado: 80 },
  { nombre: 'Reducción de Costos', logrado: 68, esperado: 75 },
  { nombre: 'Productividad por Colaborador', logrado: 80, esperado: 85 },
  { nombre: 'Captación Nuevos Clientes', logrado: 72, esperado: 90 },
  { nombre: 'Retención de Talentos', logrado: 88, esperado: 85 },
  { nombre: 'Plazo de Entrega de Proyectos', logrado: 76, esperado: 80 },
  { nombre: 'Satisfacción Interna', logrado: 82, esperado: 85 },
];

export const AMBITOS_EMPRESA: AmbitoData[] = [
  { label: 'Competencias', logrado: 78, esperado: 80, peso: 60 },
  { label: 'Objetivos', logrado: 85, esperado: 90, peso: 30 },
  { label: 'Asistencia', logrado: 93, esperado: 95, peso: 10 },
];

export const DIRECCIONES_EMPRESA: DireccionData[] = [
  { direccion: 'Descendente', competencias: 79, objetivos: 84 },
  { direccion: 'Autoevaluación', competencias: 82, objetivos: 88 },
  { direccion: 'Pares', competencias: 76, objetivos: 83 },
  { direccion: 'Ascendente', competencias: 74, objetivos: 81 },
];

// ─── Nivel gerencia (lookup por id) ──────────────────────────────────────

export const GERENCIA_OBJETIVOS: Record<string, { nombre: string; logrado: number; esperado: number }[]> = {
  tec: [
    { nombre: 'Disponibilidad de Sistemas', logrado: 99, esperado: 99 },
    { nombre: 'Resolución de Incidentes', logrado: 80, esperado: 85 },
    { nombre: 'Proyectos en Plazo', logrado: 75, esperado: 85 },
    { nombre: 'Testing Automatizado', logrado: 82, esperado: 80 },
    { nombre: 'Reducción Deuda Técnica', logrado: 65, esperado: 75 },
    { nombre: 'Satisfacción Usuarios', logrado: 88, esperado: 90 },
  ],
  com: [
    { nombre: 'Meta de Ventas', logrado: 92, esperado: 100 },
    { nombre: 'Nuevos Clientes', logrado: 88, esperado: 90 },
    { nombre: 'Retención de Clientes', logrado: 91, esperado: 90 },
    { nombre: 'NPS de Cartera', logrado: 78, esperado: 75 },
    { nombre: 'Tiempo de Cierre', logrado: 82, esperado: 85 },
    { nombre: 'Cuota de Mercado', logrado: 70, esperado: 80 },
  ],
  fin: [
    { nombre: 'Cierre Contable en Plazo', logrado: 96, esperado: 95 },
    { nombre: 'Reducción de Costos Op.', logrado: 68, esperado: 80 },
    { nombre: 'Precisión de Proyecciones', logrado: 79, esperado: 85 },
    { nombre: 'Auditorías sin Observ.', logrado: 88, esperado: 90 },
    { nombre: 'Cobranza al Día', logrado: 74, esperado: 80 },
    { nombre: 'Optimización de Procesos', logrado: 62, esperado: 75 },
  ],
  ops: [
    { nombre: 'Cumplimiento de Entregas', logrado: 75, esperado: 85 },
    { nombre: 'Reducción de Mermas', logrado: 62, esperado: 75 },
    { nombre: 'Tiempos de Proceso', logrado: 70, esperado: 80 },
    { nombre: 'Satisfacción Interna', logrado: 68, esperado: 75 },
    { nombre: 'Cero Accidentes', logrado: 85, esperado: 90 },
    { nombre: 'Eficiencia de Recursos', logrado: 65, esperado: 78 },
  ],
  rrhh: [
    { nombre: 'Reducción de Rotación', logrado: 82, esperado: 80 },
    { nombre: 'Tiempo de Selección', logrado: 78, esperado: 75 },
    { nombre: 'Satisfacción de Empleados', logrado: 85, esperado: 85 },
    { nombre: 'Cobertura Capacitaciones', logrado: 90, esperado: 90 },
    { nombre: 'Implementación Procesos HR', logrado: 76, esperado: 80 },
    { nombre: 'NPS Interno', logrado: 83, esperado: 80 },
  ],
};

export const GERENCIA_AMBITOS: Record<string, AmbitoData[]> = {
  tec: [
    { label: 'Competencias', logrado: 80, esperado: 82, peso: 60 },
    { label: 'Objetivos', logrado: 88, esperado: 90, peso: 30 },
    { label: 'Asistencia', logrado: 95, esperado: 95, peso: 10 },
  ],
  com: [
    { label: 'Competencias', logrado: 84, esperado: 85, peso: 50 },
    { label: 'Objetivos', logrado: 92, esperado: 95, peso: 40 },
    { label: 'Asistencia', logrado: 97, esperado: 95, peso: 10 },
  ],
  fin: [
    { label: 'Competencias', logrado: 72, esperado: 80, peso: 60 },
    { label: 'Objetivos', logrado: 78, esperado: 85, peso: 30 },
    { label: 'Asistencia', logrado: 90, esperado: 95, peso: 10 },
  ],
  ops: [
    { label: 'Competencias', logrado: 68, esperado: 80, peso: 60 },
    { label: 'Objetivos', logrado: 72, esperado: 85, peso: 30 },
    { label: 'Asistencia', logrado: 88, esperado: 95, peso: 10 },
  ],
  rrhh: [
    { label: 'Competencias', logrado: 82, esperado: 83, peso: 60 },
    { label: 'Objetivos', logrado: 83, esperado: 85, peso: 30 },
    { label: 'Asistencia', logrado: 96, esperado: 95, peso: 10 },
  ],
};

export const GERENCIA_DIRECCIONES: Record<string, DireccionData[]> = {
  tec: [
    { direccion: 'Descendente', competencias: 81, objetivos: 89 },
    { direccion: 'Autoevaluación', competencias: 83, objetivos: 91 },
    { direccion: 'Pares', competencias: 80, objetivos: 87 },
    { direccion: 'Ascendente', competencias: 77, objetivos: 85 },
  ],
  com: [
    { direccion: 'Descendente', competencias: 85, objetivos: 93 },
    { direccion: 'Autoevaluación', competencias: 86, objetivos: 95 },
    { direccion: 'Pares', competencias: 83, objetivos: 91 },
    { direccion: 'Ascendente', competencias: 80, objetivos: 88 },
  ],
  fin: [
    { direccion: 'Descendente', competencias: 73, objetivos: 79 },
    { direccion: 'Autoevaluación', competencias: 78, objetivos: 84 },
    { direccion: 'Pares', competencias: 70, objetivos: 76 },
    { direccion: 'Ascendente', competencias: 68, objetivos: 74 },
  ],
  ops: [
    { direccion: 'Descendente', competencias: 70, objetivos: 73 },
    { direccion: 'Autoevaluación', competencias: 74, objetivos: 78 },
    { direccion: 'Pares', competencias: 66, objetivos: 70 },
    { direccion: 'Ascendente', competencias: 63, objetivos: 67 },
  ],
  rrhh: [
    { direccion: 'Descendente', competencias: 83, objetivos: 84 },
    { direccion: 'Autoevaluación', competencias: 85, objetivos: 86 },
    { direccion: 'Pares', competencias: 82, objetivos: 82 },
    { direccion: 'Ascendente', competencias: 79, objetivos: 80 },
  ],
};

// ─── Nivel jefatura (lookup por id) ──────────────────────────────────────

export const JEFATURA_OBJETIVOS_RADAR: Record<string, { nombre: string; logrado: number; esperado: number }[]> = {
  j1: [
    { nombre: 'Disponibilidad de Red', logrado: 100, esperado: 99 },
    { nombre: 'Resolución Incidentes', logrado: 80, esperado: 85 },
    { nombre: 'Certificaciones Técnicas', logrado: 88, esperado: 80 },
    { nombre: 'Reducción Tickets Escal.', logrado: 92, esperado: 80 },
  ],
  j2: [
    { nombre: 'Modelos Predictivos', logrado: 94, esperado: 90 },
    { nombre: 'Dashboards Entregados', logrado: 88, esperado: 85 },
    { nombre: 'Precisión de Modelos', logrado: 84, esperado: 85 },
    { nombre: 'Automatización Reportes', logrado: 78, esperado: 90 },
    { nombre: 'EDA Completados', logrado: 72, esperado: 80 },
  ],
  j3: [
    { nombre: 'Meta de Ventas', logrado: 90, esperado: 100 },
    { nombre: 'Nuevos Clientes', logrado: 86, esperado: 90 },
    { nombre: 'Retención de Clientes', logrado: 88, esperado: 85 },
    { nombre: 'NPS de Cartera', logrado: 82, esperado: 70 },
    { nombre: 'Visitas a Clientes', logrado: 76, esperado: 85 },
  ],
};

export const JEFATURA_OBJETIVOS_EQUIPO: Record<string, { nombre: string; logrado: number; meta: number; unidad: string }[]> = {
  j1: [
    { nombre: 'Disponibilidad de red', logrado: 99.8, meta: 99.5, unidad: '%' },
    { nombre: 'Tiempo resolución incidentes (prom.)', logrado: 3.2, meta: 4, unidad: 'hrs' },
    { nombre: 'Certificaciones técnicas completadas', logrado: 7, meta: 8, unidad: 'cert.' },
    { nombre: 'Reducción tickets escalados', logrado: 28, meta: 20, unidad: '%' },
  ],
  j2: [
    { nombre: 'Modelos predictivos implementados', logrado: 4, meta: 3, unidad: 'modelos' },
    { nombre: 'Precisión promedio modelos', logrado: 84, meta: 85, unidad: '%' },
    { nombre: 'Dashboards ejecutivos entregados', logrado: 9, meta: 8, unidad: 'dash.' },
    { nombre: 'Análisis exploratorios completados', logrado: 6, meta: 8, unidad: 'EDA' },
    { nombre: 'Reportes automatizados', logrado: 12, meta: 10, unidad: 'reportes' },
  ],
  j3: [
    { nombre: 'Meta de ventas mensual (prom.)', logrado: 100, meta: 100, unidad: '%' },
    { nombre: 'Nuevos clientes captados', logrado: 19, meta: 18, unidad: 'clientes' },
    { nombre: 'Tasa de retención clientes', logrado: 86, meta: 85, unidad: '%' },
    { nombre: 'NPS de cartera', logrado: 74, meta: 70, unidad: 'puntos' },
    { nombre: 'Visitas a clientes activos', logrado: 36, meta: 40, unidad: 'visitas' },
  ],
};

// ─── Resultados Históricos ────────────────────────────────────────────────

export interface ProcesoHistorico {
  id: string;
  nombre: string;
  label: string;
  empresaId: string;
  fechaInicio: string;
  fechaTermino: string;
  plantilla: '90°' | '180°' | '360°' | 'Por objetivos' | 'Personalizada';
  estado: 'Finalizada' | 'Activa' | 'Borrador';
  nEvaluados: number;
  orden: number;
  ambitos: ('competencias' | 'objetivos' | 'externas')[];
}

export const PROCESOS_HISTORICOS: ProcesoHistorico[] = [
  {
    id: 'proc-2023', nombre: 'Evaluación Desempeño 2023', label: 'Eval. 2023',
    empresaId: 'all', fechaInicio: '01/03/2023', fechaTermino: '30/04/2023',
    plantilla: '180°', estado: 'Finalizada', nEvaluados: 132, orden: 1,
    ambitos: ['competencias', 'objetivos'],
  },
  {
    id: 'proc-2024', nombre: 'Evaluación 360° 2024', label: 'Eval. 360° 24',
    empresaId: 'all', fechaInicio: '01/03/2024', fechaTermino: '30/04/2024',
    plantilla: '360°', estado: 'Finalizada', nEvaluados: 140, orden: 2,
    ambitos: ['competencias', 'objetivos'],
  },
  {
    id: 'proc-2025', nombre: 'Evaluación Desempeño 2025', label: 'Eval. 2025',
    empresaId: 'all', fechaInicio: '01/03/2025', fechaTermino: '30/04/2025',
    plantilla: '180°', estado: 'Finalizada', nEvaluados: 148, orden: 3,
    ambitos: ['competencias', 'objetivos', 'externas'],
  },
  {
    id: 'proc-q1-2026', nombre: 'Evaluación Objetivos Q1 2026', label: 'Obj. Q1 2026',
    empresaId: 'all', fechaInicio: '01/01/2026', fechaTermino: '28/02/2026',
    plantilla: 'Por objetivos', estado: 'Finalizada', nEvaluados: 145, orden: 4,
    ambitos: ['objetivos'],
  },
  {
    id: 'proc-2026', nombre: 'Evaluación Desempeño 2026', label: 'Eval. 2026',
    empresaId: 'all', fechaInicio: '01/06/2026', fechaTermino: '31/07/2026',
    plantilla: '360°', estado: 'Activa', nEvaluados: 0, orden: 5,
    ambitos: ['competencias', 'objetivos'],
  },
];

export interface ResultadoProceso {
  calificacion: number;
  competencias: number | null;
  objetivos: number | null;
  nEvaluados: number;
}

export const EMPRESA_RESULTADOS_HISTORICOS: Record<string, ResultadoProceso> = {
  'proc-2023':   { calificacion: 74, competencias: 72, objetivos: 76, nEvaluados: 132 },
  'proc-2024':   { calificacion: 79, competencias: 80, objetivos: 80, nEvaluados: 140 },
  'proc-2025':   { calificacion: 82, competencias: 78, objetivos: 85, nEvaluados: 148 },
  'proc-q1-2026':{ calificacion: 80, competencias: null, objetivos: 87, nEvaluados: 145 },
};

export const GERENCIA_RESULTADOS_HISTORICOS: Record<string, Record<string, ResultadoProceso>> = {
  tec: {
    'proc-2023':   { calificacion: 78, competencias: 76, objetivos: 80, nEvaluados: 18 },
    'proc-2024':   { calificacion: 81, competencias: 79, objetivos: 84, nEvaluados: 20 },
    'proc-2025':   { calificacion: 85, competencias: 80, objetivos: 88, nEvaluados: 22 },
    'proc-q1-2026':{ calificacion: 83, competencias: null, objetivos: 90, nEvaluados: 22 },
  },
  com: {
    'proc-2023':   { calificacion: 82, competencias: 79, objetivos: 86, nEvaluados: 12 },
    'proc-2024':   { calificacion: 85, competencias: 82, objetivos: 89, nEvaluados: 14 },
    'proc-2025':   { calificacion: 88, competencias: 84, objetivos: 92, nEvaluados: 15 },
    'proc-q1-2026':{ calificacion: 86, competencias: null, objetivos: 94, nEvaluados: 15 },
  },
  fin: {
    'proc-2023':   { calificacion: 72, competencias: 68, objetivos: 76, nEvaluados: 22 },
    'proc-2024':   { calificacion: 75, competencias: 70, objetivos: 79, nEvaluados: 24 },
    'proc-2025':   { calificacion: 79, competencias: 72, objetivos: 78, nEvaluados: 25 },
    'proc-q1-2026':{ calificacion: 77, competencias: null, objetivos: 81, nEvaluados: 25 },
  },
  ops: {
    'proc-2023':   { calificacion: 68, competencias: 65, objetivos: 72, nEvaluados: 48 },
    'proc-2024':   { calificacion: 70, competencias: 67, objetivos: 74, nEvaluados: 50 },
    'proc-2025':   { calificacion: 72, competencias: 68, objetivos: 77, nEvaluados: 52 },
    'proc-q1-2026':{ calificacion: 70, competencias: null, objetivos: 79, nEvaluados: 52 },
  },
  rrhh: {
    'proc-2023':   { calificacion: 78, competencias: 76, objetivos: 80, nEvaluados: 14 },
    'proc-2024':   { calificacion: 81, competencias: 79, objetivos: 83, nEvaluados: 15 },
    'proc-2025':   { calificacion: 83, competencias: 82, objetivos: 83, nEvaluados: 16 },
    'proc-q1-2026':{ calificacion: 81, competencias: null, objetivos: 85, nEvaluados: 16 },
  },
};

export const JEFATURA_RESULTADOS_HISTORICOS: Record<string, Record<string, ResultadoProceso>> = {
  j1: {
    'proc-2023':   { calificacion: 81, competencias: 78, objetivos: 84, nEvaluados: 4 },
    'proc-2024':   { calificacion: 83, competencias: 80, objetivos: 87, nEvaluados: 4 },
    'proc-2025':   { calificacion: 85, competencias: 82, objetivos: 90, nEvaluados: 4 },
    'proc-q1-2026':{ calificacion: 84, competencias: null, objetivos: 91, nEvaluados: 4 },
  },
  j2: {
    'proc-2023':   { calificacion: 74, competencias: 71, objetivos: 77, nEvaluados: 3 },
    'proc-2024':   { calificacion: 77, competencias: 74, objetivos: 80, nEvaluados: 3 },
    'proc-2025':   { calificacion: 81, competencias: 77, objetivos: 85, nEvaluados: 3 },
    'proc-q1-2026':{ calificacion: 80, competencias: null, objetivos: 88, nEvaluados: 3 },
  },
  j3: {
    'proc-2023':   { calificacion: 76, competencias: 74, objetivos: 78, nEvaluados: 2 },
    'proc-2024':   { calificacion: 80, competencias: 77, objetivos: 83, nEvaluados: 2 },
    'proc-2025':   { calificacion: 83, competencias: 80, objetivos: 86, nEvaluados: 2 },
    'proc-q1-2026':{ calificacion: 82, competencias: null, objetivos: 89, nEvaluados: 2 },
  },
};

export const COLABORADOR_RESULTADOS_HISTORICOS: Record<string, {
  procesoId: string; calificacion: number; logroObj: number; logroComp: number;
}[]> = {
  c1: [ // Pedro Soto — mejora constante
    { procesoId: 'proc-2023',    calificacion: 80, logroObj: 82, logroComp: 78 },
    { procesoId: 'proc-2024',    calificacion: 84, logroObj: 87, logroComp: 81 },
    { procesoId: 'proc-2025',    calificacion: 88, logroObj: 90, logroComp: 86 },
    { procesoId: 'proc-q1-2026', calificacion: 85, logroObj: 91, logroComp: 79 },
  ],
  c2: [ // Ana Torres — alto y en alza
    { procesoId: 'proc-2023',    calificacion: 85, logroObj: 88, logroComp: 82 },
    { procesoId: 'proc-2024',    calificacion: 88, logroObj: 92, logroComp: 85 },
    { procesoId: 'proc-2025',    calificacion: 91, logroObj: 94, logroComp: 88 },
    { procesoId: 'proc-q1-2026', calificacion: 89, logroObj: 95, logroComp: 83 },
  ],
  c3: [ // Carlos Méndez — declive
    { procesoId: 'proc-2023',    calificacion: 80, logroObj: 78, logroComp: 82 },
    { procesoId: 'proc-2024',    calificacion: 78, logroObj: 75, logroComp: 81 },
    { procesoId: 'proc-2025',    calificacion: 76, logroObj: 72, logroComp: 80 },
    { procesoId: 'proc-q1-2026', calificacion: 74, logroObj: 70, logroComp: 78 },
  ],
  c4: [ // Laura Vega — mejora sostenida
    { procesoId: 'proc-2023',    calificacion: 78, logroObj: 80, logroComp: 76 },
    { procesoId: 'proc-2024',    calificacion: 82, logroObj: 85, logroComp: 79 },
    { procesoId: 'proc-2025',    calificacion: 85, logroObj: 88, logroComp: 82 },
    { procesoId: 'proc-q1-2026', calificacion: 84, logroObj: 90, logroComp: 78 },
  ],
  c5: [ // Martín Rojas — top performer constante
    { procesoId: 'proc-2023',    calificacion: 87, logroObj: 90, logroComp: 84 },
    { procesoId: 'proc-2024',    calificacion: 90, logroObj: 93, logroComp: 87 },
    { procesoId: 'proc-2025',    calificacion: 93, logroObj: 95, logroComp: 91 },
    { procesoId: 'proc-q1-2026', calificacion: 92, logroObj: 96, logroComp: 88 },
  ],
  c6: [ // Sofía Herrera — mejora progresiva
    { procesoId: 'proc-2023',    calificacion: 72, logroObj: 74, logroComp: 70 },
    { procesoId: 'proc-2024',    calificacion: 75, logroObj: 78, logroComp: 72 },
    { procesoId: 'proc-2025',    calificacion: 79, logroObj: 82, logroComp: 76 },
    { procesoId: 'proc-q1-2026', calificacion: 78, logroObj: 83, logroComp: 73 },
  ],
  c7: [ // Diego Fuentes — mejora lenta desde bajo
    { procesoId: 'proc-2023',    calificacion: 65, logroObj: 62, logroComp: 68 },
    { procesoId: 'proc-2024',    calificacion: 68, logroObj: 65, logroComp: 71 },
    { procesoId: 'proc-2025',    calificacion: 71, logroObj: 68, logroComp: 74 },
    { procesoId: 'proc-q1-2026', calificacion: 70, logroObj: 69, logroComp: 71 },
  ],
  c8: [ // Valeria Castillo — top performer en alza
    { procesoId: 'proc-2023',    calificacion: 88, logroObj: 92, logroComp: 84 },
    { procesoId: 'proc-2024',    calificacion: 91, logroObj: 95, logroComp: 87 },
    { procesoId: 'proc-2025',    calificacion: 94, logroObj: 97, logroComp: 91 },
    { procesoId: 'proc-q1-2026', calificacion: 93, logroObj: 98, logroComp: 88 },
  ],
  c9: [ // Roberto Alvarado — declive
    { procesoId: 'proc-2023',    calificacion: 77, logroObj: 76, logroComp: 78 },
    { procesoId: 'proc-2024',    calificacion: 75, logroObj: 73, logroComp: 77 },
    { procesoId: 'proc-2025',    calificacion: 73, logroObj: 71, logroComp: 75 },
    { procesoId: 'proc-q1-2026', calificacion: 71, logroObj: 70, logroComp: 72 },
  ],
};
