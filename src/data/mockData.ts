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

export const EMPRESA_KPIS = {
  calificacionFinal: 82,
  calificacionFinalPrevio: 79,
  cumplimientoCompetencias: 78,
  cumplimientoCompetenciasPrevio: 80,
  cumplimientoObjetivos: 85,
  cumplimientoObjetivosPrevio: 80,
};

export const HISTORIAL_EMPRESA: HistorialPeriodo[] = [
  { periodo: 'Proc. 2023', calificacion: 74, competencias: 72, objetivos: 76 },
  { periodo: 'Proc. 2024', calificacion: 79, competencias: 80, objetivos: 80 },
  { periodo: 'Proc. 2025', calificacion: 82, competencias: 78, objetivos: 85 },
];

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
