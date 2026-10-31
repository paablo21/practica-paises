import { LOCALE } from "./config.js";

export function crearElemento(etiqueta, clase, texto = "") {

    const elemento = document.createElement(etiqueta);

    elemento.textContent = texto;

    if (clase) {
        elemento.classList.add(clase);
    }

    return elemento;
}

export function formatearPoblacion(numero) {

    return numero.toLocaleString(LOCALE);
}

export function ordenarListaPorDataset(lista, campo) {

    const elementos = Array.from(lista.children);

    elementos.sort((a, b) => Number(b.dataset[campo]) - Number(a.dataset[campo]));

    for (const elemento of elementos) {
        lista.appendChild(elemento);
    }
}
