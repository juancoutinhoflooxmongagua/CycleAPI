const express = require('express')
const BillingCycle = require('./billingCycle')
const errorHandler = require('../../common/errorHandler')

const router = express.Router()

router.get('/billingCycles', async (req, res, next) => {
  try {
    const data = await BillingCycle.find()
    res.json(data)
  } catch (err) {
    res.locals.bundle = { errors: [err] }
    next()
  }
})

router.post('/billingCycles', async (req, res, next) => {
  try {
    const billing = new BillingCycle(req.body)
    const saved = await billing.save()
    res.json(saved)
  } catch (err) {
    res.locals.bundle = { errors: [err] }
    next()
  }
})

router.get('/billingCycles/count', async (req, res, next) => {
  try {
    const count = await BillingCycle.countDocuments()
    res.json({ value: count })
  } catch (err) {
    res.locals.bundle = { errors: [err] }
    next()
  }
})

router.get('/billingCycles/summary', async (req, res, next) => {
  try {
    const result = await BillingCycle.aggregate([
      { 
        $project: {
          credit: { $sum: "$credits.value" },
          debt: { $sum: "$debts.value" }
        }
      },
      { 
        $group: {
          _id: null,
          credit: { $sum: "$credit" },
          debt: { $sum: "$debt" }
        }
      },
      { 
        $project: {
          _id: 0,
          credit: 1,
          debt: 1
        }
      }
    ])
    res.json(result[0] || { credit: 0, debt: 0 })
  } catch (err) {
    res.locals.bundle = { errors: [err] }
    next()
  }
})

module.exports = router
