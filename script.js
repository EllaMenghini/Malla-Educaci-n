const materias = [
  { codigo: "HISG", nombre: "Historia General", anio: 1, cuatri: 1, abre: ["HISM"] },
  { codigo: "FIL", nombre: "Introducción a la Filosofía", anio: 1, cuatri: 1, abre: ["FILO"] },
  { codigo: "EPI", nombre: "Epistemología", anio: 1, cuatri: 1, abre: ["MET"] },
  { codigo: "POL", nombre: "Ciencia Política", anio: 1, cuatri: 2, abre: ["SOC", "PLE", "AI"] },
  { codigo: "PED1", nombre: "Pedagogía I", anio: 1, cuatri: 2, abre: ["CUR", "PED2", "DID1"] },
  { codigo: "SOCIO", nombre: "Sociología", anio: 1, cuatri: 2 },

  { codigo: "ORG", nombre: "Estudio de las Organizaciones", anio: 2, cuatri: 1, abre: ["ADMI"] },
  { codigo: "MET", nombre: "Metodología", anio: 2, cuatri: 1, abre: ["INV"] },
  { codigo: "HISM", nombre: "Historia de la Ed. Moderna", anio: 2, cuatri: 1, abre: ["HISA", "ECOF", "COMP"] },
  { codigo: "PSI", nombre: "Psicología", anio: 2, cuatri: 2, abre: ["PSID"] },
  { codigo: "ECO", nombre: "Economía", anio: 2, cuatri: 2, abre: ["ECOF"] },
  { codigo: "HISA", nombre: "Historia de la Ed. en Arg.", anio: 2, cuatri: 2, abre: ["PLE"] },

  { codigo: "FILO", nombre: "Filosofía de la Educación", anio: 3, cuatri: 1, abre: ["PRAC"] },
  { codigo: "SOC", nombre: "Sociología de la Educación", anio: 3, cuatri: 1, abre: ["CUR", "FORM"] },
  { codigo: "PSID", nombre: "Psicología del Desarrollo", anio: 3, cuatri: 1, abre: ["PSIE"] },
  { codigo: "OPT1", nombre: "Optativa I", anio: 3, cuatri: 1 },

  { codigo: "PSIE", nombre: "Psicología de la Educación", anio: 3, cuatri: 2 },
  { codigo: "CUR", nombre: "Currículo", anio: 3, cuatri: 2, abre: ["DID1", "ADMI", "COMP"] },
  { codigo: "PLE", nombre: "Política y Leg. Educativa", anio: 3, cuatri: 2, abre: ["PRAC", "FORM"] },
  { codigo: "PED2", nombre: "Pedagogía II", anio: 3, cuatri: 2, abre: ["PRAC"] },

  { codigo: "DID1", nombre: "Didáctica I", anio: 4, cuatri: 1, abre: ["DID2", "TIC", "FORM"] },
  { codigo: "INV", nombre: "Investigación Educativa", anio: 4, cuatri: 1, abre: ["OPT3", "TESI"] },
  { codigo: "ADMI", nombre: "Administración y Gestión", anio: 4, cuatri: 1, abre: ["AI"] },
  { codigo: "OPT2", nombre: "Optativa II", anio: 4, cuatri: 1 },

  { codigo: "ECOF", nombre: "Economía y Financiamiento", anio: 4, cuatri: 2 },
  { codigo: "DID2", nombre: "Didáctica II", anio: 4, cuatri: 2, abre: ["DID3"] },
  { codigo: "TIC", nombre: "Educación y TIC", anio: 4, cuatri: 2, abre: ["PRAC"] },
  { codigo: "COMP", nombre: "Educación Comparada", anio: 4, cuatri: 2 },

  { codigo: "FORM", nombre: "Formación y Capacitación", anio: 5, cuatri: 1, abre: ["FORMD"] },
  { codigo: "OPT3", nombre: "Optativa III", anio: 5, cuatri: 1 },
  { codigo: "TESI", nombre: "Seminario de Tesina", anio: 5, cuatri: 1, abre: ["TUTO"] },
  { codigo: "AI", nombre: "Análisis Institucional", anio: 5, cuatri: 1 },

  { codigo: "DID3", nombre: "Didáctica III", anio: 5, cuatri: 2, abre: ["PRAC"] },
  { codigo: "PRAC", nombre: "Práctica Docente", anio: 5, cuatri: 2 },
  { codigo: "FORMD", nombre: "Formación Docente", anio: 5, cuatri: 2 },
  { codigo: "OPT4", nombre: "Optativa IV", anio: 5, cuatri: 2 },
  { codigo: "TUTO", nombre: "Tutoría y Tesina", anio: 5, cuatri: 2 },

  { codigo: "ING1", nombre: "Inglés I", anio: 0, cuatri: 1, abre: ["ING2"] },
  { codigo: "ING2", nombre: "Inglés II", anio: 0, cuatri: 2 }
];

const grid = document.getElementById("grid");

const maxCuatri = 5;
const cuatriCols = Array.from({ length: maxCuatri }, (_, i) => document.createElement("div"));
cuatriCols.forEach((col, i) => {
  col.className = "cuatrimestre";
  col.innerHTML = `<h3>${i + 1}º Cuat.</h3>`;
  grid.appendChild(col);
});

const estadoMaterias = {};

function renderMaterias() {
  materias.forEach((m) => {
    const div = document.createElement("div");
    div.className = "materia bloqueada";
    div.dataset.codigo = m.codigo;
    div.innerHTML = `${m.nombre}<br><small>Año ${m.anio}</small>`;
    estadoMaterias[m.codigo] = {
      aprobada: false,
      element: div,
      materia: m
    };
    cuatriCols[m.cuatri - 1].appendChild(div);
  });
}

function actualizarEstados() {
  for (const [codigo, data] of Object.entries(estadoMaterias)) {
    const m = data.materia;
    const requisitos = materias.filter(m2 => m2.abre?.includes(codigo));
    const puedeAprobarse = requisitos.every(m2 => estadoMaterias[m2.codigo]?.aprobada);

    if (puedeAprobarse && !data.aprobada) {
      data.element.classList.remove("bloqueada");
    } else if (!data.aprobada) {
      data.element.classList.add("bloqueada");
    }
  }
}

function manejarClick(e) {
  const box = e.currentTarget;
  const codigo = box.dataset.codigo;
  const data = estadoMaterias[codigo];
  if (box.classList.contains("bloqueada")) return;
  data.aprobada = !data.aprobada;
  box.classList.toggle("aprobada");
  actualizarEstados();
}

function iniciar() {
  renderMaterias();
  Object.values(estadoMaterias).forEach(({ element }) => {
    element.addEventListener("click", manejarClick);
  });
  actualizarEstados();
}

iniciar();