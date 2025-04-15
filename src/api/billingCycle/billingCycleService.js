const express = require('express')
const BillingCycle = require('./billingCycle')

const router = express.Router()

router.get('/billingCycles', async(req, res, next) => {
    try {
        const data = await BillingCycle.find()
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.post('/billingCycles', async(req, res, next) => {
    try {
        const billing = new BillingCycle(req.body)
        const saved = await billing.save()
        res.json(saved)
    } catch (err) {
        next(err)
    }
})

router.get('/billingCycles/count', async(req, res, next) => {
    try {
        const count = await BillingCycle.countDocuments()
        res.json({ value: count })
    } catch (err) {
        next(err)
    }
})

router.get('/billingCycles/summary', async(req, res, next) => {
    try {
        const result = await BillingCycle.aggregate([{
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
        next(err)
    }
})

module.exports = router