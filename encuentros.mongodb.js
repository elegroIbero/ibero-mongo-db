/* global use, db */

use("dbibero");


db.encuentros.drop();

db.encuentros.insertMany([
	{
		cid: 1,
		equipos: ["E1", "E2"],
		estado: "F",
		marcador: [
			{
				equipo: "E1",
				puntos: 27,
			},
			{
				equipo: "E2",
				puntos: 20,
			},
		],
		ganador: "E1",
		ronda: 1,
		date: new Date("2014-03-01T08:00:00Z"),
		arbitro: 1
	},
	{
		cid: 2,
		equipos: ["E3", "E4"],
		estado: "F",
		marcador: [
			{
				equipo: "E3",
				puntos: 27,
			},
			{
				equipo: "E4",
				puntos: 23,
			},
		],
		ronda: 1,
		ganador: "E3",
		date: new Date("2014-03-01T08:00:00Z"),
		arbitro: 2
	},
	{
		cid: 3,
		equipos: ["E5", "E1"],
		estado: "F",
		marcador: [
			{
				equipo: "E5",
				puntos: 39,
			},
			{
				equipo: "E1",
				puntos: 21,
			},
		],
		ronda: 2,
		ganador: "E5",
		date: new Date("2014-03-01T08:00:00Z"),
		arbitro: 1
	},
	{
		cid: 4,
		equipos: ["E2", "E3"],
		estado: "F",
		marcador: [
			{
				equipo: "E2",
				puntos: 30,
			},
			{
				equipo: "E3",
				puntos: 20,
			},
		],
		ronda: 2,
		ganador: "E2",
		date: new Date("2014-03-01T08:00:00Z"),
		arbitro: 2
	},
	{
		cid: 5,
		equipos: ["E4", "E1"],
		estado: "F",
		marcador: [
			{
				equipo: "E4",
				puntos: 28,
			},
			{
				equipo: "E1",
				puntos: 19,
			},
		],
		ronda: 3,
		ganador: "E4",
		date: new Date("2014-03-01T08:00:00Z"),
		arbitro: 1
	},
	{
		cid: 6,
		equipos: ["E5", "E2"],
		estado: "F",
		marcador: [
			{
				equipo: "E5",
				puntos: 11,
			},
			{
				equipo: "E2",
				puntos: 27,
			},
		],
		ronda: 3,
		ganador: "E2",
		date: new Date("2014-03-01T08:00:00Z"),
		arbitro: 2
	},
	{
		cid: 7,
		equipos: ["E3", "E1"],
		estado: "F",
		marcador: [
			{
				equipo: "E3",
				puntos: 19,
			},
			{
				equipo: "E1",
				puntos: 28,
			},
		],
		ronda: 4,
		ganador: "E1",
		date: new Date("2014-03-01T08:00:00Z"),
		arbitro: 1
	},
	{
		cid: 8,
		equipos: ["E4", "E5"],
		estado: "F",
		marcador: [
			{
				equipo: "E4",
				puntos: 29,
			},
			{
				equipo: "E5",
				puntos: 14,
			},
		],
		ronda: 4,
		ganador: "E4",
		date: new Date("2014-03-01T08:00:00Z"),
		arbitro: 2
	},
	{
		cid: 9,
		equipos: ["E2", "E4"],
		estado: "F",
		marcador: [
			{
				equipo: "E2",
				puntos: 19,
			},
			{
				equipo: "E4",
				puntos: 27,
			},
		],
		ronda: 5,
		ganador: "E4",
		date: new Date("2014-03-01T08:00:00Z"),
		arbitro: 1
	},
	{
		cid: 10,
		equipos: ["E3", "E5"],
		estado: "F",
		marcador: [
			{
				equipo: "E3",
				puntos: 8,
			},
			{
				equipo: "E5",
				puntos: 31,
			},
		],
		ronda: 5,
		ganador: "E5",
		date: new Date("2014-03-01T08:00:00Z"),
		arbitro: 2
	},
]);


db.encuentros.find();