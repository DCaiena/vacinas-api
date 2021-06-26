const DB_CONNETION = require("../dbconnection")

const vacinacaoController ={
  index(req, res){

  },
  store(req, res){
    let { lote, data_vacinacao, enfermeiro, vacina_id, crianca_id } = req.body
    return DB_CONNETION.query('inset into vacinacao value(null, ?, ?, ?, ?, ?)', [lote, data_vacinacao, enfermeiro, vacina_id, crianca_id], (error, results) =>{
      res.json('sucesso!')
    })
  }
}
module.exports = vacinacaoController