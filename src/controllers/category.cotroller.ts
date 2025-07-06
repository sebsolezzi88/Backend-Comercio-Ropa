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
    return res.send('listo');
}

export const deleteCategory = async (req:Request,res:Response):Promise<Response> =>{
    return res.send('listo');
}

export const getCategories = async (req:Request,res:Response):Promise<Response> =>{
    return res.send('listo');
}