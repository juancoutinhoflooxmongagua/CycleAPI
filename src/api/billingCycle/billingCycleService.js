// billingCycleService.js
const express = require('express')
const BillingCycle = require('./billingCycle')
const router = express.Router()

router.get('/billingCycles', async (req, res) => {
  const data = await BillingCycle.find()
  res.json(data)
})

router.post('/billingCycles', async (req, res) => {
  const billing = new BillingCycle(req.body)
  const saved = await billing.save()
  res.json(saved)
})

module.exports = router
