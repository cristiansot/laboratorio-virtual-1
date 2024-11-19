let equipoData;
let equipoDataNuevo;
let cardsContainer = document.querySelector('.cards__container');
let dropdownItems = document.querySelectorAll('.dropdown-item');
let buscador = document.querySelector('.buscador');
let btnBuscar = document.querySelector('.btnBuscar');
let merge = [];

Promise.all([
  fetch('./equipo.json')
    .then(function (response) {
      if (response.ok) {
        console.log("Respuesta recibida (equipo.json):", response);
        return response.json();
      } else {
        console.log("No se puede leer el archivo equipo.json", response.status);
        throw new Error("Error al leer equipo.json");
      }
    }),
  fetch('./equipo_nuevo.json')
    .then(function (response) {
      if (response.ok) {
        console.log("Respuesta recibida (equipo_nuevo.json):", response);
        return response.json();
      } else {
        console.log("No se puede leer el archivo equipo_nuevo.json", response.status);
        throw new Error("Error al leer equipo_nuevo.json");
      }
    })
])
  .then(function ([data, dataNueva]) {
    equipoData = data;
    equipoDataNuevo = dataNueva;
    merge = [...equipoData, ...equipoDataNuevo];

    console.log('Datos combinados:', merge);

    function bubbleSort(merge) {
      for (let i = 0; i < merge.length; i++) {
        if (merge[i] > merge[i + 1]) {
          let j = merge[i + 1];
          merge[i + 1] = merge[i];
          merge[i] = j;
          bubbleSort(merge);
        }
      }
      return merge;
    }

    bubbleSort(merge);

    function mostrarTarjetas(filtro) {
      cardsContainer.innerHTML = '';
      let filteredData;
      if (filtro === 'todos') {
        filteredData = merge;
      } else {
        filteredData = merge.filter(item => item.especialidad.toLowerCase() === filtro.toLowerCase());
      }

      filteredData.forEach(({ nombre, imagen, especialidad, resumen, años_experiencia }) => {
        cardsContainer.innerHTML += `
          <div class="col-12"> 
            <div class="card m-1"> 
              <img class="card-img-top" src="${imagen}" alt="${nombre}">
               <div class="card-body">
                <h4 class="card-title mt-1">${nombre}</h4>
                <h5 class="card-title">${especialidad}</h5>
                <h6>${años_experiencia} años de experiencia</h6>
                <p class="card-text">${resumen}</p>
                <button type="button" class="btn" style="background-color: #ff2a6b; color: #FFF; border-radius: 20px;">
                  Eliminar Doctor
                </button>
                </div>
              </div>
            </div>`;
      });
    }

    mostrarTarjetas('todos');

    dropdownItems.forEach(item => {
      item.addEventListener("click", function (event) {
        event.preventDefault();
        const especialidadSeleccionada = item.textContent.trim();
        console.log("Especialidad seleccionada:", especialidadSeleccionada);
        if (especialidadSeleccionada === "Todas las Especialidades") {
          mostrarTarjetas('todos');
        } else {
          mostrarTarjetas(especialidadSeleccionada.toLowerCase());
        }
      });
    });

    buscador.addEventListener('input', function () {
      const inputValue = buscador.value.trim().toLowerCase();
      if (inputValue) {
        const filteredMerge = merge.filter(item => item.nombre.toLowerCase().includes(inputValue));
        console.log('Resultados de la búsqueda en tiempo real:', filteredMerge);
        mostrarTarjetasConFiltro(filteredMerge);
      } else {
        mostrarTarjetas('todos');
      }
    });

    function mostrarTarjetasConFiltro(filteredData) {
      cardsContainer.innerHTML = '';
      filteredData.forEach(({ nombre, imagen, especialidad, resumen, años_experiencia }) => {
        cardsContainer.innerHTML += `
          <div class="col-12"> 
            <div class="card m-1"> 
              <img class="card-img-top" src="${imagen}" alt="${nombre}">
               <div class="card-body">
                <h4 class="card-title mt-1">${nombre}</h4>
                <h5 class="card-title">${especialidad}</h5>
                <h6>${años_experiencia} años de experiencia</h6>
                <p class="card-text">${resumen}</p>
                <button type="button" class="btn" style="background-color: #ff2a6b; color: #FFF; border-radius: 20px;">
                  Eliminar Doctor
                </button>
                </div>
              </div>
            </div>`;
      });
    }
  })
  .catch(function (error) {
    console.log("Hubo un problema con la petición Fetch: " + error.message);
  });
