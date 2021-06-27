const errorHandle = (error, res ) => {
 console.log(error)
 res.status(400);
 res.json({ msg: error ||'Falha na operação' })
}
module.exports={errorHandle} 