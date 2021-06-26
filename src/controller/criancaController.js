const DB_CONNETION = require("../dbconnection")

const criancaContoller ={
  index(req, res){

  },
  store(req, res){
    let {nome, cpf } = req.body
    return DB_CONNETION.query('insert into crianca value( null , ?, ? )',[nome, cpf ], (error, result) =>{
      console.log(result)
      res.json('sucesso')
    })
  }
}

module.exports = criancaContoller 