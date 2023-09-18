import { DataTypes } from 'sequelize';
import { sequelize } from '../config';
export const Post = sequelize.define("Post",{


id: {
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
},
description: {
    type:DataTypes.STRING,
    allowNull:false,
},
userId: {
    type:DataTypes.INTEGER,
    allowNull:false,
},
likeCount:{
    type:DataTypes.INTEGER,
    allowNull:false
}
}
)
