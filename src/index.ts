import express,{type Express} from 'express';
import adminRoutes from './routes/admin.routes';
import dotenv from 'dotenv';

//Cargando variables de entorno
dotenv.config();

const app: Express = express();
const port = process.env.PORT ||3000;


//Añadiendo las rutas de admina
app.use('/admin',adminRoutes);

app.get('/', (req, res) => {
  res.send('¡Hola desde TypeScript y Express!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});