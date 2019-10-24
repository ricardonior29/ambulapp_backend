const express = require("express");
const router = express.Router();

var Solicitud = require('../../models/Solicitud.js');

router.get("/", (req, res) => { //muestra todas las solicitudes en la bd
    Solicitud.mostrarSolicitudes(function(err, solicitud) {
        if (err)
            res.send(err);
            //console.log('res ', solicitud);
            res.send(solicitud);
      });
});

router.get("/:id", (req, res) => { //consulta la solicitud por id
    Solicitud.mostrarSolicitudporId(req.params.id, function(err, solicitud) {
        if (err)
            res.send(err);
        //console.log(solicitud.RowDataPacket);
        res.send(solicitud[0][0]);
      });
});

router.get("/activas", (req, res) => { //consulta la solicitud por id
    Solicitud.mostrarSolicitudesActivas(function(err, solicitud) {
        if (err)
            res.send(err);
        /*if(solicitud == '')
            res.send('No hay solicitudes activas');*/
        //console.log('solicitud ', solicitud);
        res.send(solicitud);
      });
});

module.exports = router;

