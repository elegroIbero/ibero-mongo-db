/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use("db_by_tejote");

// Insert a few documents into the equipo 1 collection.
db.getCollection("equipos").insertMany([
	{ cid: "E1", nomequ: "Los Tejanos", date: new Date("2014-03-01T08:00:00Z") },
	{ cid: "E2", nomequ: "El Equipo Maravilla", date: new Date("2014-03-01T09:00:00Z") },
	{ cid: "E3", nomequ: "Los Del EDEN", date: new Date("2014-03-15T09:00:00Z") },
	{ cid: "E4", nomequ: "Las Barbies", date: new Date("2014-03-15T09:00:00Z") },
	{ cid: "E5", nomequ: "Los Profesionales", date: new Date("2014-03-15T09:00:00Z") },
]);
