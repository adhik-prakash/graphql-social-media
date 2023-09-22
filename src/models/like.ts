import { DataTypes } from "sequelize";
import { sequelize } from "../config";
import { Post } from ".";

export const Like = sequelize.define(
  "likes",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: "posts",
        key: "id",
      },
    },
    reactionEnum: {
      type: DataTypes.ENUM("LIKE"),
      allowNull: false,
      defaultValue: "LIKE",
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

Post.hasMany(Like,{
  foreignKey:"post_id",
  as:"likes"

})



