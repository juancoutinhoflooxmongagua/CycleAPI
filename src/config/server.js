const port = 3003

const bodyParser = require('body-parser')
const express = require('express')
const server = express()

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

const errorHandler = require('../common/errorHandler')
server.use(errorHandler) // aqui estava errado

server.listen(port, function () {
  console.log(`Back rodando na porta ${port} .`)
})

module.exports = server
