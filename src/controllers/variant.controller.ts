import { Request,Response } from "express";
import ProductVariant from "../models/ProductVariant";



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
            
       } catch (error: unknown) {
      // Primero verificamos que error es un objeto y tiene propiedad 'name'
      if (
        typeof error === 'object' && 
        error !== null && 
        'name' in error && 
        typeof (error as any).name === 'string'
      ) {
        if ((error as any).name === 'SequelizeUniqueConstraintError') {
          console.log('Ya existe una variante con ese producto y tamaño.');
          return res.status(500).json({
            status: "error",
            message: "Ya existe una variante con ese producto y tamaño",
            error
          });
        }
      }

      // Si no entra en el if anterior, manejamos otros errores
      return res.status(500).json({
        status: "error",
        message: "Server Error.",
        error
      });
    }
}

export const getVariant = async (req: Request, res: Response): Promise<Response> =>{
       
         try {
           
            const id = req.params.id;

            if (!id) {
              return res.status(400).json({ status: 'error', message: 'Id is required' });
            }

            //Buscamos el producto variante
            const productVariantExist = await ProductVariant.findByPk(id);

            if(!productVariantExist){
                return res.status(404).json({ status: 'error', message: 'Product variant not found' });
            }

            return res.status(200).json({
                    status: "success",
                    message: "Product Variant found.",
                    productVariant: productVariantExist
            });
            
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
           
            const id = req.params.id;
            const {productId,size,stock,price} = req.body;

            if (!id) {
              return res.status(400).json({ status: 'error', message: 'Id is required' });
            }

            if(!productId || !size || !stock || !price){
                return res.status(400).json({ 
                    status: 'error', 
                    message: 'productId, size, stock and price are required.'
                 });
            }

            //Buscamos el producto variante
            const productVariantExist = await ProductVariant.findByPk(id);

            if(!productVariantExist){
                return res.status(404).json({ status: 'error', message: 'Product variant not found' });
            }

            productVariantExist.productId = productId;
            productVariantExist.stock = stock;
            productVariantExist.size = size;
            productVariantExist.price = price;

            await productVariantExist.save();

            return res.status(200).json({
                    status: "success",
                    message: "Product Variant updated.",
                    productVariant: productVariantExist
            });
            
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
           
            const id = req.params.id;

            if (!id) {
              return res.status(400).json({ status: 'error', message: 'Id is required' });
            }

            //Buscamos el producto variante
            const productVariantExist = await ProductVariant.findByPk(id);

            if(!productVariantExist){
                return res.status(404).json({ status: 'error', message: 'Product variant not found' });
            }

            await productVariantExist.destroy();

            return res.status(200).json({
                    status: "success",
                    message: "Product Variant deleted.",
            });
            
       } catch (error) {
            return res.status(500).json({
                    status: "error",
                    message: "Server Error.",
                    error
            });
       }
}

export const getVariantsByProduct = async (req: Request, res: Response): Promise<Response> =>{
       
    const { productId } = req.params;

  try {
    const variants = await ProductVariant.findAll({
      where: { productId },
      order: [['size', 'ASC']], //ordena por tamaño
    });

    if (!variants.length) {
      return res.status(404).json({
        status: "error",
        message: "No variants found for this product.",
      });
    }

    return res.status(200).json({
      status: "success",
      variants,
    });
  } catch (error) {
    console.error("Error fetching product variants:", error);
    return res.status(500).json({
      status: "error",
      message: "Server error fetching variants.",
    });
  }
}