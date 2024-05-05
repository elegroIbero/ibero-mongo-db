/* global use, db */
// MongoDB Playground

use("db_by_tejote");

db.getCollection("deportistas").insertMany([
	{
		cid: 111049192,
		nomdep: "Juan Peres Herrera",
		edad: 20,
		equipo_id: "E1",
	},
	{
		cid: 111049193,
		nomdep: "Maria Camila Paez",
		edad: 20,
		equipo_id: "E1"
	},
	{
		cid: 89122001,
		nomdep: "Jhon Rodriguez",
		edad: 25,
		equipo_id: "E1"
	}
]);

db.getCollection("deportistas").insertMany([
	{
		cid: 111023230,
		nomdep: "Mario Forteca",
		edad: 25,
		equipo_id: "E2",
	},
	{
		cid: 98344456,
		nomdep: "Calos Medina",
		edad: 30,
		equipo_id: "E2"
	},
	{
		cid: 98833443,
		nomdep: "Daniel Villa",
		edad: 37,
		equipo_id: "E2"
	},
]);

db.getCollection("deportistas").insertMany([
	{
		cid: 89022334,
		nomdep: "Daniela Lopez",
		edad: 35,
		equipo_id: "E3"
	},
	{
		cid: 112110000,
		nomdep: "Kevin David Medina",
		edad: 21,
		equipo_id: "E3",
	},
	{
		cid: 111000012,
		nomdep: "Jairo Camargo",
		edad: 27,
		equipo_id: "E3"
	},
]);

db.getCollection("deportistas").insertMany([
	{
		cid: 111402100,
		nomdep: "Mariana Capera",
		edad: 18,
		equipo_id: "E4"
	},
	{
		cid: 812230000,
		nomdep: "Karen Mendez",
		edad: 17,
		equipo_id: "E4"
	},
	{
		cid: 871222332,
		nomdep: "Susana Restrepo",
		edad: 19,
		equipo_id: "E4"
	},
]);

db.getCollection("deportistas").insertMany([
	{
		cid: 7500760,
		nomdep: "Ramon Ramirez",
		edad: 44,
		equipo_id: "E5"
	},
	{
		cid: 8922340,
		nomdep: "El Doctor Gallego",
		edad: 54,
		equipo_id: "E5"
	},
	{
		cid: 9822324,
		nomdep: "Beto Sanchez",
		edad: 48,
		equipo_id: "E5",
	},
]);


db.deportistas.find();