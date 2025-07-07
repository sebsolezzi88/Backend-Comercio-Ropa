import express,{type Express} from 'express';
import adminRoutes from './routes/admin.routes';
import categoryRoutes from './routes/category.routes';
import productRoutes  from './routes/product.routes';
import variantRoutes from './routes/variant.routes';
import orderRoutes from './routes/order.routes';
import dotenv from 'dotenv';
import sequelize from './config/database';
import './models/User';
import './models/Products';
import './models/Category';
import './models/Order';
import './models/OrderItem';


//Cargando variables de entorno
dotenv.config();

const app: Express = express();
const port = process.env.PORT ||3000;

app.use(express.json());


app.use('/admin',adminRoutes); //Rutas de admin
app.use('/category',categoryRoutes); //Rutas categoria
app.use('/product',productRoutes); //Rutas de productos
app.use('/variant',variantRoutes); //Rutas de los variantes de los productos
app.use('/order',orderRoutes); //Rutas para las ordenes

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