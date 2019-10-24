var sql = require('../db.js');
/*
| Numero_documento | bigint(20) unsigned | NO   | PRI | NULL    |       |
| Tipo_documento   | varchar(2)          | NO   |     | NULL    |       |
| Nombres          | varchar(30)         | NO   |     | NULL    |       |
| Apellidos        | varchar(30)         | NO   |     | NULL    |       |
| Tipo_sanguineo   | varchar(3)          | YES  |     | NULL    |       |
| EPS              | varchar(6)          | YES  | MUL | NULL    |       |*/

var paciente = function(paciente){
    this.Numero_documento = paciente.Numero_documento;
    this.Tipo_documento = paciente.Tipo_documento;
    this.Nombres = paciente.Nombres;
    this.Apellidos = paciente.Apellidos;
    this.Tipo_sanguineo = paciente.Tipo_sanguineo;
    this.EPS = paciente.EPS; // revisasr si objeto
}

paciente.mostrarPacientes = function(resultado) {
    sql.query("SELECT * FROM Pacientes", function (err, res) {

        if(err) {
            console.log("error: ", err);
            resultado(null, err);
        }
        else{
            //console.log('solicitudes : ', res);  
            resultado(null, res);
        }
    });
};

paciente.mostrarPacienteporDocumento = function(id, resultado) {
    sql.query("CALL pro_getPacientebyDoc(?)", id, function (err, res) {

        if(err) {
            console.log("error: ", err);
            resultado(null, err);
        }
        else{
            //console.log('paciente : ', res);  
            resultado(null, res);
        }
    });
};

module.exports = paciente;