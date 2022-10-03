const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('../db/db');
const { getAllRoutes, AddRoute, deleteRouteById, updateRouteById, getRouteById } = require('./router');

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin:"*"
}))


app.get('/api/items', getAllRoutes)
app.post('/api/items', AddRoute)
app.delete('/api/items/:id', deleteRouteById)
app.put('/api/items/:id', updateRouteById)
app.get('/api/items/:id', getRouteById)



module.exports = app