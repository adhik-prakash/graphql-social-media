import { DataTypes } from 'sequelize';
import { sequelize } from '../config';
import { Reply } from '.';
export const Comment = sequelize.define("comments",{
id: {
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
},
userId:{
  type: DataTypes.INTEGER,
  allowNull:false,
  references:{
    model:"users",
    key:"id"
  },
},
postId :{
  type: DataTypes.INTEGER,
  references:{
    model:"posts",
    key: "id",
  }
},
description: {
    type:DataTypes.STRING,
    allowNull:false,
},
},
{
  timestamps:true,
  underscored:true
}

);

Reply.belongsTo(Comment);
Comment.hasMany(Reply);