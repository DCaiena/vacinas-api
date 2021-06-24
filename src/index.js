const restify = require('restify')
const mysql = require('mysql')
const server = restify.createServer({
  name:'VacinasServer',
})

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

const  connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'password',
  database:'vacinasdb',
  prot:'4004'
})

connection.connect((err) =>{
  if(err) throw err
  console.log('Banco connectado')
})


const porta = 8000

server.get('/vacinas', (req, res ) =>{
  //................

  // connection.query('SELECT * FROM vacinasdb ', function (error, results, fields) {
  //   let _results = [
  //     'psfaize',
  //     'covacin',
  //     'astracenica',
  //     'spook'
  //   ]
  //   // error will be an Error if one occurred during the query
  //   // results will contain the results of the query
  //   // fields will contain information about the returned results fields (if any)
  //   res.json(_results)
  // });

  let _results = [
        'psfaize',
        'covacin',
        'astracenica',
        'spook'
  ]
    res.json(_results)
})

server.post('/vacinas', (req, res) =>{
  let {id} = req.body
  //simula bd

  let vacias = [
    'psfaize',
    'covacin',
    'astracenica',
    'spook'
  ]

  let listaVacinasTomdas = [ vacias[3],vacias[2] ]

  res.json(listaVacinasTomdas)
} ) // adicao

server.put('/vacinas', async (req, res) => {
  try {
    let resultado = await soma()
    console.log(resultado  )
    
  } catch (error) {
    
  }
}) // edicao


server.del('/vacinas', (req, res) =>{

}) // delete


server.listen(porta, () =>{
  console.log('Servidor rodando '+ porta)
})


function soma(){
  let soma = 1 +4

  return new Promise( (resolve, reject ) =>{
      if(!soma) reject('Não consegui somar')
      resolve(soma)
  })
}