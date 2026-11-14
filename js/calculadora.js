const pantalla = document.getElementById("pantalla");
const teclas = document.querySelector(".calculator__keys");

let entrada = "0";
let valorGuardado = null;
let operadorPendiente = null;
let nuevaEntrada = false;

function actualizarPantalla() {
    pantalla.textContent = entrada;
}

function limpiar() {
    entrada = "0";
    valorGuardado = null;
    operadorPendiente = null;
    nuevaEntrada = false;
    actualizarPantalla();
}

function escribirDigito(digito) {
    if (entrada === "Error" || nuevaEntrada) {
        entrada = digito;
        nuevaEntrada = false;
    } else if (entrada === "0") {
        entrada = digito;
    } else {
        entrada += digito;
    }

    actualizarPantalla();
}

function escribirDecimal() {
    if (entrada === "Error" || nuevaEntrada) {
        entrada = "0.";
        nuevaEntrada = false;
    } else if (!entrada.includes(".")) {
        entrada += ".";
    }

    actualizarPantalla();
}

function calcular(izquierda, derecha, operador) {
    switch (operador) {
        case "+":
            return izquierda + derecha;
        case "-":
            return izquierda - derecha;
        case "*":
            return izquierda * derecha;
        case "/":
            return derecha === 0 ? NaN : izquierda / derecha;
        default:
            return NaN;
    }
}

function formatearResultado(resultado) {
    return String(Number(resultado.toPrecision(12)));
}

function resolverOperacion() {
    const resultado = calcular(valorGuardado, Number(entrada), operadorPendiente);

    if (!Number.isFinite(resultado)) {
        entrada = "Error";
        valorGuardado = null;
        operadorPendiente = null;
        nuevaEntrada = true;
        actualizarPantalla();
        return false;
    }

    entrada = formatearResultado(resultado);
    valorGuardado = resultado;
    nuevaEntrada = true;
    actualizarPantalla();
    return true;
}

function elegirOperador(operador) {
    if (entrada === "Error") {
        return;
    }

    if (operadorPendiente && !nuevaEntrada) {
        if (!resolverOperacion()) {
            return;
        }
    } else {
        valorGuardado = Number(entrada);
    }

    operadorPendiente = operador;
    nuevaEntrada = true;
}

function borrarUltimo() {
    if (entrada === "Error" || nuevaEntrada) {
        entrada = "0";
        nuevaEntrada = false;
    } else if (entrada.length <= 1 || (entrada.length === 2 && entrada.startsWith("-"))) {
        entrada = "0";
    } else {
        entrada = entrada.slice(0, -1);
    }

    actualizarPantalla();
}

function manejarAccion(accion, valor) {
    switch (accion) {
        case "digit":
            escribirDigito(valor);
            break;
        case "decimal":
            escribirDecimal();
            break;
        case "operator":
            elegirOperador(valor);
            break;
        case "equals":
            if (operadorPendiente) {
                if (nuevaEntrada) {
                    entrada = String(valorGuardado);
                }
                resolverOperacion();
                operadorPendiente = null;
            }
            break;
        case "clear":
            limpiar();
            break;
        case "delete":
            borrarUltimo();
            break;
    }
}

teclas.addEventListener("click", (evento) => {
    const boton = evento.target.closest("button");
    if (!boton || !teclas.contains(boton)) {
        return;
    }

    manejarAccion(boton.dataset.action, boton.dataset.value);
});

document.addEventListener("keydown", (evento) => {
    if (/^\d$/.test(evento.key)) {
        manejarAccion("digit", evento.key);
    } else if (evento.key === "." || evento.key === ",") {
        manejarAccion("decimal");
    } else if (["+", "-", "*", "/"].includes(evento.key)) {
        manejarAccion("operator", evento.key);
    } else if (evento.key === "Enter" || evento.key === "=") {
        manejarAccion("equals");
    } else if (evento.key === "Backspace") {
        manejarAccion("delete");
    } else if (evento.key === "Escape") {
        manejarAccion("clear");
    } else {
        return;
    }

    evento.preventDefault();
});
