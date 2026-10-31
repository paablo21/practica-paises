import { crearElemento, formatearPoblacion } from "./dom.js";

export function crearTarjetaPais(pais, yaEsFavorito) {

    const tarjeta = crearElemento("article", "tarjeta-pais");

    const bandera = crearElemento("img", "tarjeta-pais__bandera");

    bandera.src = pais.bandera;
    bandera.alt = `Bandera de ${pais.nombre}`;

    const nombre = crearElemento("h3", "", pais.nombre);

    const capital = crearElemento("p", "", "Capital: " + pais.capital);
    const region = crearElemento("p", "", "Región: " + pais.region);
    const poblacion = crearElemento("p", "", "Población: " + formatearPoblacion(pais.poblacion));

    const boton = crearElemento("button", "btn-favorito", "Añadir a favoritos");

    if (yaEsFavorito) {
        marcarBotonFavorito(boton);
    }

    tarjeta.appendChild(bandera);
    tarjeta.appendChild(nombre);
    tarjeta.appendChild(capital);
    tarjeta.appendChild(region);
    tarjeta.appendChild(poblacion);
    tarjeta.appendChild(boton);

    return tarjeta;
}

export function marcarBotonFavorito(boton) {

    boton.disabled = true;
    boton.textContent = "Ya está en favoritos";
}

export function crearAviso(mensaje) {

    const aviso = crearElemento("p", "aviso-error", mensaje);

    aviso.setAttribute("role", "alert");

    return aviso;
}

export function crearElementoFavorito(pais) {

    const elemento = crearElemento("li", "favorito");

    elemento.dataset.codigo = pais.codigo;
    elemento.dataset.poblacion = pais.poblacion;

    const bandera = crearElemento("img", "favorito__bandera");

    bandera.src = pais.bandera;
    bandera.alt = "";

    const nombre = crearElemento("span", "favorito__nombre", pais.nombre);
    const poblacion = crearElemento("span", "favorito__poblacion", formatearPoblacion(pais.poblacion) + " hab.");

    const botonQuitar = crearElemento("button", "btn-quitar", "Quitar");

    elemento.appendChild(bandera);
    elemento.appendChild(nombre);
    elemento.appendChild(poblacion);
    elemento.appendChild(botonQuitar);

    return elemento;
}
