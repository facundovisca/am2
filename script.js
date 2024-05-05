// Array de frases
const frases = [
    "No fueron 30.000",
    "No va a hacer lo que dijo",
    "El congreso no lo va a dejar",
    "La universidad pública adoctrina",
    "El estado es un enemigo",
    "La ESI deforma la cabeza",
    "La venta de humanos es una discusión filosófica",
    "El calentamiento global es una mentira socialista"
];

// Arreglo para almacenar los sonidos
const sonidos = [
    "s1.mp3",
    "s2.mp3",
    "s3.mp3",
    "s4.mp3",
    "s5.mp3",
    "s6.mp3",
    "s7.mp3",
    "s8.mp3"
];

let contadorClics = 0; // Contador de clics en el botón de cerrar frase
let volumen = 0.1; // Volumen inicial
let ventanasPorCierre = 1; // Número inicial de ventanas creadas por cada cierre

// Función para obtener una frase aleatoria del array
function obtenerFraseAleatoria() {
    const indice = Math.floor(Math.random() * frases.length);
    return frases[indice];
}

// Función para crear un elemento con la frase en una posición aleatoria y reproducir un sonido aleatorio
function crearElementoFrase() {
    // Crea el elemento div
    const div = document.createElement("div");
    // Agrega la clase "frase"
    div.classList.add("frase");
    // Establece el texto con una frase aleatoria
    div.textContent = obtenerFraseAleatoria();
    // Genera posiciones aleatorias dentro de la pantalla con un margen de 20px en todos los lados
    const posX = Math.max(20, Math.min(Math.random() * (window.innerWidth - 330), window.innerWidth - 330)); // El ancho del botón es 150px, dejamos un margen de 20px
    const posY = Math.max(20, Math.min(Math.random() * (window.innerHeight - 160), window.innerHeight - 160)); // El alto del botón es 150px, dejamos un margen de 20px
    // Establece la posición del elemento
    div.style.left = posX + "px";
    div.style.top = posY + "px";
    // Establece el margen derecho a 10px más
    div.style.marginRight = "10px";
    // Establece el margen inferior a 0 si la frase está en la parte inferior de la pantalla
    if (posY + div.clientHeight >= window.innerHeight) {
        div.style.marginBottom = "0";
    }
    // Reproduce un sonido aleatorio
    reproducirSonidoAleatorio();
    // Crea el botón "X" para generar nuevas frases
    const closeButton = document.createElement("button");
    closeButton.textContent = "X";
    closeButton.classList.add("close-button");
    closeButton.addEventListener("click", () => {
        // Genera un número progresivo de nuevas frases
        const numFrases = Math.min(ventanasPorCierre, 20);
        for (let i = 0; i < numFrases; i++) {
            crearElementoFrase();
        }
        div.remove(); // Elimina el elemento actual
        contadorClics++; // Incrementa el contador de clics
        // Aumenta el número de ventanas creadas por cada cierre
        ventanasPorCierre++;
    });
    // Agrega el botón "X" al elemento div
    div.appendChild(closeButton);
    // Agrega el elemento al cuerpo del documento
    document.body.appendChild(div);
}

// Función para reproducir un sonido aleatorio
function reproducirSonidoAleatorio() {
    const sonidoAleatorio = sonidos[Math.floor(Math.random() * sonidos.length)];
    const audio = new Audio(`sound/${sonidoAleatorio}`);
    audio.volume = volumen; // Establece el volumen fijo
    audio.play();
}

// Obtiene el botón
const button = document.querySelector(".btn");
// Agrega un event listener para el clic en el botón
button.addEventListener("click", crearElementoFrase);

