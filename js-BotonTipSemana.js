function addFloatingTipStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .tip {
      position: fixed;
      bottom: 160px;
      right: 20px;
      z-index: 999;
      display: flex;
      align-items: center;
      text-decoration: none;
      cursor: pointer;
    }

    .tip img {
      width: 50px;
      height: auto;
      transition: all 0.3s ease;
      order: 2;
    }

    .tip .tooltip-text {
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

    .tip:hover img {
      transform: scale(1.1);
    }

    .tip:hover .tooltip-text {
      visibility: visible;
      width: 220px;
      opacity: 1;
      padding: 8px 12px;
    }

    .gif {
      height: 200px;
    }

    .ventana-tip {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      width: 45%;
      max-width: 600px;
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

    .ventana-tip p {
      font-size: 15px;
    }

    .salir {
      height: 7%;
      position: absolute;
      right: 10px;
      top: 15px;
      cursor: pointer;
    }

    #fondo-oscuro {
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

function createFloatingTipElements() {
  // Fondo oscuro
  const fondoOscuro = document.createElement('div');
  fondoOscuro.id = 'fondo-oscuro';
  fondoOscuro.style.display = 'none';
  
  // Botón flotante
  const tipButton = document.createElement('div');
  tipButton.className = 'tip';
  tipButton.innerHTML = `
    <img src="Imagenes/tip2.jpg" alt="WhatsApp">
    <span class="tooltip-text">¡TIP DE LA SEMANA!</span>
  `;
  
  // Ventana
  const tipWindow = document.createElement('div');
  tipWindow.className = 'ventana-tip';
  tipWindow.id = 'tipv';
  tipWindow.style.display = 'none';
  tipWindow.innerHTML = `
    <div class="salir-container">
      <img src="Imagenes/salida.png" class="salir" alt="Cerrar">
    </div>
    <h1><strong>¡TIP DE LA SEMANA!</strong></h1>
    <img src="Imagenes/gato.gif" class="gif" alt="Gato">
    <h2>Cuida la nutrición de tu gatito</h2>
    <p>Si nunca has tenido un gato, es fácil que te dejes llevar por los mitos de la nutrición felina que existen, y, debido al desconocimiento, esto pueda provocar que alimentes a tu nueva mascota con alimentos prohibidos para los felinos, como, la leche de vaca, los huevos crudos o la carne cruda, alimentos que pueden afectar severamente el bienestar de un felino.</p>
  `;

  // Agregar elementos al body
  document.body.appendChild(fondoOscuro);
  document.body.appendChild(tipButton);
  document.body.appendChild(tipWindow);

  // Event listeners
  tipButton.addEventListener('click', tipb);
  fondoOscuro.addEventListener('click', salir);
  
  // Event listener para el botón de salir (modificado)
  tipWindow.querySelector('.salir').addEventListener('click', function(e) {
    e.stopPropagation(); // Evita que el evento se propague al fondo oscuro
    salir();
  });
}

function tipb() {
  document.getElementById("fondo-oscuro").style.display = "block";
  document.getElementById("tipv").style.display = "block";
}

function salir() {
  document.getElementById("tipv").style.display = "none";
  document.getElementById("fondo-oscuro").style.display = "none";
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  addFloatingTipStyles();
  createFloatingTipElements();
});