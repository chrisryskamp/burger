// Import MySQL connection 
var connection = require ('./connection.js');

// Helper function for creating MySQL syntax
function printQuestionMarks(num) {
	var arr = [];

	for (var i = 0; i < num; i++) {
		arr.push("?");
	}

	return arr.toString();
}

// Helper function for creating MySQL syntax
function objToSql(ob) {
	var arr = [];

	for (var key in ob) {
		arr.push(key + "=" + ob[key]);
	}

	return arr.toString();
}

// ORM object for SQL queries
var orm = {
	
	selectAll: function(tableInput, cb) {
		
		var queryString = "SELECT * FROM " + tableInput + ";";

		// DB Query
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}

			// Return results in callback
			cb(result);
		});
	},

	insertOne: function(table, cols, vals, cb) {
		
		var queryString = "INSERT INTO " + table;

		queryString += " (";
		queryString += cols.toString();
		queryString += ") ";
		queryString += "VALUES (";
		queryString += printQuestionMarks(vals.length);
		queryString += ") ";

		console.log(queryString);

		// Database query
		connection.query(queryString, vals, function(err, result) {
			if (err) {
				throw err;
			}

			
			cb(result);
		});
	},

	updateOne: function(table, objColVals, condition, cb) {
		
		var queryString = "UPDATE " + table;

		queryString += " SET ";
		queryString += objToSql(objColVals);
		queryString += " WHERE ";
		queryString += condition;


		console.log(queryString);

		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}

			cb(result);
		});
	}
};

// Export ORM
module.exports = orm;
