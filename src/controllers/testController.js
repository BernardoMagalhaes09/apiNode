const express = require('express')
const authMiddleware = require('../middleware/authenticate')

const router = express.Router()

router.use(authMiddleware)

router.get('', (req, res) => {
    try{
        return res.status(200).json({mesasge: "OK"})
    }catch(e){
        return res.status(400).json({message: e})
    }
})

module.exports = app => app.use('/testAuth', router)