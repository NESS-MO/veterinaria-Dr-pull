// Función para validar la dirección de correo electrónico
function validarCorreo() {
    // Obtener el valor ingresado en el campo de correo electrónico
    var email = document.getElementById("email").value;
    // Expresión regular para validar el formato del correo electrónico
    // Esta expresión verifica que el correo tenga la estructura básica: algo@dominio.extensión
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    // Verificar si el campo de correo electrónico está vacío
    // Si el campo está vacío, muestra un mensaje de error y evita que el formulario se envíe
    if (email === "") {
        document.getElementById("mensajeError").innerHTML = "Por favor, ingresa tu correo electrónico.";
        return false; // Evita que el formulario se envíe
    }
// Validar si el correo electrónico tiene el formato correcto usando la expresión regular
// Si el formato es incorrecto, muestra un mensaje de error y evita que el formulario se envíe
    if (!regex.test(email)) {
        document.getElementById("mensajeError").innerHTML = "Por favor, ingresa un correo electrónico válido.";
        return false; // Evita que el formulario se envíe
    }
    // Si el correo electrónico es válido, limpia el mensaje de error (si hubiera alguno)
    document.getElementById("mensajeError").innerHTML = "";
    // Muestra un mensaje de éxito y permite que el formulario se envíe
    alert("Correo electrónico válido. Formulario enviado.");
    return true; // Permite que el formulario se envíe
}