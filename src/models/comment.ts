import { DataTypes } from 'sequelize';
import { sequelize } from '../config';
export const Comment = sequelize.define("Comment",{
id: {
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
},
user_id:{
  type: DataTypes.INTEGER,
  allowNull:false,
  references:{
    model:"Users",
    key:"id"
  },
  onDelete:"CASCADE",
  onUpdate:"CASCADE"
},

description: {
    type:DataTypes.STRING,
    allowNull:false,
},


})

