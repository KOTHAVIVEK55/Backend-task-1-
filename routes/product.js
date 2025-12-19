const express=require('express');
const router=express.Router();
const {createProduct,getAllProducts,getById,updateById,deleteproduct,pagination,filterprice}=require('../controller/product');


router.post('/createproduct',createProduct);
router.put('/update/:id',updateById);
router.delete('/:id',deleteproduct);

router.get('/pagination', pagination);
router.get('/filter/:stid/:enid',filterprice);
router.get('/',getAllProducts);
router.get('/:id',getById);

module.exports=router;