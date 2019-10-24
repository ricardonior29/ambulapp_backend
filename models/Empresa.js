var sql = require('../db.js');
/*
| NIT       | varchar(15)         | NO   | PRI | NULL    |       |
| Nombre    | varchar(45)         | NO   |     | NULL    |       |
| Direccion | varchar(45)         | NO   |     | NULL    |       |
| Telefono  | bigint(20) unsigned | NO   |     | NULL    |       |*/

var empresa = function(empresa){
    this.NIT = empresa.NIT;
    this.Nombre = empresa.Nombre;
    this.Direccion = empresa.Direccion;
    this.Telefono = empresa.Telefono;
}

empresa.mostrarEmpresas = function(resultado) {
    sql.query("SELECT * FROM Empresas", function (err, res) {

        if(err) {
            console.log("error: ", err);
            resultado(null, err);
        }
        else{
            //console.log('empresas : ', res);  
            resultado(null, res);
        }
    });
};

empresa.mostrarEmpresaporNIT = function(id, resultado) {
    sql.query("CALL pro_getEmpresabyNIT(?)", id, function (err, res) {

        if(err) {
            console.log("error: ", err);
            resultado(null, err);
        }
        else{
            //console.log('empresa : ', res);  
            resultado(null, res);
        }
    });
};

module.exports = empresa;