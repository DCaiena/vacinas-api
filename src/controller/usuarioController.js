const DB_CONNETION = require("../dbconnection")
const bcrypt = require('bcrypt')
const salt = 12
const secrekey = 'vacci2021!0!0'
const jwt = require('jsonwebtoken')
const usuarioController ={
  index(req, res){

  },
  async login(req, res){
    let { email, senha } = req.body
    try {
      let usuario = await usuarioExiste(email)
      if(!usuario) throw 'Nenhum usuário com esse email na nossa base '
      let senhaCorreta =  bcrypt.compareSync(senha, usuario.senha)
      if(!senhaCorreta) throw 'Senha incorreta'
      let dados = {
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil
      }
      _payload = jwt.sign(dados,secrekey)
      res.json({
       ...dados,
        _payload 
      })
    } catch (error) {
      console.log(error)
    }
  },
  async store(req, res){
    try {
      let { nome, email, senha, token_usuario } = req.body
      if(!(token_usuario == 'vacc2021!0!0'))  throw 'Token de usuário inválido contate o suporte'
      let usuarioCadastrado = await usuarioExiste(email)
      if(usuarioCadastrado) throw 'Usuário já cadastrado com esse email'
      if(!senha) throw 'É necessário uma senha'
      req.body.senha = bcrypt.hashSync(senha,  salt)
      await cadastraUsuario(req.body)
      let payload = {
        nome,
        email,
        token_usuario
      }
      payload = jwt.sign(payload,secrekey)
      res.json({
        nome, 
        email,
        payload 
      })
    } catch (error) {
      console.log(error)
    }

  }
}

function cadastraUsuario(body){
  return new Promise((resolve, reject) =>{
    let {nome, email, senha, token_usuario  } = body
    DB_CONNETION.query('insert into usuario value(null, ?, ?, ?, ?, ?)', [nome, email, senha, 'profissional' ,token_usuario], (error, results) =>{
      if(error) reject(error)
      resolve(results)
    })
  })  
}

function usuarioExiste(userEmail){
  return new Promise((resolve, reject) =>{
    if(!userEmail) reject( 'Necessário o email')
    DB_CONNETION.query('select * from usuario u  where u.email = ? ', [userEmail], (error, results) =>{
      if(error) reject (error)
      resolve(results[0])
    })
  })

}

module.exports = usuarioController