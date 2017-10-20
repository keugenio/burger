var orm = require("./config/orm.js");

// Find all the pets ordering by the lowest price to the highest price.
orm.selectAndOrder("party_name", "parties", "party_cost");

// Find a pet in the pets table by an animal_name of Rachel.
var data = orm.selectWhere("parties", "party_name", "Cigar", function() {
	console.log(data);
});

// Find the buyer with the most pets.
orm.findWhoHasMost("client_name", "client_id", "clients", "parties");

// orm.addClientAndParty("Bilal", "parties", "party for bob", "adult", 500);

