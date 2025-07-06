import express,{type Express} from 'express';
import adminRoutes from './routes/admin.routes';
import categoryRoutes from './routes/category.routes';
import dotenv from 'dotenv';
import sequelize from './config/database';
import './models/User';
import './models/Products';
import './models/Category';


//Cargando variables de entorno
dotenv.config();

const app: Express = express();
const port = process.env.PORT ||3000;

app.use(express.json());

//Añadiendo las rutas de admina
app.use('/admin',adminRoutes);
app.use('/category',categoryRoutes);

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos exitosa.');
    
    // usa force: true solo para borrar y regrear
    await sequelize.sync({ force: true }); 
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