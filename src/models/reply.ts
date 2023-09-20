import { DataTypes } from 'sequelize';
import { sequelize } from '../config';
export const Reply = sequelize.define("Reply",{
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
      model:"Comments",
      key:"id"
    }
  },
  userId: {
    type:DataTypes.INTEGER,
    allowNull:false,
    references:{
      model:"Users",
      key:"id"
    }
  },
  description:{
    type:DataTypes.STRING,
    allowNull:false,
    },
},

{
    tableName:"Replies",
    timestamps:true,
    underscored:true
}
)
