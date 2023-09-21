import { DataTypes } from "sequelize";
import { sequelize } from "../config";

 export const User = sequelize.define("users",{
    id: {
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
    },
    userName:{
        type:DataTypes.STRING,
        allowNull:false,
        field:"user_name"
    },
    email: {
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    password: {
        type:DataTypes.STRING,
        allowNull:false,
    },
 },
{
    timestamps:true,
    underscored:true
}
);