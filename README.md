# Informe del Proyecto

## 1. Implementación de Objetos JSON y Operaciones Realizadas (Clonación, Merge, Recorrido)

### Explicación de los Objetos JSON

En este proyecto, se han utilizado dos archivos JSON (`equipo.json` y `equipo_nuevo.json`) para almacenar y manejar los datos de los doctores y sus especialidades. Estos archivos contienen una lista de objetos con la siguiente estructura:

- `nombre`: El nombre del doctor.
- `especialidad`: La especialidad médica del doctor.
- `años_experiencia`: La cantidad de años de experiencia del doctor.
- `resumen`: Un resumen de la experiencia y habilidades del doctor.
- `imagen`: La URL de la imagen del doctor.

### Operaciones Realizadas

#### 1. **Clonación**
   - Los datos de ambos archivos JSON (`equipo.json` y `equipo_nuevo.json`) se cargan a través de la función `fetch` en el navegador. La clonación se realiza utilizando el operador de propagación (`...`) para combinar los dos arrays de objetos en un solo array `merge`:
   ```
    javascript
    merge = [...data, ...dataNueva];
    ```
   - Esto asegura que se combinan los datos de ambos archivos sin modificar los originales.

#### 2. Merge

El merge o combinación de los datos se realiza después de la clonación. Se concatenan los datos de los dos archivos JSON en el array `merge`, lo que facilita el manejo y la visualización de todos los doctores juntos.

#### Operación de Merge
Se combinan los datos de dos fuentes (`equipo.json` y `equipo_nuevo.json`) y se almacenan en el array `merge`. Este array se utiliza para mostrar las tarjetas de los doctores en la interfaz de usuario y realizar acciones como búsqueda y filtrado.

#### Recorrido
Para mostrar la información, se recorre el array `merge` utilizando métodos como `forEach` para iterar sobre cada objeto y renderizar las tarjetas de los doctores en el DOM.

```
javascript
merge.forEach(({ nombre, imagen, especialidad, resumen, años_experiencia }) => {
  // Renderización de las tarjetas
});
```

## 2. Estructuras de Datos Implementadas

### Arreglos (Arrays)
Los arreglos se utilizan ampliamente para almacenar y manejar los datos de los doctores. El array `merge` contiene los datos combinados de los dos archivos JSON y se utiliza para mostrar las tarjetas en la interfaz de usuario y para aplicar filtros de búsqueda y clasificación.

**Utilidad:**
- **Almacenamiento de datos**: Se almacenan los objetos de los doctores.
- **Filtrado y búsqueda**: Se utiliza para filtrar los doctores según la especialidad seleccionada o la búsqueda por nombre.
- **Ordenación**: Permite ordenar a los doctores por años de experiencia, utilizando métodos como el de ordenamiento `bubbleSort`.

### Pilas (Stack)
Una pila se implementa mediante la clase `Stack`, que se utiliza para gestionar las citas de los pacientes. Los pacientes se agregan a la pila cuando se llenan los datos del formulario de cita, y se pueden ver en el orden en que se agregaron.

**Utilidad:**
- **Gestión de citas**: Los pacientes se almacenan en la pila según el orden de llegada y se muestran en la interfaz en ese orden.

### Colas (Queue)
Una cola se implementa mediante la clase `Queue`, utilizada para manejar una lista de espera de pacientes. Los pacientes se encolan (añaden) y se pueden desencolar (eliminar) según el orden de llegada. Esta estructura es ideal para gestionar el flujo de pacientes que esperan atención.

**Utilidad:**
- **Gestión de lista de espera**: Los pacientes que se registran en la lista de espera se encolan y se pueden gestionar en orden.

## 3. Descripción de los Algoritmos Implementados y su Complejidad

### Algoritmo de Ordenación - Bubble Sort
El algoritmo de ordenación utilizado es el `Bubble Sort`. Este algoritmo compara los elementos adyacentes del array y los intercambia si están en el orden incorrecto. El proceso se repite hasta que el array está completamente ordenado.

**Implementación:**


```
javascript
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
```

### Complejidad

La complejidad temporal de **Counting Sort** es **O(n + k)**, donde:

- **n** es el número de elementos en el array `data`.
- **k** es el rango de los valores de los años de experiencia, es decir, la diferencia entre el valor máximo y el mínimo de los años de experiencia.

Este algoritmo es mucho más eficiente que el **Bubble Sort** cuando el rango de los valores (k) es relativamente pequeño, ya que el tiempo de ejecución depende principalmente de la cantidad de elementos y del rango de los valores, en lugar de realizar comparaciones repetidas entre todos los elementos.

### Comparación de complejidad

- **Bubble Sort** tiene una complejidad de **O(n²)** en el peor de los casos. Esto significa que, a medida que el número de elementos aumenta, el tiempo de ejecución crece cuadráticamente.
- **Counting Sort**, por otro lado, tiene una complejidad de **O(n + k)**, lo que lo hace mucho más eficiente en situaciones en las que el rango de los años de experiencia (**k**) es pequeño en comparación con el número de doctores (**n**).

**En resumen**: Cuando el rango de valores es pequeño (como en este caso, con los años de experiencia), **Counting Sort** es mucho más rápido y escalable que **Bubble Sort**. Esto mejora la eficiencia del proyecto, especialmente cuando se necesita ordenar una gran cantidad de datos con un rango limitado de valores.



