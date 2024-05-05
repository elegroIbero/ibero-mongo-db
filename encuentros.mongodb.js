/* global use, db */

use("db_by_tejote");

db.getCollection("encuentros").insertMany([
	{
		cid: 1,
		equipos: ["E1", "E2"],
		estado: "F",
		marcador: [
			{
				equipo: "E1",
				puntos: 0,
			},
			{
				equipo: "E2",
				puntos: 0,
			},
		],
		ganador: "E1",
		ronda: 1,
		date: new Date("2014-03-01T08:00:00Z"),
	},
	{
		cid: 2,
		equipos: ["E3", "E4"],
		estado: "F",
		marcador: [
			{
				equipo: "E3",
				puntos: 0,
			},
			{
				equipo: "E4",
				puntos: 0,
			},
		],
		ronda: 1,
		ganador: "",
		date: new Date("2014-03-01T08:00:00Z"),
	},
	{
		cid: 3,
		equipos: ["E5", "E1"],
		estado: "F",
		marcador: [
			{
				equipo: "E5",
				puntos: 0,
			},
			{
				equipo: "E1",
				puntos: 0,
			},
		],
		ronda: 2,
		ganador: "",
		date: new Date("2014-03-01T08:00:00Z"),
	},
	{
		cid: 4,
		equipos: ["E2", "E3"],
		estado: "F",
		marcador: [
			{
				equipo: "E2",
				puntos: 0,
			},
			{
				equipo: "E3",
				puntos: 0,
			},
		],
		ronda: 2,
		ganador: "",
		date: new Date("2014-03-01T08:00:00Z"),
	},
	{
		cid: 5,
		equipos: ["E4", "E1"],
		estado: "F",
		marcador: [
			{
				equipo: "E4",
				puntos: 0,
			},
			{
				equipo: "E1",
				puntos: 0,
			},
		],
		ronda: 3,
		ganador: "",
		date: new Date("2014-03-01T08:00:00Z"),
	},
	{
		cid: 5,
		equipos: ["E5", "E2"],
		estado: "F",
		marcador: [
			{
				equipo: "E5",
				puntos: 0,
			},
			{
				equipo: "E2",
				puntos: 0,
			},
		],
		ronda: 3,
		ganador: "",
		date: new Date("2014-03-01T08:00:00Z"),
	},
	{
		cid: 6,
		equipos: ["E3", "E1"],
		estado: "F",
		marcador: [
			{
				equipo: "E3",
				puntos: 0,
			},
			{
				equipo: "E1",
				puntos: 0,
			},
		],
		ronda: 4,
		ganador: "",
		date: new Date("2014-03-01T08:00:00Z"),
	},
	{
		cid: 6,
		equipos: ["E4", "E5"],
		estado: "F",
		marcador: [
			{
				equipo: "E4",
				puntos: 0,
			},
			{
				equipo: "E5",
				puntos: 0,
			},
		],
		ronda: 4,
		ganador: "",
		date: new Date("2014-03-01T08:00:00Z"),
	},
	{
		cid: 6,
		equipos: ["E2", "E4"],
		estado: "F",
		marcador: [
			{
				equipo: "E2",
				puntos: 0,
			},
			{
				equipo: "E4",
				puntos: 0,
			},
		],
		ronda: 5,
		ganador: "",
		date: new Date("2014-03-01T08:00:00Z"),
	},
	{
		cid: 6,
		equipos: ["E3", "E5"],
		estado: "F",
		marcador: [
			{
				equipo: "E3",
				puntos: 0,
			},
			{
				equipo: "E5",
				puntos: 0,
			},
		],
		ronda: 5,
		ganador: "",
		date: new Date("2014-03-01T08:00:00Z"),
	},
]);


db.encuentros.find();