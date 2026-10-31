import { CLAVE_FAVORITOS } from "./config.js";

export function leerFavoritos() {

    const texto = localStorage.getItem(CLAVE_FAVORITOS);

    if (!texto) {
        return [];
    }

    try {

        const favoritos = JSON.parse(texto);

        if (!Array.isArray(favoritos)) {
            return [];
        }

        return favoritos;

    } catch (error) {

        return [];
    }
}

export function guardarFavoritos(favoritos) {

    localStorage.setItem(CLAVE_FAVORITOS, JSON.stringify(favoritos));
}
