import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

// Definimos los atributos del modelo
interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
}

// Campos opcionales al crear (id es autoincremental)
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

// Creamos la clase tipada
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;

  // timestamps (opcional)
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Inicializamos el modelo
User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING(80),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(250),
    allowNull: false
  }
}, {
  sequelize,
  modelName: "User",
  tableName: "users",
  timestamps: true
});

export default User;