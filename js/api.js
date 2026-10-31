import { URL_API } from "./config.js";

export async function obtenerPais(nombre) {

    const respuesta = await fetch(`${URL_API}${nombre}`);

    if (respuesta.status === 404) {
        throw new Error(`No se ha encontrado ningún país llamado "${nombre}"`);
    }

    if (!respuesta.ok) {
        throw new Error(`Error al buscar el país (codigo ${respuesta.status})`);
    }

    const datos = await respuesta.json();

    const pais = datos.find(p => p.name.toLowerCase() === nombre.toLowerCase()) ?? datos[0];

    return normalizarPais(pais);
}

function normalizarPais(datos) {

    return {
        codigo: datos.alpha3Code,
        nombre: datos.name,
        capital: datos.capital ?? "Sin capital",
        region: datos.region,
        poblacion: datos.population,
        bandera: datos.flags.png
    };
}
