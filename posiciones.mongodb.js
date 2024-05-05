
use('db_by_tejote');

db.posiciones.drop();

db.posiciones.insertMany([
	{ equipo_id: "E1", posicion: 3},
	{ equipo_id: "E2", posicion: 2},
	{ equipo_id: "E3", posicion: 5},
	{ equipo_id: "E4", posicion: 1},
	{ equipo_id: "E5", posicion: 4},
]);
