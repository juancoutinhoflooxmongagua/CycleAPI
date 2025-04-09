module.exports = (err, req, res, next) => {
    const message = err.message || 'Erro desconhecido.'
    res.status(500).json({ errors: [message] })
  }
  