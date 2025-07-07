import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import { ProductVariant } from "./Products";
import Order from "./Order";

class OrderItem extends Model {
  public orderId!: number;
  public productVariantId!: number;
  public quantity!: number;
  public price!: number;
}

OrderItem.init(
  {
    orderId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Order,
        key: "id",
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    productVariantId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: ProductVariant,
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "OrderItem",
    tableName: "order_items",
    timestamps: true,
  }
);

// Asociaciones
Order.belongsToMany(ProductVariant, {
  through: OrderItem,
  foreignKey: "orderId",
  as: "items",
});

ProductVariant.belongsToMany(Order, {
  through: OrderItem,
  foreignKey: "productVariantId",
  as: "orders",
});

export default OrderItem;