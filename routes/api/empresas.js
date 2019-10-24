const express = require("express");
const router = express.Router();

var Empresa = require('../../models/Empresa.js');

router.get("/", (req, res) => { //muestra todos las empresas en la bd
    Empresa.mostrarEmpresas(function(err, empresa) {
        if (err)
            res.send(err);
            //console.log('res ', empresa);
            res.send(empresa);
      });
});

router.get("/:id", (req, res) => { //consulta la empresa por NIT
    Empresa.mostrarEmpresaporNIT(req.params.id, function(err, empresa) {
        if (err)
            res.send(err);
        //console.log(empresa.RowDataPacket);
        res.send(empresa[0][0]);
      });
});

module.exports = router;