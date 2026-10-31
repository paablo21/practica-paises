import { leerFavoritos, guardarFavoritos } from "./almacen.js";
import { crearElementoFavorito } from "./vista.js";
import { ordenarListaPorDataset } from "./dom.js";

let listaFavoritos;
let mensajeVacio;

let favoritos = [];

export function iniciarFavoritos(lista, mensaje, botonOrdenar) {

    listaFavoritos = lista;
    mensajeVacio = mensaje;

    favoritos = leerFavoritos();

    for (const pais of favoritos) {
        listaFavoritos.appendChild(crearElementoFavorito(pais));
    }

    actualizarMensajeVacio();

    listaFavoritos.addEventListener("click", manejarClicFavoritos);

    botonOrdenar.addEventListener("click", ordenarFavoritos);
}

export function esFavorito(codigo) {

    return listaFavoritos.querySelector(`[data-codigo="${codigo}"]`) !== null;
}

export function anadirFavorito(pais) {

    if (esFavorito(pais.codigo)) {
        return;
    }

    listaFavoritos.appendChild(crearElementoFavorito(pais));

    favoritos.push(pais);
    guardarFavoritos(favoritos);

    actualizarMensajeVacio();
}

function manejarClicFavoritos(evento) {

    const boton = evento.target.closest(".btn-quitar");

    if (!boton) {
        return;
    }

    const elemento = boton.closest("li");
    const codigo = elemento.dataset.codigo;

    elemento.remove();

    favoritos = favoritos.filter(pais => pais.codigo !== codigo);
    guardarFavoritos(favoritos);

    actualizarMensajeVacio();
}

function ordenarFavoritos() {

    ordenarListaPorDataset(listaFavoritos, "poblacion");

    favoritos.sort((a, b) => b.poblacion - a.poblacion);

    guardarFavoritos(favoritos);
}

function actualizarMensajeVacio() {

    mensajeVacio.classList.toggle("oculto", listaFavoritos.children.length > 0);
}
