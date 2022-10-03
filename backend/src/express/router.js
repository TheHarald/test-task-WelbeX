const connection = require('../db/db');
const { map } = require('./app');


function getAllRoutes(req, res) {
    console.log(req.query);
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const offset = (page - 1) * limit;
    const sort_by = req.query.sort_by || 'name';
    const order = req.query.order || 'asc';
    const filter_by = req.query.filter_by || 'name';
    const filter_value = req.query.filter_value || '';
    let FILTER = '';
    switch(filter_value.split(':')[0]){
        case 'gt':
            FILTER = `WHERE ${filter_by} > '${filter_value.split(':')[1]}'`;
            break;
        case 'lt':
            FILTER = `WHERE ${filter_by} < '${filter_value.split(':')[1]}'`;
            break;
        case 'eq':
            FILTER = `WHERE ${filter_by} = '${filter_value.split(':')[1]}'`;
            break;
        case 'like':
            FILTER = `WHERE ${filter_by} LIKE '%${filter_value.split(':')[1]}%'`;
            break;
        default:
            FILTER = '';
    }

    console.log(FILTER);

    connection.query(`SELECT * FROM routes ${FILTER} ORDER BY ${sort_by} ${order} LIMIT ${limit} OFFSET ${offset}`, function (err, results) {
        if (err) {
            res.status(500).send(err);
        } else {
            console.log(results);
            connection.query('SELECT COUNT(*) as count FROM routes', function (err, count) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).send({
                        content: results,
                        page: Number(page),
                        limit: Number(limit),
                        total_results: count[0].count,
        
                    });
                }

            })
            
        }
    });
}

function AddRoute(req, res) {
    const { name, count, distance, date} = req.body;
    connection.query('INSERT INTO routes (name, count, distance, date) VALUES (?, ?, ?, ?)', [name, count, distance, date], (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.status(201).send(results);
        }
    })
}

function getRouteById(req, res) {
    const { id } = req.params;
    connection.query('SELECT * FROM routes WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.send(results);
        }
    })
}

function deleteRouteById(req, res) {
    const { id } = req.params;
    connection.query('DELETE FROM routes WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.send(results);
        }
    })
}

function updateRouteById(req, res) {
    const { id } = req.params;
    const { name, count, distance, date } = req.body;
    connection.query('UPDATE routes SET name = ?, count = ?, distance = ?, date = ? WHERE id = ?', [name, count, distance, date, id], (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.send(results);
        }
    })
}

module.exports = { getAllRoutes, AddRoute , deleteRouteById, updateRouteById, getRouteById }