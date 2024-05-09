use("dbibero");

/**
 * El equipo que hizo más puntos
 */
db.encuentroResultados.aggregate([
    {
        $group: {
            _id: '$equipo_id',
            totalPuntos: { $sum: '$puntos' },
        },
    },
    {
        $sort: {
            totalPuntos: -1,
        },
    },
    {
        $limit: 1,
    },
]);
