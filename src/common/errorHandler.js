const _ = require('lodash')

const parseErrors = (nodeRestfulErrors) => {
  const errors = []
  _.forIn(nodeRestfulErrors, error => errors.push(error.message))
  return errors
}

module.exports = (req, res) => {
    const bundle = res.locals.bundle
  
    if (bundle?.errors?.length > 0) {
      const errors = bundle.errors.map(err => err.message ?? err)
      res.status(500).json({ errors })
    } else {
      res.status(500).json({ errors: ['Erro desconhecido.'] })
    }
  }
  