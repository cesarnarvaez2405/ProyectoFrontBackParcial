import React, { useEffect, useState } from "react"
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import './empresa.css'

import * as empresaServer from './empresaServer'


const EmpresaList = () => {
    const [empresa, setEmpresas] = useState([]);
    const [datos, setDatos] = useState({ nombreEmpresa: '', direccion: '', nit: '', telefonoEmpresa: '' });

    const listEmpresa = async () => {
        try {
            const rest = await empresaServer.listEmpresa();
            const data = await rest.json();
            setEmpresas(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        listEmpresa();
    }, []);

    const enviarDatos = async (event) => {
        try {
            let res;
            event.preventDefault();
            console.log(datos.nombreEmpresa + datos.direccion + datos.nit + datos.telefonoEmpresa)
            res = await empresaServer.crearEmpresa(datos);
            const data = await res.json();
            console.log(data)
            listEmpresa();

        } catch (error) {
            console.log(error);
        }
    }

    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    const handleDelete = async (empresaId) => {
        await empresaServer.deleteEmpresa(empresaId)
        listEmpresa();
    }

    const handleUpdate = async (id, nombreEmpresa, direccion, nit, telefonoEmpresa) => {
        const datosUpdate = {
            id: id,
            nombreEmpresa: nombreEmpresa,
            direccion: direccion,
            nit: nit,
            telefonoEmpresa: telefonoEmpresa
        }

        console.log(datosUpdate)
    }


    return (
        <div id="formC" className="col-md-12" style={{ marginLeft: 20 }}>
            <div id="formulario" className="col-md-12">
                <div id="titulo">
                    <h3>Crear Empresas</h3>
                </div>
                <form id="datos_formulario" onSubmit={enviarDatos}>
                    <label id="idLabel">Nombre</label>
                    <input id="idinput" type="text" className="form-control" name="nombreEmpresa" onChange={handleInputChange} placeholder="Ingrese el nombre" />
                    <label id="idLabel" >Direccion</label>
                    <input id="idinput" type="text" className="form-control" name="direccion" onChange={handleInputChange} placeholder="Ingrese la direccion" />
                    <label id="idLabel" >Nit</label>
                    <input id="idinput" type="text" className="form-control" name="nit" onChange={handleInputChange} placeholder="Ingrese el Nit de la empresa" />
                    <label id="idLabel">Telefono</label>
                    <input id="idinput" type="text" className="form-control" name="telefonoEmpresa" onChange={handleInputChange} placeholder="Ingrese el numero de telefono" />
                    <div id="divBoton">
                        <Button className="btn-success" type="submit" >Enviar</Button>
                    </div>
                </form>
            </div>
            <div id="divTabla">
                <div id="titulo">
                    <h3>Listado de Empresas</h3>
                </div>
                <table className='table table-bordered ' id='empresa' width="100%">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Dirección</th>
                            <th scope="col" >Nit</th>
                            <th scope="col">Telefono</th>
                            <th scope="col">Opciones</th>
                        </tr>
                    </thead>
                    {empresa.map(listadoEmpresas => (
                        <tbody>
                            <tr key={listadoEmpresas.id}>
                                <td>{listadoEmpresas.nombreEmpresa}</td>
                                <td>{listadoEmpresas.direccion}</td>
                                <td>{listadoEmpresas.nit}</td>
                                <td>{listadoEmpresas.telefonoEmpresa}</td>
                                <td><button className="btn btn-danger" onClick={() => listadoEmpresas.id && handleDelete(listadoEmpresas.id)} >Eliminar</button></td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => handleUpdate(listadoEmpresas.id, listadoEmpresas.nombreEmpresa, listadoEmpresas.direccion, listadoEmpresas.nit, listadoEmpresas.telefonoEmpresa)}>Editar</button>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </div>
    )
}

export default EmpresaList;