const express = require("express");
const router = express.Router();

var EPS = require('../../models/EPS.js');

router.get("/", (req, res) => { //muestra todas las EPS en la bd
    EPS.mostrarEPS(function(err, eps) {
        if (err)
            res.send(err);
            //console.log('res ', solicitud);
            res.send(eps);
      });
});

router.get("/:id", (req, res) => { //consulta la EPS por codigo segugn la TABLA DE CODIGOS DE ENTIDADES ADMINISTRADORAS DE PLANES DE BENEFICIOS
    EPS.mostrarEPSporCodigo(req.params.id, function(err, eps) {
        if (err)
            res.send(err);
        //console.log(paciente.RowDataPacket);
        res.send(eps[0][0]);
      });
});

module.exports = router;