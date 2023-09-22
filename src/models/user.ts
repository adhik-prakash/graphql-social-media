import { DataTypes } from "sequelize";
import { sequelize } from "../config";
import { Comment, Post, Reply } from ".";

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
//user and post association
User.hasMany(Post,{
    foreignKey:"user_id",
    as:"posts"
})
Post.belongsTo(User,{
    foreignKey:"user_id",
    as:"user"
})
//user and comment assoaciation

// User.hasMany(Comment,{
//     foreignKey:"comment_id",
//     as:"comments"
// })
Comment.belongsTo(User,{
    foreignKey:"post_id",
    as:"user"
})

//user and reply assoaciation

// User.hasMany(Reply,{
//     foreignKey:"reply_id",
//     
// Reply.belongsTo(User,{
//     foreignKey:"comment_id",
//     as:"user"

// })as:"replies"
// })

Post.belongsTo(User,{
    foreignKey:"user_id",
    as :"users"
  })

