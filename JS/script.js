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
              <button type="button" class="comparator-action-btn comparator-action-btn--ghost" id="empty-state-all-btn">
                Seleccionar las 4
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
                <th class="col-dimension" scope="col">Dimensión / Criterio</th>
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
});

