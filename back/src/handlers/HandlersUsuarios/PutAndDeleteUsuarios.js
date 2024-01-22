const { updateUsuario,updateEstadoUsuario } = require("../../Controladores/controllers_Usuaruios/putUsuarios");
const { deleteUsuario } = require("../../Controladores/controllers_Usuaruios/deleteUsuarios");

const putUsuarioHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, apellido, email, telefono, contraseña,isadmin } = req.body;
        const respuesta = await updateUsuario(id, name, apellido, email, telefono, contraseña,isadmin);
        if (respuesta === "No se encontro el usuario") res.status(400).json(respuesta);
        else res.status(200).json(respuesta);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const deleteUsuarioHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const respuesta = await deleteUsuario(id);
        if (respuesta === "No se encontro el usuario") res.status(400).json(respuesta);
        else res.status(200).json(respuesta);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const putUsuarioEstadoHandler = async (req, res) => {
    try {
        const { id, nuevoEstado } = req.body;
        console.log( "log handler args PutNuevoEstadoUsuario", id, nuevoEstado)
        const respuesta = await updateEstadoUsuario(id, nuevoEstado);
        if (respuesta === "No se encontro el usuario") {
            res.status(400).json(respuesta);
        }else{
          res.status(200).json(respuesta);
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    putUsuarioHandler,
    deleteUsuarioHandler,
    putUsuarioEstadoHandler
};