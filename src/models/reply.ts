import { DataTypes } from 'sequelize';
import { sequelize } from '../config';

export const Reply = sequelize.define("replies",{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  commentId: {
    type: DataTypes.INTEGER,
    allowNull:false,
    references:{
      model:"comments",
      key:"id"
    }
  },
  postId :{
    type: DataTypes.INTEGER,
    references:{
      model:"posts",
      key: "id",
    }
  },
  userId: {
    type:DataTypes.INTEGER,
    allowNull:false,
    references:{
      model:"users",
      key:"id"
    }
  },
  description:{
    type:DataTypes.STRING,
    allowNull:false,
    },
},

{
    timestamps:true,
    underscored:true
}
)
