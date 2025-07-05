import { Request, Response } from 'express';

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    const { username, password, passwordr } = req.body;

    if (!username || !password || !passwordr) {
        // Aseguramos que esta rama siempre retorne una Response
        return res.status(400).json({
            status: "error",
            message: "The username, password, and passwordr fields are required"
        });
    }

    // Aseguramos que esta rama también retorne una Response
    // Si hay más lógica asíncrona aquí (ej. guardar en DB), también deberías retornarla
    return res.send('usuario creado');
};