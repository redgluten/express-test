var dbConf = require('../conf/dbCredentials.json');
var mysql  = require('mysql');

exports.connect = function() {
  var dbConnection = mysql.createConnection({
      host: dbConf.host,
      user: dbConf.user,
      password: dbConf.password,
      database: dbConf.database
    }
  );

  dbConnection.connect(function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Connecté à MySQL');
    }
  });
}
