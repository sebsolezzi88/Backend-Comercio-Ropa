import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import Category from "./Category"; // Importamos el modelo Category
import OrderItem from "./OrderItem";

// --- Modelo Product ---
// Definimos atributos del modelo Product
interface ProductAttributes {
  id: number;
  name: string; // Ej: "Remera Roja", "Pantalón Azul"
  description?: string; // Opcional: para una descripción más detallada
  urlImage: string;
  categoryId: number; // Clave foránea para la categoría
}

// Atributos para la creación de un Product (ID es opcional)
interface ProductCreationAttributes extends Optional<ProductAttributes, "id"> {}

class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: number;
  public name!: string;
  public description?: string;
  public urlImage!: string;
  public categoryId!: number;

  // Timestamps automáticos
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true, // Asumimos que el nombre del producto es único (ej. "Remera Roja")
    },
    description: {
      type: DataTypes.TEXT, // Tipo TEXT para descripciones largas
      allowNull: true,
    },
    urlImage:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Category, // Referencia al modelo Category
        key: "id", // Clave en Category a la que se refiere
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "products",
    timestamps: true,
  }
);





export default Product; 