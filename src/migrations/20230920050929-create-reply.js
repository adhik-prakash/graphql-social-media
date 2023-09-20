'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Replies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      comment_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"Comments",
          key:"id"
        }
      },
      user_id: {
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"Users",
          key:"id"
        }
      },
      description:{
        type:Sequelize.STRING,
        allowNull:false,
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
    await queryInterface.dropTable('Replies');
  }
};