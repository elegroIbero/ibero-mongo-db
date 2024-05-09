use("dbibero");

/**
 * El equipo que hizo más puntos en el campeonato
 */
db.encuentroResultados.aggregate(
    [
        {
            $group: {
               _id: "$equipo_id",
               totalPuntos: { $sum: "$puntos" },
               promedio: { $avg: "$puntos" },
               cantidad: { $sum: 1 }
            }
        },
        {
            $sort : { totalPuntos: -1 }
        }
    ]
);