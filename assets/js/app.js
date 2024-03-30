const input = document.querySelector("#input");
const btn = document.querySelector("#btn");
const list = document.querySelector("#list");
const total = document.querySelector("#total");
const realizadas = document.querySelector("#realizadas");

// Array inicial de tareas
let tareas = [
  { id: 1711759229862, name: "Intentar entender el desafío", check: false },
  { id: 1711759229863, name: "Hacer el desafío", check: false },
  { id: 1711759229864, name: "Entregar el desafío antes de las 18 ;)", check: false }
];

// Función para agregar una nueva tarea
btn.addEventListener("click", () => {
  const nombreTarea = input.value.trim();//Elimina los espacios en blanco
  if (nombreTarea) {
    const nuevaTarea = { id: Date.now(), name: nombreTarea, check: false };
    tareas.push(nuevaTarea);
    input.value = ""; // Limpiar el campo de entrada
    agregarTarea(nuevaTarea);
  } else {
    alert("Debes ingresar una tarea");
  }
});

// Función para agregar una tarea a la lista
function agregarTarea(tarea) {
  const template = `
    <tr>
      <td>${tarea.id}</td>
      <td>${tarea.name}</td>
      <td class="txt-center">
        <input type="checkbox" onclick="cambiarEstadoTarea(${tarea.id})" ${tarea.check ? "checked" : ""}>
      </td>
      <td class="txt-center">
        <button type="button" class="btn-eliminar" onclick="elimimarTarea(${tarea.id})">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>`;
  list.insertAdjacentHTML("beforeend", template);//Método que permite insertar HTML en una posición específica (antes del cierre del elemento)
  actualizarContador();
  input.focus();
}

// Función para eliminar una tarea
function elimimarTarea(tareaId) {
  if (confirm("¿Estás seguro que quieres eliminar esta tarea?")) {
    tareas = tareas.filter(tarea => tarea.id !== tareaId);
    renderizarTareas();
  }
}

// Función para cambiar el estado de una tarea (completada/no completada)
function cambiarEstadoTarea(tareaId) {
  tareas.forEach(tarea => {
    if (tarea.id === tareaId) {
      tarea.check = !tarea.check;
    }
  });
  actualizarContador();
}

// Función para actualizar los contadores de tareas totales y completadas
function actualizarContador() {
  const totalTareas = tareas.length;
  const realizadasTareas = tareas.filter(tarea => tarea.check).length;
  total.textContent = totalTareas;
  realizadas.textContent = realizadasTareas;
}

// Función para renderizar todas las tareas en la lista
function renderizarTareas() {
  list.innerHTML = "";
  tareas.forEach(tarea => agregarTarea(tarea));
}

// Renderizar las tareas iniciales
renderizarTareas();
