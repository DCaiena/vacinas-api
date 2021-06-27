const DB_CONNETION = require("../dbconnection")

const vacinacaoController ={
  async index(req, res){
    try {
      console.log(req.params._id)
      let vacinacoes = await vacinacoesCrianca(req.params._id)
      console.log(vacinacoes)
      res.json(vacinacoes)
    } catch (error) {
      
    }
  },
  async store(req, res){
    try {
      await cadastraVacinacao(req.body)
      res.json(true)
    } catch (error) {
      console.log(error)
    }
   
  },
  async delete(req, res){
    try {
      await deletarVacinacao(req.params._id)
      res.json(true)
    } catch (error) {
      console.log(error)
    }
  }
}

function deletarVacinacao(vacinacao_id){
  return new Promise((resolve, reject) =>{
    DB_CONNETION.query('delete from vacinacao v where v._id = ? ',[vacinacao_id], (error, result) =>{
      if(error) reject(error)
      resolve(result)
    }
    )
  })
}
function cadastraVacinacao(body){
  return new Promise((resolve, reject) =>{
    let { lote, data_vacinacao, enfermeiro, vacina_id, crianca_id } = body
    if(!lote || !data_vacinacao|| !enfermeiro || !vacina_id || crianca_id) resolve('Complete o formulário antes do envio')
    console.log(lote, data_vacinacao, enfermeiro, vacina_id, crianca_id, 'dados aqui')
    DB_CONNETION.query('insert into vacinacao value(null, ?, ?, ?, ?, ?)', [lote, data_vacinacao, enfermeiro, vacina_id, crianca_id], (error, results) =>{
      if(error) reject(error)
      resolve(results)
    })
  })  
}


function vacinacoesCrianca(crianca_id){
  return new Promise((resolve, reject) =>{
    DB_CONNETION.query('select vn.*, v.nome from vacinacao vn inner join vacina v on vn.vacina_id = v._id and vn.crianca_id = ?', [crianca_id], (error, results) =>{
      if(error) reject (error)
      console.log(results)
      resolve(results)
    })
  })

}
module.exports = vacinacaoController