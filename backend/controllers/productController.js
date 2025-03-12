import { json } from "express"
import productModel from "../models/productModel.js"
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});



const addProduct = async (req, res) => {
    try {
        const {name,price,description,category,subCategory,sizes,bestSeller} = req.body

        const img1 = req.files.img1 && req.files.img1[0]
        const img2 = req.files.img2 && req.files.img2[0]
        const img3 = req.files.img3 && req.files.img3[0]
        const img4 = req.files.img4 && req.files.img4[0]
        const imgs = [img1,img2,img3,img4].filter((item) => item!==undefined)

        let imgURL = await Promise.all(
            imgs.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type: 'image'})
                return result.secure_url
            })
        )
        const productData = {
            name,
            description,
            price:Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestSeller: bestSeller === "true" ? true : false,
            image: imgURL,
            date: Date.now()
        }
        console.log(productData)

        const product = new productModel(productData)
        await product.save()

        res.json({success:true, message:"Product Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({})
        res.json({success:true,products})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }

} 

const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true, message: "Product Removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({success:true,product})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export {addProduct, listProduct, removeProduct, singleProduct}