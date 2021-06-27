const criancaContoller = require("./controller/criancaController")
const usuarioController = require("./controller/usuarioController")
const vacinacaoController = require("./controller/vacinacaoController")
const vacinaController = require("./controller/vacinaController")


const router = server => {  
server.post('/vacinas', vacinaController.store )
server.get('/vacinas', vacinaController.index )
server.post('/vacina-dados', vacinaController.getVacinasDados )
server.del('/deletar/vacina/:_id', vacinaController.delete )



server.post( '/vacinacao', vacinacaoController.store)
server.get( '/vacinacao/:_id', vacinacaoController.index)
server.del( '/vacinacao/:_id', vacinacaoController.delete)



server.post('/usuario', usuarioController.store)
server.post('/login', usuarioController.login)

server.get('/criancas', criancaContoller.index )
server.post('/criancas', criancaContoller.store )
server.post('/crianca-dados', criancaContoller.getCriancaDados )
server.del('/deletar/crianca/:_id', criancaContoller.deletarCrianca )

}

module.exports = router