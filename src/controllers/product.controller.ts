import { Request, Response } from 'express';
import { Product } from '../models/Products';

export const addProduct = async (req: Request, res: Response): Promise<Response> =>{
       
        try {
            const {name, description,urlImage,categoryId} = req.body;

            if(!name || !description || !urlImage || !categoryId){
                return res.status(400).json({ 
                    status: 'error', 
                    message: 'name, description, urlImage and categoryId are required.'
                 });
            }

            //Creamos el producto
            const newProduct = await Product.create({name,description,urlImage,categoryId});

            return res.status(201).json({
                    status: "success",
                    message: "Products founds.",
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
        try {
                const id = req.params.id;
                
           if (!id) {
              return res.status(400).json({ status: 'error', message: 'Id is required' });
            }
            const product = await Product.findByPk(id);
            
            return res.status(200).json({
                    status: "success",
                    message: "Product found.",
                    product 
            });

        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Server Error.",
                error
            });
        }
}

export const getProducts = async (req: Request, res: Response): Promise<Response> =>{
        try {
            const products = await Product.findAll();
            
            return res.status(200).json({
                    status: "success",
                    message: "Product created.",
                    products: products
            });

        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Server Error.",
                error
            });
        }
}

export const updateProduct = async (req: Request, res: Response): Promise<Response> =>{
        try {
            const id = req.params.id;
            const {name, description,urlImage,categoryId} = req.body;

            if (!id) {
              return res.status(400).json({ status: 'error', message: 'Id is required' });
            }

            if(!name || !description || !urlImage || !categoryId){
                return res.status(400).json({ 
                    status: 'error', 
                    message: 'name, description, urlImage and categoryId are required.'
                 });
            }
                
           
            const productExits = await Product.findByPk(id);

            
            
            if(!productExits) {
                    return res.status(404).json({ status: 'error', message: 'Product not found' });
                }
            //Moficicamos el producto
            productExits.name = name;
            productExits.description = description;
            productExits.urlImage = urlImage;
            productExits.categoryId = categoryId;

            await productExits.save();
            
            return res.status(200).json({
                    status: "success",
                    message: "Product updated.",
                    product:productExits 
            });

        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Server Error.",
                error
            });
        }
}

export const deleteProduct = async (req: Request, res: Response): Promise<Response> =>{
        return res.send('listo');
}