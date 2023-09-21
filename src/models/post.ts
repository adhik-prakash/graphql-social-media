import { DataTypes } from 'sequelize';
import { sequelize } from '../config';
import { Comment } from '.';
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

Post.hasMany(Comment,{
    foreignKey:"Post_id",
    as:"comments"
})

Comment.belongsTo(Post,{
    foreignKey:"post_id",
    as:"post"
  })
  

