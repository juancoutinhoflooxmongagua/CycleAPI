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

module.exports = router
