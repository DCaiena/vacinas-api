const criancaContoller = require("./controller/criancaController")
const vacinacaoController = require("./controller/vacinacaoController")
const vacinaController = require("./controller/vacinaController")


const router = server => {  
server.post('/vacinas', vacinaController.store )
server.post('/criancas', criancaContoller.store )
server.post( '/vacinacao', vacinacaoController.store)
}

module.exports = router