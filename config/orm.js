var connection = require("./connection.js");

// Object Relational Mapper (ORM)

var orm = {
  selectAll: function(table) {
    var queryString = "SELECT * FROM ??";
    connection.query(queryString, [table], function(err, result, cb) {
      // console.log(result);
    });
  },
  insertOne: function(table, burger_name, devoured) {
    var queryString = "INSERT (burger_name, devoured, date) INTO ?? VALUES (?,?,?)"; 
    console.log(queryString);
    connection.query(queryString, [table, burger_name, devoured, Date.now()], function(err, result) {
      // console.log(result);
    });
  },

  updateOne: function(table, devoured, id) {
    UPDATE burgers set devoured = FALSE WHERE id=1;
    var queryString = "UPDATE ?? SET devoured = ? WHERE id=?";

    connection.query(queryString, [table, devoured, id], function(err, result) {
      // console.log(result);
    });
  }
}

module.exports = orm;
