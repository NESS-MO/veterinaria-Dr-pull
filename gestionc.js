// Función para mostrar notificación con SweetAlert2
function notificar(mensaje, icono) {
    Swal.fire({
        title: mensaje,
        icon: icono,
        confirmButtonText: "OK",
        timer: 2500,
        showConfirmButton: false,
        toast: true,
        position: "top-end"
    });
}

// Función para cambiar el estado de la cita a "Confirmado"
function confirmarCita(event) {
    const fila = event.target.closest('tr');
    const estadoCell = fila.querySelector('.estado');
    estadoCell.textContent = "Confirmado";
    estadoCell.classList.remove("pendiente");
    estadoCell.classList.add("confirmado");

    fila.querySelector('.confirmar-btn').disabled = true;
    fila.querySelector('.rechazar-btn').disabled = true;

    notificar("✅ La cita ha sido confirmada", "success");
}

// Función para cambiar el estado de la cita a "Rechazado"
function rechazarCita(event) {
    const fila = event.target.closest('tr');
    const estadoCell = fila.querySelector('.estado');
    estadoCell.textContent = "Rechazado";
    estadoCell.classList.remove("pendiente");
    estadoCell.classList.add("rechazado");

    fila.querySelector('.confirmar-btn').disabled = true;
    fila.querySelector('.rechazar-btn').disabled = true;

    notificar("❌ La cita ha sido rechazada", "error");
}

// Función para modificar la fecha y hora de una cita con SweetAlert2
function modificarCita(event) {
    const fila = event.target.closest('tr');
    const fechaCell = fila.children[1]; // Segunda columna (Fecha)
    const horaCell = fila.children[2]; // Tercera columna (Hora)

    Swal.fire({
        title: "📅 Modificar Cita",
        html: `
            <label>Nueva Fecha:</label>
            <input type="date" id="nuevaFecha" class="swal2-input" value="${fechaCell.textContent}">
            <label>Nueva Hora:</label>
            <input type="time" id="nuevaHora" class="swal2-input" value="${horaCell.textContent}">
        `,
        showCancelButton: true,
        confirmButtonText: "Guardar Cambios",
        cancelButtonText: "Cancelar",
        preConfirm: () => {
            return {
                nuevaFecha: document.getElementById("nuevaFecha").value,
                nuevaHora: document.getElementById("nuevaHora").value
            };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            if (result.value.nuevaFecha) fechaCell.textContent = result.value.nuevaFecha;
            if (result.value.nuevaHora) horaCell.textContent = result.value.nuevaHora;

            notificar(`✏️ Cita modificada:\n📅 ${fechaCell.textContent} - ⏰ ${horaCell.textContent}`, "info");
        }
    });
}

// Asignar eventos a los botones
document.querySelectorAll('.confirmar-btn').forEach(btn => btn.addEventListener('click', confirmarCita));
document.querySelectorAll('.rechazar-btn').forEach(btn => btn.addEventListener('click', rechazarCita));
document.querySelectorAll('.modificar-btn').forEach(btn => btn.addEventListener('click', modificarCita));


// Función para convertir las horas de 24 horas a 12 horas con AM/PM
function convertirHoraAMPM(hora24) {
    let [hora, minutos] = hora24.split(':');  // Dividir la hora en hora y minutos
    hora = parseInt(hora);  // Convertir hora a entero

    let ampm = hora >= 12 ? 'PM' : 'AM';  // Determinar si es AM o PM
    hora = hora % 12;  // Convertir a formato de 12 horas

    if (hora === 0) {
        hora = 12;  // El 0 es equivalente a 12 en formato de 12 horas
    }

    return `${hora}:${minutos} ${ampm}`;  // Devolver la hora en formato 12 horas
}

// Función para actualizar la tabla con el formato AM/PM
function actualizarTablaHoras() {
    const celdasHora = document.querySelectorAll('td:nth-child(3)');  // Selecciona las celdas de hora

    celdasHora.forEach(celda => {
        let hora = celda.textContent;  // Obtén el contenido de la celda (la hora)
        let horaConvertida = convertirHoraAMPM(hora);  // Convierte la hora a 12 horas con AM/PM
        celda.textContent = horaConvertida;  // Actualiza la celda con la nueva hora
    });
}

// Ejecutar la función para actualizar la tabla al cargar la página
document.addEventListener('DOMContentLoaded', actualizarTablaHoras);
