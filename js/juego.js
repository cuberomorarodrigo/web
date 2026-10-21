
function juego(jugador, máquina) {
        const opciones = ["piedra", "papel", "tijera"];
        const maquina = opciones[Math.floor(Math.random() * opciones.length)];
        let mensaje;

        const ejemplo = "coche";

if (jugador == máquina) { 
    mensaje = "Empate";
}

else if (
        (jugador == "piedra" && máquina == "tijera") ||
        (jugador == "tijera" && máquina == "papel")  ||
        (jugador == "papel" && máquina == "piedra") 
)
        {mensaje = "Gana el jugador";
}

else {
        mensaje = "Gana la máquina";
}
}

let jugador1 = "piedra"; let máquina1 = "piedra";
juego(jugador1, máquina1);

let jugador2 = "piedra"; let máquina2 = "tijera";
juego(jugador2, máquina2);

juego("papel", "tijera");