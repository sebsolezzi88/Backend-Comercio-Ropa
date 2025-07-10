import { Request, Response} from 'express'
import Category from '../models/Category';

export const addCategory = async (req:Request,res:Response):Promise<Response> =>{
    try {
        
        const {name} = req.body;
        
        if(!name) {
            return res.status(400).json({
                status: "error",
                message: "The name are required."
            });
        }

        /* Para guardar la caterogia la guardamos con su primera letra en mayuscula */
        const [firstLetter, ...rest] = name.toLowerCase().trim()
        const categoryCapitalize = firstLetter.toUpperCase() + rest.join("");

        const newCategory = await Category.create({name:categoryCapitalize});

        return res.status(201).json({
                status: "success",
                message: "Category created.",
                category: newCategory
        });

    } catch (error) {
         return res.status(500).json({
                status: "error",
                message: "Server Error.",
                error
        });
    }
}

export const updateCategory = async (req:Request,res:Response):Promise<Response> =>{
    try {
        const id = req.params.id;
        const newName = req.body.name;
        if (!id) {
            return res.status(400).json({ status: 'error', message: 'Id is required' });
        }
        if (!newName) {
            return res.status(400).json({ status: 'error', message: 'The new name of category is required' });
        }
        const categoryExists = await Category.findByPk(id);
        
        if(!categoryExists){
            return res.status(404).json({
                status: "error",
                message: "Category not Found.",
                
            });
        }
        
        //Actualizamos la categoria
        categoryExists.name = newName;
        await categoryExists.save()
        
        return res.status(200).json({
                status: "success",
                message: "Category updated.",
                category :categoryExists
        }); 
   
    } catch (error) {
         return res.status(500).json({
                status: "error",
                message: "Server Error.",
                error
        });
   }
}

export const deleteCategory = async (req:Request,res:Response):Promise<Response> =>{
   try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ status: 'error', message: 'Id is required' });
        }
        const categoryExists = await Category.findByPk(id);
        
        if(!categoryExists){
            return res.status(404).json({
                status: "error",
                message: "Category not Found.",
                
            });
        }
        await categoryExists.destroy();
        
        return res.status(200).json({
                status: "success",
                message: "Category Deleted."
        }); 
   
    } catch (error) {
         return res.status(500).json({
                status: "error",
                message: "Server Error.",
                error
        });
   }
}

export const getCategories = async (req:Request,res:Response):Promise<Response> =>{
    try {
        
        const categories = await Category.findAll();
        
        return res.status(201).json({
                status: "success",
                categories: categories
        });

    } catch (error) {
        return res.status(500).json({
                status: "error",
                message: "Server Error.",
                error
        });
    }
}