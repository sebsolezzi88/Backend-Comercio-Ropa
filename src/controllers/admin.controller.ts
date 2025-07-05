import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';


export const createUser = async (req: Request, res: Response): Promise<Response> => {
    try {

        const { username, password, passwordr, email } = req.body;

        if (!username || !password || !passwordr ||!email) {
            
            return res.status(400).json({
                status: "error",
                message: "The username, password,passwordr and email fields are required"
            });
        }
        if(password.trim() !== passwordr.trim()){
            return res.status(400).json({
                status: "error",
                message: "The username, password, and passwordr fields are required"
            });
        }
        //Crear el usuario
        const hashPassoword = await bcrypt.hash(password,10);
        await User.create({
            username:username,
            password:hashPassoword,
            email: email
        })
        
        return res.status(201).json({
                status: "success",
                message: "User created"
        });
    } catch (error) {
        return res.status(500).json({
                status: "error",
                message: "Server Error",
                error
        });
    }
   
};