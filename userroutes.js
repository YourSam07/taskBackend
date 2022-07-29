const express= require('express')
const { registerUser, loginrUser, getUserData }= require('./Controller/userController')
const router = express.Router()

router.post('/', registerUser)
router.post('/login', loginrUser)

module.exports = router