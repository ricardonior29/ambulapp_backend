var sql = require('../db.js');
/*
| Codigo | varchar(6)   | NO   | PRI | NULL    |       |
| Nombre | varchar(100) | NO   |     | NULL    |       |*/

var EPS = function(eps){
    this.Codigo = eps.Codigo;
    this.Nombre = eps.Nombre;
}

EPS.mostrarEPS = function(resultado) {
    sql.query("SELECT * FROM EPS", function (err, res) {

        if(err) {
            console.log("error: ", err);
            resultado(null, err);
        }
        else{
            //console.log('EPS : ', res);  
            resultado(null, res);
        }
    });
};

EPS.mostrarEPSporCodigo = function(id, resultado) {
    sql.query("CALL pro_getEPSbyCodigo(?)", id, function (err, res) {

        if(err) {
            console.log("error: ", err);
            resultado(null, err);
        }
        else{
            //console.log('EPS : ', res);  
            resultado(null, res);
        }
    });
};

module.exports = EPS;