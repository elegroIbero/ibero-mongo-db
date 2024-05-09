
use("dbibero");

db.arbitros.drop();

db.arbitros.insertMany([
	{
		cid: 1,
		nomarb: "Juan Peres Herrera"
	},
	{
		cid: 2,
		nomarb: "Maria Camila Paez"
	},
]);