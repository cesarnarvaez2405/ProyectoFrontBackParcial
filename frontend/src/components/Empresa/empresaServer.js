const API_URL = "http://127.0.0.1:8000";

export const listEmpresa = async () => {
    return await fetch(API_URL + "/listar/");
}

export const crearEmpresa = async (newEmpresa) => {
    return await fetch(API_URL + "/crear/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "nombreEmpresa": String(newEmpresa.nombreEmpresa), //.trim(),
            "direccion": String(newEmpresa.direccion).trim(),
            "nit": String(newEmpresa.nit).trim(),
            "telefonoEmpresa": parseInt(newEmpresa.telefonoEmpresa),
        })
    })
}

export const deleteEmpresa = async (empresaId) => {
    return await fetch(`${API_URL + "/eliminar/"}${empresaId}/`, {
        method: 'DELETE'

    });
}

export const updateEmpresa = async (empresaId, newEmpresa) => {
    return await fetch(`${API_URL + "/actualizar/"}${empresaId}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "nombreEmpresa": String(newEmpresa.nombreEmpresa).trim(),
            "direccion": String(newEmpresa.direccion).trim(),
            "nit": String(newEmpresa.nit).trim(),
            "telefonoEmpresa": parseInt(newEmpresa.telefonoEmpresa),
        })
    });
}
