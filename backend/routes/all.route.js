import express from "express";
import { checkoutcart, deletecart, getcartitem, getProduct, postcart, updatecart } from "../controllers/allcontrollers.js";

const router=express.Router();

router.route('/').get(getProduct);
router.route('/ci').get(getcartitem);
router.route('/cartpost').post(postcart);
router.route('/delete/:id').delete(deletecart)
router.route('/update/:id').put(updatecart)
router.route('/checkout').post(checkoutcart)

export default router;