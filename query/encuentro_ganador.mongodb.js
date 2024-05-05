
use('db_by_tejote');


/**
 * Consulta por compenetencia que equipo gano
 */
db.encuentroResultados.aggregate(
    [
        {
            $match : { "encuentro_id": { $eq: 1 } }
        },
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