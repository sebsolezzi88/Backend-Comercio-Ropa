import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

import Order from "./Order";
import ProductVariant from "./ProductVariant";

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



export default OrderItem;