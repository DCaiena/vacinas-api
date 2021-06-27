const DB_CONNETION = require("../dbconnection")
const { errorHandle } = require("../modules/errorHandle")

const vacinaController ={
  async index(req, res){
    try {
      let vacinas = await vacinasCadastradas()
      res.json(vacinas)
    } catch (error) {
      errorHandle(error,res)
    }
  },
  async store(req, res){
    try {
      if(req.body._id){
        await editarVacina(req.body)
      }else{
        await cadastraVacina(req.body)
      }
      res.json(true)
    } catch (error) {
      errorHandle(error,res)
    }
  },
  async getVacinasDados(req, res){
    try {
      let vacina = await getVacinaCadastrada(req.body._id)
      res.json(vacina)
    } catch (error) {
      errorHandle(error,res)
    }
  },
  async delete(req, res){
    try {
      await deleteVacina(req.params._id)
      res.json(true)
    } catch (error) {
      errorHandle(error,res)

    }
  }
}


function cadastraVacina(body){
  return new Promise((resolve, reject) =>{
    let { nome, fabricante ,descricao } = body
    if(!nome || !fabricante|| !fabricante) resolve('Complete o formulário antes do envio')
    DB_CONNETION.query('insert into vacina value(null, ?, ?, ?)', [nome, fabricante ,descricao], (error, results) =>{
      if(error) reject(error)
      resolve(results)
    })
  })  
}
function editarVacina(body){
  return new Promise((resolve, reject) =>{
    let { nome, fabricante ,descricao, _id } = body
    if(!nome || !fabricante|| !fabricante) resolve('Complete o formulário antes do envio')
    DB_CONNETION.query('update  vacina set nome = ?, fabricante = ?, descricao = ? where _id = ? ', [nome, fabricante ,descricao, _id], (error, results) =>{
      if(error) reject(error)
      resolve(results)
    })
  })  
}

function vacinasCadastradas(){
  return new Promise((resolve, reject) =>{
    DB_CONNETION.query('select * from vacina',[], (error, result) =>{
      if(error) reject(error)
      resolve(result)
    }
    )
  })
}
function getVacinaCadastrada(vacina_id){
  return new Promise((resolve, reject) =>{
    DB_CONNETION.query('select * from vacina v where v._id = ? ',[vacina_id], (error, result) =>{
      if(error) reject(error)
      resolve(result[0])
    }
    )
  })
}
function deleteVacina(vacina_id){
  return new Promise((resolve, reject) =>{
    DB_CONNETION.query('delete from vacina  v where v._id = ? ',[vacina_id], (error, result) =>{
      if(error) reject('Nao foi possível deletar essa vacina')
      resolve(result)
    }
    )
  })
}
module.exports = vacinaController