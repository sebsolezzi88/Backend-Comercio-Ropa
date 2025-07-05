import express,{type Express} from 'express';
import adminRoutes from './routes/admin.routes';
import dotenv from 'dotenv';
import sequelize from './config/database';
import './models/User';

//Cargando variables de entorno
dotenv.config();

const app: Express = express();
const port = process.env.PORT ||3000;


//Añadiendo las rutas de admina
app.use('/admin',adminRoutes);

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos exitosa.');
    
    // usa force: true solo para borrar y regrear
    await sequelize.sync({ alter: true }); 
    console.log('✅ Modelos sincronizados con la base de datos.');


  } catch (err) {
    console.error('❌ Error al conectar o sincronizar:', err);
  }
};
//start();

app.get('/', (req, res) => {
  res.send('¡Hola desde TypeScript y Express!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});