import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

import OrderItem from "./OrderItem";


interface OrderAttributes {
  id: number;
  code: string;
  customerName: string;
  street: string;
  department?: string;
  phoneNumber: string;
  totalPrice: number;
  completed: boolean; 
}

interface OrderCreationAttributes extends Optional<OrderAttributes, "id" | "completed"> {}

class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public id!: number;
  public code!: string;
  public customerName!: string;
  public street!: string;
  public department?: string;
  public phoneNumber!: string;
  public totalPrice!: number;
  public completed!: boolean; 

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    customerName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, 
    },
  },
  {
    sequelize,
    modelName: "Order",
    tableName: "orders",
    timestamps: true,
  }
);




export default Order;
