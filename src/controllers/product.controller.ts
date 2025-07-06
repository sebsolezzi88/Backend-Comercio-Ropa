import { Request, Response } from 'express';
import { Product } from '../models/Products';

export const addProduct = async (req: Request, res: Response): Promise<Response> =>{
       
        try {
            const {name, description,urlImage,categoryId} = req.body;

            if(!name || !description || !urlImage || !categoryId){
                return res.status(400).json({ 
                    status: 'error', 
                    message: 'name, description, urlImage and categoryId are required.';
                 });
            }

            //Creamos el producto
            const newProduct = await Product.create({name,description,urlImage,categoryId});

            return res.status(201).json({
                    status: "success",
                    message: "Product created.",
                    product: newProduct
            });
       } catch (error) {
            return res.status(500).json({
                    status: "error",
                    message: "Server Error.",
                    error
            });
       }
}

export const getProduct = async (req: Request, res: Response): Promise<Response> =>{
        return res.send('listo');
}

export const getProducts = async (req: Request, res: Response): Promise<Response> =>{
        return res.send('listo');
}

export const updateProduct = async (req: Request, res: Response): Promise<Response> =>{
        return res.send('listo');
}

export const deleteProduct = async (req: Request, res: Response): Promise<Response> =>{
        return res.send('listo');
}