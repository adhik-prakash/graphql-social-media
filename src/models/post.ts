import { DataTypes } from 'sequelize';
import { sequelize } from '../config';
export const Post = sequelize.define("posts",{
id: {
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
},
description: {
    type:DataTypes.STRING,
    allowNull:false,
},
likeCount:{
    type:DataTypes.INTEGER,
    defaultValue:0,
    allowNull:false
},
userId: {
    type:DataTypes.INTEGER,
    allowNull:false,
    references:{
      model:"users",
      key:"id"
    }
},
},
{
    timestamps:true,
    underscored:true
}
)
