import {ProductRepo} from '../repositories/index.js';
import Image from "../models/image.js";
import Comment from "../models/comment.js";
import Products from '../models/product.js';
// GET: /products
const createImage = async (req, res, next) => {
    if (req.body.images) {
        try {
            const newImages = await Promise.all(req.body.images.map((image) => {
                return Image.create({name: image.name, url: image.url, caption: image.caption});
            }))
            req.body.images = newImages.map((image) => {
                return {_id: image._id, url: image.url, caption: image.caption}
            });
        } catch (e) {
            res.status(500).json({
                status: 'fail',
                message: e.message
            })
        }
    }
    next()
}
const createComment = async (req, res, next) => {
    if (req.body.comments) {
        try {
            const newComments = await Promise.all(req.body.comments.map((comment) => {
                return Comment.create({text: comment.text, author: comment.author, rate: comment.rate});
            }))
            req.body.comments = newComments.map((comment) => {
                return {_id: comment._id, text: comment.text, author: comment.author}
            })
            console.log(req.body.comments)
        } catch (e) {
            res.status(500).json({
                status: 'fail',
                message: e.message
            })
        }
    }
    next()
}
const patchComment = async (req, res, next) => {
    if (req.body.comments) {
        try {
            const newComments = await Promise.all(req.body.comments.map((comment) => {
                if(!comment._id){
                   return next()
                }
                return Comment.findByIdAndUpdate({_id:comment._id},{text: comment.text, author: comment.author, rate: comment.rate},{new: true});
            }))
            req.body.comments = newComments.map((comment) => {
                return {_id: comment._id, text: comment.text, author: comment.author}
            })
        } catch (e) {
            res.status(500).json({
                status: 'fail',
                message: e.message
            })
        }
    }
    next()
}
const getProducts = async (req, res) => {
    try {
        res.status(200).json(await ProductRepo.list())
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

// GET: /products/1
const getProductById = async (req, res) => {
    try {
        res.status(200).json(await ProductRepo.getById(req.params.id))
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

// POST: /products
const createProduct = async (req, res) => {
    try {
        // Get object from request body
        const {name, price, description, images, comments, category} = req.body;
        const newUser = await ProductRepo.create({name, price, description, images, comments, category});
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({message: error.toString()});
    }
}

// PUT: /products/1
const editProduct = async (req, res) => {
    try {
        console.log(req.body);
        res.status(200).json(await ProductRepo.edit(req.params.id, req.body));
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
}

// DELETE: /products/1
const deleteProduct = async (req, res) => {
    try {
        res.status(200).json(await ProductRepo.deleteProduct(req.params.id));
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
}

export default {
    getProducts,
    getProductById,
    createProduct,
    editProduct,
    deleteProduct,
    createImage,
    createComment,
    patchComment
}