function juego(jugador, máquina) {

if (jugador == máquina) {
    console.log("Empate");
}

else if (
        (jugador == "piedra" && máquina == "tijera") ||
        (jugador == "tijera" && máquina == "papel")  ||
        (jugador == "papel" && máquina == "piedra") 
)
        {console.log("Gana el jugador");
}

else {console.log("Gana la máquina");
}
}

let jugador1 = "piedra"; let máquina1 = "piedra";
juego(jugador1, máquina1);

let jugador2 = "piedra"; let máquina2 = "tijera";
juego(jugador2, máquina2);

juego("papel", "tijera");