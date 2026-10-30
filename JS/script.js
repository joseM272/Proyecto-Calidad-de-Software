document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav__menu a");
  const navDropdowns = document.querySelectorAll(".nav__dropdown");
  const sections = document.querySelectorAll("main section[id], article[id]");

  navDropdowns.forEach((dropdown) => {
    dropdown.addEventListener("toggle", () => {
      if (!dropdown.open) return;

      navDropdowns.forEach((otherDropdown) => {
        if (otherDropdown !== dropdown) otherDropdown.open = false;
      });
    });
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navDropdowns.forEach((dropdown) => {
        dropdown.open = false;
      });
    });
  });

  const setActiveNav = () => {
    let currentId = "inicio";

    sections.forEach((section) => {
      const top = section.offsetTop - 150;
      const bottom = top + section.offsetHeight;

      if (window.scrollY >= top && window.scrollY < bottom) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${currentId}`;
      link.classList.toggle("is-active", isActive);
    });
  };

  setActiveNav();
  window.addEventListener("scroll", setActiveNav, { passive: true });

  const cards = document.querySelectorAll(".feature-card");
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 90}ms`;
  });

  document.querySelectorAll("[data-accordion]").forEach((accordion) => {
    const triggers = accordion.querySelectorAll(".quality-accordion__trigger");

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const panel = document.getElementById(trigger.getAttribute("aria-controls"));
        const willOpen = trigger.getAttribute("aria-expanded") !== "true";

        triggers.forEach((otherTrigger) => {
          const otherPanel = document.getElementById(otherTrigger.getAttribute("aria-controls"));
          const isCurrent = otherTrigger === trigger;
          const isOpen = isCurrent && willOpen;

          otherTrigger.setAttribute("aria-expanded", String(isOpen));
          otherPanel.classList.toggle("is-open", isOpen);
          otherPanel.inert = !isOpen;
          otherPanel.closest(".quality-accordion__item").classList.toggle("is-open", isOpen);
        });
      });
    });
  });

  document.querySelectorAll(".quality-traits__grid").forEach((grid) => {
    grid.querySelectorAll(".quality-trait__trigger").forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const panel = document.getElementById(trigger.getAttribute("aria-controls"));
        const isOpen = trigger.getAttribute("aria-expanded") !== "true";

        trigger.setAttribute("aria-expanded", String(isOpen));
        panel.classList.toggle("is-open", isOpen);
        panel.inert = !isOpen;
        panel.closest(".quality-trait").classList.toggle("is-open", isOpen);
      });
    });
  });

  // =========================================================================
  // US-18: Comparador Interactivo de Metodologías Ágiles
  // =========================================================================
  const comparatorOutput = document.getElementById("comparator-output");

  if (comparatorOutput) {
    const METHODOLOGIES_DATA = {
      scrum: {
        id: "scrum",
        name: "Scrum",
        badge: "Ciclos e Incrementos",
        subtitle: "Gestión iterativa por Sprints",
        headerClass: "col-scrum",
        characteristics: {
          philosophy: "Desarrollo empírico, iterativo e incremental basado en 3 pilares: transparencia, inspección y adaptación continua.",
          cadence: "Sprints regulares de duración fija (1 a 4 semanas) con un incremento de producto potencialmente entregable al final de cada ciclo.",
          roles: "Product Owner (voz del negocio y maximización de valor), Scrum Master (coach y facilitador ágil) y Equipo de Desarrollo multidisciplinario autoorganizado.",
          changeManagement: "El alcance se fija durante el Sprint activo; nuevos requerimientos o ajustes de prioridad se incorporan en el Product Backlog para el siguiente Sprint.",
          qualityContribution: "Aseguramiento mediante Definición de Terminado (DoD) estricta, revisiones periódicas con stakeholders (Sprint Review) y retrospectivas sistemáticas de mejora continua.",
          technicalPractices: "Definición de Terminado (DoD), sincronización diaria (Daily Scrum), refinamiento continuo del backlog y pruebas de aceptación integradas.",
          metrics: "Velocidad del equipo (Story Points por Sprint), gráficos Burndown / Burnup y porcentaje de cumplimiento del objetivo del Sprint.",
          artifacts: "Product Backlog, Sprint Backlog e Incremento de Producto terminado.",
          bestFor: "Proyectos complejos con requisitos cambiantes o evolutivos donde la retroalimentación frecuente de clientes y usuarios sea crucial."
        }
      },
      kanban: {
        id: "kanban",
        name: "Kanban",
        badge: "Flujo Continuo",
        subtitle: "Visualización y límites WIP",
        headerClass: "col-kanban",
        characteristics: {
          philosophy: "Mejora continua incremental y evolutiva (Kaizen) enfocada en maximizar el flujo de valor entregado y minimizar cuellos de botella.",
          cadence: "Flujo continuo sin iteraciones temporales rígidas obligatorias; entregas bajo demanda tan pronto como una funcionalidad esté lista.",
          roles: "No prescribe roles formales predeterminados; respeta la estructura actual del equipo y promueve el liderazgo en todos los niveles.",
          changeManagement: "Máxima agilidad y flexibilidad en tiempo real: los cambios pueden ingresar al flujo en cualquier instante mientras se respeten los límites de WIP.",
          qualityContribution: "La limitación rigurosa del Trabajo en Curso (WIP) hace visibles los defectos y bloqueos inmediatamente, evitando la acumulación silenciosa de errores.",
          technicalPractices: "Visualización en tablero Kanban, limitación estricta de WIP por columna, gestión activa del flujo y definición de políticas explícitas.",
          metrics: "Lead Time (tiempo total desde petición a entrega), Cycle Time (tiempo activo de desarrollo), Throughput (tasa de entrega) y Diagrama de Flujo Acumulado (CFD).",
          artifacts: "Tablero Kanban (columnas Por Hacer, En Proceso, Pruebas, Hecho), tarjetas de trabajo (Kanban cards) y políticas explícitas.",
          bestFor: "Equipos de soporte, mantenimiento de software, operaciones o desarrollo con flujo constante de requerimientos dinámicos y prioridades variables."
        }
      },
      xp: {
        id: "xp",
        name: "Extreme Programming (XP)",
        badge: "Ingeniería y Pruebas",
        subtitle: "Excelencia técnica y TDD",
        headerClass: "col-xp",
        characteristics: {
          philosophy: "Llevar las mejores prácticas de ingeniería de software al nivel más alto posible para producir código de máxima calidad ante requerimientos volátiles.",
          cadence: "Iteraciones muy breves (1 a 2 semanas) orientadas a lanzamientos pequeños (small releases) y despliegues muy frecuentes.",
          roles: "Desarrolladores, QA / Testers, Coach XP, Tracker (rastreador de métricas) y Cliente integrado en el equipo (On-site Customer) para validar decisiones diarias.",
          changeManagement: "Abraza el cambio con naturalidad: gracias a la cobertura exhaustiva de pruebas automáticas y el diseño simple, modificar el código no produce regresiones.",
          qualityContribution: "Prevención radical de defectos a través del desarrollo guiado por pruebas (TDD), revisión continua en programación en parejas y suites automatizadas de regresión.",
          technicalPractices: "Test-Driven Development (TDD), Programación en Parejas (Pair Programming), Refactorización continua, Integración Continua (CI) y Propiedad Colectiva del Código.",
          metrics: "Cobertura de pruebas unitarias y de integración, densidad de defectos, tiempo de ejecución de suite de pruebas y frecuencia de commits e integraciones.",
          artifacts: "Tarjetas de Historias de Usuario, pruebas unitarias y de aceptación automatizadas, y suite de integración continua.",
          bestFor: "Sistemas críticos o de alta complejidad donde la robustez técnica interna, la ausencia de bugs y la mantenibilidad a largo plazo son prioritarias."
        }
      },
      lean: {
        id: "lean",
        name: "Lean Software",
        badge: "Valor y Eficiencia",
        subtitle: "Eliminación de desperdicios",
        headerClass: "col-lean",
        characteristics: {
          philosophy: "Maximizar el valor para el usuario final eliminando todo desperdicio (muda), optimizando el flujo de trabajo global y fomentando el aprendizaje continuo.",
          cadence: "Enfoque pull orientado a la velocidad y reducción del tiempo de ciclo; entregas rápidas y modulares suprimiendo pasos burocráticos.",
          roles: "Organización horizontal empoderada; los equipos de ingeniería y calidad son los principales responsables de la toma de decisiones técnicas.",
          changeManagement: "Decidir en el Último Momento Responsable (Last Responsible Moment) para actuar con certeza de información y minimizar costos de cambios innecesarios.",
          qualityContribution: "Construir calidad en la fuente (Jidoka / Poka-Yoke): detener el flujo inmediatamente ante la aparición de un defecto para resolver la causa raíz.",
          technicalPractices: "Mapeo de la Cadena de Valor (Value Stream Mapping), lotes pequeños de trabajo, pruebas automatizadas en la fuente y análisis de causa raíz (5 Porqués).",
          metrics: "Eficiencia de flujo (Flow Efficiency), tiempo de ciclo de entrega de valor, tasa de desperdicio reducida y retorno de valor al usuario.",
          artifacts: "Mapa de la cadena de valor (VSM), paneles de desperdicios y métricas de valor entregado.",
          bestFor: "Startups, proyectos de innovación y organizaciones que buscan acelerar radicalmente el Time-to-Market optimizando recursos y eliminando tareas sin valor."
        }
      },
      cascada: {
        id: "cascada",
        name: "Modelo Cascada",
        badge: "Secuencial y Fases",
        subtitle: "Enfoque lineal tradicional por fases",
        headerClass: "col-cascada",
        characteristics: {
          philosophy: "Desarrollo lineal y secuencial estricto donde cada fase (requisitos, diseño, codificación, verificación y mantenimiento) debe completarse y documentarse rigurosamente antes de iniciar la siguiente.",
          cadence: "Ciclo único y extenso con una única entrega de producto final al término del proyecto; no contempla iteraciones ni entregas intermedias operativas.",
          roles: "Estructura formal y jerárquica con roles especializados: Gerente de Proyecto (control de cronograma y recursos), Analistas de Sistemas, Diseñadores de Arquitectura, Programadores y Equipo de QA/Testing independiente.",
          changeManagement: "Muy rígida y costosa: los cambios de alcance una vez avanzada la fase de diseño requieren un procedimiento formal de Solicitud de Cambio (Change Request) y renegociación contractual.",
          qualityContribution: "Verificación y validación tardía: el testing formal de software se ejecuta hacia el final del ciclo una vez finalizada la codificación completa, lo que dificulta y encarece la corrección de defectos arquitectónicos.",
          technicalPractices: "Especificación formal y exhaustiva de requisitos (SRS), diseño detallado previo (SDD), documentación integral en cada hito y revisiones formales de cierre de fase.",
          metrics: "Gestión del Valor Ganado (EVM), variación de cronograma (SV), variación de costo (CV) e índice de cumplimiento de hitos de entrega contractuales.",
          artifacts: "Documento de Especificación de Requisitos de Software (SRS), Documento de Diseño de Software (SDD), Manuales Técnicos y Plan Maestro de Pruebas.",
          bestFor: "Proyectos con requisitos totalmente claros, estables e inmutables desde el inicio, sistemas contractuales cerrados, licitaciones públicas o tecnologías ampliamente conocidas."
        }
      },
      vmodel: {
        id: "vmodel",
        name: "Modelo en V",
        badge: "Verificación y Validación",
        subtitle: "Correspondencia directa entre fases y pruebas",
        headerClass: "col-vmodel",
        characteristics: {
          philosophy: "Extensión del modelo secuencial que enfatiza el principio de Verificación y Validación (V&V), asociando a cada fase de desarrollo una fase correspondiente de pruebas planificada tempranamente.",
          cadence: "Secuencial estructurado en forma de 'V': el brazo descendente descompone las especificaciones y el brazo ascendente ejecuta la integración y validación progresiva.",
          roles: "Ingenieros de Requisitos, Arquitectos de Software, Desarrolladores, Ingenieros de Pruebas (Test Engineers) y Auditores de Calidad/QA con alta independencia técnica.",
          changeManagement: "Controlada y formal: los cambios requieren actualizar matrices de trazabilidad y redefinir los casos de prueba asociados a la fase afectada antes de implementarse.",
          qualityContribution: "Excelente aporte al aseguramiento de calidad: los planes y casos de prueba se diseñan en paralelo con las especificaciones tempranas (Requisitos <-> Pruebas de Aceptación; Arquitectura <-> Pruebas de Integración; Código <-> Pruebas Unitarias), previniendo defectos desde el diseño.",
          technicalPractices: "Matriz de trazabilidad de requisitos (RTM), diseño anticipado de casos de prueba, revisiones técnicas formales, verificación estática y pruebas de integración jerárquicas.",
          metrics: "Densidad de defectos por fase, cobertura de requisitos mediante pruebas (RTM coverage), tasa de detección temprana de defectos y porcentaje de casos de prueba aprobados.",
          artifacts: "Plan de Pruebas de Aceptación, Plan de Pruebas de Sistema, Plan de Pruebas de Integración, Casos de Pruebas Unitarias y Matriz de Trazabilidad de Requisitos (RTM).",
          bestFor: "Sistemas críticos de alta confiabilidad y seguridad (aeronáutica, dispositivos médicos, automotriz, ferroviario) donde un defecto operativo conlleva riesgos graves o fatales."
        }
      },
      incremental: {
        id: "incremental",
        name: "Modelo Incremental",
        badge: "Entregas por Módulos",
        subtitle: "Construcción progresiva por incrementos funcionales",
        headerClass: "col-incremental",
        characteristics: {
          philosophy: "Divide el sistema completo en módulos o incrementos funcionales. Cada incremento pasa por requisitos, diseño, codificación y pruebas, entregando partes operativas sucesivas del software.",
          cadence: "Multi-ciclo escalonado: entregas sucesivas de versiones parciales donde el primer incremento proporciona la funcionalidad básica del núcleo y los siguientes van agregando nuevas capacidades.",
          roles: "Líder de Proyecto, Arquitectos de Software (para garantizar que los incrementos encajen), Desarrolladores de módulo y Equipo de Pruebas enfocado en pruebas de regresión.",
          changeManagement: "Moderada y flexible: permite incorporar cambios de requisitos o ajustes entre un incremento y el siguiente, aunque cambiar el núcleo base ya entregado requiere refactorización.",
          qualityContribution: "Permite probar y validar módulos tempranamente con usuarios reales en cada entrega parcial; requiere rigurosas pruebas de regresión en cada incremento para verificar que lo nuevo no rompa lo anterior.",
          technicalPractices: "Diseño modular de arquitectura, pruebas de regresión automatizadas en cada entrega, integración continua de incrementos y prototipado funcional.",
          metrics: "Porcentaje de módulos completados vs planificados, tasa de defectos de regresión por incremento y tiempo de ciclo por entrega parcial.",
          artifacts: "Plan de descomposición incremental, especificación de releases, versiones operativas parciales y suites de pruebas de regresión acumuladas.",
          bestFor: "Proyectos donde se requiere poner una versión funcional básica rápidamente en el mercado o cuando el equipo es reducido y se deben escalonar los desarrollos."
        }
      }
    };

    const CRITERIA = [
      {
        key: "philosophy",
        title: "Filosofía y Enfoque",
        sub: "¿Cuál es su principio rector?",
        isHighlight: false
      },
      {
        key: "cadence",
        title: "Ciclos y Cadencia de Entrega",
        sub: "Frecuencia y duración de iteraciones",
        isHighlight: false
      },
      {
        key: "roles",
        title: "Roles y Estructura",
        sub: "Organización y responsabilidades del equipo",
        isHighlight: false
      },
      {
        key: "changeManagement",
        title: "Gestión del Cambio",
        sub: "Flexibilidad ante nuevos requisitos",
        isHighlight: false
      },
      {
        key: "qualityContribution",
        title: "Aporte Clave a la Calidad (QA)",
        sub: "Prevención de defectos y aseguramiento",
        isHighlight: true
      },
      {
        key: "technicalPractices",
        title: "Prácticas Técnicas y de Testing",
        sub: "Técnicas de ingeniería aplicadas",
        isHighlight: false
      },
      {
        key: "metrics",
        title: "Métricas e Indicadores",
        sub: "Monitoreo del rendimiento y salud del proyecto",
        isHighlight: false
      },
      {
        key: "artifacts",
        title: "Artefactos y Herramientas",
        sub: "Entregables e instrumentos visuales",
        isHighlight: false
      },
      {
        key: "bestFor",
        title: "Casos de Uso Recomendados",
        sub: "¿Cuándo conviene implementarla?",
        isHighlight: false
      }
    ];

    // Estado reactivo: metodologías activas (por defecto Scrum y Kanban)
    const activeMethodologies = new Set(["scrum", "kanban"]);

    const selectionButtons = document.querySelectorAll(".methodology-card-btn[data-methodology]");
    const selectionCounter = document.getElementById("selection-counter");
    const btnSelectAll = document.getElementById("btn-select-all");
    const btnClearAll = document.getElementById("btn-clear-all");
    const presetButtons = document.querySelectorAll(".preset-pill[data-preset]");

    const updateUI = () => {
      const activeIds = Array.from(activeMethodologies);
      const count = activeIds.length;

      // 1. Sincronizar botones superiores
      selectionButtons.forEach((btn) => {
        const id = btn.getAttribute("data-methodology");
        const isSelected = activeMethodologies.has(id);
        btn.classList.toggle("is-selected", isSelected);
        btn.setAttribute("aria-checked", isSelected ? "true" : "false");

        const statusEl = btn.querySelector(".methodology-card__status");
        if (statusEl) {
          statusEl.innerHTML = isSelected
            ? '<span class="status-dot"></span> Activo en comparación'
            : '<span class="status-dot"></span> Inactivo (clic para incluir)';
        }
      });

      // 2. Sincronizar contador
      if (selectionCounter) {
        if (count === 0) {
          selectionCounter.textContent = "0 metodologías seleccionadas";
        } else if (count === 1) {
          selectionCounter.textContent = "1 metodología seleccionada";
        } else {
          selectionCounter.textContent = `${count} metodologías seleccionadas`;
        }
      }

      // 3. Renderizar vista de resultados
      if (count === 0) {
        // Estado vacío amigable
        comparatorOutput.innerHTML = `
          <div class="comparator-empty-state" role="status">
            <div class="empty-state-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
                <line x1="3" y1="9" x2="21" y2="9"></line>
              </svg>
            </div>
            <h3>No hay metodologías seleccionadas</h3>
            <p>Haz clic en cualquiera de las tarjetas de arriba para activar metodologías y visualizarlas, o selecciona dos o más para compararlas en la tabla.</p>
            <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; justify-content: center;">
              <button type="button" class="comparator-action-btn" id="empty-state-restore-btn">
                Restaurar Scrum vs Kanban
              </button>
              <button type="button" class="comparator-action-btn" id="empty-state-cascada-btn">
                Cascada vs Modelo en V
              </button>
              <button type="button" class="comparator-action-btn comparator-action-btn--ghost" id="empty-state-all-btn">
                Seleccionar las 7
              </button>
            </div>
          </div>
        `;

        const restoreBtn = document.getElementById("empty-state-restore-btn");
        if (restoreBtn) {
          restoreBtn.addEventListener("click", () => {
            activeMethodologies.clear();
            activeMethodologies.add("scrum");
            activeMethodologies.add("kanban");
            updateUI();
          });
        }

        
        const cascadaBtn = document.getElementById("empty-state-cascada-btn");
        if (cascadaBtn) {
          cascadaBtn.addEventListener("click", () => {
            activeMethodologies.clear();
            activeMethodologies.add("cascada");
            activeMethodologies.add("vmodel");
            updateUI();
          });
        }

        const allBtn = document.getElementById("empty-state-all-btn");
        if (allBtn) {
          allBtn.addEventListener("click", () => {
            Object.keys(METHODOLOGIES_DATA).forEach((k) => activeMethodologies.add(k));
            updateUI();
          });
        }
        return;
      }

      // Banner informativo si hay solo 1 seleccionada
      let singleBannerHTML = "";
      if (count === 1) {
        const singleMethod = METHODOLOGIES_DATA[activeIds[0]];
        singleBannerHTML = `
          <div class="comparator-single-banner" role="status">
            <p>
              Estás visualizando únicamente las características de <strong>${singleMethod.name}</strong>.
              Para comparar lado a lado, haz clic en al menos otra metodología en la botonera superior.
            </p>
          </div>
        `;
      }

      // Generar encabezados de columna
      const theadColumnsHTML = activeIds
        .map((id) => {
          const item = METHODOLOGIES_DATA[id];
          return `
            <th class="${item.headerClass}" scope="col">
              <div class="col-header-inner">
                <div class="col-header-top">
                  <span class="col-header-title">${item.name}</span>
                  <button type="button" class="btn-remove-col" data-remove="${item.id}" title="Quitar ${item.name} de la comparación" aria-label="Quitar ${item.name}">
                    &times; Quitar
                  </button>
                </div>
                <span class="col-header-subtitle">${item.subtitle}</span>
              </div>
            </th>
          `;
        })
        .join("");

      // Generar filas por cada dimensión/criterio
      const tbodyRowsHTML = CRITERIA.map((criterion) => {
        const highlightClass = criterion.isHighlight ? "row--quality-highlight" : "";
        const badgeTag = criterion.isHighlight ? ' <span style="display:inline-block; margin-left:0.35rem; padding:0.15rem 0.45rem; background:#2d6aa8; color:#fff; border-radius:4px; font-size:0.68rem; font-weight:800; text-transform:uppercase;">Calidad</span>' : '';

        const cellsHTML = activeIds
          .map((id) => {
            const item = METHODOLOGIES_DATA[id];
            const content = item.characteristics[criterion.key] || "";
            return `<td>${content}</td>`;
          })
          .join("");

        return `
          <tr class="${highlightClass}">
            <th class="row-dimension" scope="row">
              <span class="dimension-title">${criterion.title}${badgeTag}</span>
              <span class="dimension-sub">${criterion.sub}</span>
            </th>
            ${cellsHTML}
          </tr>
        `;
      }).join("");

      // Inyectar HTML completo de la tabla adaptativa
      comparatorOutput.innerHTML = `
        ${singleBannerHTML}
        <div class="comparator-table-wrap" tabindex="0" aria-label="Tabla comparativa de metodologías ágiles">
          <div class="comparator-table-scroll-hint" aria-hidden="true">
            &larr; Desliza horizontalmente para comparar &rarr;
          </div>
          <table class="comparator-table">
            <caption>
              Comparativa activa: ${activeIds.map((id) => METHODOLOGIES_DATA[id].name).join(" vs ")}
            </caption>
            <thead>
              <tr>
                <th class="col-dimension" scope="col">Criterio</th>
                ${theadColumnsHTML}
              </tr>
            </thead>
            <tbody>
              ${tbodyRowsHTML}
            </tbody>
          </table>
        </div>
      `;

      // Escuchar eventos en los botones de "Quitar" dentro de la tabla
      comparatorOutput.querySelectorAll(".btn-remove-col").forEach((btn) => {
        btn.addEventListener("click", () => {
          const methodId = btn.getAttribute("data-remove");
          if (methodId && activeMethodologies.has(methodId)) {
            activeMethodologies.delete(methodId);
            updateUI();
          }
        });
      });
    };

    // Alternar selección al pulsar un botón de metodología
    selectionButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-methodology");
        if (!id) return;

        if (activeMethodologies.has(id)) {
          activeMethodologies.delete(id);
        } else {
          activeMethodologies.add(id);
        }
        updateUI();
      });
    });

    // Botón "Seleccionar todas"
    if (btnSelectAll) {
      btnSelectAll.addEventListener("click", () => {
        Object.keys(METHODOLOGIES_DATA).forEach((id) => activeMethodologies.add(id));
        updateUI();
      });
    }

    // Botón "Limpiar selección"
    if (btnClearAll) {
      btnClearAll.addEventListener("click", () => {
        activeMethodologies.clear();
        updateUI();
      });
    }

    // Atajos de combinaciones predefinidas
    presetButtons.forEach((pill) => {
      pill.addEventListener("click", () => {
        const preset = pill.getAttribute("data-preset");
        if (!preset) return;

        activeMethodologies.clear();
        preset.split(",").forEach((id) => {
          const trimmed = id.trim();
          if (METHODOLOGIES_DATA[trimmed]) {
            activeMethodologies.add(trimmed);
          }
        });
        updateUI();
      });
    });

    // Inicialización del comparador al cargar la página
    updateUI();
  }

  // =========================================================================
  // US-19: Encuesta de Preferencias Metodológicas (Wizard Asistente)
  // =========================================================================
  const surveyWizard = document.getElementById("survey-wizard");

  if (surveyWizard) {
    const wizardForm = document.getElementById("wizard-form");
    const surveyResults = document.getElementById("survey-results");
    const steps = surveyWizard.querySelectorAll(".wizard-step");
    const totalSteps = steps.length;
    let currentStep = 0;
    const userAnswers = {};

    const stepCategories = [
      "Cadencia y Entregas",
      "Estructura del Equipo",
      "Estrategia de Calidad",
      "Gestión del Cambio",
      "Monitoreo y Métricas",
      "Desafío Principal"
    ];

    const stepBadge = document.getElementById("wizard-step-badge");
    const stepCategory = document.getElementById("wizard-step-category");
    const progressPercent = document.getElementById("wizard-progress-percent");
    const progressFill = document.getElementById("wizard-progress-fill");
    const btnPrev = document.getElementById("btn-prev-step");
    const btnNext = document.getElementById("btn-next-step");
    const dotsContainer = document.getElementById("wizard-dots");
    const dots = dotsContainer ? dotsContainer.querySelectorAll(".wizard-dot") : [];

    const METHODOLOGY_PROFILES = {
      scrum: {
        id: "scrum",
        name: "Scrum",
        badge: "Gestión por Sprints e Incrementos",
        tagline: "El marco ágil ideal para proyectos con requisitos evolutivos que necesitan cadencia estructurada, reuniones de sincronización claras y validación periódica con usuarios.",
        fillClass: "fill--scrum",
        insights: [
          { tag: "Ritmo Fijo", title: "Entregas en Sprints", desc: "La cadencia de 1 a 4 semanas permite validar hipótesis y planificar de forma incremental sin desbordar al equipo." },
          { tag: "Calidad / QA", title: "Definición de Terminado (DoD)", desc: "Establece criterios de calidad innegociables para cada incremento antes de ser presentado a los interesados." },
          { tag: "Roles", title: "Product Owner y Scrum Master", desc: "Facilitan la priorización del valor de negocio y la remoción continua de impedimentos y bloqueos operativos." },
          { tag: "Mejora", title: "Retrospectivas Sistemáticas", desc: "Al final de cada ciclo el equipo reflexiona para perfeccionar sus procesos de ingeniería y colaboración." }
        ]
      },
      kanban: {
        id: "kanban",
        name: "Kanban",
        badge: "Flujo Continuo y Límites WIP",
        tagline: "El marco idóneo para entornos de soporte, mantenimiento continuo o desarrollo con flujo constante de peticiones y necesidad de visibilidad inmediata sin burocracia.",
        fillClass: "fill--kanban",
        insights: [
          { tag: "Flujo Continuo", title: "Sin Sprints Rígidos", desc: "Las tareas se mueven bajo demanda a través del tablero visual en función de la capacidad real del equipo." },
          { tag: "Calidad / QA", title: "Control Estricto de WIP", desc: "Limitar el trabajo en proceso hace visibles los cuellos de botella y errores de forma instantánea." },
          { tag: "Métricas", title: "Lead Time y Cycle Time", desc: "Monitorea con precisión científica el tiempo que toma resolver una solicitud desde el inicio hasta la entrega." },
          { tag: "Flexibilidad", title: "Adaptación en Tiempo Real", desc: "Permite cambiar prioridades en cualquier momento respetando la capacidad disponible." }
        ]
      },
      xp: {
        id: "xp",
        name: "Extreme Programming (XP)",
        badge: "Excelencia Técnica y TDD",
        tagline: "El marco por excelencia para proyectos donde la robustez técnica, la ausencia de defectos y la alta calidad interna del código son la máxima prioridad.",
        fillClass: "fill--xp",
        insights: [
          { tag: "Ingeniería", title: "Desarrollo Guiado por Pruebas (TDD)", desc: "Escribir pruebas automatizadas antes del código garantiza cero regresiones y un diseño simple modular." },
          { tag: "Calidad / QA", title: "Programación en Parejas", desc: "La programación en parejas actúa como una inspección de código continua e instantánea." },
          { tag: "Automatización", title: "Integración Continua (CI)", desc: "Los cambios se prueban y verifican automáticamente múltiples veces al día." },
          { tag: "Colaboración", title: "Cliente Integrado", desc: "Comunicación directa y constante con el cliente para resolver dudas de negocio sin esperas burocráticas." }
        ]
      },
      lean: {
        id: "lean",
        name: "Lean Software",
        badge: "Eliminación de Desperdicio y Valor",
        tagline: "El enfoque óptimo para organizaciones y startups que buscan velocidad extrema de llegada al mercado eliminando burocracia, tiempos muertos y tareas innecesarias.",
        fillClass: "fill--lean",
        insights: [
          { tag: "Eficiencia", title: "Cero Desperdicio (Muda)", desc: "Supresión radical de pasos innecesarios, documentación superflua y funcionalidades no utilizadas." },
          { tag: "Calidad / QA", title: "Calidad en la Fuente (Jidoka)", desc: "Detener la línea ante un defecto para resolver la causa raíz de inmediato y evitar su recurrencia." },
          { tag: "Decisiones", title: "Último Momento Responsable", desc: "Retrasar decisiones arquitectónicas hasta contar con la mayor cantidad de información empírica." },
          { tag: "Optimización", title: "Value Stream Mapping", desc: "Medición constante de la eficiencia del flujo para reducir tiempos de ciclo." }
        ]
      }
    };

    const OPTION_WEIGHTS = {
      scrum: { scrum: 3, xp: 1, kanban: 0, lean: 0 },
      kanban: { kanban: 3, lean: 1, scrum: 0, xp: 0 },
      xp: { xp: 3, lean: 1, scrum: 1, kanban: 0 },
      lean: { lean: 3, kanban: 1, xp: 0, scrum: 0 }
    };

    const updateWizardUI = () => {
      // 1. Mostrar solo el paso activo
      steps.forEach((step, idx) => {
        const isActive = idx === currentStep;
        step.classList.toggle("is-active", isActive);
        step.setAttribute("aria-hidden", isActive ? "false" : "true");
      });

      // 2. Actualizar barra de progreso
      const progressRatio = (currentStep + 1) / totalSteps;
      const percent = Math.round(progressRatio * 100);

      if (progressFill) progressFill.style.width = `${percent}%`;
      if (progressPercent) progressPercent.textContent = `${percent}% completado`;
      if (stepBadge) stepBadge.textContent = `Pregunta ${currentStep + 1} de ${totalSteps}`;
      if (stepCategory) stepCategory.textContent = stepCategories[currentStep] || "";

      // 3. Actualizar dots indicadores
      dots.forEach((dot, idx) => {
        dot.classList.toggle("is-active", idx === currentStep);
        dot.classList.toggle("is-completed", userAnswers[idx] !== undefined && idx !== currentStep);
      });

      // 4. Actualizar botones de navegación
      if (btnPrev) {
        btnPrev.disabled = currentStep === 0;
      }

      if (btnNext) {
        const isAnswered = userAnswers[currentStep] !== undefined;
        btnNext.disabled = !isAnswered;

        if (currentStep === totalSteps - 1) {
          btnNext.innerHTML = `
            Calcular Recomendación
            <svg viewBox="0 0 20 20" fill="currentColor" class="nav-arrow"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          `;
        } else {
          btnNext.innerHTML = `
            Siguiente
            <svg viewBox="0 0 20 20" fill="currentColor" class="nav-arrow"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
          `;
        }
      }
    };

    // Manejar selección de opciones
    const optionButtons = surveyWizard.querySelectorAll(".survey-option-btn");
    optionButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const qIndex = parseInt(btn.getAttribute("data-question"), 10);
        const value = btn.getAttribute("data-value");

        userAnswers[qIndex] = value;

        // Desmarcar hermanas en la misma pregunta y marcar la actual
        const currentStepEl = steps[qIndex];
        if (currentStepEl) {
          currentStepEl.querySelectorAll(".survey-option-btn").forEach((b) => {
            b.classList.remove("is-selected");
          });
        }
        btn.classList.add("is-selected");

        // Habilitar botón de siguiente
        if (btnNext) btnNext.disabled = false;
      });
    });

    // Navegar paso siguiente
    if (btnNext) {
      btnNext.addEventListener("click", () => {
        if (userAnswers[currentStep] === undefined) return;

        if (currentStep < totalSteps - 1) {
          currentStep++;
          updateWizardUI();
        } else {
          // Último paso -> calcular resultados
          calculateAndRenderResults();
        }
      });
    }

    // Navegar paso anterior
    if (btnPrev) {
      btnPrev.addEventListener("click", () => {
        if (currentStep > 0) {
          currentStep--;
          updateWizardUI();
        }
      });
    }

    // Algoritmo de cómputo y cálculo de resultados
    const calculateAndRenderResults = () => {
      const scores = { scrum: 0, kanban: 0, xp: 0, lean: 0 };

      // Sumar puntuaciones de cada respuesta seleccionada
      Object.keys(userAnswers).forEach((q) => {
        const ans = userAnswers[q];
        const weights = OPTION_WEIGHTS[ans] || { [ans]: 3 };
        scores.scrum += weights.scrum || 0;
        scores.kanban += weights.kanban || 0;
        scores.xp += weights.xp || 0;
        scores.lean += weights.lean || 0;
      });

      // Puntuación máxima teórica por metodología (18 puntos principales)
      const maxPossible = 18;
      const percentages = {
        scrum: Math.min(100, Math.round((scores.scrum / maxPossible) * 100)),
        kanban: Math.min(100, Math.round((scores.kanban / maxPossible) * 100)),
        xp: Math.min(100, Math.round((scores.xp / maxPossible) * 100)),
        lean: Math.min(100, Math.round((scores.lean / maxPossible) * 100))
      };

      // Ordenar metodologías por puntaje descendente
      const ranked = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
      const winnerKey = ranked[0];
      const runnerUpKey = ranked[1];
      const winnerProfile = METHODOLOGY_PROFILES[winnerKey];
      const winnerPercent = percentages[winnerKey];

      // Detección de empate o afinidad híbrida cercana (diferencia <= 1 punto)
      const isHybrid = (scores[winnerKey] - scores[runnerUpKey]) <= 1;
      const runnerUpProfile = METHODOLOGY_PROFILES[runnerUpKey];

      // Generar HTML de barras de afinidad
      const barsHTML = ranked.map((key) => {
        const item = METHODOLOGY_PROFILES[key];
        const pct = percentages[key];
        return `
          <div class="affinity-bar-item">
            <div class="affinity-bar-header">
              <span class="method-name">${item.name}</span>
              <span class="method-percent">${pct}% de afinidad</span>
            </div>
            <div class="affinity-bar-track">
              <div class="affinity-bar-fill ${item.fillClass}" style="width: ${pct}%;"></div>
            </div>
          </div>
        `;
      }).join("");

      // Generar tarjetas de justificación
      const insightsHTML = winnerProfile.insights.map((ins) => `
        <li class="insight-card">
          <span class="insight-card__tag">${ins.tag}</span>
          <h5>${ins.title}</h5>
          <p>${ins.desc}</p>
        </li>
      `).join("");

      // Mensaje de recomendación (considerando enfoque híbrido si aplica)
      let recommendationTitle = winnerProfile.name;
      let recommendationTagline = winnerProfile.tagline;

      if (isHybrid) {
        recommendationTitle = `${winnerProfile.name} con sinergia en ${runnerUpProfile.name}`;
        recommendationTagline = `Tu proyecto presenta un perfil híbrido excelente. Te sugerimos adoptar la base de ${winnerProfile.name} e incorporar prácticas clave de ${runnerUpProfile.name} (como un modelo tipo Scrumban o XP con sprints de Scrum).`;
      }

      // Ocultar formulario del wizard y mostrar resultados
      if (wizardForm) wizardForm.style.display = "none";
      const progressBox = surveyWizard.querySelector(".wizard-progress");
      if (progressBox) progressBox.style.display = "none";

      surveyResults.style.display = "block";
      surveyResults.innerHTML = `
        <div class="results-winner-card">
          <div class="winner-trophy-badge">
            <svg viewBox="0 0 20 20" fill="currentColor" style="width:1rem; height:1rem;"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            Metodología Sugerida
          </div>
          <h3 class="results-winner-title">${recommendationTitle}</h3>
          <span class="results-winner-match">${winnerPercent}% de Coincidencia</span>
          <p class="results-winner-desc">${recommendationTagline}</p>
        </div>

        <div class="results-breakdown">
          <h4 class="results-breakdown__title">Comparativa de Afinidad entre Metodologías</h4>
          <p class="results-breakdown__subtitle">Porcentaje de coincidencia de tus respuestas con cada uno de los 4 marcos evaluados:</p>
          <div class="affinity-bars">
            ${barsHTML}
          </div>
        </div>

        <div class="results-insights">
          <h4>¿Por qué este marco optimizará la calidad de tu software?</h4>
          <ul class="insights-list">
            ${insightsHTML}
          </ul>
        </div>

        <div class="results-actions">
          <a href="Comparar metodologias.html" class="results-action-btn results-action-btn--primary">
            Ver en Comparador de Metodologías &rarr;
          </a>
          <button type="button" id="btn-restart-survey" class="results-action-btn results-action-btn--ghost">
            Reiniciar Encuesta
          </button>
        </div>
      `;

      // Botón para reiniciar la encuesta
      const btnRestart = document.getElementById("btn-restart-survey");
      if (btnRestart) {
        btnRestart.addEventListener("click", () => {
          // Limpiar respuestas
          Object.keys(userAnswers).forEach((k) => delete userAnswers[k]);
          optionButtons.forEach((b) => b.classList.remove("is-selected"));
          currentStep = 0;

          // Restaurar vistas
          surveyResults.style.display = "none";
          surveyResults.innerHTML = "";
          if (wizardForm) wizardForm.style.display = "block";
          if (progressBox) progressBox.style.display = "block";

          updateWizardUI();
          surveyWizard.scrollIntoView({ behavior: "smooth" });
        });
      }

      surveyWizard.scrollIntoView({ behavior: "smooth" });
    };

    // Inicializar Wizard
    updateWizardUI();
  }


  // =========================================================================
  // US-12: Glosario Interactivo con Búsqueda en Tiempo Real e Índice A-Z
  // =========================================================================
  const initGlossarySearch = () => {
    const searchInput = document.getElementById("glossary-search-input");
    const clearBtn = document.getElementById("glossary-clear-btn");
    const countVisibleEl = document.getElementById("glossary-count-visible");
    const countTotalEl = document.getElementById("glossary-count-total");
    const letterBtns = document.querySelectorAll(".glossary-letter-btn");
    const groups = document.querySelectorAll(".glossary-group");
    const cards = document.querySelectorAll(".glossary-card");
    const noResultsEl = document.getElementById("glossary-no-results");
    const queryDisplayEl = document.getElementById("glossary-query-display");
    const resetBtn = document.getElementById("glossary-reset-btn");

    if (!searchInput || !groups.length || !cards.length) return;

    if (countTotalEl) {
      countTotalEl.textContent = String(cards.length);
    }

    let activeLetter = "all";
    let currentQuery = "";

    // Normalizador de texto: sin mayúsculas ni acentos
    const normalizeText = (text) => {
      if (!text) return "";
      return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
    };

    // Aplica el filtro combinado de búsqueda y letra
    const applyFilter = () => {
      const q = normalizeText(currentQuery);
      let totalVisible = 0;

      groups.forEach((group) => {
        const groupCards = group.querySelectorAll(".glossary-card");
        let groupVisibleCount = 0;

        groupCards.forEach((card) => {
          const cardLetter = card.getAttribute("data-letter");
          const cardText = normalizeText(card.textContent || "");

          const matchesLetter = activeLetter === "all" || cardLetter === activeLetter;
          const matchesQuery = !q || cardText.includes(q);

          if (matchesLetter && matchesQuery) {
            card.classList.remove("is-hidden");
            card.removeAttribute("hidden");
            groupVisibleCount++;
            totalVisible++;
          } else {
            card.classList.add("is-hidden");
            card.setAttribute("hidden", "true");
          }
        });

        if (groupVisibleCount > 0) {
          group.classList.remove("is-hidden");
          group.removeAttribute("hidden");
        } else {
          group.classList.add("is-hidden");
          group.setAttribute("hidden", "true");
        }
      });

      // Actualizar contador
      if (countVisibleEl) {
        countVisibleEl.textContent = String(totalVisible);
      }

      // Botón para limpiar campo
      if (clearBtn) {
        clearBtn.hidden = !currentQuery;
      }

      // Estado sin resultados
      if (totalVisible === 0) {
        if (noResultsEl) {
          noResultsEl.removeAttribute("hidden");
          if (queryDisplayEl) {
            queryDisplayEl.textContent = currentQuery || ('Letra "' + activeLetter + '"');
          }
        }
      } else {
        if (noResultsEl) {
          noResultsEl.setAttribute("hidden", "true");
        }
      }
    };

    // Eventos del buscador en tiempo real
    searchInput.addEventListener("input", (e) => {
      currentQuery = e.target.value;
      applyFilter();
    });

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        searchInput.value = "";
        currentQuery = "";
        searchInput.focus();
        applyFilter();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        searchInput.value = "";
        currentQuery = "";
        activeLetter = "all";
        letterBtns.forEach((b) => {
          b.classList.toggle("is-active", b.dataset.letter === "all");
        });
        searchInput.focus();
        applyFilter();
      });
    }

    // Eventos del índice alfabético
    letterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        activeLetter = btn.getAttribute("data-letter") || "all";
        letterBtns.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        applyFilter();

        // Si se selecciona una letra específica y está visible, scroll suave
        if (activeLetter !== "all") {
          const targetGroup = document.querySelector('.glossary-group[data-group-letter="' + activeLetter + '"]');
          if (targetGroup && !targetGroup.classList.contains("is-hidden")) {
            targetGroup.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      });
    });

    // Deshabilitar letras que no posean términos
    const existingLetters = new Set();
    cards.forEach((c) => existingLetters.add(c.getAttribute("data-letter")));
    letterBtns.forEach((b) => {
      const letVal = b.getAttribute("data-letter");
      if (letVal !== "all" && !existingLetters.has(letVal)) {
        b.disabled = true;
      }
    });

    // Ejecutar filtro inicial
    applyFilter();
  };

  initGlossarySearch();


  // =========================================================================
  // US-13: Preguntas Frecuentes (FAQ) - Acordeón Accesible y Animado
  // =========================================================================
  const initFAQAccordion = () => {
    const faqContainer = document.getElementById("faq-accordion");
    if (!faqContainer) return;

    const faqItems = faqContainer.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
      const questionBtn = item.querySelector(".faq-question");
      const answerPanel = item.querySelector(".faq-answer");
      if (!questionBtn || !answerPanel) return;

      questionBtn.addEventListener("click", () => {
        const isCurrentlyOpen = questionBtn.getAttribute("aria-expanded") === "true";

        // Cierra los demás acordeones para navegación limpia
        faqItems.forEach((otherItem) => {
          const otherBtn = otherItem.querySelector(".faq-question");
          const otherPanel = otherItem.querySelector(".faq-answer");
          if (otherBtn && otherPanel) {
            otherBtn.setAttribute("aria-expanded", "false");
            otherItem.classList.remove("is-open");
            otherPanel.style.maxHeight = null;
            otherPanel.setAttribute("hidden", "true");
          }
        });

        // Toggle del elemento actual
        if (!isCurrentlyOpen) {
          questionBtn.setAttribute("aria-expanded", "true");
          item.classList.add("is-open");
          answerPanel.removeAttribute("hidden");
          answerPanel.style.maxHeight = answerPanel.scrollHeight + "px";
        }
      });
    });
  };

  initFAQAccordion();


  // =========================================================================
  // US-14: Enlaces de Interés - Seguridad y Filtro por Tipo de Recurso
  // =========================================================================
  const initResourceLinks = () => {
    const resourcesSection = document.getElementById("enlaces-interes");
    if (!resourcesSection) return;

    // Validación QA/Seguridad: Forzar target="_blank" y rel="noopener noreferrer"
    const externalLinks = resourcesSection.querySelectorAll("a[href^='http'], a.resource-anchor-btn");
    externalLinks.forEach((link) => {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    });

    // Filtro interactivo por tipo de recurso
    const filterBtns = resourcesSection.querySelectorAll(".resource-filter-btn");
    const resourceCards = resourcesSection.querySelectorAll(".resource-link-card");

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetType = btn.getAttribute("data-type") || "all";

        filterBtns.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");

        resourceCards.forEach((card) => {
          const cardType = card.getAttribute("data-resource-type");
          const isMatch = targetType === "all" || cardType === targetType;

          if (isMatch) {
            card.classList.remove("is-hidden");
            card.removeAttribute("hidden");
          } else {
            card.classList.add("is-hidden");
            card.setAttribute("hidden", "true");
          }
        });
      });
    });
  };

  initResourceLinks();


  // =========================================================================
  // US-15: Ejercicios y Casos Prácticos - Solución Desplegable Dinámica
  // =========================================================================
  const initExerciseSolutions = () => {
    const exerciseCards = document.querySelectorAll(".exercise-challenge-card");
    if (!exerciseCards.length) return;

    exerciseCards.forEach((card) => {
      const toggleBtn = card.querySelector(".solution-toggle-btn");
      const solutionPanel = card.querySelector(".exercise-solution-panel");

      if (!toggleBtn || !solutionPanel) return;

      // QA: Asegurar que esté estrictamente oculto al cargar la página
      solutionPanel.setAttribute("hidden", "true");
      toggleBtn.setAttribute("aria-expanded", "false");

      toggleBtn.addEventListener("click", () => {
        const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
        const willExpand = !isExpanded;

        toggleBtn.setAttribute("aria-expanded", String(willExpand));
        toggleBtn.classList.toggle("is-active", willExpand);

        const btnText = toggleBtn.querySelector(".btn-text");
        const btnIcon = toggleBtn.querySelector(".btn-icon");

        if (willExpand) {
          solutionPanel.removeAttribute("hidden");
          if (btnText) btnText.textContent = "Ocultar Solución y Pauta";
      
        } else {
          solutionPanel.setAttribute("hidden", "true");
          if (btnText) btnText.textContent = "Mostrar Solución y Pauta";
   
        }
      });
    });
  };

  initExerciseSolutions();

  document.querySelectorAll("[data-profile-card]").forEach((card) => {
    card.addEventListener("pointerenter", () => card.classList.add("is-interactive"));
    card.addEventListener("pointerleave", () => card.classList.remove("is-interactive"));
    card.addEventListener("focusin", () => card.classList.add("is-interactive"));
    card.addEventListener("focusout", (event) => {
      if (!card.contains(event.relatedTarget)) {
        card.classList.remove("is-interactive");
      }
    });
  });

  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    const contactStatus = document.getElementById("contact-status");

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      contactForm.querySelectorAll("input, textarea").forEach((field) => {
        field.value = field.value.trim();
      });

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      contactStatus.textContent = "Tus datos fueron validados correctamente. ¡Gracias por contactarnos!";
      contactForm.reset();
    });
  }

});
