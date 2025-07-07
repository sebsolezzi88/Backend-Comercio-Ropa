import { Request,Response } from "express";
import { ProductVariant } from "../models/Products";


export const addVariant = async (req: Request, res: Response): Promise<Response> =>{
       
        try {
           
            const {productId,size,stock,price} = req.body;

            if(!productId || !size || !stock || !price){
                return res.status(400).json({ 
                    status: 'error', 
                    message: 'productId, size, stock and price are required.'
                 });
            }

            //Creamos el producto variante
            const newProductVariant = await ProductVariant.create({productId,size,stock,price});

            return res.status(201).json({
                    status: "success",
                    message: "Product Variant created.",
                    productVariant: newProductVariant
            });
            
       } catch (error) {
            return res.status(500).json({
                    status: "error",
                    message: "Server Error.",
                    error
            });
       }
}

export const getVariant = async (req: Request, res: Response): Promise<Response> =>{
       
        try {
           
            return res.send('listo');
       } catch (error) {
            return res.status(500).json({
                    status: "error",
                    message: "Server Error.",
                    error
            });
       }
}

export const updateVariant = async (req: Request, res: Response): Promise<Response> =>{
       
        try {
           
            return res.send('listo');
       } catch (error) {
            return res.status(500).json({
                    status: "error",
                    message: "Server Error.",
                    error
            });
       }
}

export const deleteVariant = async (req: Request, res: Response): Promise<Response> =>{
       
        try {
           
            return res.send('listo');
       } catch (error) {
            return res.status(500).json({
                    status: "error",
                    message: "Server Error.",
                    error
            });
       }
}

export const getVariantsByProduct = async (req: Request, res: Response): Promise<Response> =>{
       
        try {
           
            return res.send('listo');
       } catch (error) {
            return res.status(500).json({
                    status: "error",
                    message: "Server Error.",
                    error
            });
       }
}