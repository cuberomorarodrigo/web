const elecciones = {
    piedra: { nombre: "Piedra", icono: "✊" },
    papel: { nombre: "Papel", icono: "✋" },
    tijera: { nombre: "Tijera", icono: "✌️" }
};

const venceA = {
    piedra: "tijera",
    papel: "piedra",
    tijera: "papel"
};

const puntuacion = {
    jugador: 0,
    maquina: 0
};

let rondasJugadas = 0;
let partidaFinalizada = false;

const marcadorJugador = document.getElementById("marcador-jugador");
const marcadorMaquina = document.getElementById("marcador-maquina");
const progreso = document.getElementById("progreso");
const eleccionJugador = document.getElementById("eleccion-jugador");
const elementoEleccionMaquina = document.getElementById("eleccion-maquina");
const nombreJugador = document.getElementById("nombre-jugador");
const nombreMaquina = document.getElementById("nombre-maquina");
const mensaje = document.getElementById("mensaje");
const historial = document.getElementById("historial");
const botonesEleccion = document.querySelectorAll("[data-eleccion]");

function elegirAleatoriamente() {
    const opciones = Object.keys(elecciones);
    return opciones[Math.floor(Math.random() * opciones.length)];
}

function determinarGanador(jugador, maquina) {
    if (jugador === maquina) {
        return "empate";
    }

    return venceA[jugador] === maquina ? "jugador" : "maquina";
}

function mostrarEleccion(elemento, nombreElemento, eleccion) {
    elemento.textContent = elecciones[eleccion].icono;
    elemento.setAttribute("aria-label", elecciones[eleccion].nombre);
    nombreElemento.textContent = elecciones[eleccion].nombre;
}

function registrarRonda(resultado, jugador, maquina) {
    const item = document.createElement("li");
    const textoResultado = {
        jugador: "Ganas",
        maquina: "Gana la máquina",
        empate: "Empate"
    };

    item.className = `rounds__item rounds__item--${resultado}`;
    item.textContent = `Ronda ${rondasJugadas}: ${textoResultado[resultado]} · ${elecciones[jugador].nombre} / ${elecciones[maquina].nombre}`;
    historial.appendChild(item);
}

function finalizarPartida() {
    partidaFinalizada = true;
    botonesEleccion.forEach((boton) => {
        boton.disabled = true;
    });

    progreso.textContent = `Partida finalizada · ${puntuacion.jugador} : ${puntuacion.maquina}`;

    if (puntuacion.jugador > puntuacion.maquina) {
        return "¡Has ganado la partida!";
    }
    if (puntuacion.maquina > puntuacion.jugador) {
        return "La máquina gana la partida.";
    }
    return "La partida termina en empate.";
}

function jugar(eleccion) {
    if (partidaFinalizada || !elecciones[eleccion]) {
        return;
    }

    const maquina = elegirAleatoriamente();
    const resultado = determinarGanador(eleccion, maquina);

    rondasJugadas += 1;
    mostrarEleccion(eleccionJugador, nombreJugador, eleccion);
    mostrarEleccion(elementoEleccionMaquina, nombreMaquina, maquina);

    if (resultado === "jugador") {
        puntuacion.jugador += 1;
        mensaje.textContent = "¡Ganas esta ronda!";
        mensaje.className = "round-result round-result--win";
    } else if (resultado === "maquina") {
        puntuacion.maquina += 1;
        mensaje.textContent = "La máquina gana esta ronda.";
        mensaje.className = "round-result round-result--loss";
    } else {
        mensaje.textContent = "Empate en esta ronda.";
        mensaje.className = "round-result round-result--draw";
    }

    marcadorJugador.textContent = puntuacion.jugador;
    marcadorMaquina.textContent = puntuacion.maquina;
    registrarRonda(resultado, eleccion, maquina);

    if (puntuacion.jugador === 3 || puntuacion.maquina === 3 || rondasJugadas === 5) {
        mensaje.textContent += ` ${finalizarPartida()}`;
    } else {
        progreso.textContent = `Ronda ${rondasJugadas + 1} de 5`;
    }
}

function reiniciarPartida() {
    puntuacion.jugador = 0;
    puntuacion.maquina = 0;
    rondasJugadas = 0;
    partidaFinalizada = false;

    marcadorJugador.textContent = "0";
    marcadorMaquina.textContent = "0";
    progreso.textContent = "Primero en ganar 3 rondas · máximo 5 rondas";
    eleccionJugador.textContent = "?";
    elementoEleccionMaquina.textContent = "?";
    eleccionJugador.setAttribute("aria-label", "Sin elección");
    elementoEleccionMaquina.setAttribute("aria-label", "Sin elección");
    nombreJugador.textContent = "Elige una jugada";
    nombreMaquina.textContent = "Esperando...";
    mensaje.textContent = "¿Preparado? Elige piedra, papel o tijera.";
    mensaje.className = "round-result";
    historial.replaceChildren();

    botonesEleccion.forEach((boton) => {
        boton.disabled = false;
    });
}

botonesEleccion.forEach((boton) => {
    boton.addEventListener("click", () => {
        jugar(boton.dataset.eleccion);
    });
});

document.getElementById("reiniciar").addEventListener("click", reiniciarPartida);
