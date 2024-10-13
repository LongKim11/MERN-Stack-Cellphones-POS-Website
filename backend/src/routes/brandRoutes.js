import express from 'express'
import {
    getAllBrands,
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand,
} from '../controllers/brandController.js'

const router = express.Router()

router.route('/').get(getAllBrands).post(createBrand)
router.route('/:id').get(getBrandById).put(updateBrand).delete(deleteBrand)

export default router
