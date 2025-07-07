import {Request,Response} from 'express'

export const createOrder = async (req: Request, res: Response): Promise<Response> =>{
    try {
        return res.send('listo')
    } catch (error) {
        return res.status(500).json({
                    status: "error",
                    message: "Server Error.",
                    error
            });
    }
}

export const getOrders = async (req: Request, res: Response): Promise<Response> =>{
    try {
        return res.send('listo')
    } catch (error) {
        return res.status(500).json({
                    status: "error",
                    message: "Server Error.",
                    error
            });
    }
}

export const getOrderByCode = async (req: Request, res: Response): Promise<Response> =>{
    try {
        return res.send('listo')
    } catch (error) {
        return res.status(500).json({
                    status: "error",
                    message: "Server Error.",
                    error
            });
    }
}

export const getOrderById = async (req: Request, res: Response): Promise<Response> =>{
    try {
        return res.send('listo')
    } catch (error) {
        return res.status(500).json({
                    status: "error",
                    message: "Server Error.",
                    error
            });
    }
}

export const deleteOrder = async (req: Request, res: Response): Promise<Response> =>{
    try {
        return res.send('listo')
    } catch (error) {
        return res.status(500).json({
                    status: "error",
                    message: "Server Error.",
                    error
            });
    }
}


export const updateStatusOrder = async (req: Request, res: Response): Promise<Response> =>{
    try {
        return res.send('listo')
    } catch (error) {
        return res.status(500).json({
                    status: "error",
                    message: "Server Error.",
                    error
            });
    }
}

