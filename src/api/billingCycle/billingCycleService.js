const express = require('express')
const BillingCycle = require('./billingCycle')
const router = express.Router()

router.get('/billingCycles', async (req, res) => {
  try {
    const data = await BillingCycle.find()
    res.json(data)
  } catch (err) {
    res.status(500).json({ errors: [err] })
  }
})

router.post('/billingCycles', async (req, res) => {
  try {
    const billing = new BillingCycle(req.body)
    const saved = await billing.save()
    res.json(saved)
  } catch (err) {
    res.status(500).json({ errors: [err] })
  }
})

router.get('/billingCycles/count', async (req, res) => {
  try {
    const count = await BillingCycle.countDocuments()
    res.json({ value: count })
  } catch (err) {
    res.status(500).json({ errors: [err] })
  }
})

router.get('/billingCycles/summary', async (req, res) => {
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
    } catch (error) {
      res.status(500).json({ errors: [error] })
    }
  })
  

module.exports = router
