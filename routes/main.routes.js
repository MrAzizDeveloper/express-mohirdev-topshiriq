const { Router } = require('express')
const { getMainPage, deleteBooks, updatedBooks } = require('../controllers/main.controller')
const router = Router()

router.get('/', getMainPage)
router.post('/books/delete/:id', deleteBooks)
router.post('/books/update/:id', updatedBooks)


module.exports = router