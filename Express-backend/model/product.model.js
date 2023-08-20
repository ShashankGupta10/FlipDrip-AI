const mongoose = require("mongoose");


const productSchema = mongoose.Schema({
    id:{
        type:String,
        required: true,
        unique: true
    },
    url: String,
    detailUrl: String,
    title: Object,
    price: Object,
    quantity: Number,
    description: String,
    discount: String,
    tagline: String
});

const ProductModel = mongoose.model("product",productSchema);

module.exports={
    ProductModel
}