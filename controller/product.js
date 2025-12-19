const express = require('express');
const modelscheme=require('../models/product');
async function createProduct(req,res){
    try{
        const product=await modelscheme.create({
        name:req.body.name,
        price:req.body.price,
        description:req.body.description,
        category:req.body.category
    });
    res.status(201).json({message:"product created successfully"});
    }catch(error){
        res.status(500).json({message:"error in creating product"});
    }
    
}


async function getAllProducts(req,res){
    try{
        const r=await modelscheme.find();
        return res.json(r);
    }catch(error){
        return res.status(500).json({message:"error in fetchinf products"});
    }
    
}

async function getById(req,res){
    try{
        const r=req.params.id;
        const result=await modelscheme.findById(r);
        if(!result){
            return res.status(404).json({message:"Product not found"});
        }
        return res.json(result);
    }catch(error){
        return res.status(500).json({message:"error fetching product"});
    }
};

async function updateById(req,res){
    try{
        const r=req.params.id;
        const result=await modelscheme.findByIdAndUpdate(
            r,
            req.body,
            {new:true},
        );
        if(!result){
            return res.status(400).json({message:"id not find"});
        }
        return res.json({message:"product updated successfully"});
    }
    catch(error){
        return res.status(500).json({message:"error updating product"});
    }
}

async function deleteproduct(req,res){
    try{
        const id=req.params.id;
        await modelscheme.findByIdAndDelete(id);
        if(!id){
            return res.status(404).json({message:"id not found"});
        }
        return res.status(200).json({message:"product deleted"});
    }catch(error){
        return res.status(500).json({message:"error in deleting product"});
    }
}


async function pagination(req,res){
    try{
        const page=Number(req.query.page)||1;
        const limit=Number(req.query.limit)||5;
        const skip=(page-1)*limit;
        const p=await modelscheme.find().skip(skip).limit(limit);
        const total=await modelscheme.countDocuments();
        return res.status(200).json({
            total,
            page:page,
            p,
        });
    }catch(error){
        return res.status(500).json({message:"internal server error"});
    }
}


async function filterprice(req,res){
    try{
        const stid = Number(req.params.stid);
        const enid = Number(req.params.enid);

        const r=await modelscheme.find({
            price:{
                $gte:stid,
                $lte:enid
            }
        });
        return res.status(200).json(r);
    }catch(error){
        return res.status(404).json({message:"error in filtering"});
    }
}




module.exports={
    createProduct,
    getAllProducts,
    getById,
    updateById,
    deleteproduct,
    pagination,
    filterprice,
}