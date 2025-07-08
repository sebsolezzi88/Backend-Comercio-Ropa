import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import Category from "./Category"; // Importamos el modelo Category
import OrderItem from "./OrderItem";
import Product from "./Products";


// --- Modelo ProductVariant (o ProductSize) ---
// Representa una combinación específica de un producto (por talle, por ejemplo)
interface ProductVariantAttributes {
  id: number;
  productId: number; // Clave foránea para el producto
  size: string; // Ej: "S", "M", "L", "XL", "38", "40"
  stock: number; // Cantidad disponible de esta variante
  price: number; // Precio de esta variante (puede variar por talle o color)
}

// Atributos para la creación de un ProductVariant (ID es opcional)
interface ProductVariantCreationAttributes
  extends Optional<ProductVariantAttributes, "id"> {}

class ProductVariant
  extends Model<ProductVariantAttributes, ProductVariantCreationAttributes>
  implements ProductVariantAttributes
{
  public id!: number;
  public productId!: number;
  public size!: string;
  public stock!: number;
  public price!: number;

  // Timestamps automáticos
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ProductVariant.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Product, // Referencia al modelo Product
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    size: {
      type: DataTypes.STRING(20), // Para talles como "S", "M", "L", "XL", "38", "40"
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER.UNSIGNED, // La cantidad no puede ser negativa
      allowNull: false,
      defaultValue: 0, // Por defecto, el stock es 0
    },
    price: {
      type: DataTypes.DECIMAL(10, 2), // Para precios, 10 dígitos en total, 2 decimales
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ProductVariant",
    tableName: "product_variants",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["productId", "size"], // Un producto no puede tener dos veces el mismo talle
      },
    ],
  }
);

export default ProductVariant;