const restify = require('restify');
const cors = require('cors')
const router = require('./Router');
const server = restify.createServer({
  name:'VacinasServer',
})

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.pre(cors())
server.use(cors())


const porta = 8000

router(server)

server.listen(porta, () =>{
  console.log('Servidor rodando '+ porta)
})
