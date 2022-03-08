const restify = require('restify');
const errs = require('restify-errors');

const server = restify.createServer();
const port = 8080;

server.use((req, res, next) => {
    console.log(new Date)
    next()
})

server.get('/', (req, res, next) => {
    res.send('Hello!')
})

server.get('/hello/:name', (req, res, next) => {
    res.send('Hello ' + req.params.name + '!');
});

server.get('/error', (req, res, next) => {
    return next(new errs.InternalServerError('boom!'));
})

server.on('InternalServer', function(req, res, err, callback) {
    console.log(err)
    return res.send('Error!')    
})

server.listen(port, () => console.log(`Listening at: http://localhost:` + port))