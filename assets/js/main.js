let equipoData;
let cardsContainer = document.querySelector('.cards__container');
let dropdownItems = document.querySelectorAll('.dropdown-item');

fetch('./equipo.json')
  .then(function (response) {
    if (response.ok) {
      console.log("Respuesta recibida:", response);
      return response.json();
    } else {
      console.log("No se puede leer el archivo Json", response.status);
    }
  })
  .then(function (data) {
    equipoData = data;
    console.log(equipoData);

    function mostrarTarjetas(filtro) {
      cardsContainer.innerHTML = '';
      let filteredData;
      if (filtro === 'todos') {
        filteredData = equipoData;
      } else {
        filteredData = equipoData.filter(item => item.especialidad.toLowerCase() === filtro.toLowerCase());
      }

      filteredData.forEach(({ nombre, imagen, especialidad, resumen, años_experiencia }) => {
        cardsContainer.innerHTML += `
          <div class="col"> 
            <div class="card m-1"> 
              <img class="card-img-top" src="${imagen}" alt="${nombre}">
              <div class="card-body">
                <h4 class="card-title mt-1">${nombre}</h4>
                <h5 class="card-title">${especialidad}</h5>
                <h6>${años_experiencia} años de experiencia</h6>
                <p class="card-text">${resumen}</p>
              </div>
            </div>
          </div>`;
        console.log({ nombre, imagen, especialidad, resumen, años_experiencia });
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
  })
  .catch(function (error) {
    console.log("Hubo un problema con la petición Fetch: " + error.message);
  });

