'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comments', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"users",
          key:"id"
        },
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      },
  
      post_id:{
        type: Sequelize.INTEGER,
        allowNull: false, 
        references:{
          model:"posts",
          key:"id"
        }
    },
      description: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('comments');
  }
};