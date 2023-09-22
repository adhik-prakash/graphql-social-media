import { DataTypes } from 'sequelize';
import { sequelize } from '../config';
import { Comment,Like,User } from '.';
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

//post and comment association
Post.hasMany(Comment,{
    foreignKey:"post_id",
    as:"comments"
})

Comment.belongsTo(Post,{
    foreignKey:"post_id",
    as:"post"
  })
  
