const restify = require('restify')

const knex = require('knex')({
    client: 'better-sqlite3',
    connection: {
      filename: "./db/db.db"
    }
});

const server = restify.createServer()
const port = 8080;

server
.use(restify.plugins.bodyParser())

server.use((req, res, next) => {
    console.log(req.route.spec)
    console.log(new Date)
    next()
})

server.get('/', (req, res, next) => {
    res.send(200, {message: 'Hello World!', source: 'https://github.com/Arthur-Diesel/RestifyServer'})
})

server.get('/tasks', async (req, res, next) => {
    res.send(200, {data: await knex.select('*').from('tasks')})
})

server.get('/tasks/:id', async (req, res, next) => {
    res.send(200, {data: await knex('tasks').where('id', req.params.id)})
})

server.post('/tasks', async (req, res, next ) => { 
    const response = await knex('tasks').insert(req.body)
    res.send(201, {data: response})
})

server.put('/tasks/:id', async (req, res, next) => {
    const response = await knex('tasks').where('id', req.params.id).update(req.body)
    res.send(200, {data: response})
})

server.del('/tasks/:id', async (req, res, next) => {
    const response = await knex('tasks').where('id', req.params.id).del()
    res.send(200, {data: response})
})

server.listen(port, () => console.log(`Listening at: http://localhost:` + port))
