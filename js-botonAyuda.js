function addAyudaStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .ayuda {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 999;
        display: flex;
        align-items: center;
        text-decoration: none;
        cursor: pointer;
      }
  
      .ayuda img {
        width: 50px;
        height: auto;
        transition: transform 0.3s ease;
        order: 2;
      }
  
      .ayuda:hover img {
        transform: scale(1.1);
      }
  
      .tooltip-text-ayuda {
        visibility: hidden;
        width: 0;
        opacity: 0;
        background: linear-gradient(135deg, #4fa8c1, #3a6ead);
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 0;
        margin-right: 10px;
        white-space: nowrap;
        transition: all 0.3s ease;
        order: 1;
        overflow: hidden;
        text-decoration: none;
      }
  
      .ayuda:hover .tooltip-text-ayuda {
        visibility: visible;
        width: 180px;
        opacity: 1;
        padding: 8px 12px;
      }
  
      .ventana-ayuda {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        max-width: 300px;
        color: black;
        font-size: 18px;
        text-align: center;
        padding: 20px;
        min-height: 250px;
        border-radius: 30px;
        display: none;
        z-index: 1000; 
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
      }
  
      .ventana-ayuda a {
        text-decoration: none;
        color: #0056b3;
        display: block;
        margin: 10px 0;
      }
  
      .ventana-ayuda h2 {
        margin-bottom: 20px;
      }
  
      .salir {
        height: 7%;
        position: absolute;
        right: 10px;
        top: 15px;
        cursor: pointer;
      }
  
      #fondo-oscuro-ayuda {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999.5;
        cursor: pointer;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Función para crear el HTML necesario para la ayuda
  function createAyudaElements() {
    // Crear fondo oscuro específico para ayuda
    const fondoOscuroAyuda = document.createElement('div');
    fondoOscuroAyuda.id = 'fondo-oscuro-ayuda';
    fondoOscuroAyuda.style.display = 'none';
    
    // Crear botón flotante de ayuda
    const ayudaButton = document.createElement('div');
    ayudaButton.className = 'ayuda';
    ayudaButton.innerHTML = `
      <img src="Imagenes/ayuda.jpg" alt="Ayuda">
      <span class="tooltip-text-ayuda">¿Necesitas ayuda?</span>
    `;
    
    // Crear ventana de ayuda
    const ayudaWindow = document.createElement('div');
    ayudaWindow.className = 'ventana-ayuda';
    ayudaWindow.id = 'ayudav';
    ayudaWindow.style.display = 'none';
    ayudaWindow.innerHTML = `
      <h2>¿Cómo podemos ayudarte?</h2>
      <img src="Imagenes/salida.png" class="salir" alt="Cerrar">
      <a href="https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&emr=1&followup=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&ifkv=AXH0vVuznh3tW70rj_lnPjuR9wZVXFVPr73Bl8MRTIdgMXU1Q56F1nk_kjEXg1K6Hl146BrlLPaRSw&osid=1&passive=1209600&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-1828459910%3A1742386782972927">
        Enviar correo electrónico:<br>
        cotamosanti03@gmail.com
      </a>
      <a href="tel:+573106890146">
        Llamar al servicio de atención
      </a>
    `;
  
    // Agregar elementos al body
    document.body.appendChild(fondoOscuroAyuda);
    document.body.appendChild(ayudaButton);
    document.body.appendChild(ayudaWindow);
  
    // Asignar eventos
    ayudaButton.addEventListener('click', ayudab);
    fondoOscuroAyuda.addEventListener('click', salirAyuda);
    
    // Seleccionar el botón de salir correctamente
    const botonSalir = ayudaWindow.querySelector('.salir');
    botonSalir.addEventListener('click', function(e) {
      e.stopPropagation();
      salirAyuda();
    });
  }
  
  // Funciones de control para ayuda
  function ayudab() {
    document.getElementById("fondo-oscuro-ayuda").style.display = "block";
    document.getElementById("ayudav").style.display = "block";
  }
  
  function salirAyuda() {
    document.getElementById("ayudav").style.display = "none";
    document.getElementById("fondo-oscuro-ayuda").style.display = "none";
  }
  
  // Función para inicializar el módulo de ayuda
  function initAyudaModule() {
    addAyudaStyles();
    createAyudaElements();
    
    // Hacer funciones accesibles globalmente si es necesario
    window.ayudab = ayudab;
    window.salirAyuda = salirAyuda;
  }
  
  // Inicialización cuando el DOM esté listo
  document.addEventListener('DOMContentLoaded', function() {
    initAyudaModule();
  });