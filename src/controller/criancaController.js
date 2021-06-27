const DB_CONNETION = require("../dbconnection")

const criancaContoller ={
  async index(req, res){
    try {
      let criancas = await criancasCadastradas()
      console.log(criancas)
      res.json(criancas)
    } catch (error) {
      console.log(error)
    }
  },
  async store(req, res){
    try {
      let { cpf } = req.body
      let criancaJaCadastrada  =''
      if(req.body._id){
        await editarDadosCrianca(req.body)
      }else{
        criancaJaCadastrada = await criancaCadastrada(cpf)
        if(criancaJaCadastrada ) throw 'Criança com esse cpf já consta no nosso sistema'
        await cadastrarCrianca(req.body)
      }
      res.json(true)
    } catch (error) {
      console.log(error)
    }
  },
  async getCriancaDados(req,res){
    try {
      let dados = await criancaCadastrada(req.body.cpf)
      res.json(dados)
    } catch (error) {
      console.log(error)
    }
  },
  async deletarCrianca(req, res){
    try {
      await deletarCrianca(req.params._id)
      res.json(true)
    } catch (error) {
      console.log(error)
    }
  }
}

function cadastrarCrianca(body){
  return new Promise((resolve, reject) =>{
    let { nome, cpf} = body
    if(!nome || !cpf) reject('Preencha todos os dados')
    DB_CONNETION.query('insert into crianca value( null , ?, ? )',[nome, cpf ], (error, result) =>{
      if(error) reject(error)
      resolve(result)
    })
  })
}
function editarDadosCrianca(body){
  return new Promise((resolve, reject) =>{
    let { nome, cpf, _id } = body
    if(!nome || !cpf) reject('Preencha todos os dados')
    DB_CONNETION.query('update crianca  set  nome  = ?, cpf = ? where _id = ?',[nome, cpf, _id ], (error, result) =>{
      if(error) reject(error)
      resolve(result)
    })
  })
}


function criancaCadastrada(cpf){
  return new Promise((resolve, reject) =>{
    if(!cpf) reject('É necessário o cpf da criança')
    DB_CONNETION.query('select * from crianca c where c.cpf = ?', [cpf], (error, result) =>{
      if(error) reject(error)
      resolve(result[0])
    }
    )
  })
}

function criancasCadastradas(){
  return new Promise((resolve, reject) =>{
    DB_CONNETION.query('select * from crianca',[], (error, result) =>{
      if(error) reject(error)
      resolve(result)
    }
    )
  })
}

function deletarCrianca(crianca_id){
  return new Promise((resolve, reject) =>{
    DB_CONNETION.query('delete from crianca  c where c._id = ? ',[crianca_id], (error, result) =>{
      if(error) reject(error)
      resolve(result)
    }
    )
  })
}


module.exports = criancaContoller 