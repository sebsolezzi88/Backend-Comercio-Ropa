import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import  jwt  from 'jsonwebtoken';
import User from '../models/User';
import { isEmailValid } from '../utils/utils';


dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const PASSWORD_AUTH = process.env.PASSWORD_SECRET_AUTH;

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    try {

        const { username, password, passwordr, email, passwordAuth  } = req.body;

        if (!username || !password || !passwordr ||!email || !passwordAuth) {
            
            return res.status(400).json({
                status: "error",
                message: "The username, password,passwordr, email passwordAuth fields are required."
            });
        }
        if(PASSWORD_AUTH !== passwordAuth){
            return res.status(400).json({
                status: "error",
                message: "Incorrect authentication password."
            });
        }
        if (!isEmailValid(email)) {
            return res.status(400).json({ error: "Invalid email." });
        }
        if(password.trim() !== passwordr.trim()){
            return res.status(400).json({
                status: "error",
                message: "The username, password, and passwordr fields are required."
            });
        }

        //Verificar si el username y email ya estan en uso
        const existingUsername = await User.findOne({ where: { username } });
        if (existingUsername) {
            return res.status(400).json({
                status: "error",
                message: "Username already in use."
            });
        }

        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(400).json({
                status: "error",
                message: "Email already in use."
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
                message: "User created."
        });
    } catch (error) {
        return res.status(500).json({
                status: "error",
                message: "Server Error.",
                error
        });
    }
   
};

export const getToken = async(req: Request, res:Response): Promise<Response> =>{
    try {
        const { username, password} = req.body;
        if (!username || !password) {
            
            return res.status(400).json({
                status: "error",
                message: "The username and password fields are required."
            });
        }
        //Verificar si el user existe
        const userExists = await User.findOne({ where: { username } });
        if (!userExists) {
            return res.status(404).json({
                status: "error",
                message: "Username not found."
            });
        }
        // Verifica la contraseña
        const isPasswordCorrect = await bcrypt.compare(password, userExists!.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                status: "error",
                message: "Password Incorrect."
            });
        }
        const payload = {
          id: userExists!.id,
          username: userExists!.username
        }
        
        //Generamos Token
        const token = jwt.sign(payload,JWT_SECRET!,{ expiresIn: '12h' } ); 
        return res.status(200).json({status:'success', token, username:userExists!.username})

    } catch (error) {
        return res.status(500).json({
                status: "error",
                message: "Server Error.",
                error
        });
    }
}