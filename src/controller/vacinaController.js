const DB_CONNETION = require("../dbconnection")

const vacinaController ={
  index(req, res){
    return DB_CONNETION.query('select * from vacina', (error, results, fields) =>{
      res.json(results)
    })
  },
  store(req, res){
    let { nome, fabricante ,descricao } = req.body
    return DB_CONNETION.query('insert into vacina value(null, ?, ?, ?)', [nome, fabricante, descricao], (error, results, fields) =>{
      console.log(results.affectedRows)
      res.json('sucesso')
    })
  }
}
module.exports = vacinaController