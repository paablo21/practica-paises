import { TEXTO_BUSCAR, TEXTO_BUSCANDO } from "./config.js";
import { obtenerPais } from "./api.js";
import { crearTarjetaPais, crearAviso, marcarBotonFavorito } from "./vista.js";
import { iniciarFavoritos, anadirFavorito, esFavorito } from "./favoritos.js";

const formBusqueda = document.querySelector("#form-busqueda");
const inputPais = document.querySelector("#input-pais");
const btnBuscar = document.querySelector("#btn-buscar");
const resultado = document.querySelector("#resultado-busqueda");

const listaFavoritos = document.querySelector("#lista-favoritos");
const sinFavoritos = document.querySelector("#sin-favoritos");
const btnOrdenar = document.querySelector("#btn-ordenar");

let paisActual = null;

async function buscarPais(evento) {

    evento.preventDefault();

    const nombrePais = inputPais.value.trim();

    if (nombrePais === "") {
        return;
    }

    btnBuscar.disabled = true;
    btnBuscar.textContent = TEXTO_BUSCANDO;

    try {

        paisActual = await obtenerPais(nombrePais);

        const tarjeta = crearTarjetaPais(paisActual, esFavorito(paisActual.codigo));

        resultado.replaceChildren(tarjeta);

    } catch (error) {

        paisActual = null;

        resultado.replaceChildren(crearAviso(error.message));

    } finally {

        btnBuscar.disabled = false;
        btnBuscar.textContent = TEXTO_BUSCAR;

        inputPais.value = "";
        inputPais.focus();
    }
}

function manejarClicResultado(evento) {

    const boton = evento.target.closest(".btn-favorito");

    if (!boton || !paisActual) {
        return;
    }

    anadirFavorito(paisActual);

    marcarBotonFavorito(boton);
}

formBusqueda.addEventListener("submit", buscarPais);
resultado.addEventListener("click", manejarClicResultado);

iniciarFavoritos(listaFavoritos, sinFavoritos, btnOrdenar);
