  <script>
    const materias = [
      { id: '1', nombre: 'Historia General', año: 1, cuatrimestre: 1, correlativas: [] },
      { id: '2', nombre: 'Introducción a la Filosofía', año: 1, cuatrimestre: 1, correlativas: [] },
      { id: '3', nombre: 'Epistemología de las Ciencias Sociales', año: 1, cuatrimestre: 1, correlativas: [] },
      { id: '4', nombre: 'Introducción a la Ciencia Política', año: 1, cuatrimestre: 2, correlativas: [] },
      { id: '5', nombre: 'Pedagogía I', año: 1, cuatrimestre: 2, correlativas: [] },
      { id: '6', nombre: 'Introducción a la Sociología', año: 1, cuatrimestre: 2, correlativas: [] },

      { id: '7', nombre: 'Introducción al Estudio de las Organizaciones', año: 2, cuatrimestre: 3, correlativas: [] },
      { id: '8', nombre: 'Metodología de la Investigación', año: 2, cuatrimestre: 3, correlativas: ['3'] },
      { id: '9', nombre: 'Historia de la Educación Moderna y Contemporánea', año: 2, cuatrimestre: 3, correlativas: ['1'] },
      { id: '10', nombre: 'Introducción a la Psicología', año: 2, cuatrimestre: 4, correlativas: [] },
      { id: '11', nombre: 'Elementos de Economía', año: 2, cuatrimestre: 4, correlativas: [] },
      { id: '12', nombre: 'Historia de la Educación en Argentina y América Latina', año: 2, cuatrimestre: 4, correlativas: ['9'] },

      { id: '13', nombre: 'Filosofía de la Educación', año: 3, cuatrimestre: 5, correlativas: ['2'] },
      { id: '14', nombre: 'Sociología de la Educación', año: 3, cuatrimestre: 5, correlativas: ['6', '4'] },
      { id: '15', nombre: 'Psicología del Desarrollo', año: 3, cuatrimestre: 5, correlativas: ['10'] },
      { id: '16', nombre: 'Optativa I', año: 3, cuatrimestre: 5, correlativas: [] },
      { id: '17', nombre: 'Psicología de la Educación', año: 3, cuatrimestre: 6, correlativas: ['15'] },
      { id: '18', nombre: 'Currículo', año: 3, cuatrimestre: 6, correlativas: ['5', '14'] },
      { id: '19', nombre: 'Política y Legislación de la Educación', año: 3, cuatrimestre: 6, correlativas: ['4', '12'] },
      { id: '20', nombre: 'Pedagogía II', año: 3, cuatrimestre: 6, correlativas: ['5'] },

      { id: '21', nombre: 'Didáctica I', año: 4, cuatrimestre: 7, correlativas: ['18'] },
      { id: '22', nombre: 'Investigación Educativa', año: 4, cuatrimestre: 7, correlativas: ['8'] },
      { id: '23', nombre: 'Administración y gestión de la educación', año: 4, cuatrimestre: 7, correlativas: ['7', '18'] },
      { id: '24', nombre: 'Optativa II', año: 4, cuatrimestre: 7, correlativas: [] },
      { id: '25', nombre: 'Economía y financiamiento de la Educación', año: 4, cuatrimestre: 8, correlativas: ['11', '9'] },
      { id: '26', nombre: 'Didáctica II', año: 4, cuatrimestre: 8, correlativas: ['21'] },
      { id: '27', nombre: 'Educación y TIC', año: 4, cuatrimestre: 8, correlativas: ['21'] },
      { id: '28', nombre: 'Educación Comparada', año: 4, cuatrimestre: 8, correlativas: ['9', '18'] },

      { id: '29', nombre: 'Formación y Capacitación', año: 5, cuatrimestre: 9, correlativas: ['14'] },
      { id: '30', nombre: 'Optativa III', año: 5, cuatrimestre: 9, correlativas: ['22'] },
      { id: '31', nombre: 'Seminario de Tesina', año: 5, cuatrimestre: 9, correlativas: ['22'] },
      { id: '32', nombre: 'Análisis Institucional', año: 5, cuatrimestre: 9, correlativas: ['23'] },
      { id: '33', nombre: 'Tutoría y Escritura de la Tesina', año: 5, cuatrimestre: 9, correlativas: ['31'] },
      { id: '34', nombre: 'Didáctica III', año: 5, cuatrimestre: 10, correlativas: ['26'] },
      { id: '35', nombre: 'Práctica Docente', año: 5, cuatrimestre: 10, correlativas: ['13', '19', '20', '27', '34'] },
      { id: '36', nombre: 'Formación Docente', año: 5, cuatrimestre: 10, correlativas: ['29', '21'] },
      { id: '37', nombre: 'Optativa IV', año: 5, cuatrimestre: 10, correlativas: [] },

      { id: 'ING1', nombre: 'Inglés Nivel I', año: 6, cuatrimestre: 11, correlativas: [] },
      { id: 'ING2', nombre: 'Inglés Nivel II', año: 6, cuatrimestre: 12, correlativas: ['ING1'] },
    ];

    const container = document.getElementById("grid-container");
    const template = document.getElementById("subject-template");

    const años = new Set(materias.map(m => m.año));
    años.forEach(año => {
      const añoDiv = document.createElement("div");
      añoDiv.className = "year-column";

      if (año <= 5) {
        añoDiv.innerHTML = `<h2>Año ${año}</h2>`;
        const cuatris = [...new Set(materias.filter(m => m.año === año).map(m => m.cuatrimestre))];
        cuatris.forEach(cuatr => {
          const semDiv = document.createElement("div");
          semDiv.className = "semester";
          semDiv.innerHTML = `<h3>Cuatrimestre ${cuatr}</h3>`;
          materias.filter(m => m.año === año && m.cuatrimestre === cuatr).forEach(m => {
            const s = template.content.cloneNode(true);
            const subj = s.querySelector(".subject");
            subj.dataset.id = m.id;
            subj.dataset.prereq = m.correlativas.join(",");
            s.querySelector(".number").textContent = m.id;
            s.querySelector(".name").textContent = m.nombre;
            semDiv.appendChild(s);
          });
          añoDiv.appendChild(semDiv);
        });
      } else if (año === 6) {
        añoDiv.innerHTML = `<h2>Idioma Inglés</h2>`;
        const semDiv = document.createElement("div");
        semDiv.className = "semester";
        materias.filter(m => m.año === 6).forEach(m => {
          const s = template.content.cloneNode(true);
          const subj = s.querySelector(".subject");
          subj.dataset.id = m.id;
          subj.dataset.prereq = m.correlativas.join(",");
          s.querySelector(".number").textContent = m.id;
          s.querySelector(".name").textContent = m.nombre;
          semDiv.appendChild(s);
        });
        añoDiv.appendChild(semDiv);
      }

      container.appendChild(añoDiv);
    });
  </script>
