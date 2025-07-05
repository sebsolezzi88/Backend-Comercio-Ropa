import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

//Definimos atributos del modelo
interface CategoryAttributes{
    id: number;
    name: string;
}

interface CategoryCreationAttributes extends Optional<CategoryAttributes,'id'> {}

class Category extends Model<CategoryAttributes,CategoryCreationAttributes> implements CategoryAttributes{
    public id!: number;
    public name!: string;
}

Category.init({
    id:{
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    }
},{
  sequelize,
  modelName: "Category",
  tableName: "categories",
  timestamps: true
});

export default Category;