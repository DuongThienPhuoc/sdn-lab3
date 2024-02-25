import { CategoryRepo } from "../repositories/index.js";
import Category from "../models/category.js";
// POST: /categories
const createCategory = async(req, res)=>{
    try {
        const {name, description} = req.body;
        res.status(201).json(await CategoryRepo.create({name, description}));
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        })
    }
}

const getCategories = async(req, res)=>{
    try{
        const categories = await Category.find();
        res.status(200).json({
            status: 'success',
            data: categories,
        }
        )
    }catch(error){
        res.status(500).json({
            data: 'fail',
            error: error.toString()
        })
    }
}

export default {
    createCategory,getCategories
}