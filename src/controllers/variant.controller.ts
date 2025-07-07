import { Request,Response } from "express";

export const addVariant = async (req: Request, res: Response): Promise<Response> =>{
       
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