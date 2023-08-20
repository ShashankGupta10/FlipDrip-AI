const express = require("express");
const { ProductModel } = require("../model/product.model");

const productRouter = express.Router();



productRouter.get("/", async(req,res)=>{
    try {
        const products = await ProductModel.find({});
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({message:error.message});
    }
})

productRouter.get("/:id",async(req,res)=>{
    try {
        const id = req.params.id;
        const products = await ProductModel.findOne({'id':id});
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({message:error.message});
    }
})

module.exports={
    productRouter
}