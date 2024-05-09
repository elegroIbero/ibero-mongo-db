/* global use, db */
// MongoDB Playground

use("dbibero");

db.deportistas.drop();

db.deportistas.insertMany([
	{
		cid: 111049192,
		nomdep: "Juan Peres Herrera",
		edad: 20,
		equipo_id: "E1",
		genero: 'M'
	},
	{
		cid: 111049193,
		nomdep: "Maria Camila Paez",
		edad: 20,
		equipo_id: "E1",
		genero: 'F'
	},
	{
		cid: 89122001,
		nomdep: "Jhon Rodriguez",
		edad: 25,
		equipo_id: "E1",
		genero: 'M'
	}
]);

db.deportistas.insertMany([
	{
		cid: 111023230,
		nomdep: "Mario Forteca",
		edad: 25,
		equipo_id: "E2",
		genero: 'M'
	},
	{
		cid: 98344456,
		nomdep: "Calos Medina",
		edad: 30,
		equipo_id: "E2",
		genero: 'M'
	},
	{
		cid: 98833443,
		nomdep: "Daniel Villa",
		edad: 37,
		equipo_id: "E2",
		genero: 'M'
	},
]);

db.deportistas.insertMany([
	{
		cid: 89022334,
		nomdep: "Daniela Lopez",
		edad: 35,
		equipo_id: "E3",
		genero: 'F'
	},
	{
		cid: 112110000,
		nomdep: "Kevin David Medina",
		edad: 21,
		equipo_id: "E3",
		genero: 'M'
	},
	{
		cid: 111000012,
		nomdep: "Jairo Camargo",
		edad: 27,
		equipo_id: "E3",
		genero: 'M'
	},
]);

db.deportistas.insertMany([
	{
		cid: 111402100,
		nomdep: "Mariana Capera",
		edad: 18,
		equipo_id: "E4",
		genero: 'F'
	},
	{
		cid: 812230000,
		nomdep: "Karen Mendez",
		edad: 17,
		equipo_id: "E4",
		genero: 'F'
	},
	{
		cid: 871222332,
		nomdep: "Susana Restrepo",
		edad: 19,
		equipo_id: "E4",
		genero: 'F'
	},
]);

db.deportistas.insertMany([
	{
		cid: 7500760,
		nomdep: "Ramon Ramirez",
		edad: 44,
		equipo_id: "E5",
		genero: 'M'
	},
	{
		cid: 8922340,
		nomdep: "El Doctor Gallego",
		edad: 54,
		equipo_id: "E5",
		genero: 'M'
	},
	{
		cid: 9822324,
		nomdep: "Beto Sanchez",
		edad: 48,
		equipo_id: "E5",
		genero: 'M'
	},
]);


db.deportistas.find();