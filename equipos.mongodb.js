
use("dbibero");

db.equipos.drop();

db.equipos.insertMany([
	{ cid: "E1", nomequ: "Los Tejanos", date: new Date("2014-03-01T08:00:00Z") },
	{ cid: "E2", nomequ: "El Equipo Maravilla", date: new Date("2014-03-01T09:00:00Z") },
	{ cid: "E3", nomequ: "Los Del EDEN", date: new Date("2014-03-15T09:00:00Z") },
	{ cid: "E4", nomequ: "Las Barbies", date: new Date("2014-03-15T09:00:00Z") },
	{ cid: "E5", nomequ: "Los Profesionales", date: new Date("2014-03-15T09:00:00Z") },
]);
